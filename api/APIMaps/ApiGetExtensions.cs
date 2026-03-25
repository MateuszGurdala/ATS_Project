using ATSAPI.Database;
using ATSAPI.Database.Entities;
using ATSAPI.Extensions;
using ATSAPI.Models;
using ATSAPI.Models.DTO;
using ATSAPI.Models.Responses;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ATSAPI.APIMaps;

public static class ApiGetExtensions
{
	public static RouteHandlerBuilder AddGetAvailableYears(this WebApplication webApplication) =>
		webApplication.MapGet("/api/available-years", (IAppDbContext appDbContext) => appDbContext.Year.Select(year => year.Value).OrderBy(value => value))
			.WithName("GetAvailableYears")
			.WithOpenApi();

	public static RouteHandlerBuilder AddGetPictures(this WebApplication webApplication) => webApplication.MapGet("/api/pictures",
			([FromQuery(Name = "year")] int? yearValue, [FromQuery(Name = "area")] string? areaName, IAppDbContext appDbContext) =>
			{
				var areaIds = appDbContext.AreaYear
					.Include(ay => ay.Year)
					.Include(ay => ay.Area)
					.ThenInclude(a => a.Parent)
					.WhereIf(ay => ay.Year.Value == yearValue, yearValue != null)
					.WhereIf(ay => ay.Area.Name == areaName || (ay.Area.Parent != null && ay.Area.Parent.Name == areaName), areaName != null)
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

	public static RouteHandlerBuilder AddGetAreas(this WebApplication webApplication) => webApplication.MapGet("/api/areas", async (IAppDbContext appDbContext) =>
			{
				var dictionary = new Dictionary<int, List<TreeNode>>();

				var areaYears = await appDbContext.AreaYear
					.Include(ay => ay.Year)
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

	public static RouteHandlerBuilder AddGetUploadOptions(this WebApplication webApplication) =>
		webApplication.MapGet("/api/upload-options", async (IAppDbContext appDbContext) =>
			{
				Task<List<int>> years = appDbContext.Year
					.OrderByDescending(y => y.Value)
					.Select(y => y.Value)
					.Distinct()
					.ToListAsync();

				Task<List<string>> areas = appDbContext.Area
					.Where(a => a.ParentId != null)
					.OrderByDescending(a => a.Name)
					.Select(a => a.Name)
					.Distinct()
					.ToListAsync();

				Task<List<string>> parents = appDbContext.Area
					.Where(a => a.ParentId == null)
					.OrderByDescending(a => a.Name)
					.Select(a => a.Name)
					.Distinct()
					.ToListAsync();

				return new UploadOptionsResponse
				{
					Years = await years,
					Areas = await areas,
					ParentAreas = await parents
				};
			})
			.WithName("GetUploadOptions")
			.WithOpenApi();

	public static RouteHandlerBuilder AddGetPictureDetails(this WebApplication webApplication)
		=> webApplication.MapGet("/api/picture/{id:long}", (
				long id,
				IAppDbContext appDbContext) =>
			{
				Picture? picture = appDbContext.Picture
					.Include(p => p.Area)
					.ThenInclude(p => p.AreaYears)
					.Include(p => p.CreatedBy)
					.Include(p => p.UpdatedBy)
					.Where(p => p.Id == id)
					.AsNoTracking()
					.FirstOrDefault();

				if (picture == null)
					return Results.BadRequest("Picture not found.");

				AreaYear areaYear = appDbContext.AreaYear
					.Include(ay => ay.Area)
					.ThenInclude(a => a.Parent)
					.Include(ay => ay.Year)
					.AsNoTracking()
					.First(ay => ay.AreaId == picture.AreaId);

				return Results.Ok(new PictureDetailsResponse
				{
					Title = picture.Title,
					Area = picture.Area.Name,
					Description = picture.Description,
					Year = areaYear.Year.Value,
					ParentArea = areaYear.Area.Parent!.Name,
					CreatedOn = picture.CreatedOn.ToString("dd/MM/yyyy"),
					UpdatedOn = picture.UpdatedOn.ToString("dd/MM/yyyy"),
					CreatedBy = picture.CreatedBy.Username,
					UpdatedBy = picture.UpdatedBy.Username,
				});
			})
			.WithName("GetPictureDetails")
			.WithOpenApi();
}
