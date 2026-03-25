using System.Text.Json;
using ATSAPI.Const;
using ATSAPI.Database;
using ATSAPI.Database.Entities;
using ATSAPI.Models.Request;
using ATSAPI.Services;
using ATSAPI.Validators;
using Microsoft.AspNetCore.Mvc;

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
		webApplication.MapPost("/api/account/login", (LoginRequest request, IAppDbContext dbContext, IAuthService authService) =>
			{
				if (!UserAccountValidator.ValidateLoginRequest(request, dbContext, out IResult? error))
					return error!;

				UserAccount userAccount = dbContext.UserAccount.First(ua =>
					ua.Username == request.UserName &&
					ua.Password == Utils.GetSHA512(request.Password)
				);

				return Results.Ok(authService.IssueToken(userAccount));
			})
			.WithName("Login")
			.WithOpenApi();

	public static RouteHandlerBuilder AddPostUploadPhoto(this WebApplication webApplication) => webApplication
		.MapPost("/api/picture/upload", (
			[FromForm] string photoDetails,
			IFormFile file,
			IAppDbContext appDbContext,
			IAzureStorageService storageService,
			IOptionsService optionsService,
			IAuthService authService
		) =>
		{
			if (!authService.IsAuthenticated)
				return Results.Unauthorized();

			var details = JsonSerializer.Deserialize<PhotoDetails>(photoDetails)!;
			if (!PictureDetailsValidator.ValidateDetails(details, appDbContext, out var error))
				return error;

			var area = optionsService.GetOrAddArea(details.Area, details.ParentArea, details.Year);
			var extension = file.FileName.Split('.').Last();

			var picture = new Picture()
			{
				AreaId = area.Id,
				Title = details.Title,
				Description = details.Description,
				Extension = extension,
				IsActive = true,
				CreatedOn = DateTime.Now,
				UpdatedOn = DateTime.Now,
				CreatedById = authService.UserAccount.Id,
				UpdatedById = authService.UserAccount.Id,
			};

			appDbContext.Picture.Add(picture);
			appDbContext.SaveChanges();

			storageService.GetContainerClient().UploadBlob(string.Join('.', [picture.Id, extension]), file.OpenReadStream());

			return Results.Ok();
		})
		.DisableAntiforgery()
		.WithName("UploadPhoto");
}
