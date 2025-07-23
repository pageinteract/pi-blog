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

# Setup staging deployment
echo "🏗️  Setting up staging deployment..."

# Initialize kamal for staging
kamal setup -d staging

echo "✅ Staging deployment setup complete!"

echo ""
echo "🎉 Deployment setup complete!"
echo ""
echo "Next steps:"
echo "1. Update your .env file with actual values"
echo "2. Export the Strapi database: cd strapi && yarn seed"
echo "3. Deploy to staging: kamal deploy -d staging"
echo ""
echo "Useful commands:"
echo "- Deploy staging: kamal deploy -d staging"
echo "- Check logs: kamal logs -f -d staging"
echo "- Console access: kamal console -d staging"
echo "- Strapi console: kamal strapi-console -d staging"