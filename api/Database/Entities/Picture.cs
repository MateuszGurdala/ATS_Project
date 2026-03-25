using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ATSAPI.Database.Entities;

public class Picture
{
	[Key] [Column("PictureID")] public long Id { get; set; }
	[Column("AreaID")] public int AreaId { get; set; }
	[Column("Extension")] public string Extension { get; set; }
	[Column("Title")] public string Title { get; set; }
	[Column("Description")] public string? Description { get; set; }
	[Column("IsActive")] public bool IsActive { get; set; }
	[Column("CreatedOn")] public DateTime CreatedOn { get; set; }
	[Column("UpdatedOn")] public DateTime UpdatedOn { get; set; }
	[Column("CreatedBy")] public long CreatedById { get; set; }
	[Column("UpdatedBy")] public long UpdatedById { get; set; }
	public Area Area { get; set; }
	public UserAccount CreatedBy { get; set; }
	public UserAccount UpdatedBy { get; set; }

	public static void OnModelCreating(ModelBuilder modelBuilder)
	{
		modelBuilder.Entity<Picture>()
			.HasOne(e => e.Area)
			.WithMany(e => e.Pictures);

		modelBuilder.Entity<Picture>()
			.HasOne(e => e.CreatedBy)
			.WithMany(e => e.Pictures)
			.HasForeignKey(e => e.CreatedById);

		modelBuilder.Entity<Picture>()
			.HasOne(e => e.UpdatedBy)
			.WithMany(e => e.UpdatedPictures)
			.HasForeignKey(e => e.UpdatedById);
	}
}
