#!/bin/sh

key="Eby8vdM02xNOcqFlqUwJPLlmEtlCDXJ1OUzFT50uSRZ6IFsuFq2UVErCz4I6tq/K1SZFPTOtr/KBHBeksoGMGw==1"
endpoint="http://azurite:10000/devstoreaccount1"
account="devstoreaccount1"

AZURE_STORAGE_CONNECTION_STRING="DefaultEndpointsProtocol=http;AccountName=$account;AccountKey=$key;BlobEndpoint=$endpoint;"

az storage container create \
    --name pictures \
    --connection-string "$AZURE_STORAGE_CONNECTION_STRING"

for i in `ls /var/atsdb/pictures`; do 
    az storage blob upload \
        --container-name pictures \
        --file /var/atsdb/pictures/$i \
        --name $i \
        --connection-string "$AZURE_STORAGE_CONNECTION_STRING"
done
