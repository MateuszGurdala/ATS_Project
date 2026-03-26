using System.Text.Json.Serialization;

namespace ATSAPI.Models.Request;

public record UpdatePictureRequest : PhotoDetails
{
	[JsonPropertyName("id")] public required long Id { get; set; }
}
