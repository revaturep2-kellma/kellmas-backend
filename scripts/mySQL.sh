#!/bin/bash

serverPassword=$1
serverUser=$2
serverName=$3
groupName=$4
dbName=$5


serverCheck=$(az sql server list --query [].name | grep -E $serverName)

if [ -n "$serverCheck" ]; then 
    echo "this server name already exist please choose another"
fi

az sql server create --admin-password $serverPassword --admin-user $serverUser --location southcentralus --name $serverName --resource-group $groupName

dbCheck=$(az sql server list --query [].name | grep -E $dbName)

if [ -n "$dbCheck" ]; then 
    echo "this Database name already exist please choose another"
fi

az sql db create --name $dbname --resource-group $groupName --server $serverName