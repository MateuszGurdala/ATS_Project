using ATSAPI.Database;
using ATSAPI.Database.Entities;
using ATSAPI.Models.Request;
using ATSAPI.Services.Interfaces;
using ATSAPI.Validators;

namespace ATSAPI.APIMaps;

public static class ApiPutExtensions
{
	public static void AddPutEndpoints(this WebApplication webApplication)
	{
		webApplication.AddPutUpdatePicture();
	}

	private static RouteHandlerBuilder AddPutUpdatePicture(this WebApplication webApplication) => webApplication
		.MapPut("/api/picture/update", (
			UpdatePictureRequest request,
			IAppDbContext appDbContext,
			IOptionsService optionsService,
			IAuthService authService
		) =>
		{
			if (!authService.IsAuthenticated)
				return Results.Unauthorized();

			if (!PictureDetailsValidator.ValidateDetails(request, appDbContext, out var error))
				return error;

			var picture = appDbContext.Picture.FirstOrDefault(picture => picture.Id == request.Id);
			if (picture == null)
				return Results.BadRequest("Picture not found.");

			Area area = optionsService.GetOrAddArea(request.Area, request.ParentArea, request.Year);

			picture.UpdatedOn = DateTime.Now;
			picture.UpdatedById = authService.UserAccount.Id;
			picture.Title = request.Title;
			picture.AreaId = area.Id;
			picture.Description = request.Description;

			appDbContext.SaveChanges();

			return Results.Ok();
		})
		.WithName("UpdatePicture")
		.WithOpenApi();
}
