using ATSAPI.Services.Interfaces;
using Azure.Storage;
using Azure.Storage.Blobs;

namespace ATSAPI.Services;

public class AzureStorageService : IAzureStorageService
{
	private readonly BlobContainerClient _blobContainerClient = new(
		new Uri("http://127.0.0.1:10000/devstoreaccount1/pictures"),
		new StorageSharedKeyCredential("devstoreaccount1", "Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw=="));

	public BlobContainerClient GetContainerClient() => _blobContainerClient;
}
