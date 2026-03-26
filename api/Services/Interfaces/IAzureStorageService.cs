using Azure.Storage.Blobs;

namespace ATSAPI.Services.Interfaces;

public interface IAzureStorageService
{
	BlobContainerClient GetContainerClient();
}
