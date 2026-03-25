using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using ATSAPI.Database;
using ATSAPI.Database.Entities;

namespace ATSAPI.Services;

public class AuthService(IAppDbContext appDbContext) : IAuthService
{
	public bool IsAuthenticated { get; private set; } = false;
	public UserAccount UserAccount { get; private set; }
	public string RoleName { get; private set; }

	public void HandleToken(JwtPayload token)
	{
		Claim? userIdClaim = token.Claims.FirstOrDefault(c => c.Type == "usrid");
		Claim? roleIdClaim = token.Claims.FirstOrDefault(c => c.Type == "roleid");
		string? userName = token.Sub;

		if (userIdClaim == null || roleIdClaim == null || userName == null)
			return;

		var user = appDbContext.UserAccount
			.Where(ua => ua.RoleID == int.Parse(roleIdClaim.Value))
			.Where(ua => ua.Username == userName)
			.FirstOrDefault(ua => ua.Id == int.Parse(userIdClaim.Value));

		if (user == null)
			return;

		IsAuthenticated = true;
		UserAccount = user;
		RoleName = appDbContext.Role.First(r => r.Id == int.Parse(roleIdClaim.Value)).Name;
	}
}
