using ATSAPI.Services.Interfaces;
using Azure.Storage;
using Azure.Storage.Blobs;

namespace ATSAPI.Services;

public class AzureStorageService(IConfiguration configuration) : IAzureStorageService
{
	private readonly BlobContainerClient _blobContainerClient = new(
		new Uri(string.Join('/', [
			configuration.GetValue<string>("AzureStorage:Endpoint"),
			configuration.GetValue<string>("AzureStorage:Account:Name"),
			configuration.GetValue<string>("AzureStorage:ContainerName"),
		])),
		new StorageSharedKeyCredential(
			configuration.GetValue<string>("AzureStorage:Account:Name"),
			configuration.GetValue<string>("AzureStorage:Account:Key")
		));

	public BlobContainerClient GetContainerClient() => _blobContainerClient;
}
