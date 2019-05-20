#!/bin/bash

groupName=$1
servicePlanName=$2

planCheck=$(az appservice plan list --query [].name | grep -E $servicePlanName)

if [ -n "$planCheck" ]; then 
    echo "this app services name already exist please choose another"
fi

# Create an App Service 
az appservice plan create --name $servicePlanName --resource-group $groupName --sku "F1" --location southcentralus --is-linux --no-wait
