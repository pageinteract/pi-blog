#!/bin/bash

set -e

echo "🚀 Setting up deployment for pi-blog"

# Check if kamal is installed
if ! command -v kamal &> /dev/null; then
    echo "❌ Kamal is not installed. Please install it first:"
    echo "gem install kamal"
    exit 1
fi

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "❌ .env file not found. Please copy .env.example to .env and fill in the values:"
    echo "cp .env.example .env"
    exit 1
fi

# Source environment variables
source .env

echo "✅ Environment variables loaded"

# Setup staging deployment for both services
echo "🏗️  Setting up staging deployment..."

echo "📦 Setting up Next.js service..."
kamal setup -c config/deploy.staging.yml

echo "📦 Setting up Strapi service..."
kamal setup -c config/deploy.strapi.staging.yml

echo "✅ Staging deployment setup complete!"

echo ""
echo "🎉 Deployment setup complete!"
echo ""
echo "Next steps:"
echo "1. Update your .env file with actual values"
echo "2. Deploy to staging:"
echo "   - Next.js: kamal deploy -c config/deploy.staging.yml"
echo "   - Strapi: kamal deploy -c config/deploy.strapi.staging.yml"
echo "3. Migrate existing data: ./scripts/migrate-strapi-data.sh"
echo ""
echo "Useful commands:"
echo "- Deploy Next.js: kamal deploy -c config/deploy.staging.yml"
echo "- Deploy Strapi: kamal deploy -c config/deploy.strapi.staging.yml"
echo "- Check Next.js logs: kamal logs -f -c config/deploy.staging.yml"
echo "- Check Strapi logs: kamal logs -f -c config/deploy.strapi.staging.yml"
echo "- Strapi console: kamal strapi-console -c config/deploy.strapi.staging.yml"