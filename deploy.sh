#!/bin/bash

# Whisper Pay DAO Deployment Script

echo "🚀 Starting Whisper Pay DAO deployment preparation..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build the project
echo "🔨 Building the project..."
npm run build

# Check if build was successful
if [ -d "dist" ]; then
    echo "✅ Build successful! dist/ directory created."
    echo "📁 Build contents:"
    ls -la dist/
else
    echo "❌ Build failed. No dist/ directory found."
    echo "🔍 Checking for build errors..."
    npm run build 2>&1
    exit 1
fi

# Prepare for Vercel deployment
echo "🌐 Preparing for Vercel deployment..."

# Check if vercel.json exists
if [ -f "vercel.json" ]; then
    echo "✅ vercel.json found"
else
    echo "⚠️  vercel.json not found, creating default configuration..."
    cat > vercel.json << EOF
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
EOF
fi

echo "🎉 Deployment preparation complete!"
echo ""
echo "📋 Next steps:"
echo "1. Deploy to Vercel: vercel --prod"
echo "2. Or push to GitHub and connect to Vercel"
echo "3. Set environment variables in Vercel dashboard:"
echo "   - VITE_WALLET_CONNECT_PROJECT_ID"
echo "   - VITE_CONTRACT_ADDRESS"
echo "   - VITE_FHE_RPC_URL"
echo ""
echo "🔗 Project ready for deployment!"
