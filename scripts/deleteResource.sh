#!/bin/bash
id=$1

az resource delete --ids "$id"