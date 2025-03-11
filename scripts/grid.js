/**
 * Grid module for the Impact Evaluation App
 * Handles grid generation, cell management, and selection logic
 */

/**
 * Grid state object to manage the grid data
 */
const GridState = {
    // Grid data
    cells: [],
    
    // Selection state
    selectedCells: [],
    maxSelections: CONFIG.DEFAULT_SURVEY_SITES,
    
    /**
     * Initialize the grid with random data
     */
    initialize() {
        this.cells = [];
        this.selectedCells = [];
        
        // Get the current value from the input field
        const siteCountInput = document.getElementById('site-count');
        this.maxSelections = parseInt(siteCountInput.value) || CONFIG.DEFAULT_SURVEY_SITES;
        
        // Ensure the input field shows the correct value
        siteCountInput.value = this.maxSelections;
        
        // Generate grid cells
        for (let y = 0; y < CONFIG.GRID_SIZE; y++) {
            for (let x = 0; x < CONFIG.GRID_SIZE; x++) {
                const fishingPressure = calculateFishingPressure(x);
                
                // Determine if this cell is a no-take zone
                // Biased towards areas with low fishing pressure
                const noTakeProbability = calculateNoTakeProbability(fishingPressure);
                const isNoTake = randomBoolean(noTakeProbability * CONFIG.NO_TAKE_ZONE.COVERAGE * 5);
                
                // Create cell with basic properties
                const cell = {
                    x,
                    y,
                    id: `cell-${x}-${y}`,
                    fishingPressure,
                    isNoTake,
                    isSelected: false
                };
                
                // Generate habitat presence based on simple_mode setting
                if (CONFIG.SIMPLE_MODE && isNoTake) {
                    // In simple mode, no-take sites only have habitat 1
                    cell.H1 = true;
                    cell.H2 = false;
                } else {
                    // Fished sites (or when not in simple mode) use normal probability
                    cell.H1 = randomBoolean(CONFIG.HABITAT_PROBABILITY.H1);
                    cell.H2 = randomBoolean(CONFIG.HABITAT_PROBABILITY.H2);
                }
                
                // Calculate biomass for this cell
                cell.biomass = calculateBiomass(cell);
                
                this.cells.push(cell);
            }
        }
        
        // Ensure we have at least some no-take zones
        const noTakeCount = this.cells.filter(cell => cell.isNoTake).length;
        if (noTakeCount < 5) {
            // If we have too few no-take zones, add some more
            const fishedCells = this.cells.filter(cell => !cell.isNoTake)
                .sort((a, b) => a.fishingPressure - b.fishingPressure);
            
            // Convert the 5 cells with lowest fishing pressure to no-take
            for (let i = 0; i < Math.min(5, fishedCells.length); i++) {
                const cell = fishedCells[i];
                cell.isNoTake = true;
                
                // Apply simple_mode rules to newly converted no-take cells
                if (CONFIG.SIMPLE_MODE) {
                    cell.H1 = true;
                    cell.H2 = false;
                }
                
                cell.biomass = calculateBiomass(cell); // Recalculate biomass
            }
        }
    },
    
    /**
     * Render the grid to the DOM
     */
    render() {
        const gridElement = document.getElementById('grid');
        gridElement.innerHTML = '';
        
        // Create grid cells
        this.cells.forEach(cell => {
            const cellElement = document.createElement('div');
            cellElement.id = cell.id;
            cellElement.className = 'grid-cell';
            
            if (cell.isNoTake) {
                cellElement.classList.add('no-take');
            }
            
            if (cell.isSelected) {
                cellElement.classList.add('selected');
            }
            
            // Add habitat icons
            const habitatIconsContainer = document.createElement('div');
            habitatIconsContainer.className = 'habitat-icons';
            
            // Add habitat icons with preloading to ensure they display correctly
            if (cell.H1) {
                const icon = new Image();
                icon.src = CONFIG.ASSETS.CORAL1;
                icon.className = 'habitat-icon';
                icon.alt = 'Coral 1';
                icon.width = 16;
                icon.height = 16;
                habitatIconsContainer.appendChild(icon);
            }
            
            if (cell.H2) {
                const icon = new Image();
                icon.src = CONFIG.ASSETS.CORAL2;
                icon.className = 'habitat-icon';
                icon.alt = 'Coral 2';
                icon.width = 16;
                icon.height = 16;
                habitatIconsContainer.appendChild(icon);
            }
            
            cellElement.appendChild(habitatIconsContainer);
            
            // Add click handler
            cellElement.addEventListener('click', () => this.toggleCellSelection(cell));
            
            gridElement.appendChild(cellElement);
        });
        
        // Update selection counter
        this.updateSelectionCounter();
    },
    
    /**
     * Toggle selection state of a cell
     * @param {Object} cell - Cell to toggle
     */
    toggleCellSelection(cell) {
        const index = this.selectedCells.findIndex(c => c.id === cell.id);
        
        if (index === -1) {
            // Cell is not selected, try to select it
            if (this.selectedCells.length < this.maxSelections) {
                cell.isSelected = true;
                this.selectedCells.push(cell);
            } else {
                alert(`You can only select ${this.maxSelections} sites. Deselect some sites first.`);
                return;
            }
        } else {
            // Cell is already selected, deselect it
            cell.isSelected = false;
            this.selectedCells.splice(index, 1);
        }
        
        // Update the DOM
        const cellElement = document.getElementById(cell.id);
        cellElement.classList.toggle('selected');
        
        // Update selection counter
        this.updateSelectionCounter();
    },
    
    /**
     * Update the selection counter display
     */
    updateSelectionCounter() {
        const counter = document.getElementById('selection-counter');
        counter.textContent = `Selected: ${this.selectedCells.length}/${this.maxSelections} sites`;
    },
    
    /**
     * Reset all cell selections
     */
    resetSelections() {
        // Reset selection state for all cells
        this.cells.forEach(cell => {
            cell.isSelected = false;
        });
        
        // Clear selected cells array
        this.selectedCells = [];
        
        // Re-render the grid
        this.render();
    },
    
    /**
     * Calculate impact measures based on current selections
     * @returns {Object} Impact measures
     */
    calculateImpacts() {
        // Check if we have enough selections
        if (this.selectedCells.length === 0) {
            return {
                surveyImpact: null,
                trueImpact: null,
                difference: null
            };
        }
        
        // Check if we have both no-take and fished selections
        const hasNoTake = this.selectedCells.some(cell => cell.isNoTake);
        const hasFished = this.selectedCells.some(cell => !cell.isNoTake);
        
        if (!hasNoTake || !hasFished) {
            return {
                surveyImpact: null,
                trueImpact: calculateTrueImpact(this.cells),
                difference: null
            };
        }
        
        // Calculate impacts
        const surveyImpact = calculateSurveyImpact(this.selectedCells);
        const trueImpact = calculateTrueImpact(this.cells);
        const difference = surveyImpact !== null && trueImpact !== null 
            ? calculateDifference(surveyImpact, trueImpact) 
            : null;
        
        return {
            surveyImpact,
            trueImpact,
            difference
        };
    },
    
    /**
     * Update the maximum number of selections
     * @param {number} maxSelections - New maximum number of selections
     */
    updateMaxSelections(maxSelections) {
        this.maxSelections = maxSelections;
        
        // If we have more selections than allowed, remove excess
        if (this.selectedCells.length > maxSelections) {
            // Remove excess selections (most recent first)
            const excessCount = this.selectedCells.length - maxSelections;
            const excessCells = this.selectedCells.splice(maxSelections, excessCount);
            
            // Update cell states
            excessCells.forEach(cell => {
                cell.isSelected = false;
                const cellElement = document.getElementById(cell.id);
                if (cellElement) {
                    cellElement.classList.remove('selected');
                }
            });
        }
        
        // Update selection counter
        this.updateSelectionCounter();
    }
};
