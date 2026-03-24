namespace ATSAPI.Models;

public record UploadOptionsResponse
{
	public required List<int> Years { get; set; }
	public required List<string> Areas { get; set; }
	public required List<string> ParentAreas { get; set; }
};
