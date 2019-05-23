#!/bin/bash

oid=$1

az role assignment list --all --query "[?principalId=='$oid'] | [0].{resourceGroup: resourceGroup, role: roleDefinitionName}"
