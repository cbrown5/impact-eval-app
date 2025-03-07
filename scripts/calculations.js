/**
 * Calculations module for the Impact Evaluation App
 * Handles biomass calculations and impact evaluations
 */

/**
 * Calculate biomass for a grid cell based on habitat, fishing pressure, and protection status
 * B = a1*H1 + a2*H2 + a3*H3 + b1*H1*H2 + b2*H2*H3 + b3*H1*H3 + c*F + d*N
 * 
 * @param {Object} cell - Grid cell data
 * @returns {number} Calculated biomass value
 */
function calculateBiomass(cell) {
    const { H1, H2, H3, fishingPressure, isNoTake } = cell;
    const { a1, a2, a3, b1, b2, b3, c, d } = CONFIG.COEFFICIENTS;
    
    // Convert boolean to 0/1
    const h1Value = H1 ? 1 : 0;
    const h2Value = H2 ? 1 : 0;
    const h3Value = H3 ? 1 : 0;
    const noTakeValue = isNoTake ? 1 : 0;
    
    // Calculate biomass using the formula
    const biomass = 
        a1 * h1Value + 
        a2 * h2Value + 
        a3 * h3Value +
        b1 * h1Value * h2Value +
        b2 * h2Value * h3Value +
        b3 * h1Value * h3Value +
        c * fishingPressure +
        d * noTakeValue;
    
    return biomass;
}

/**
 * Calculate the survey-based impact measure
 * Impact is defined as the mean difference between survey sites inside vs. outside no-take zones
 * 
 * @param {Array} selectedCells - Array of selected grid cells
 * @returns {number} Survey-based impact measure
 */
function calculateSurveyImpact(selectedCells) {
    // Separate selected cells into no-take and fished groups
    const noTakeCells = selectedCells.filter(cell => cell.isNoTake);
    const fishedCells = selectedCells.filter(cell => !cell.isNoTake);
    
    // If either group is empty, we can't calculate impact
    if (noTakeCells.length === 0 || fishedCells.length === 0) {
        return null;
    }
    
    // Calculate mean biomass for each group
    const noTakeBiomass = noTakeCells.map(cell => cell.biomass);
    const fishedBiomass = fishedCells.map(cell => cell.biomass);
    
    const meanNoTakeBiomass = calculateMean(noTakeBiomass);
    const meanFishedBiomass = calculateMean(fishedBiomass);
    
    // Impact is the difference between means
    return meanNoTakeBiomass - meanFishedBiomass;
}

/**
 * Calculate the true impact measure across all grid cells
 * This accounts for the biased placement of no-take zones
 * 
 * @param {Array} allCells - Array of all grid cells
 * @returns {number} True impact measure
 */
function calculateTrueImpact(allCells) {
    // Separate all cells into no-take and fished groups
    const noTakeCells = allCells.filter(cell => cell.isNoTake);
    const fishedCells = allCells.filter(cell => !cell.isNoTake);
    
    // If either group is empty, we can't calculate impact
    if (noTakeCells.length === 0 || fishedCells.length === 0) {
        return null;
    }
    
    // Calculate mean biomass for each group
    const noTakeBiomass = noTakeCells.map(cell => cell.biomass);
    const fishedBiomass = fishedCells.map(cell => cell.biomass);
    
    const meanNoTakeBiomass = calculateMean(noTakeBiomass);
    const meanFishedBiomass = calculateMean(fishedBiomass);
    
    // Impact is the difference between means
    return meanNoTakeBiomass - meanFishedBiomass;
}

/**
 * Calculate the counterfactual impact for a no-take cell
 * This is the difference between its current biomass and what it would be if it wasn't protected
 * 
 * @param {Object} cell - Grid cell data
 * @returns {number} Counterfactual impact
 */
function calculateCounterfactualImpact(cell) {
    if (!cell.isNoTake) {
        return 0; // Only no-take cells have a counterfactual impact
    }
    
    // Create a copy of the cell with isNoTake set to false
    const counterfactualCell = { ...cell, isNoTake: false };
    
    // Calculate biomass for both scenarios
    const actualBiomass = calculateBiomass(cell);
    const counterfactualBiomass = calculateBiomass(counterfactualCell);
    
    // Impact is the difference
    return actualBiomass - counterfactualBiomass;
}

/**
 * Calculate the theoretical true impact based on the formula
 * This is the direct effect of the no-take zone (d coefficient)
 * 
 * @returns {number} Theoretical true impact
 */
function calculateTheoreticalImpact() {
    return CONFIG.COEFFICIENTS.d;
}
