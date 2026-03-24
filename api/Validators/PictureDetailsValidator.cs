using ATSAPI.Database;
using ATSAPI.Models.Request;

namespace ATSAPI.Validators;

public static class PictureDetailsValidator
{
	private static readonly int _maxYear = new DateTime().Year;
	private static readonly int _minYear = 1970;

	public static bool ValidateDetails(PhotoDetails details, IAppDbContext appDbContext, out IResult? error)
	{
		error = null;

		if (appDbContext.Area.Where(a => a.ParentId == null).FirstOrDefault(a => a.Name == details.ParentArea) == null)
			error = Results.BadRequest("Invalid parent area.");
		else if (details.Year > _maxYear)
			error = Results.BadRequest("Invalid year.");
		else if (details.Year < _minYear)
			error = Results.BadRequest("Minimum permitted year value is 1970.");

		return error == null;
	}
}
