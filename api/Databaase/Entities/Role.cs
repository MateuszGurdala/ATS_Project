using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ATSAPI.Databaase.Entities;

public class Role
{
	[Key][Column("RoleID")] public int Id { get; set; }
	[Column("Name")] public string Name { get; set; }
	public List<UserAccount>? UserAccounts { get; set; }
}
