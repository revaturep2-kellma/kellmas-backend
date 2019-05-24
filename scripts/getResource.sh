#!/bin/bash
groupName=$1
resourceName=$2
resourceType=$3
namespace=$4

az resource show \
  -g "$groupName" \
  -n "$resourceName" \
  --resource-type "$resourceType" \
  --namespace "$namespace"