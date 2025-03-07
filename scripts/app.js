/**
 * Main application script for the Impact Evaluation App
 * Handles initialization and event listeners
 */

// DOM elements
const siteCountInput = document.getElementById('site-count');
const newScenarioButton = document.getElementById('new-scenario-btn');
const calculateButton = document.getElementById('calculate-btn');
const resetButton = document.getElementById('reset-btn');
const resultsPanel = document.getElementById('results-panel');
const surveyImpactElement = document.getElementById('survey-impact');
const trueImpactElement = document.getElementById('true-impact');
const impactDifferenceElement = document.getElementById('impact-difference');

/**
 * Initialize the application
 */
function initializeApp() {
    // Initialize the grid
    GridState.initialize();
    GridState.render();
    
    // Hide results panel initially
    resultsPanel.classList.remove('visible');
    
    // Set up event listeners
    setupEventListeners();
}

/**
 * Set up event listeners for UI controls
 */
function setupEventListeners() {
    // Site count input
    siteCountInput.addEventListener('click', function() {
        // Select all text when clicked
        this.select();
    });
    
    siteCountInput.addEventListener('change', () => {
        let newCount = parseInt(siteCountInput.value) || CONFIG.DEFAULT_SURVEY_SITES;
        
        // Ensure value is within valid range
        if (newCount < 1) {
            newCount = 1;
        } else if (newCount > 100) {
            newCount = 100;
        }
        
        // Update the input value and grid state
        siteCountInput.value = newCount;
        GridState.updateMaxSelections(newCount);
    });
    
    // Handle Enter key press on the input
    siteCountInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            siteCountInput.blur(); // Trigger the change event
        }
    });
    
    // New scenario button
    newScenarioButton.addEventListener('click', () => {
        // Reset and reinitialize
        GridState.initialize();
        GridState.render();
        
        // Hide results
        resultsPanel.classList.remove('visible');
    });
    
    // Calculate button
    calculateButton.addEventListener('click', () => {
        // Check if we have any selections
        if (GridState.selectedCells.length === 0) {
            alert('Please select at least one survey site.');
            return;
        }
        
        // Check if we have both no-take and fished selections
        const hasNoTake = GridState.selectedCells.some(cell => cell.isNoTake);
        const hasFished = GridState.selectedCells.some(cell => !cell.isNoTake);
        
        if (!hasNoTake || !hasFished) {
            alert('You need to select at least one site inside a no-take zone and one site outside a no-take zone to calculate impact.');
            return;
        }
        
        // Calculate impacts
        const impacts = GridState.calculateImpacts();
        
        // Display results
        displayResults(impacts);
    });
    
    // Reset button
    resetButton.addEventListener('click', () => {
        GridState.resetSelections();
        
        // Hide results
        resultsPanel.classList.remove('visible');
    });
}

/**
 * Display impact calculation results
 * @param {Object} impacts - Impact calculation results
 */
function displayResults(impacts) {
    const { surveyImpact, trueImpact, difference } = impacts;
    
    // Format and display results
    surveyImpactElement.textContent = surveyImpact !== null 
        ? formatNumber(surveyImpact) 
        : 'N/A';
    
    trueImpactElement.textContent = trueImpact !== null 
        ? formatNumber(trueImpact) 
        : 'N/A';
    
    impactDifferenceElement.textContent = difference !== null 
        ? formatNumber(difference) 
        : 'N/A';
    
    // Show results panel
    resultsPanel.classList.add('visible');
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);
