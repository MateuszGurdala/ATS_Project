namespace ATSAPI.Models.Responses;

public record PictureDetailsResponse
{
	public required int Year { get; set; }
	public required string Area { get; set; }
	public required string ParentArea { get; set; }
	public required string Title { get; set; }
	public string? Description { get; set; }
};
