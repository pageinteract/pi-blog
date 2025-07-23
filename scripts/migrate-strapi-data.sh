#!/bin/bash

set -e

echo "📦 Migrating Strapi data to SQLite database"

# Check if the export file exists
EXPORT_FILE="strapi/data/export_20250116105447.tar.gz"
if [ ! -f "$EXPORT_FILE" ]; then
    echo "❌ Export file not found: $EXPORT_FILE"
    echo "Please ensure the export file exists in strapi/data/"
    exit 1
fi

echo "✅ Found export file: $EXPORT_FILE"

# Check if Strapi container is running
if ! kamal strapi logs -d staging &> /dev/null; then
    echo "❌ Strapi container is not running. Please deploy first:"
    echo "kamal deploy -d staging"
    exit 1
fi

echo "📥 Copying export file to Strapi container..."

# Copy the export file to the container
kamal strapi exec -d staging "mkdir -p /tmp"
cat "$EXPORT_FILE" | kamal strapi exec -d staging --interactive "cat > /tmp/import.tar.gz"

echo "📥 Importing data to SQLite database..."

# Import the data using Strapi's import command
kamal strapi exec -d staging --interactive "yarn strapi import -f /tmp/import.tar.gz"

echo "🧹 Cleaning up temporary files..."
kamal strapi exec -d staging "rm -f /tmp/import.tar.gz"

echo "✅ Data migration complete!"
echo ""
echo "🎉 Your Strapi data has been successfully migrated to SQLite!"
echo ""
echo "Next steps:"
echo "1. Check Strapi admin: https://stg-strapi.pageinteract.com/admin"
echo "2. Verify your content is available"
echo "3. Test the blog: https://stg-ruby.pageinteract.com/blog"