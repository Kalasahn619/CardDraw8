# CardDraw8 - Mystical Lottery PWA

CardDraw8 is a Progressive Web Application (PWA) that provides a mystical lottery experience using cryptographic randomness, tarot-inspired suit alignment, and numerology. Built with vanilla HTML, CSS, and JavaScript, it requires no build process and runs entirely in the browser.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Quick Start (Zero Build Required)
- **Start local development server**: `python3 -m http.server 8080 --bind 127.0.0.1`
  - Application starts INSTANTLY - no build time
  - Access at `http://127.0.0.1:8080`
  - NEVER CANCEL: Let server run until you're done testing

### Repository Structure
```
/
├── .github/                    # GitHub configuration
├── index.html                  # Main application (contains all HTML, CSS, JS)
├── manifest.json              # PWA manifest for installability
├── service-worker.js          # PWA service worker for offline support
├── Joker.png                  # Application asset
└── README.md                  # Project documentation
```

## Validation Requirements

### Manual Testing Scenarios
**CRITICAL**: After making any changes, you MUST manually validate the application by completing these user scenarios:

1. **Basic Card Draw Workflow**:
   - Start the development server
   - Navigate to `http://127.0.0.1:8080`
   - Click "Draw 6 Cards" button
   - Verify 6 cards are displayed with suit symbols and codex values
   - Verify Digital Root Oracle shows calculated number
   - Verify NZ Powerball numbers are generated (6 main + 1 powerball)

2. **Export Functionality**:
   - After drawing cards, click "Export Ticket"
   - Verify JSON file downloads with correct structure:
     ```json
     {
       "timestamp": "ISO_DATE",
       "cards": [{"suit": "♠", "value": 10}, ...],
       "numbers": [2, 4, 17, 25, 33, 40],
       "powerball": 3,
       "codexSum": 201
     }
     ```

3. **Monte Carlo Simulation**:
   - Click "Run Simulation" button
   - Verify counter shows progress "X/500"
   - Verify simulation completes showing "500/500"
   - Verify new entries appear in statistics table with 🤖 icon

4. **Suit Order Customization**:
   - Test "Classic Order", "Reverse Order", and "Custom Order" buttons
   - For Custom Order, verify drag-and-drop functionality works
   - Draw cards and verify suit mappings affect displayed tarot names

5. **Data Persistence**:
   - Draw cards, refresh browser, verify history persists
   - Use "Clear History" button, verify data is cleared
   - Verify "Export History" downloads complete session data

### Browser Compatibility Testing
- Test in Chrome/Chromium (primary target)
- Verify PWA installation prompt appears
- Test offline functionality (disconnect network, verify app still works)

## Development Guidelines

### Making Code Changes
- **Primary file**: All application logic is in `index.html`
- **No build process**: Changes are immediately visible after browser refresh
- **Testing**: ALWAYS manually test the 5 validation scenarios above after changes
- **PWA Features**: Modify `manifest.json` for app metadata, `service-worker.js` for caching

### Common Development Tasks

#### Updating Application Logic
- Edit the `<script>` section in `index.html` (starts around line 500)
- Key functions: `drawCards()`, `runSimulation()`, `exportTicket()`, `exportHistory()`
- Test changes immediately with browser refresh

#### Modifying UI/Styling
- Edit the `<style>` section in `index.html` (starts around line 17)
- Uses TailwindCSS classes loaded via CDN
- Custom CSS animations for sparkle effects and oracle orb

#### PWA Configuration
- **Manifest**: Edit `manifest.json` for app name, icons, shortcuts
- **Service Worker**: Edit `service-worker.js` for caching strategy
- **Version updates**: Update `CACHE_NAME` in service-worker.js when deploying changes

### Debugging Common Issues

#### CDN Resource Blocks
- TailwindCSS and Google Fonts may be blocked in some environments
- Application will still function but with degraded styling
- Console errors about "net::ERR_BLOCKED_BY_CLIENT" are expected in restrictive environments

#### Missing PWA Icons
- Console warnings about "icon-192.png" and "icon-512.png" are expected
- Icons referenced in manifest.json don't exist in repository
- Application functions normally without icons

#### Service Worker Registration
- Expect "SW registered" console message on first load
- Service worker enables offline functionality and PWA features

## Time Expectations

### Development Tasks
- **Server startup**: Instant (Python HTTP server)
- **Page load**: 1-3 seconds (depending on CDN accessibility)
- **Code changes**: Instant visibility after browser refresh
- **Card draw**: Instant response
- **Monte Carlo simulation**: 2-5 seconds for 500 iterations
- **Export operations**: Instant file download

### No Build Times
- **CRITICAL**: This project has NO build process
- No npm install, no compilation, no bundling
- Changes to any file are immediately reflected in browser

## Technology Stack

### Core Technologies
- **HTML5**: Single-page application structure
- **CSS3**: Custom styling + TailwindCSS via CDN
- **Vanilla JavaScript**: All application logic, no frameworks
- **Web APIs**: Crypto.getRandomValues() for secure randomness

### External Dependencies (CDN)
- **TailwindCSS**: `https://cdn.tailwindcss.com`
- **Google Fonts**: Inter font family
- **No package managers**: No npm, yarn, or other dependency management

### PWA Features
- **Service Worker**: Offline functionality and caching
- **Web App Manifest**: Installation and app metadata
- **LocalStorage**: Persistent game state and history

## Deployment

### GitHub Pages Ready
- Repository is configured for static hosting
- All files can be served directly without build process
- PWA features work when served over HTTPS

### Local Testing Command
```bash
# Start development server (run from repository root)
python3 -m http.server 8080 --bind 127.0.0.1
```

## File-Specific Notes

### index.html
- **Size**: ~47KB single file containing entire application
- **Structure**: HTML + embedded CSS (lines 17-200) + embedded JavaScript (lines 500+)
- **Key sections**: Card rendering, game state management, export functionality

### manifest.json
- PWA configuration with app metadata
- Defines app shortcuts for quick actions
- References icon files that don't exist (expected)

### service-worker.js
- Caches application files for offline use
- Version: `carddraw8-v1.0.0`
- Implements cache-first strategy with fallback

## Common File Locations

### Application Logic
- **Card drawing**: `drawCards()` function in index.html
- **Random number generation**: `crypto.getRandomValues()` usage
- **Export functionality**: `exportTicket()` and `exportHistory()` functions
- **Game state**: `gameState` object and localStorage management

### Styling
- **Card animations**: `.sparkle` keyframe animation
- **Oracle orb**: `.oracle-orb` with pulse animation
- **Responsive design**: TailwindCSS utility classes

### Data Management
- **localStorage keys**: `cardDraw8History`, `cardDraw8Stats`, `cardDraw8SuitOrder`
- **Export format**: JSON with timestamp, cards, numbers, powerball, codexSum

Remember: This is a zero-build, browser-based application. Always test manually after changes and verify the core user workflows function correctly.