#!/bin/bash

groupName=$1
nsgName=$2
location=$3
netName=$4

# Create a network security group
az network nsg create --resource-group $groupName --name $nsgName --location $location

az network nsg rule create --resource-group $groupName --nsg-name $nsgName --name Allow-Web-All --access Allow --protocol Tcp --direction Inbound --priority 100 --source-address-prefix Internet --source-port-range "*" --destination-port-range 80 443

vnetCheck=$(az network vnet list --query [].name | grep -E "$netName")

if [ -n "$vnetCheck" ]; then 
    echo "this network already exist please choose another"
fi

az network vnet create -g "$groupName" -n "$netName" --location "$location"  --address-prefixes 10.0.0.0/16

az network vnet subnet create --vnet-name $netName --resource-group $groupName --name $netName --address-prefix 10.0.0.0/24 --network-security-group $nsgName