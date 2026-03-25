using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace ATSAPI.Database.Entities;

public class UserAccount
{
	[Key] [Column("UserAccountID")] public long Id { get; set; }
	[Column("RoleID")] public int RoleID { get; set; }
	[Column("Username")] public string Username { get; set; }
	[Column("Password")] public string Password { get; set; }
	[Column("IsActive")] public bool IsActive { get; set; }
	public Role Role { get; set; }
	public List<Picture> Pictures { get; set; }
	public List<Picture> UpdatedPictures { get; set; }

	public static void OnModelCreating(ModelBuilder modelBuilder)
	{
		modelBuilder.Entity<UserAccount>()
			.HasOne(e => e.Role)
			.WithMany(e => e.UserAccounts);
	}
}
