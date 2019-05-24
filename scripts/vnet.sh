#!/bin/bash

groupName=$1
nsgName=$2
netName=$3
location=$4

# Create a network security group
az network nsg create --resource-group $groupName --name $nsgName

az network nsg rule create --resource-group $groupName --nsg-name $nsgName --name Allow-Web-All --access Allow --protocol Tcp --direction Inbound --priority 100 --source-address-prefix Internet --source-port-range "*" --destination-asgs "myAsgWebServers" --destination-port-range 80 443

vnetCheck=$(az network vnet list --query [].name | grep -E "$netName")

if [ -n "$vnetCheck" ]; then 
    echo "this network already exist please choose another"
fi

az network vnet create -g "$groupName" -n "$netName" --location "$location" 