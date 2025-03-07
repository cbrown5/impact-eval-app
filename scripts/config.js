/**
 * Configuration settings for the Impact Evaluation App
 * These parameters can be easily modified to change the behavior of the application
 */

const CONFIG = {
    // Grid settings
    GRID_SIZE: 10,
    DEFAULT_SURVEY_SITES: 10,
    
    // Biomass calculation coefficients
    COEFFICIENTS: {
        // Habitat effects
        a1: 0.5,  // H1 effect (coral1)
        a2: 0.3,  // H2 effect (coral2)
        a3: 0.4,  // H3 effect (seagrass)
        
        // Interaction effects
        b1: 0.2,  // H1*H2 interaction (coral1 * coral2)
        b2: 0.2,  // H2*H3 interaction (coral2 * seagrass)
        b3: 0.2,  // H1*H3 interaction (coral1 * seagrass)
        
        // Management effects
        c: -0.3,  // Fishing pressure effect (negative impact)
        d: 0.4    // No-take zone effect (positive impact)
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
        BIAS_STRENGTH: 0.7  // How strongly no-take zones are biased towards low fishing pressure (0-1)
    },
    
    // Asset paths
    ASSETS: {
        CORAL1: 'assets/habitats/coral1.png',
        CORAL2: 'assets/habitats/coral2.png',
        SEAGRASS: 'assets/habitats/mangrove.png',
        FISHING_VILLAGE: 'assets/habitats/fishing-village.png'
    },
    
    // Display settings
    DISPLAY: {
        DECIMAL_PLACES: 2,  // Number of decimal places to display in results
    }
};
