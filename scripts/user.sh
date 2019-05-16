#!/bin/bash

displayName=$1
password=$2
principalName=$3

userCheck=$(az ad user list --query [].name | grep -E $displayName)

if [ -n "$userCheck" ]; then 
    echo "this user name already exist please choose another"
fi

az ad user create --display-name $displayName --password $password --user-principal-name $principalName
