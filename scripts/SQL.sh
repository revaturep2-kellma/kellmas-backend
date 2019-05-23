#!/bin/bash

serverPassword=$1
serverUser=$2
location=$3
serverName=$4
groupName=$5
dbName=$6

serverCheck=$(az sql server list --query [].name | grep -E "$serverName")

if [ -n "$serverCheck" ]; then
    echo "this server name already exist please choose another"
fi

az sql server create --admin-password "$serverPassword" --admin-user "$serverUser" --location "$location" --name "$serverName" --resource-group "$groupName"

dbCheck=$(az sql db list -g "$groupName" -s "$serverName" --query [].name | grep -E "$dbName")

if [ -n "$dbCheck" ]; then
    echo "this Database name already exist please choose another"
fi

az sql db create --name "$dbName" --resource-group "$groupName" --server "$serverName" --no-wait