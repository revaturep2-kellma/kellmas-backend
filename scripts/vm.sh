#!/bin/bash

vmName=$1
groupName=$2
size=$3
netName=$4

VMcheck=$(az vm list --query [].name | grep -E $vmName)

if [ -n "$VMcheck" ]; then 
    echo "this vm name already exist please choose another"
fi

az vm create -n $vmName -g $groupName --size $size --vnet-name $netName --image UbuntuLTS --no-wait