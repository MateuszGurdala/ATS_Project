namespace ATSAPI.Models.Responses;

public record PictureDetailsResponse
{
	public required int Year { get; set; }
	public required string Area { get; set; }
	public required string ParentArea { get; set; }
	public required string Title { get; set; }
	public required string? Description { get; set; }
	public required string CreatedOn { get; set; }
	public required string UpdatedOn { get; set; }
	public required string CreatedBy { get; set; }
	public required string UpdatedBy { get; set; }
};
