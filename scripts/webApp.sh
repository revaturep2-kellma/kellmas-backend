#!/bin/bash

groupName=$1
servicePlanName=$2
servicePlan=$3
location=$4
appName=$5
appType=$6
gitrepo=$7

planCheck=$(az appservice plan list --query [].name | grep -E $servicePlanName)

if [ -n "$planCheck" ]; then 
    echo "this app services name already exist please choose another"
fi

# Create an App Service 
az appservice plan create --resource-group $groupName --name $servicePlanName --sku $servicePlan --location $location --is-linux --no-wait

appCheck=$(az webapp list --query [].name | grep -E $appname)

if [ -n "$appCheck" ]; then 
    echo "this web app name already exist please choose another"
fi

# Create a web app.
az webapp create --resource-group $groupName --plan $servicePlanName --name $appName -r $appType

# Configure continuous deployment from GitHub.
az webapp deployment source config --name $appName --resource-group $groupName \
--repo-url $gitrepo --branch master --no-wait