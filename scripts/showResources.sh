#!/bin/bash
groupName=$1

az resource list -g "$groupName" --query []