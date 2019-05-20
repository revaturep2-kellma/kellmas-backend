#!/bin/bash

groupName=$1

groupCheck=$(az group list --query [].name | grep -E $groupName)

if [ -n "$groupCheck" ]; then 
    echo "this group name already exist please choose another"
fi

# Create a resource group
az group create --name $groupName --location southcentralus --no-wait