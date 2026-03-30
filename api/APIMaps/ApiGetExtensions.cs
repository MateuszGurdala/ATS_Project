using ATSAPI.Const;
using ATSAPI.Database.Entities;
using ATSAPI.Database;
using ATSAPI.Extensions;
using ATSAPI.Models.DTO;
using ATSAPI.Models.Responses;
using ATSAPI.Models;
using ATSAPI.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ATSAPI.APIMaps;

public static class ApiGetExtensions
{
	public static void AddGetEndpoints(this WebApplication webApplication)
	{
		webApplication.AddGetAvailableYears();
		webApplication.AddGetPictures();
		webApplication.AddGetAreas();
		webApplication.AddGetUploadOptions();
		webApplication.AddGetPictureDetails();
		webApplication.AddGetAdminPanelPictures();
	}

	private static void AddGetAvailableYears(this WebApplication webApplication) => webApplication.MapGet("/api/year/list",
			(IAppDbContext appDbContext) => appDbContext.Year
				.Include(y => y.AreaYears)
				.ThenInclude(ay => ay.Area)
				.ThenInclude(a => a.Pictures)
				.SelectMany(y => y.AreaYears)
				.Where(ay => ay.Area.Pictures!.Any(p => p.IsActive))
				.Select(ay => ay.Year.Value)
				.Distinct()
				.OrderBy(value => value))
		.WithName("GetAvailableYears")
		.WithOpenApi();

	private static void AddGetPictures(this WebApplication webApplication) => webApplication.MapGet("/api/picture/list",
			([FromQuery(Name = "year")] int? yearValue, [FromQuery(Name = "area")] string? areaName, IAppDbContext appDbContext) =>
			{
				var areaIds = appDbContext.AreaYear
					.Include(ay => ay.Year)
					.Include(ay => ay.Area)
					.ThenInclude(a => a.Parent)
					.Include(ay => ay.Area)
					.ThenInclude(a => a.Pictures)
					.WhereIf(ay => ay.Year.Value == yearValue, yearValue != null)
					.WhereIf(ay => ay.Area.Name == areaName || (ay.Area.Parent != null && ay.Area.Parent.Name == areaName), areaName != null)
					.Where(ay => ay.Area.Pictures!.Any(p => p.IsActive))
					.AsSplitQuery()
					.Select(ay => ay.AreaId);

				return appDbContext.Picture
					.Include(p => p.Area)
					.Where(p => areaIds.Contains(p.AreaId))
					.AsSplitQuery()
					.Select(p => new PictureDTO
					{
						Id = p.Id,
						Extension = p.Extension,
						Title = p.Title,
						Description = p.Description
					});
			})
		.WithName("GetPictures")
		.WithOpenApi();

	private static void AddGetAreas(this WebApplication webApplication) => webApplication.MapGet("/api/area/list", async (IAppDbContext appDbContext) =>
			{
				var dictionary = new Dictionary<int, List<TreeNode>>();

				var areaYears = await appDbContext.AreaYear
					.Include(ay => ay.Year)
					.Include(ay => ay.Area)
					.ThenInclude(a => a.Pictures)
					.Where(ay => ay.Area.Pictures!.Any(p => p.IsActive))
					.OrderBy(ay => ay.Year.Value)
					.GroupBy(ay => ay.Year.Value)
					.AsSplitQuery()
					.AsNoTracking()
					.ToListAsync();

				var areas = await appDbContext.Area
					.Include(a => a.Parent)
					.Where(a => a.ParentId != null)
					.AsSplitQuery()
					.AsNoTracking()
					.ToListAsync();

				foreach (var areaYearGrouping in areaYears)
				{
					var childAreas = areas.Where(a => areaYearGrouping.Select(ay => ay.AreaId).Contains(a.Id)).GroupBy(a => a.Parent!.Name)
						.Select(g => new TreeNode()
						{
							Name = g.Key,
							Children = g.Select(gc => new TreeNode() { Name = gc.Name }).ToList()
						})
						.OrderBy(ca => ca.Name)
						.ToList();

					dictionary.Add(areaYearGrouping.Key, childAreas);
				}

				return dictionary;
			}
		)
		.WithName("GetAreas")
		.WithOpenApi();

