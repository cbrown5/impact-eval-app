# Project Brief: Marine Reserve Impact Evaluation App

## Overview
The Marine Reserve Impact Evaluation App is an educational web application that demonstrates how monitoring design affects the reliability of impact measures for no-take marine reserves. It allows users to design a program of diver surveys to count fish biomass and understand the impact of no-take marine reserves on fish biomass.

## Core Requirements

### Functionality
- Display a grid where each cell has specific combinations of three possible habitats
- Show a gradient of fishing pressure from a port located to the left of the spatial domain
- Designate some grid cells as protected (no-take zones) and others as fished
- Allow users to select N monitoring sites across the grid
- Calculate the impact measure based on the mean difference in biomass between monitoring data from no-take zones and fished zones
- Reveal the true impact measure after the user makes their selection
- Provide options to reset selections or generate a new random scenario

### Technical Implementation
- Implement in JavaScript for deployment as a GitHub Pages site
- Calculate fish biomass using the formula: B = a1*H1 + a2*H2 + a2*H3 + b1*H1*H2 + b2*H2*H3 + b3*H1*H3 + c*F + d*N
- Create a visual interface matching the provided image
- Implement clickable grid cells for site selection with visual feedback
- Randomize no-take zones with bias towards areas with low fishing pressure
- Randomize habitat distributions

### User Experience
- Intuitive interface for selecting survey sites
- Clear visual distinction between no-take zones and fished areas
- Visual representation of different habitats using provided icons
- Immediate feedback on selections
- Clear presentation of impact calculation results
- Simple controls for resetting or generating new scenarios

## Success Criteria
- Users can select survey sites and see how their selection affects the calculated impact
- The app clearly demonstrates the difference between survey-based impact and true impact
- The interface is intuitive and educational
- The implementation is modular and maintainable
- The app works reliably in modern web browsers
