using System.IdentityModel.Tokens.Jwt;
using ATSAPI.Database.Entities;

namespace ATSAPI.Services;

public interface IAuthService
{
	public bool IsAuthenticated { get; }
	public UserAccount UserAccount { get; }
	public string RoleName { get; }

	public void HandleToken(JwtPayload token);
}
