using System.Text.Json.Serialization;

namespace ATSAPI.Models.Request;

public record PhotoDetails
{
	[JsonPropertyName("title")] public required string Title { get; set; }
	[JsonPropertyName("year")] public required int Year { get; set; }
	[JsonPropertyName("area")] public required string Area { get; set; }
	[JsonPropertyName("parentArea")] public required string ParentArea { get; set; }
	[JsonPropertyName("description")] public string? Description { get; set; }
}
