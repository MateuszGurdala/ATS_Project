using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text.Json;
using System.Text.Json.Serialization;
using ATSAPI.Database;
using ATSAPI.Database.Entities;
using ATSAPI.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ATSAPI.Services;

public class AuthService(IAppDbContext appDbContext) : IAuthService
{
	public bool IsAuthenticated { get; private set; } = false;
	public UserAccount UserAccount { get; private set; }

	public void HandleToken(JwtPayload token)
	{
		var payload = token["payload"];
		if (payload == null)
			return;

		var payloadJson = JsonSerializer.Deserialize<JwtAuthPayload>(payload.ToString()!);
		if (payloadJson == null)
			return;

		var user = appDbContext.UserAccount
			.Include(ua => ua.Role)
			.Where(ua => ua.RoleID == int.Parse(payloadJson.RoleId))
			.Where(ua => ua.Username == payloadJson.UserName)
			.FirstOrDefault(ua => ua.Id == int.Parse(payloadJson.UserId));

		if (user == null)
			return;

		IsAuthenticated = true;
		UserAccount = user;
	}

	public JwtSecurityToken IssueToken(UserAccount userAccount)
		=> new(
			claims:
			[
				new Claim(JwtRegisteredClaimNames.Sub, userAccount.Username),
				new Claim("roleid", userAccount.RoleID.ToString()),
				new Claim("rolename", userAccount.Role.Name),
				new Claim("usrid", userAccount.Id.ToString())
			],
			expires: DateTime.UtcNow.AddMinutes(10)
		);

	private class JwtAuthPayload
	{
		[JsonPropertyName("roleid")] public string RoleId { get; set; }
		[JsonPropertyName("usrid")] public string UserId { get; set; }
		[JsonPropertyName("sub")] public string UserName { get; set; }
		[JsonPropertyName("exp")] public long ExpiresInMs { get; set; }
	}
}
