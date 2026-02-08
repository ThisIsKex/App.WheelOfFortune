#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { WheelOfFortuneStack } from "../lib/wheel-of-fortune-stack";

const app = new cdk.App();

new WheelOfFortuneStack(app, "WheelOfFortuneStack", {
  env: {
    region: "eu-central-1"
  },
  description: "Wheel of Fortune Frontend Deployment (S3 + CloudFront)"
});
