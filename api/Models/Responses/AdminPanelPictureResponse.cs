namespace ATSAPI.Models.Responses;

public record AdminPanelPictureResponse
{
	public required int Year { get; set; }
	public required long Id { get; set; }
	public required string Area { get; set; }
	public required string Extension { get; set; }
	public required string ParentArea { get; set; }
	public required string Title { get; set; }
	public required string UpdatedBy { get; set; }
	public required string UpdatedOn { get; set; }
	public required string? Description { get; set; }
}
