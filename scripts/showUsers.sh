#!/bin/bash
groupName=$1

az role assignment list -g "$groupName"
