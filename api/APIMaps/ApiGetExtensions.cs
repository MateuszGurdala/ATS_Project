using ATSAPI.Databaase;
using ATSAPI.Database;
using ATSAPI.Database.Entities;
using ATSAPI.Extensions;
using ATSAPI.Models;
using ATSAPI.Models.DTO;
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
				List<int> areaIds = appDbContext.AreaYear
					.Include(ay => ay.Year)
					.Include(ay => ay.Area)
					.ThenInclude(a => a.Parent)
					.WhereIf(ay => ay.Year.Value == yearValue, yearValue != null)
					.WhereIf(ay => ay.Area.Name == areaName || (ay.Area.Parent != null && ay.Area.Parent.Name == areaName), areaName != null)
					.Select(ay => ay.AreaId)
					.ToList();

				return appDbContext.Picture
					.Include(p => p.Area)
					.Where(p => areaIds.Contains(p.AreaId))
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

	public static RouteHandlerBuilder AddGetAreas(this WebApplication webApplication) => webApplication.MapGet("/api/areas", (IAppDbContext appDbContext) =>
			{
				var dictionary = new Dictionary<int, List<TreeNode>>();

				List<IGrouping<int, AreaYear>> areaYears = appDbContext.AreaYear
					.Include(ay => ay.Year)
					.OrderBy(ay => ay.Year.Value)
					.GroupBy(ay => ay.Year.Value)
					.ToList();

				var areas = appDbContext.Area
					.Include(a => a.Parent)
					.Where(a => a.ParentId != null)
					.ToList();

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
}
