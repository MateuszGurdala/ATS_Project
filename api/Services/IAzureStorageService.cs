using Azure.Storage.Blobs;

namespace ATSAPI.Services;

public interface IAzureStorageService
{
	BlobContainerClient GetContainerClient();
}