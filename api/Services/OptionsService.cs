using ATSAPI.Database;
using ATSAPI.Database.Entities;
using Microsoft.EntityFrameworkCore;

namespace ATSAPI.Services;

public class OptionsService(IAppDbContext appDbContext) : IOptionsService
{
	public Area GetOrAddArea(string areaName, string parentAreaName, int yearValue)
	{
		var parentArea = appDbContext.Area.First(a => a.Name == parentAreaName && a.ParentId == null);
		var year = appDbContext.Year.FirstOrDefault(y => y.Value == yearValue) ?? AddYear(yearValue);

		var area = appDbContext.AreaYear
			.Include(ay => ay.Area)
			.Where(ay => ay.Area.Name == areaName)
			.Where(ay => ay.Area.ParentId == parentArea.Id)
			.Where(ay => ay.YearId == year.Id)
			.Select(ay => ay.Area)
			.FirstOrDefault();

		return area ?? AddArea(areaName, parentArea, year);
	}

	private Area AddArea(string areaName, Area parentArea, Year year)
	{
		var areaToAdd = new Area
		{
			ParentId = parentArea.Id,
			Name = areaName
		};

		var areaYearToAdd = new AreaYear
		{
			Area = areaToAdd,
			Year = year
		};

		var areaEntry = appDbContext.Area.Add(areaToAdd);
		appDbContext.AreaYear.Add(areaYearToAdd);
		appDbContext.SaveChanges();

		return areaEntry.Entity;
	}

	private Year AddYear(int yearValue)
	{
		var year = new Year()
		{
			Value = yearValue
		};

		appDbContext.Year.Add(year);

		return year;
	}
}
