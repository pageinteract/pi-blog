#!/bin/bash

set -e

echo "📦 Migrating Strapi data from SQLite to PostgreSQL"

# Check if the export file exists
EXPORT_FILE="strapi/data/export_20250116105447.tar.gz"
if [ ! -f "$EXPORT_FILE" ]; then
    echo "❌ Export file not found: $EXPORT_FILE"
    echo "Please ensure the export file exists in strapi/data/"
    exit 1
fi

echo "✅ Found export file: $EXPORT_FILE"

# Extract the export file to a temporary directory
TEMP_DIR=$(mktemp -d)
echo "📂 Extracting to temporary directory: $TEMP_DIR"

cd strapi
tar -xzf "data/export_20250116105447.tar.gz" -C "$TEMP_DIR"

echo "✅ Export file extracted"

# Check if Strapi container is running
if ! kamal strapi logs -d staging &> /dev/null; then
    echo "❌ Strapi container is not running. Please deploy first:"
    echo "kamal deploy -d staging"
    exit 1
fi

echo "📥 Importing data to PostgreSQL database..."

# Import the data using Strapi's import command
kamal strapi exec -d staging --interactive "yarn strapi import -f /tmp/import.tar.gz"

echo "🧹 Cleaning up temporary files..."
rm -rf "$TEMP_DIR"

echo "✅ Data migration complete!"
echo ""
echo "🎉 Your Strapi data has been successfully migrated to PostgreSQL!"
echo ""
echo "Next steps:"
echo "1. Check Strapi admin: https://stg-strapi.pageinteract.com/admin"
echo "2. Verify your content is available"
echo "3. Test the blog: https://stg-ruby.pageinteract.com/blog"