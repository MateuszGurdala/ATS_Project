using System.IdentityModel.Tokens.Jwt;
using ATSAPI.Database.Entities;

namespace ATSAPI.Services.Interfaces;

public interface IAuthService
{
	public bool IsAuthenticated { get; }
	public UserAccount UserAccount { get; }

	public void HandleToken(JwtPayload token);
	public JwtSecurityToken IssueToken(UserAccount userAccount);
}
