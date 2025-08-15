Smart Home Energy Consumption

GraphFormat.html contains webpage code structure
Key elements include:
    Boxes and Buttons for controls
    Slider and colour for SVR1's size
    Tooltip API and Canvas API settings

    src link to 
        sidePage.js
        Controls.css
        SVRs.js

sidePage.js contains design for extendable side page for control boxes in GraphFormat.html and SVRs.js
Key elements include:
    Page extendable/scalable resize tab
    Overflow management

Controls.css contains page design to assist GraphFormat.html and sidePage.js designs
Key elements include:
    Overhead tab shadow effects
    Overflow management
    Control panel size behaviour

SVRs.js contains code for data processing and Sub Visual Representations for graphs

*Feel free to edit the datasets by changing values of the times and names in the datasets*

Key elements include:   

    SVR1:
        Beginning of doubly linked list
        Always visible
    Normal SVR Behaviour:
        SVRs are circles that are altered from the outter circle
        Visbility toggle
        Doubly linked list function for flexible SVR to SVR interactions
        SVR gap toggle to instantly solidify and connect graphs
        
    SVR2:
        Registers peak times on 24 hour circle
        Circles for number of days in the month
        Accepts input for flexible number of appliances represented by colours 
        
    SVR3:
        Considers various sunrise and sunset times with midday and midnight times changing accordingly
        24 clock time stamps
        Gradient effect for sunrise, sunset, midday, midnight
        
    SVR4:
        Accepts input for flexible number of appliances and operation modes in the form of shapes and colours
        Tracks for week number in the month
        Track for day of the week label
        Weekend colour gradient for visual appeal
        
    SVR5:
        Accepts input for flexible number of appliances and operation modes by sectionalizing portions of the graph
        Considers alternative appliance settings with third colour representing "other"
        
    SVR6:
        Properly formatted to correctly represent the number of days according to each month:
            Bars in february are slightly larger than bars in january as january has more days
            All bars in february fit within the month sectioned by 1/12th of the circle
        Total bar is proportional to the greatest total value
        Partial bar is always proportional in size to greatest total value and never greater than its respective total bar
        
    SVR7:
        Indicating months of the year with equal size, all 1/12ths of the circle (represented by 2 PI in radians)


Colour changing:
    Colour changing wheel for each SVR
    
Doubly linked list functions:

    Snap function:
        Connects SVRs to each other to treat interactions as one large SVR (doubly linked list)
        
    Overlap function:
        Prevents SVRs from overlapping, pushing out either SVR according to overlap proportionality
        
    Gap toggle function:
        For SVR flexibility, using a slider to manually adjust radius of SVRs
        
        Toggle off (default):
            instantly reconnect all SVRs to centre
            SVRs will always be connect
            
        Toggle on:
            Snap on function will be enabled, specific SVRs can connect and interact with each other, space between circles will be manual

Visiblity:
    Hiding/showing SVRs will affect SVR interactions with each other
    Treat hidden SVRs as null objects / non-existent
    
Hover effects:
    Hovering bars in SVR6 will reveal a glow over the hovered box and a informatics table showing specific data of the respective bar
