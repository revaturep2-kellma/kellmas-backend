#!/bin/bash

displayName=$1
password=$2
principalName=$3
groupName=$4
location=$5

userCheck=$(az ad user list --query [].name | grep -E "$principalName")

if [ -n "$userCheck" ]; then
    echo "this user name already exist please choose another"
fi

az ad user create --display-name "$displayName" --password "$password" --user-principal-name "$principalName"

az group create --name "$groupName" --location "$location"

az role assignment create --assignee "$principalName" --role Owner --resource-group "$groupName"
