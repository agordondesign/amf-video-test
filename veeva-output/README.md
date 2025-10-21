# Veeva CRM Presentation Package

## 📁 Package Contents

This folder contains all files needed to deploy the Skytrofa Auto Injector Video presentation to Veeva CRM.

### Files Structure:
```
veeva-output/
├── index.html                                    ← Main presentation file
├── APST1201 Skytrofa IFU Auto Injector Video.mp4 ← Main instructional video  
├── HelpfulHintsButton.svg                        ← Interactive button graphic
├── captions.vtt                                  ← Video captions/subtitles
├── scene/                                        ← Hotspot video clips
│   ├── Scene 3- HH_charge your auto-injector.mp4
│   ├── Scene 4- HH_prepare step 1.mp4
│   ├── Scene 5- HH_prepare step 2.mp4
│   ├── Scene 6- HH_prepare step 3.mp4
│   ├── Scene 7- HH_mixing step 4.mp4
│   ├── Scene 8- HH_mixing step 5.mp4
│   ├── Scene 7- HH_inject step 7.mp4
│   ├── Scene 11- HH_inject step 8.mp4
│   ├── Scene 12- HH_inject step 9.mp4
│   └── Scene 16- HH_after injection step 12.mp4
└── README.md                                     ← This file
```

## 🚀 Deployment Instructions

### For Veeva CRM:
1. **Upload entire `veeva-output` folder** to your Veeva CRM presentation vault
2. **Set `index.html` as the main presentation file**
3. **Ensure all video files maintain their relative paths** to the index.html

### Key Features:
- ✅ **Veeva-compatible**: Single HTML file with inline CSS and vanilla JavaScript
- ✅ **Self-contained**: No external dependencies or frameworks
- ✅ **Mobile responsive**: Works on tablets and mobile devices
- ✅ **Video controls**: Play, pause, seek, volume, fullscreen
- ✅ **Interactive hotspots**: Helpful hints button appears during playback
- ✅ **Captions support**: Accessible video with subtitles
- ✅ **Error handling**: Graceful fallbacks if videos fail to load

## 🔧 Technical Specifications

- **HTML5 Video**: Uses standard video elements compatible with Veeva webview
- **ES5 JavaScript**: Compatible with older browser engines
- **Inline Styles**: No external CSS dependencies
- **Relative Paths**: All assets use relative file paths
- **Mobile-optimized**: Touch controls and responsive design

## 📱 Supported Platforms

- ✅ Veeva CRM on iPad
- ✅ Veeva CRM on Android tablets  
- ✅ Desktop browsers (for testing)
- ✅ Modern mobile browsers

## 🧪 Testing

To test the presentation before deployment:

1. **Local Testing**: Serve the folder with a web server
   ```bash
   # Example using Python
   cd veeva-output
   python3 -m http.server 8000
   
   # Or using Node.js
   npx serve . -p 8000
   ```

2. **Open in browser**: http://localhost:8000

3. **Test Features**:
   - Video playback and controls
   - Helpful hints button (appears ~10 seconds into video)
   - Mobile/touch responsiveness
   - Error handling (try with videos removed)

## ⚠️ Important Notes

- **File Structure**: Do NOT modify the folder structure or file paths
- **Video Formats**: All videos are in MP4 format for maximum compatibility
- **File Names**: Spaces in filenames are preserved for compatibility with existing assets
- **Network**: Videos will load faster on local/cached storage vs streaming

## 📞 Support

If you encounter issues with deployment or playback in Veeva CRM, check:

1. All files uploaded correctly with proper folder structure
2. Video file sizes are within Veeva limits
3. Relative paths maintained in the HTML file
4. Internet connectivity for initial load (videos cache after first play)

---
*Generated for Veeva CRM compatibility - October 2025*