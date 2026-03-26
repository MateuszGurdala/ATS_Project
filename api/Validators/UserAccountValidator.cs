using ATSAPI.Database;
using ATSAPI.Database.Entities;
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

	public static bool ValidateLoginRequest(LoginRequest request, IAppDbContext dbContext, out IResult? error)
	{
		error = null;

		UserAccount? userAccount = dbContext.UserAccount.FirstOrDefault(ua =>
			ua.Username == request.UserName &&
			ua.Password == Utils.Utils.GetSHA512(request.Password)
		);

		if (userAccount == null)
			error = Results.BadRequest("Provided credentials are invalid.");

		return error == null;
	}
}
