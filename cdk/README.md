# Wheel of Fortune - AWS CDK Deployment

Dieses CDK-Projekt ersetzt das alte Terraform-Deployment und stellt die gleiche Infrastruktur bereit:
- S3 Bucket für Frontend-Hosting
- CloudFront Distribution mit Origin Access Identity
- Automatische HTTPS-Umleitung
- SPA-Routing (404/403 Fehler werden zu index.html umgeleitet)

## Voraussetzungen

- Node.js (v18 oder höher)
- AWS CLI konfiguriert mit gültigen Credentials
- AWS CDK CLI installiert (`npm install -g aws-cdk`)

## Installation

```bash
cd cdk
npm install
```

## CDK Befehle

### Synthesize CloudFormation Template
```bash
npm run cdk synth
```

### Deploy Infrastructure
```bash
npm run cdk deploy
```

### Destroy Infrastructure
```bash
npm run cdk destroy
```

### Diff gegen deployed Stack
```bash
npm run cdk diff
```

### Bootstrap CDK (einmalig pro Account/Region)
```bash
cdk bootstrap aws://ACCOUNT-ID/eu-central-1
```

## Deployment der App

Die App wird automatisch beim CDK Deploy hochgeladen. Du musst nur:

1. Build deine App:
   ```bash
   cd ..
   npm run build
   ```

2. Deploy mit CDK:
   ```bash
   cd cdk
   npm run cdk deploy
   ```

CDK lädt automatisch den `dist/` Ordner hoch und invalidiert den CloudFront Cache.

## Migration von Terraform

Die Terraform Infrastructure wurde bereits zerstört.

CDK Infrastructure deployen:
```bash
cd cdk
npm install
npm run cdk deploy
```
