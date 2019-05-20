#!/bin/bash

vmName=$1
groupName=$2
netName=$3

VMcheck=$(az vm list --query [].name | grep -E $vmName)

if [ -n "$VMcheck" ]; then 
    echo "this vm name already exist please choose another"
fi

az vm create -n $vmName -g $groupName --size B1S --vnet-name $netName --image UbuntuLTS