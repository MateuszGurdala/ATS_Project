using ATSAPI.Database.Entities;

namespace ATSAPI.Services.Interfaces;

public interface IOptionsService
{
	Area GetOrAddArea(string areaName, string parentAreaName, int yearValue);
}
