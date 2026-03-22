using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using ATSAPI.Const;
using ATSAPI.Database;
using ATSAPI.Database.Entities;
using ATSAPI.Models.Request;
using ATSAPI.Validators;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;

namespace ATSAPI.APIMaps;

public static class ApiPostExtensions
{
	public static RouteHandlerBuilder AddPostRegisterUserAccount(this WebApplication webApplication) => webApplication
		.MapPost("/api/account/register", (RegisterUserAccountRequest request, IAppDbContext dbContext) =>
		{
			if (!UserAccountValidator.ValidateRegisterRequest(request, dbContext, out IResult? error))
				return error!;

			Role? userRoleId = dbContext.Role.FirstOrDefault(r => r.Name == RoleNames.User);

			if (userRoleId == null)
				return Results.Problem(statusCode: StatusCodes.Status500InternalServerError);

			var userAccount = new UserAccount
			{
				Username = request.UserName,
				Password = Utils.GetSHA512(request.Password),
				RoleID = userRoleId.Id
			};

			dbContext.UserAccount.Add(userAccount);
			dbContext.SaveChanges();

			return Results.Ok();
		})
		.WithName("RegisterAccount")
		.WithOpenApi();

	public static RouteHandlerBuilder AddPostLogin(this WebApplication webApplication) =>
		webApplication.MapPost("/api/account/login", (LoginRequest request, IAppDbContext dbContext) =>
			{
				if (!UserAccountValidator.ValidateLoginRequest(request, dbContext, out IResult? error))
					return error!;

				UserAccount userAccount = dbContext.UserAccount.First(ua =>
					ua.Username == request.UserName &&
					ua.Password == Utils.GetSHA512(request.Password)
				);

				var jwt = new JwtSecurityToken(
					claims:
					[
						new Claim(JwtRegisteredClaimNames.Sub, userAccount.Username),
						new Claim("roleid", userAccount.RoleID.ToString())
					],
					expires: DateTime.UtcNow.AddMinutes(10));

				return Results.Ok(jwt);
			})
			.WithName("Login")
			.WithOpenApi();
}
