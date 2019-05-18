#!/bin/bash

azure login
azure account list
azure account set <subscriptionId>
az ad sp create-for-rbac --name <servicePrincipalName> --password <yourSPPassword>

az role assignment create --assignee <your Service Principal ID> --role <YourCustomRole>  
az role assignment delete --assignee <your Service Principal ID> --role Contributor

az role assignment list --assignee <your Service Principal ID>  