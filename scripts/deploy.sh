#!/bin/bash
set -e

SERVER="bahhtee@167.71.207.5"
APP_DIR="devgarden-nextjs"

echo "🔨 Building Next.js locally..."
npm run build

echo "📦 Creating deployment package..."
tar -czf deploy-frontend.tar.gz \
  .next/ \
  public/ \
  node_modules/ \
  package.json \
  package-lock.json \
  next.config.js \
  ecosystem.config.js \
  .env.production

echo "📤 Uploading to server (this may take a few minutes)..."
scp deploy-frontend.tar.gz $SERVER:~/

echo "🚀 Deploying on server..."
ssh $SERVER << ENDSSH
  cd ~/$APP_DIR
  
  # Extract
  tar -xzf ~/deploy-frontend.tar.gz
  
  # Copy production env to .env
  cp .env.production .env
  
  # Create logs directory if it doesn't exist
  mkdir -p logs
  
  # Restart PM2
  pm2 restart blog-frontend 2>/dev/null || pm2 start ecosystem.config.js
  pm2 save
  
  # Cleanup
  rm ~/deploy-frontend.tar.gz
  
  echo "✅ Deployment complete!"
ENDSSH

echo "📊 Checking status..."
ssh $SERVER "pm2 status"

# Cleanup local file
rm deploy-frontend.tar.gz

echo "✅ Frontend deployed successfully!"