#!/bin/bash
# Double-click this file to start the Let's Finance app for Expo Go.
# Keep the Terminal window open while you use the app on your phone.

cd "$(dirname "$0")" || exit 1
echo ""
echo "=== Let's Finance: starting up ==="
echo ""

if ! command -v npx >/dev/null 2>&1; then
  echo "Node.js isn't installed. Install the LTS version from https://nodejs.org, then double-click this file again."
  read -r -p "Press Enter to close."
  exit 1
fi

if [ ! -d node_modules ]; then
  echo "Installing the app's packages (first time only, 1-2 minutes)..."
  npm install || { read -r -p "Install failed. Copy the red error to Claude, then press Enter."; exit 1; }
fi

if [ ! -d node_modules/@expo/ngrok ]; then
  echo "Installing the tunnel helper so your phone can connect on any Wi-Fi..."
  npm install --save-dev @expo/ngrok@^4.1.0 || { read -r -p "Tunnel helper failed to install. Copy the error to Claude, then press Enter."; exit 1; }
fi

echo ""
echo "Starting Expo. Wait for 'Tunnel ready' and the QR code, then scan it with your iPhone Camera."
echo ""
npx expo start --tunnel --clear
