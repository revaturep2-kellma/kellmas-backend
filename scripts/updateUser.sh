#!/bin/bash
principalName=$1
resourceGroup=$2
previousRole=$3
newRole=$4

az role assignment delete --role "$previousRole" -g "$resourceGroup" --assignee "$principalName"
az role assignment create --role "$newRole" -g "$resourceGroup" --assignee "$principalName"