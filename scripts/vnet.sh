#!/bin/bash

groupName=$1
netName=$2
location=$3
nsgName=$4


vnetCheck=$(az network vnet list --query [].name | grep -E "$netName")

if [ -n "$vnetCheck" ]; then 
    echo "this network already exist please choose another"
fi

az network vnet create -g "$groupName" -n "$netName" --location "$location"

az network nsg rule create -g $groupName --nsg-name $nsgName -n PrivateNetwork --priority 400 --source-address-prefixes VirtualNetwork --destination-port-ranges 80,443 --direction Inbound --access Allow --protocol TCP 