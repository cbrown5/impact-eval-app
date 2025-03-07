# Technical Context: Marine Reserve Impact Evaluation App

## Technologies Used

### Core Technologies
- **HTML5**: Structure and content
- **CSS3**: Styling and layout
- **JavaScript (ES6+)**: Application logic and interactivity

### Development Approach
- **Vanilla JavaScript**: No frameworks or libraries used, keeping the application lightweight and dependency-free
- **CSS Custom Properties**: Used for theming and consistent styling
- **CSS Grid**: Used for the main grid layout
- **ES6 Modules**: Not implemented but could be used for better code organization in future iterations

### Asset Management
- **Static Assets**: Images for habitat icons stored in the assets directory
- **No Build Process**: Direct inclusion of scripts and styles without bundling or transpilation

## Development Environment

### Local Development
- **Browser**: Any modern browser with developer tools (Chrome, Firefox, Safari, Edge)
- **Editor**: Any text editor or IDE with HTML/CSS/JavaScript support
- **Local Server**: Simple HTTP server for local testing (e.g., VS Code Live Server extension)

### Deployment
- **GitHub Pages**: Target deployment platform
- **Static Hosting**: No server-side components required
- **Version Control**: Git for source code management

## Technical Constraints

### Browser Compatibility
- **Modern Browsers**: Designed for modern browsers with ES6 support
- **No IE Support**: Internet Explorer is not supported
- **Responsive Design**: Works on various screen sizes, though optimized for desktop/tablet use in classroom settings

### Performance Considerations
- **Grid Size**: 10x10 grid (100 cells) is manageable for most devices
- **DOM Manipulation**: Grid rendering involves creating many DOM elements, but performance is acceptable for the application's scale
- **No Heavy Computations**: Calculations are simple and fast, even for all grid cells

### Security
- **Client-Side Only**: No server interactions or data persistence
- **No External APIs**: Self-contained application with no external dependencies
- **No User Data**: No personal data collection or storage

## Code Organization

### File Structure
```
impact-eval-app/
├── index.html              # Main HTML document
├── styles/
│   └── main.css            # All styles
├── scripts/
│   ├── config.js           # Configuration parameters
│   ├── utils.js            # Utility functions
│   ├── calculations.js     # Biomass and impact calculations
│   ├── grid.js             # Grid management
│   └── app.js              # Main application logic
└── assets/
    └── habitats/           # Habitat icons
        ├── coral1.png
        ├── coral2.png
        ├── seagrass.png
        └── fishing-village.png
```

### Code Style
- **Object-Oriented Approach**: Using object literals for encapsulation
- **Functional Components**: Pure functions for calculations and utilities
- **Event-Driven Architecture**: DOM events drive application flow
- **Descriptive Naming**: Clear function and variable names
- **JSDoc Comments**: Documentation for functions and complex logic

## Technical Debt & Future Considerations

### Current Limitations
- **No Module Bundling**: Scripts are included directly in HTML
- **Limited Error Handling**: Minimal validation and error recovery
- **No Persistence**: State is lost on page refresh
- **No Automated Tests**: Manual testing only

### Potential Enhancements
- **ES Modules**: Proper module system with imports/exports
- **Build Process**: Adding bundling, minification, and transpilation
- **State Management**: More robust state handling
- **Local Storage**: Saving scenarios and selections
- **Accessibility**: Improving keyboard navigation and screen reader support
- **Internationalization**: Supporting multiple languages
- **Automated Testing**: Unit and integration tests

## Dependencies

### External Dependencies
- None (intentionally kept dependency-free)

### Browser APIs Used
- **DOM API**: Document manipulation
- **Event API**: User interaction handling
- **Math API**: Random number generation and calculations
- **ES6 Features**: Arrow functions, template literals, etc.

## Configuration

All configurable parameters are centralized in the `CONFIG` object in `config.js`:

```javascript
const CONFIG = {
    // Grid settings
    GRID_SIZE: 10,
    DEFAULT_SURVEY_SITES: 10,
    
    // Biomass calculation coefficients
    COEFFICIENTS: {
        a1: 0.5,  // H1 effect (coral1)
        a2: 0.3,  // H2 effect (coral2)
        a3: 0.4,  // H3 effect (seagrass)
        b1: 0.2,  // H1*H2 interaction
        b2: 0.2,  // H2*H3 interaction
        b3: 0.2,  // H1*H3 interaction
        c: -0.3,  // Fishing pressure effect
        d: 0.4    // No-take zone effect
    },
    
    // Probability settings
    HABITAT_PROBABILITY: {
        H1: 0.4,  // Probability of coral1 presence
        H2: 0.3,  // Probability of coral2 presence
        H3: 0.5   // Probability of seagrass presence
    },
    
    // No-take zone settings
    NO_TAKE_ZONE: {
        COVERAGE: 0.2,  // Percentage of grid cells that are no-take zones
        BIAS_STRENGTH: 0.7  // How strongly no-take zones are biased towards low fishing pressure
    },
    
    // Asset paths
    ASSETS: {
        CORAL1: 'assets/habitats/coral1.png',
        CORAL2: 'assets/habitats/coral2.png',
        SEAGRASS: 'assets/habitats/seagrass.png',
        FISHING_VILLAGE: 'assets/habitats/fishing-village.png'
    }
};
```

This configuration-driven approach allows for easy adjustment of the application's behavior without modifying core logic.