	private static void AddGetUploadOptions(this WebApplication webApplication) =>
		webApplication.MapGet("/api/picture/options", async (IAppDbContext appDbContext) =>
			{
				var years = await appDbContext.Year
					.OrderByDescending(y => y.Value)
					.Select(y => y.Value)
					.Distinct()
					.ToListAsync();

				var areas = await appDbContext.Area
					.Where(a => a.ParentId != null)
					.OrderByDescending(a => a.Name)
					.Select(a => a.Name)
					.Distinct()
					.ToListAsync();

				var parents = await appDbContext.Area
					.Where(a => a.ParentId == null)
					.OrderByDescending(a => a.Name)
					.Select(a => a.Name)
					.Distinct()
					.ToListAsync();

				return new UploadOptionsResponse
				{
					Years = years,
					Areas = areas,
					ParentAreas = parents
				};
			})
			.WithName("GetUploadOptions")
			.WithOpenApi();

	private static void AddGetPictureDetails(this WebApplication webApplication) =>
		webApplication.MapGet("/api/picture/{id:long}", (
				long id,
				IAppDbContext appDbContext) =>
			{
				Picture? picture = appDbContext.Picture
					.Include(p => p.Area)
					.ThenInclude(p => p.AreaYears)
					.ThenInclude(ay => ay.Year)
					.Include(ay => ay.Area)
					.ThenInclude(a => a.Parent)
					.Include(p => p.CreatedBy)
					.Include(p => p.UpdatedBy)
					.Where(p => p.Id == id)
					.AsNoTracking()
					.AsSplitQuery()
					.FirstOrDefault();

				if (picture == null)
					return Results.BadRequest("Picture not found.");

				return Results.Ok(new PictureDetailsResponse
				{
					Title = picture.Title,
					Area = picture.Area.Name,
					Description = picture.Description,
					Year = picture.Area.AreaYears.First().Year.Value,
					ParentArea = picture.Area.Parent!.Name,
					CreatedOn = picture.CreatedOn.ToString("dd/MM/yyyy"),
					UpdatedOn = picture.UpdatedOn.ToString("dd/MM/yyyy"),
					CreatedBy = picture.CreatedBy.Username,
					UpdatedBy = picture.UpdatedBy.Username,
				});
			})
			.WithName("GetPictureDetails")
			.WithOpenApi();

	private static void AddGetAdminPanelPictures(this WebApplication webApplication) =>
		webApplication.MapGet("/api/picture/admin/list", async (IAppDbContext appDbContext, IAuthService authService) =>
				{
					if (!(authService.IsAuthenticated && authService.UserAccount.Role.Name == RoleNames.Admin))
						return Results.Unauthorized();

					var pictures = await appDbContext.Picture
						.Include(p => p.Area)
						.ThenInclude(p => p.AreaYears)
						.ThenInclude(ay => ay.Year)
						.Include(ay => ay.Area)
						.ThenInclude(a => a.Parent)
						.Include(p => p.UpdatedBy)
						.OrderByDescending(p => p.UpdatedOn)
						.Take(10)
						.AsSplitQuery()
						.Select(p => new AdminPanelPictureResponse
						{
							Id = p.Id,
							Title = p.Title,
							Area = p.Area.Name,
							Description = p.Description,
							Year = p.Area.AreaYears.First().Year.Value,
							ParentArea = p.Area.Parent!.Name,
							UpdatedOn = p.UpdatedOn.ToString("dd/MM/yyyy"),
							UpdatedBy = p.UpdatedBy.Username,
							Extension = p.Extension
						})
						.ToListAsync();

					return Results.Ok(pictures);
				}
			)
			.WithName("GetAdminPanelPictures")
			.WithOpenApi();
}
