using ATSAPI.Databaase;
using ATSAPI.Models.Request;

namespace ATSAPI.Validators;

public static class UserAccountValidator
{
	private const int _minimalPasswordLength = 8;

	public static bool ValidateRegisterRequest(RegisterUserAccountRequest request, IAppDbContext dbContext, out IResult? error)
	{
		error = null;

		if (dbContext.UserAccount.FirstOrDefault(ua => ua.Username == request.UserName) != null)
			error = Results.BadRequest("This username is already in use.");

		if (request.Password.Length < _minimalPasswordLength || !request.Password.Any(char.IsDigit))
			error = Results.BadRequest("Password does not meet criteria.");

		return error == null;
	}
}
