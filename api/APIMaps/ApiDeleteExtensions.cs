using ATSAPI.Const;
using ATSAPI.Database;
using ATSAPI.Models.Request;
using ATSAPI.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ATSAPI.APIMaps;

public static class ApiDeleteExtensions
{
	public static void AddDeleteEndpoints(this WebApplication webApplication)
	{
		webApplication.AddDeletePhoto();
	}

	private static void AddDeletePhoto(this WebApplication webApplication) =>
		webApplication.MapDelete("/api/picture/delete/{id:long}", async (
				long id,
				IAppDbContext appDbContext,
				IAuthService authService
			) =>
			{
				if (!authService.IsAuthenticated || authService.UserAccount.Role.Name != RoleNames.Admin)
					return Results.Unauthorized();

				var picture = await appDbContext.Picture.FirstOrDefaultAsync(p => p.Id == id);
				if (picture == null)
					return Results.BadRequest("Invalid picture Id.");

				var userCreated = await appDbContext.UserAccount.FirstOrDefaultAsync(ua => ua.Id == picture.CreatedById);
				if (userCreated == null)
					return Results.Problem();

				userCreated.IsActive = false;
				picture.IsActive = false;
				picture.UpdatedById = authService.UserAccount.Id;
				picture.UpdatedOn = DateTime.Now;

				await appDbContext.SaveChangesAsync();

				return Results.Ok();
			})
			.WithName("DeletePicture")
			.WithOpenApi();
}
