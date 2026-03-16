using ATSAPI.Databaase;
using ATSAPI.Databaase.Entities;
using ATSAPI.Extensions;
using ATSAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
string allowedOrigins;

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options => { options.AddPolicy(name: nameof(allowedOrigins), policy => { policy.WithOrigins("http://localhost:4200"); }); });

builder.Services.AddScoped<IAppDbContext, AppDbContext>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
	app.UseSwagger();
	app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors(nameof(allowedOrigins));

app.MapGet("/api/available-years", (IAppDbContext appDbContext) => appDbContext.Year.Select(year => year.Value).OrderBy(value => value))
	.WithName("GetAvailableYears")
	.WithOpenApi();

app.MapGet("/api/pictures", ([FromQuery(Name = "year")] int? yearValue, IAppDbContext appDbContext) =>
	{
		List<int> areaIds = appDbContext.AreaYear
			.Include(ay => ay.Year)
			.WhereIf(ay => ay.Year.Value == yearValue, yearValue != null)
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

app.MapGet("/api/areas", (IAppDbContext appDbContext) =>
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

app.Run();
