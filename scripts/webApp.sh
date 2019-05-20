#!/bin/bash

groupName=$1
servicePlanName=$2
appName=$3
gitrepo=$4

appCheck=$(az webapp list --query [].name | grep -E $appname)

if [ -n "$appCheck" ]; then 
    echo "this web app name already exist please choose another"
fi

# Create a web app.
az webapp create --resource-group $groupName --plan $servicePlanName --name $appName -r "node|10.14"

# Configure continuous deployment from GitHub.
az webapp deployment source config --name $appName --resource-group $groupName \
--repo-url $gitrepo --branch master --no-wait