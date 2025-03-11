# Impact evaluation app

CJ Brown 2025-03-07

TODO
Make the MPA all have teh same coral habitat. 

Go for a high difference
Go for a low difference
Balance the difference
Need to be representative of:
fishing gradient
habitat distribution
habitat disribution inside the proected area



This web app allows users to explore how monitoring design affects the reliability of impact measures. Specifically, the user will be designing a program of diver surveys to count fish biomass. They want to know the impact of no-take marine reserves on fish biomass. They need to make choices about where to survey to get an accurate measure of the impact. They are then presented with a final result of the impact measure from their surveys versus the true impact value.

Impact is defined as the mean difference between survey sites inside the no-take zones versus outside the no-take zones. 

The true impact measure accounts for the biased placement of the no-take zones. The user will be selecting N monitoring sites across a grid. Different grid cells have different underlying habitats. So the challenge for the user is to select sites that are representative of the habitat distribution inside the no-take zones. 

The language is java script. I intend to deploy this as a github pages page. It will then be easy for students to use it in class. 

The app presents a grid where each cell has a specific combination of three possible habitats (see image). There is also a gradient of fishing pressure from a port located to the left of the spatial domain. Some grid cells are protected, whereas others are fished. The fish biomass in a grid cell is calculated internally based on a simple additive formula. In each grid cell fish biomass is modelled: 

B = (a1*H1 + a2*H2 + a2*H3 +  b1*H1*H2 + b2*H2*H3 + b3*H1*H3 + c*F)*  d*N

where B is fish biomass, H1, H2, and H3 are the habitat types (0/1 for habitat absence or presence), and a1, a2, and a3 are the habitat-specific coefficients. b1, b2, and b3 are the interaction coefficients. c is the effect of fishing pressure, F. d is the effect of the no-take zones, N (0/1 indicator)
F decreases from left to right in the spatial domain. The location of no-take zones is randomised and is biased towards are with low F. 

The user will be able to select N monitoring sites. The app will then calculate the impact measure based on the mean difference in B between monitoring data from the no-take zones and the fished zones. After the user clicks 'show answer' they will also be revealed with the true impact measure which is quantified as the mean across all sites with N==1 (ie no-take zones)

(a1*H1 + a2*H2 + a2*H3 +  b1*H1*H2 + b2*H2*H3 + b3*H1*H3 + c*F)* d*N + -1*(a1*H1 + a2*H2 + a2*H3 +  b1*H1*H2 + b2*H2*H3 + b3*H1*H3 + c*F) 

The app is designed to look like the screenshot in assets. The user can click on grids to 'select' them as potential survey sites. Once selected they change colour so its clear they are selected. There is then a 'calculate' button that calculates the survey and true impact measures. I have provided the image logos for the three habitats in the assets folder. There should also be 'reset' button that clears the selected sites. Finally there should be a 'new scenario' button that randomises the no-take zones and the fish habitat distributions.