using System.Security.Cryptography;
using System.Text;
using ATSAPI.Const;
using ATSAPI.Databaase;
using ATSAPI.Databaase.Entities;
using ATSAPI.Models.Request;
using ATSAPI.Validators;

namespace ATSAPI.APIMaps;

public static class ApiPostExtensions
{
	public static RouteHandlerBuilder AddPostRegisterUserAccount(this WebApplication webApplication) => webApplication
		.MapPost("/api/account/register", (RegisterUserAccountRequest request, IAppDbContext dbContext) =>
		{
			if (!UserAccountValidator.ValidateRegisterRequest(request, dbContext, out IResult? error))
			{
				return error!;
			}

			Role? userRoleId = dbContext.Role.FirstOrDefault(r => r.Name == RoleNames.User);

			if (userRoleId == null)
				return Results.Problem(statusCode: StatusCodes.Status500InternalServerError);

			using SHA512 sha512 = new SHA512Managed();
			var userAccount = new UserAccount
			{
				Username = request.UserName,
				Password = Encoding.ASCII.GetString(sha512.ComputeHash(Encoding.UTF8.GetBytes(request.Password)))!,
				RoleID = userRoleId.Id
			};

			dbContext.UserAccount.Add(userAccount);
			dbContext.SaveChanges();

			return Results.Ok();
		})
		.WithName("RegisterAccount")
		.WithOpenApi();
}
