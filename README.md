# 🌍 Real-Time Translator: Deployment Guide

## Quick Start 🚀

### 1. Start the Backend Server
```bash
cd back-end
source venv/bin/activate  # On macOS/Linux
# OR
# venv\Scripts\activate   # On Windows
python main.py
```
**Backend will run on:** `http://localhost:8000`

### 2. Choose Your Deployment

#### Option A: Web App (Standalone Website) 🌐
```bash
# Open the web app directly
open front-end/web-app.html
# OR serve it locally
cd front-end
python -m http.server 8080
# Then visit: http://localhost:8080/web-app.html
```

#### Option B: Chrome Extension (Meeting Integration) 📱
1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode"
3. Click "Load unpacked" 
4. Select the `front-end/dist/` folder
5. Extension installed! Click the icon when on meeting sites

## Project Structure 📁

```
real-time-translator/
├── back-end/                  # FastAPI Translation Server
│   ├── main.py               # Main server file
│   ├── requirements.txt      # Python dependencies
│   ├── .env                  # Environment variables
│   └── venv/                 # Virtual environment
│
├── front-end/                # React Frontend & Build System
│   ├── src/                  # React source code
│   │   ├── App.jsx          # Main React component
│   │   ├── content.js       # Extension content script
│   │   └── popup.js         # Extension popup script
│   │
│   ├── dist/                 # Chrome Extension Files
│   │   ├── manifest.json    # Extension manifest
│   │   ├── content.js       # Injected translator
│   │   ├── popup.html       # Extension popup
│   │   └── popup.js         # Popup functionality
│   │
│   ├── web-app.html         # Standalone Web App
│   ├── popup.html           # Extension popup template
│   ├── package.json         # Node.js dependencies
│   └── vite.config.js       # Build configuration
│
├── DEPLOYMENT_PLAN.md        # Detailed deployment strategy
└── README.md                 # This file
```

## Build Commands 🔨

### Web App Build
```bash
cd front-end
npm run build:web    # Builds to web-build/ folder
npm run preview:web  # Preview web app build
```

### Extension Build
```bash
cd front-end
npm run build:extension  # Builds to dist/ folder (Chrome extension)
```

### Build Both
```bash
cd front-end
npm run build:all    # Builds both web app and extension
```

## Features Comparison 📊

| Feature | Web App 🌐 | Chrome Extension 📱 |
|---------|-------------|---------------------|
| **Access Method** | Direct URL | Browser extension |
| **Installation** | None required | One-time install |
| **Target Use** | General translation | Meeting-focused |
| **Platform Support** | Any browser | Chrome-based browsers |
| **Injection Capability** | No | Yes (meets, zoom, etc.) |
| **Offline Access** | Limited | Better caching |
| **Sharing** | Easy (just share URL) | Requires installation |
| **Updates** | Automatic | Manual extension updates |

## Deployment Options 🚀

### Web App Hosting
- **GitHub Pages**: Upload web-build/ folder
- **Netlify**: Connect repo, auto-deploy
- **Vercel**: Import project, deploy
- **Firebase Hosting**: Deploy with CLI
- **Custom Server**: Serve static files

### Extension Distribution
- **Chrome Web Store**: Package and submit
- **Developer Mode**: Local installation
- **Enterprise**: Distribute .crx file
- **Sideloading**: Share unpacked folder

## Configuration ⚙️

### Backend Configuration (back-end/.env)
```env
# CORS settings
CORS_ORIGINS=http://localhost:3000,http://localhost:8080,chrome-extension://*

# API settings  
API_PORT=8000
API_HOST=0.0.0.0

# Model settings (if using different translation service)
TRANSLATION_SERVICE=nllb
MODEL_NAME=facebook/nllb-200-distilled-600M
```

### Extension Configuration
Update `front-end/manifest-updated.json` as needed:
- Add more meeting platforms
- Modify permissions
- Update icons and branding

## Usage Instructions 📖

### Web App Usage
1. **Open**: Visit the web app URL
2. **Select Languages**: Choose source and target languages  
3. **Start Speaking**: Click microphone button
4. **View Translation**: Real-time translation appears
5. **Copy/Share**: Use built-in copy functionality

### Extension Usage
1. **Join Meeting**: Go to Google Meet, Zoom, Teams, etc.
2. **Click Extension**: Click translator icon in browser
3. **Inject Panel**: Click "Inject Translator" 
4. **Translate**: Use the floating translation panel
5. **Configure**: Adjust settings as needed

## Supported Platforms 🌐

### Web App
- ✅ Chrome, Safari, Firefox, Edge
- ✅ Mobile browsers (responsive design)
- ✅ Progressive Web App features
- ✅ Works offline (limited functionality)

### Extension Platforms
- ✅ **Google Meet** (meet.google.com)
- ✅ **Zoom** (zoom.us) 
- ✅ **Microsoft Teams** (teams.microsoft.com)
- ✅ **Cisco Webex** (webex.com)
- ✅ **Whereby** (whereby.com)
- ✅ **Discord** (discord.com)
- 🔄 More platforms can be added easily

## API Endpoints 🔌

### Translation API
```http
POST http://localhost:8000/translate
Content-Type: application/json

{
  "text": "Hello, how are you?",
  "from_lang": "en",
  "to_lang": "es"
}

Response:
{
  "translated_text": "Hola, ¿cómo estás?",
  "from_lang": "en", 
  "to_lang": "es",
  "original_text": "Hello, how are you?"
}
```

### Health Check
```http
GET http://localhost:8000/health

Response: 200 OK
{
  "status": "healthy",
  "timestamp": "2024-01-01T12:00:00Z"
}
```

## Troubleshooting 🔧

### Common Issues

#### "Backend server not available"
- Ensure Python server is running on port 8000
- Check CORS configuration in main.py
- Verify firewall/antivirus isn't blocking

#### "Speech recognition not supported" 
- Use Chrome, Safari, or Edge browser
- Enable microphone permissions
- Check if HTTPS is required (for production)

#### Extension not loading
- Enable Developer Mode in chrome://extensions/
- Check console for JavaScript errors
- Verify manifest.json syntax

#### Translation not working
- Check backend server logs
- Verify language codes are correct
- Ensure internet connection for NLLB model

### Performance Tips
- Use NLLB models for better translation quality
- Enable caching for frequently used translations
- Consider using WebRTC for better audio processing
- Implement request debouncing for real-time translation

## Development 💻

### Adding New Languages
1. Update language options in both web app and extension
2. Verify NLLB model supports the language
3. Test translation quality
4. Update documentation

### Adding New Meeting Platforms
1. Add domain to extension manifest
2. Update platform detection in content.js
3. Add platform-specific selectors
4. Test injection functionality

### Custom Styling
- Modify CSS variables in web-app.html
- Update extension styles in content.js
- Maintain consistent branding across both versions

## Security & Privacy 🔒

- **No data storage**: Translations are not stored
- **Local processing**: Speech recognition runs locally
- **HTTPS recommended**: For production deployments  
- **Permission minimal**: Extension uses minimal permissions
- **Open source**: Code is transparent and auditable

## Support & Contributing 🤝

- **Issues**: Report bugs via GitHub issues
- **Features**: Request new features
- **Pull Requests**: Contributions welcome
- **Documentation**: Help improve docs

---

**Ready to break language barriers?** 🌍✨

Choose your deployment method and start translating! Both the web app and Chrome extension are production-ready and optimized for their respective use cases.