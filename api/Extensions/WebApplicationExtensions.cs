using System.IdentityModel.Tokens.Jwt;
using ATSAPI.Services;
using ATSAPI.Services.Interfaces;

namespace ATSAPI.Extensions;

public static class WebApplicationExtensions
{
	public static IApplicationBuilder UseJWTAuth(this IApplicationBuilder app) => app.Use((context, next) =>
	{
		if (context.Request.Headers.Authorization.Count == 0)
			return next(context);

		try
		{
			var authService = context.RequestServices.GetService<IAuthService>();
			var token = JwtPayload.Deserialize(context.Request.Headers.Authorization[0]);
			authService!.HandleToken(token);
		}
		catch (Exception e)
		{
			Console.WriteLine(e);
		}

		return next(context);
	});
}
