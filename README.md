# Wheel of Fortune

A small app to role a random item out of a list.

## Stack

1. Vue.js
2. AWS Amplify

## Deploy

```bash
terraform init -backend-config="bucket=terraform-state-bucket,key=terraform-state,prefix=my-app-prod,region=eu-central-1,profile=my-profile"
```