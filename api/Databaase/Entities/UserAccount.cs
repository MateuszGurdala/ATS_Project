using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ATSAPI.Databaase.Entities;

public class UserAccount
{
	[Key][Column("UserAccountID")] public long Id { get; set; }
	[Column("RoleID")] public int RoleID { get; set; }
	[Column("Username")] public string Username { get; set; }
	[Column("Password")] public string Password { get; set; }
	public Role Role { get; set; }
}
