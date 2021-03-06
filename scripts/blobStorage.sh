#!/bin/bash

groupName=$1
storageAccountName=$2
location=$3
storagePlan=$4

storageCheck=$(az storage account list --query [].name | grep -E "$storageAccountName")

if [ -n "$storageCheck" ]; then 
    echo "this storage name already exist please choose another"
fi

# Create a storage account
az storage account create --resource-group "$groupName" --name "$storageAccountName" --location "$location" --kind blobstorage --sku "$storagePlan" --access-tier hot

# blobStorageAccountKey=$(az storage account keys list -g $groupName \
# -n $storageAccountName --query [0].value --output tsv)

# az storage container create -n images --account-name $storageAccountName \
# --account-key $blobStorageAccountKey --public-access off

# # Config the Web App a web app to storage account.

# az webapp config appsettings set -g $groupName -n $appName --settings AZURE_STORAGE_ACCOUNT_NAME=$appName
# az webapp config appsettings set -g $groupName -n $appName --settings AZURE_STORAGE_ACCOUNT_ACCESS_KEY=$blobStorageAccountKey

