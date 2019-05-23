#!/bin/bash

groupName=$1
netName=$2
location=$3

vnetCheck=$(az network vnet list --query [].name | grep -E "$netName")

if [ -n "$vnetCheck" ]; then 
    echo "this network already exist please choose another"
fi

az network vnet create -g "$groupName" -n "$netName" --location "$location"

