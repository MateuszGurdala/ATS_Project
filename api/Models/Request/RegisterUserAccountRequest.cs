namespace ATSAPI.Models.Request;

public record RegisterUserAccountRequest
{
	public required string UserName { get; set; }
	public required string Password { get; set; }
}
