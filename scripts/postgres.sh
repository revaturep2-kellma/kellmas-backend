#!/bin/bash

groupName=$1
dbServerName=$2
dbUsername=$3
dbPassword=$4

postgresCheck=$(az postgres server list --query [].name | grep -E $dbServerName)

if [ -n "$postgresCheck" ]; then 
    echo "this server name already exist please choose another"
fi

az postgres server create -g $groupName -n $dbServerName --location southcentralus --admin-user $dbUsername --admin-password $dbPassword --sku-name B_Gen5_1 --version 9.6