#!/bin/bash

displayName=$1
password=$2
principalName=$3
groupName=$4

userCheck=$(az ad user list --query [].name | grep -E $principalName)

if [ -n "$userCheck" ]; then 
    echo "this user name already exist please choose another"
fi

echo $displayName
echo $password
echo $principalName

az ad user create --display-name $displayName --password $password --user-principal-name $principalName 

az role assignment create --assignee $principalName --role Reader --resource-group $groupName
