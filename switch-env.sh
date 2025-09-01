#!/bin/bash

if [ $# -eq 0 ]; then
    echo "Usage: ./switch-env.sh [development|production]"
    echo ""
    echo "Current environment: $(grep 'environment:' _config.yml | cut -d'"' -f2)"
    echo ""
    echo "Examples:"
    echo "  ./switch-env.sh development"
    echo "  ./switch-env.sh production"
    exit 1
fi

ENV=$1

if [ "$ENV" = "development" ]; then
    echo "Switching to DEVELOPMENT environment..."
    sed -i '' 's/environment: "production"/environment: "development"/' _config.yml
    echo "Environment switched to DEVELOPMENT"
    echo "URLs will now use: http://127.0.0.1:4000"
    echo "Run: bundle exec jekyll serve"
    
elif [ "$ENV" = "production" ]; then
    echo "Switching to PRODUCTION environment..."
    sed -i '' 's/environment: "development"/environment: "production"/' _config.yml
    echo "Environment switched to PRODUCTION"
    echo "URLs will now use: https://darvan.krd"
    echo "Fallback: https://darvanshvan.github.io/"
    echo "Run: bundle exec jekyll build"
    
else
    echo "Invalid environment. Use 'development' or 'production'"
    exit 1
fi

echo ""
echo "Current configuration:"
grep -A 5 "Environment Configuration" _config.yml
