# CardDraw8: Mystical Lottery Simulator PWA

**ALWAYS follow these instructions first and fallback to search or bash commands only when you encounter unexpected information that contradicts the validated information here.**

CardDraw8 is a Progressive Web App (PWA) that simulates mystical lottery card drawing using cryptographic randomness, tarot-inspired suit alignment, and numerology. It's a static web application with no build system or dependencies.

## Working Effectively

### Bootstrap and Run the Application
- **NO BUILD REQUIRED** - This is a static web application with no compilation or dependency installation needed
- **CRITICAL**: Always use an HTTP server, never open `index.html` directly in browser (PWA features require HTTP protocol)
- Start local development server: `cd /path/to/CardDraw8 && python3 -m http.server 8080`
- Access application at: `http://localhost:8080`
- **TIMING**: Application starts instantly - no build time required

### Development Workflow
- Make changes directly to `index.html`, `manifest.json`, or `service-worker.js`
- Refresh browser to see changes immediately
- **No transpilation, bundling, or compilation steps**
- All CSS and JavaScript is embedded in `index.html`

## Validation Requirements

**CRITICAL**: After making any changes, you MUST validate functionality by running through these complete user scenarios:

### Mandatory Test Scenario 1: Card Drawing Flow
1. Start HTTP server: `python3 -m http.server 8080`
2. Open `http://localhost:8080` in browser
3. Click "Draw 6 Cards" button
4. Verify 6 cards are displayed with suits and codex values
5. Confirm Digital Root Oracle shows calculated value and math
6. Check NZ Powerball numbers are generated and displayed
7. Verify entry appears in "Recent Draw History" table

### Mandatory Test Scenario 2: Export and Data Features
1. After drawing cards (Scenario 1), click "Export Ticket"
2. Verify JSON file downloads with card data and lottery numbers
3. Click "Export History" and verify complete data export
4. Test "Clear History" button and confirm data is cleared
5. Draw cards again to repopulate history

### Mandatory Test Scenario 3: Suit Alignment System
1. Click "Custom Order" button
2. Verify suit alignment interface appears with drag-and-drop elements
3. Test dragging suits to reorder them
4. Click "Reverse Order" and verify suits reorder
5. Draw cards and verify suit assignments respect the new order

### Mandatory Test Scenario 4: Monte Carlo Simulation
1. Click "Run Simulation" button
2. **TIMING**: Simulation takes approximately 5-10 seconds for 500 iterations - NEVER CANCEL
3. Watch progress counter increment from 0/500 to 500/500
4. Verify simulation entries appear in history with 🤖 icon (labeled "Sim 1", "Sim 2", etc.)
5. Confirm different results from manual draws

### Mandatory Test Scenario 5: PWA Functionality
1. With application running, open browser developer tools
2. Go to Application/Service Workers tab
3. Verify service worker is registered and running
4. Test offline mode by stopping HTTP server and refreshing
5. Verify app still works offline (cached version)
6. Restart server and refresh to get latest version

## Repository Structure

### Root Files
```
.
├── index.html          # Main application file (939 lines, contains all HTML/CSS/JS)
├── manifest.json       # PWA manifest with app metadata and icons
├── service-worker.js   # Service worker for offline functionality and caching
├── Joker.png          # Application logo/icon image (454KB)
├── README.md          # Project documentation
└── .github/           # GitHub configuration directory
    └── copilot-instructions.md  # This file
```

### Key Code Locations
- **Application Logic**: Lines 227-936 in `index.html` (embedded JavaScript)
- **Styling**: Lines 17-226 in `index.html` (embedded CSS with Tailwind)
- **PWA Configuration**: `manifest.json` and `service-worker.js`
- **Card Drawing Algorithm**: Inside `drawCards()` function in `index.html`
- **Suit Alignment System**: `displaySuitOrder()` and drag-and-drop handlers in `index.html`
- **Digital Root Oracle**: `calculateDigitalRoot()` function in `index.html`

## External Dependencies

### CDN Resources (May Be Blocked in Some Environments)
- **Tailwind CSS**: `https://cdn.tailwindcss.com` - Used for styling
- **Google Fonts**: `https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap`

**Note**: If CDN resources are blocked, the application will still function but with reduced styling. Core functionality remains intact.

### Missing Assets (Referenced but Not Present)
- `icon-192.png` and `icon-512.png` - PWA icons referenced in manifest.json
- These cause 404 errors but don't affect functionality

## Common Tasks and Troubleshooting

### Adding New Features
1. **Always test with HTTP server** - PWA features require proper HTTP protocol
2. **Embedded code** - All CSS/JS is in `index.html`, modify directly
3. **Local storage** - App uses `localStorage` for persistence, clear browser data to reset
4. **Service worker** - Changes to caching require service worker updates

### Testing Changes
- **Manual validation is mandatory** - Always run through all 5 test scenarios above
- **Browser dev tools** - Check console for errors, test PWA features in Application tab
- **Offline testing** - Stop server and test cached functionality
- **Export validation** - Always test ticket and history export after changes

### Performance Considerations
- **Application load**: Instant (static files only)
- **Card drawing**: Immediate response
- **Monte Carlo simulation**: 5-10 seconds for 500 iterations - NEVER CANCEL
- **Export operations**: Immediate file download
- **Service worker cache**: First load caches resources for offline use

## Debugging Common Issues

### Console Errors You Can Ignore
- CDN loading failures (app works without them)
- Missing icon files (404 errors for icon-192.png, icon-512.png)
- Service worker registration messages (these are normal)

### Issues That Need Fixing
- Cards not drawing: Check JavaScript errors in console
- Export not working: Verify browser allows downloads
- Offline mode failing: Check service worker registration
- Suit reordering broken: Test drag-and-drop event handlers

## Code Modification Guidelines

### Safe Areas to Modify
- Card drawing logic and visual appearance
- Digital root calculation algorithms
- Export data format and content
- Styling within the embedded CSS
- Service worker caching strategy

### Areas Requiring Extra Care
- Local storage key names (breaks existing user data)
- PWA manifest changes (affects installation)
- Service worker cache names (requires version updates)
- Core application initialization (could break startup)

## Emergency Recovery

### If Application Breaks
1. **Check browser console** for JavaScript errors
2. **Clear localStorage**: `localStorage.clear()` in dev tools console
3. **Clear service worker cache**: Dev tools > Application > Storage > Clear Site Data
4. **Hard refresh**: Ctrl+Shift+R (bypasses cache)
5. **Restart HTTP server** and try again

### If Changes Don't Appear
1. **Hard refresh browser** (Ctrl+Shift+R)
2. **Clear browser cache** completely
3. **Check file was actually saved** - verify timestamp
4. **Verify HTTP server is serving latest files**

**Remember**: This application has no build system, so changes are immediate once files are saved and browser is refreshed. Always validate through the complete user scenarios to ensure changes work correctly.