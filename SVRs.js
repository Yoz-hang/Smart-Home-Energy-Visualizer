// SVR number is 1 greater than its respective circle.id because of array

//tooltip for hovering effects
const tooltip = document.getElementById("tooltip"); 
// canvas for drawing
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const center = { x: canvas.width / 2, y: canvas.height / 2 };

// Collect SVRs
let circles = [];
// SVR 5 hover effects
let hoverArcs = [];

//inner refers to Svr 1, the inner circle
const innerRadiusSlider = document.getElementById('innerRadius');
const innerColorPicker = document.getElementById('innerColor');

// Initial colours of circles Svrs 2-7
const initialColors = [
    '#54c76f',
    '#e67e22', 
    '#a160d6',
    '#22b05d', 
    '#3498db', 
    '#c15d6a'  
];


// const res = await fetch("/api/datasets");
let datasets = [];
async function initializeApp() {
    try {
        console.log("Loading datasets...");
        const res = await fetch("/api/datasets");
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        datasets = await res.json();
        console.log("Datasets loaded successfully:", datasets);
        
        // Now initialize everything else
        initializeDefaultCircles();
        // setupEventListeners();
        
    } catch (error) {
        console.error("Failed to load datasets:", error);
        // Initialize with fallback empty datasets
        datasets = Array(6).fill().map(() => []);
        console.log("Using fallback empty datasets");
        initializeDefaultCircles();
        // setupEventListeners();
    }
}

console.log(datasets);
let circleIdCounter = 1;
const initialInnerRadius = parseInt(innerRadiusSlider.value);
// Initialize 6 circles with unique radius, color, and thickness
function initializeDefaultCircles() {
    circles = [
        {
        id:0,
        thickness: parseInt(innerRadiusSlider.value),
// For sorting and calculation purposes, radius of SVR 1 is set as 0
// SVR 1 is drawn differently from the other circles so this is ok
        radius: 0, 
        color: innerColorPicker.value,
// Visibility and snappedTo is never used for SVR 1 as it should be always visible, however, we'll keep it for consistency
        visible: true, 
        snappedTo: null,
// Beginning of doubly linked list
        snappedBy: null, 
// N/A
        numOfSegments: 0, 
        dataset: []
        }
];

 // Reset inner radius
    innerRadiusSlider.value = initialInnerRadius;
// base segmentation conditions
// SVR 3, 5, 6 are sectioned uniquely
    const segments = [24,0,7,0,0,12];
    const startingThickness = [100,25,80,50,55,20];
    for (let i = 0; i < 6; i++) {
        const baseRadius = circles[i].radius + circles[i].thickness; 
        circles.push({
            id: i + 1,
            thickness: startingThickness[i],
            radius: baseRadius,
            color: initialColors[i],
            visible: true,
// SnappedTo and SnappedBy for doubly linked list
            snappedTo: null,
            snappedBy: null,
            originalIndex: i,
            numOfSegments: segments[i],
            dataset: datasets[i] || []
        });
    }
    updateCircleControls();
    drawCircles();
}

// Gap between circles
let gapless = true
function closeGap() {
    const order = getSortedCirclesByInnerEdge();
    for (let i = 1; i < order.length; i++){
        order[i].radius = order[i-1].radius + order[i-1].thickness;
    };
}

function drawCircles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

// Draw inner circle
    circles[0].thickness = parseInt(innerRadiusSlider.value);
    ctx.beginPath();
    ctx.arc(center.x, center.y, parseInt(innerRadiusSlider.value), 0, Math.PI * 2);
    ctx.fillStyle = innerColorPicker.value;
    ctx.fill();

// If there shouldn't be gaps between the circles, we'll change the radius of all the outer circles (SVRs 2-7) before drawing them
    gapless ? closeGap() : null;

// Draw other circles
    circles.slice(1).forEach(circle => {
        if (!circle.visible) return;
        
// Radius of the circle's innermost edge
        let circleInnerRadius = circle.radius + circle.thickness/2;
        ctx.beginPath();
// Note, radius of the circle is increased by circle.thickness/2 so that the adjustments made to circle's thickness appear only on the outer edge of the circle
        ctx.arc(center.x, center.y, circleInnerRadius, 0, Math.PI * 2);
        ctx.lineWidth = circle.thickness;
        ctx.strokeStyle = circle.color;
        ctx.stroke();

// Counter used for sorting calculations, resets for the drawing of every new SVR
        let dataCounter = 0;

        if (circle.dataset.length == 0) return;

        if (circle.id == 6)
            {
            circle.dataset.forEach(data => {
                const angleGap = Math.PI / circle.numOfSegments;
                const translatedX = center.x + Math.cos(angleGap * (dataCounter*2 +1))*(circle.radius + circle.thickness/2) - 1;
                const translatedY = center.y + Math.sin(angleGap * (dataCounter*2+1))*(circle.radius + circle.thickness/2)-1;
                const rotateFacingCentre = Math.PI/2 + angleGap * (dataCounter*2 +1);

                ctx.save();
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.font = `${circle.thickness/1.5}px serif`;
                ctx.fillStyle = 'black';
                ctx.translate(translatedX, translatedY);
                ctx.rotate(rotateFacingCentre);  
                ctx.fillText(data, 0, 0);   
                ctx.restore(); 
                dataCounter++;
            })
        }

        if (circle.id == 5) {
            (circle.dataset).forEach(days => {
                for (let i = 0; i < days.length; i++) {
                    let totalValuePerDay = days[i][0];
                    let partialValuePerDay = days[i][1];

// The lines seperating each day
                    const adjustedRadius = parseInt(circle.radius) + circle.thickness / 2;
                    const daySeperator = (dataCounter*(Math.PI/6)) + ((i/days.length)*(Math.PI/6));
                    const daySeperatorWidth = (dataCounter*(Math.PI/6)) + ((i/days.length)*(Math.PI/6)) + Math.PI/3000;

// Total bar (proportional to the greatest total bar)
                    const totalBarRadiusPosition = parseInt(circle.radius) + ((totalValuePerDay/100)*circle.thickness) / 2;
                    const totalBarSize = (totalValuePerDay/100) * circle.thickness;

// Partial bar (also proportional to the greast total bar)
                    const partialBarRadiusPosition = parseInt(circle.radius) + ((partialValuePerDay/100)*circle.thickness) / 2;
                    const partialBarSize = (partialValuePerDay/100) * circle.thickness;

// Thickness of the bars
                    const barBegin = (dataCounter*(Math.PI/6)) + ((i/days.length)*(Math.PI/6)) + 0.0017;
                    const barWidth = (dataCounter*(Math.PI/6)) + ((i/days.length)*(Math.PI/6)) + 0.014;
                    
                    ctx.beginPath();
                    ctx.strokeStyle = "#000000";
                    ctx.arc(center.x, center.y, adjustedRadius, daySeperator, daySeperatorWidth);
                    ctx.lineWidth = circle.thickness;
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.strokeStyle = "#ed7504ef";
                    ctx.arc(center.x, center.y, totalBarRadiusPosition, barBegin, barWidth);
                    ctx.lineWidth = totalBarSize;
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.strokeStyle = "#0a50ffff";
                    ctx.arc(center.x, center.y, partialBarRadiusPosition, barBegin, barWidth);
                    // 100 is the highest total of all possible totals
                    ctx.lineWidth = partialBarSize;
                    ctx.stroke();

// Add hover effects
                    hoverArcs.push({
// where the arc starts and ends (in radians)
                        startAngle: barBegin,     
                        endAngle: barWidth,     
                        innerRadius: parseInt(circle.radius),    

// distance from center to inner edge of arc
                        outerRadius: parseInt(circle.radius) + ((totalValuePerDay/100)*circle.thickness),    // distance from center to outer edge of arc
                        thickness:totalBarSize,
                        centerX: center.x,   // center of your canvas / circle
                        centerY: center.y,
                        index: i,             // (optional) index of day if you want to reference it
                        total: totalValuePerDay,
                        partial: partialValuePerDay
                    });
                
                }
                dataCounter++;
            })
        }

        if (circle.id == 4) {
            (circle.dataset).forEach(appliances => {
                for (let i = 0; i < appliances[0]; i++) {
                    let appliancePerMonthSeperator = (dataCounter*(Math.PI/6)) + ((i/appliances[0])*(Math.PI/6));
                    let appliancePerMonthSeperatorWidth = (dataCounter*(Math.PI/6)) + ((i/appliances[0])*(Math.PI/6)) + Math.PI/3000;

                    ctx.beginPath();
// Calculation for the lines that seperates each appliance per month
                    ctx.strokeStyle = "#000000";
                    ctx.arc(center.x, center.y, circleInnerRadius, appliancePerMonthSeperator, appliancePerMonthSeperatorWidth);
                    ctx.lineWidth = circle.thickness;
                    ctx.stroke();
                    
                    for (let j = 0; j < appliances[1][i][0]; j++){
                        const applianceMode = appliances[1][i][1][j];
                        ctx.beginPath();
                        let baseColor;
                        if (applianceMode == 'a') {
                            baseColor = "163, 162, 162"; // gray
                        } else if (applianceMode == 'u') {
                            baseColor = "68, 155, 47";   // green
                        } else {
                            baseColor = "186, 26, 26";   // red
                        }

// Colour in the boxes for appliances and add radial gradient effect by finding the part where the box begins and ends (outside/inside)
                        let innerRadius = parseInt(circle.radius) + (j * circle.thickness / appliances[1][i][0]);
                        let betweenInnerOuter = innerRadius + (circle.thickness / (2 * appliances[1][i][0]));
                        let outerRadius = innerRadius + (circle.thickness / appliances[1][i][0]);

// modeSpacing is the box per month, iterating through 'i'
// applianceBox is the box per modeSpacingBox, iterating through variables 'i' and 'j'
// modeSpacing consists of the month + the space for the appliance proportional to the circle + spacing
// modeSpacingEnd shows us where the space of the box for appliance ends based on the beginning of the next box
// modeSpacingLine and modeSpacingLineEnd applying the same logic, except theyre the black lines that act as the border of the boxes

                        let modeSpacing = (dataCounter * (Math.PI / 6)) + ((i / appliances[0]) * (Math.PI / 6)) + 0.0017;
                        let modeSpacingEnd = (dataCounter * (Math.PI / 6)) + (((i + 1) / appliances[0]) * (Math.PI / 6));
                        let modeSpacingLine = (dataCounter*(Math.PI/6)) + ((i/appliances[0])*(Math.PI/6)) + 0.0017;
                        let modeSpacingLineEnd = (dataCounter*(Math.PI/6)) + (((i+1)/appliances[0])*(Math.PI/6));

// Index j finds the position of the radius proportional to the thickness by identifying which box is being drawn
                        let applianceBox = circle.radius + (j*circle.thickness/appliances[1][i][0]);
                        let lineSize = Math.PI/6;
                        let gradient = ctx.createRadialGradient(center.x, center.y, innerRadius, center.x, center.y, outerRadius);
// Three lines are used to indicate the strength (transparency) of the colours at positions along the gradient
// At the 0 point (beginning), the gradient has a opacity of 21%
                        gradient.addColorStop(0, `rgba(${baseColor}, 0.21)`);
                        gradient.addColorStop(0.5, `rgba(${baseColor}, 0.95)`); 
                        gradient.addColorStop(1, `rgba(${baseColor}, 0.8)`); 
                        ctx.strokeStyle = gradient;
                        ctx.arc(center.x, center.y, betweenInnerOuter, modeSpacing, modeSpacingEnd);
                        ctx.lineWidth = circle.thickness / appliances[1][i][0];
                        ctx.stroke();

                        ctx.beginPath();
                        ctx.strokeStyle = "#000000";
                        ctx.arc(center.x, center.y, applianceBox, modeSpacingLine, modeSpacingLineEnd);
                        ctx.lineWidth = lineSize;
                        ctx.stroke();
                    }
                }
                dataCounter++;
            });
        }

        // We'll use these universal arrays once datasets can be applied for all SVRs at once. for now, we'll keep individual versions in each circle function)
        // const modes = [];
        // const appliances = [];

        if (circle.id == 3) {
            const weeks = [];
            const modes = [];
            const appliances = [];

            ctx.beginPath();
            let gradient = ctx.createLinearGradient(
                center.x - (circleInnerRadius), center.y,
                center.x + (circleInnerRadius), center.y
            );

// Gradient from weekend starting from center of outer edge outwards
            gradient.addColorStop(0.5, "rgba(53, 231, 247, 0.25)"); // Middle strongest
            gradient.addColorStop(1, "rgba(31, 83, 181, 0.9)");   // End fade
            ctx.strokeStyle = gradient;
            ctx.lineWidth = circle.thickness;

// 6 as in index 6, the last day of the week multiplied by unit circle, divided by 7 days to find where to begin drawing
            const beginSaturday = 6 * Math.PI * 2 / 7;
            const endSunday = Math.PI * 2 / 7;
            ctx.arc(center.x, center.y, circleInnerRadius, beginSaturday, endSunday);
            ctx.stroke();

            for (let i = 1; i < 6; i++) {
// Track divided into 6 lanes, 5 for weeks, 1 for label, circle radius + line number proportional to thickness
                let trackDivider = circle.radius + i * circle.thickness / 6;

                ctx.beginPath();
                ctx.arc(center.x, center.y, trackDivider, 0, Math.PI * 2);
                ctx.strokeStyle = "rgba(0, 0, 0, 1)";
                ctx.lineWidth = Math.PI/8;
                ctx.stroke();
                weeks.push(trackDivider);
            }

// Angle found by dividing a day from the number of days in a week
            const angleGap = Math.PI / circle.numOfSegments;
            circle.dataset[31].forEach(data => {

// 11 * circle.thickness because there are 6 tracks, we multiply by 2, and pick 11 which is after the fifth track (5*2) and between 5 and 6 by adding 1
                let textPositionAngle = angleGap * (dataCounter*2+1);
                let textTrack = circle.radius + 11*circle.thickness/12;
                
                const translatedX = center.x + Math.cos(textPositionAngle)*(textTrack);
                const translatedY = center.y + Math.sin(textPositionAngle)*(textTrack);
                const rotateFacingCentre = Math.PI/2 + angleGap * (dataCounter*2 +1);

                ctx.save();
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.font = `${circle.thickness/6}px serif`;
                ctx.fillStyle = 'black';
                ctx.translate(translatedX, translatedY);
                ctx.rotate(rotateFacingCentre);  
                ctx.fillText(data, 0, 0);   
                ctx.restore(); 
                dataCounter++;
            })
            
            let weekCounter = 0;

// To account for inconsistent potentially high numbers of appliances/modes, we can use "random" methods to generate more colours
// We are no considering the possibility for pointer errors expecting that data in arrays; objects and keys in dictionaries are formatted correctly
            circle.dataset.slice(0,-1).forEach(data => {
                if (data.length <= 1) return;
                data.slice(1).forEach(appliance => {
                    if (!appliances.includes(appliance["appliance"])) appliances.push(appliance["appliance"]);
                    if (!modes.includes(appliance["mode"])) modes.push(appliance["mode"]);
                });
            });

            circle.dataset.slice(0, -1).forEach((data, index) => {
                if (data[0] == "Sunday" && index != 0) {
                    weekCounter++;
                }

                if (data.length <= 1) return;
                let arcSection = circle.dataset[31].indexOf(data[0]) * ((Math.PI * 2) / circle.numOfSegments);
                let weekTrack = circle.radius + (weekCounter * 2 + 1)*circle.thickness/12;

// OPTION FOR SNOWFLAKES
                // data.slice(1).forEach(appliance => {
                //         let time = appliance["from"];
                //         let [hours, minutes] = time.split(":").map(Number);
                //         let totalMinutes = hours * 60 + minutes;
                //         let percentage = totalMinutes / (24 * 60);
                //         // change datacounter to arc section, remember to include time
                //         for (let i = 0; i < appliances.indexOf(appliance["appliance"]) + 3; i++) {
                //             const angle = arcSection + (percentage * (Math.PI * 2) / circle.numOfSegments);
                //             const starAngle = (i * 2 * Math.PI) / (appliances.indexOf(appliance["appliance"]) + 3);
                //             const centerX = center.x + Math.cos(angle)*(weekTrack);
                //             const centerY = center.y + Math.sin(angle)*(weekTrack);
                //             const endX = centerX + Math.cos(starAngle) * circle.thickness/12;
                //             const endY = centerY + Math.sin(starAngle) * circle.thickness/12;
                //             let colourChoice = Math.floor((modes.indexOf(appliance["mode"])) * 360/modes.length);
                //             ctx.beginPath();
                //             ctx.strokeStyle = (`hsl(${colourChoice}, 100%, 30%)`);
                //             ctx.lineWidth = 2;
                //             ctx.moveTo(centerX, centerY);
                //             ctx.lineTo(endX, endY);
                //             ctx.stroke();
                //         }
                      
                // });

                // OPTION FOR SHAPES
                data.slice(1).forEach(appliance => {
                    let time = appliance["from"];
                    let [hours, minutes] = time.split(":").map(Number);
                    let totalMinutes = hours * 60 + minutes;
                    let percentage = totalMinutes / (24 * 60);

                    const sides = appliances.indexOf(appliance["appliance"]) + 3; // number of polygon sides

                    for (let i = 0; i < sides; i++) {
                        const angle = arcSection + (percentage * (Math.PI * 2) / circle.numOfSegments);
                        const radius = circle.thickness / 12;

                        // Center of this shape
                        const centerX = center.x + Math.cos(angle) * weekTrack;
                        const centerY = center.y + Math.sin(angle) * weekTrack;

                        // Draw polygon
                        ctx.beginPath();
                        for (let j = 0; j < sides; j++) {
                            const vertexAngle = (j * 2 * Math.PI) / sides;
                            const x = centerX + Math.cos(vertexAngle) * radius;
                            const y = centerY + Math.sin(vertexAngle) * radius;
                            if (j === 0) ctx.moveTo(x, y);
                            else ctx.lineTo(x, y);
                        }
                        ctx.closePath(); // close the shape
                        let colourChoice = Math.floor((modes.indexOf(appliance["mode"])) * 360 / modes.length);
                        ctx.fillStyle = `hsl(${colourChoice}, 100%, 45%)`;
                        ctx.fill();
                        ctx.strokeStyle = `hsl(${colourChoice}, 100%, 20%)`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                });
            });
        }

        if(circle.id == 2){
            const [riseHours, riseMinutes] = circle.dataset["sunrise"].split(":").map(Number);
            const [setHours, setMinutes] = circle.dataset["sunset"].split(":").map(Number);

// Calculations for percentage of minutes to total minutes in respect to a unit circle
            const riseTime = riseHours * 60 + riseMinutes;
            const riseAngle = (riseTime / 1440) * (2 * Math.PI) - Math.PI / 2 + (14*2*Math.PI/24);

            const setTime = setHours * 60 + setMinutes;
            const setAngle = (setTime / 1440) * (2 * Math.PI) - Math.PI / 2 + (14*2*Math.PI/24);
            const midNight = (setAngle + ((riseAngle - setAngle + Math.PI * 2) % (Math.PI * 2)) / 2) % (Math.PI * 2);

            ctx.lineWidth = circle.thickness;
            ctx.beginPath();
            ctx.arc(center.x, center.y, circleInnerRadius, setAngle, riseAngle);
            ctx.strokeStyle = "black";
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(center.x, center.y, circleInnerRadius, riseAngle, setAngle);
            ctx.strokeStyle = "rgba(84, 190, 216, 0.73)";
            ctx.stroke();
            ctx.beginPath();

// Create a linear gradient along the horizontal axis of the circle
            function drawArcGlow(angle, color1, color2) {
                const arcRadius = circle.radius + circle.thickness / 2;
                const arcWidth = 0.4; // total radians width of the glow arc

                // Tangent vector at this angle
                const tangentX = -Math.sin(angle);
                const tangentY =  Math.cos(angle);

                // Distance along tangent for gradient spread
                const spread = arcRadius * 0.2;

                // Gradient start and end points along the tangent
                const startX = center.x + Math.cos(angle) * arcRadius + tangentX * spread;
                const startY = center.y + Math.sin(angle) * arcRadius + tangentY * spread;
                const endX   = center.x + Math.cos(angle) * arcRadius - tangentX * spread;
                const endY   = center.y + Math.sin(angle) * arcRadius - tangentY * spread;

                const gradient = ctx.createLinearGradient(startX, startY, endX, endY);
                gradient.addColorStop(0, color2);   // fade at one end
                gradient.addColorStop(0.35, color1); // strongest in middle
                gradient.addColorStop(0.65, color1); // strongest in middle
                gradient.addColorStop(1, color2);   // fade at other end

                ctx.beginPath();
                ctx.strokeStyle = gradient;
                ctx.lineWidth = circle.thickness;
                ctx.arc(center.x, center.y, arcRadius, angle - arcWidth / 2, angle + arcWidth / 2);
                ctx.stroke();
            }
            drawArcGlow(midNight, "rgba(198, 198, 18, 1)", "rgba(255, 255, 150, 0)");

            // Yellow glow at day midpoint (directly opposite of midNight)
            drawArcGlow((midNight + Math.PI) % (Math.PI * 2), "rgba(198, 198, 18, 1)", "rgba(255, 255, 150, 0)");

            // Orange glow at sunrise
            drawArcGlow(riseAngle, "rgba(255, 165, 0, 1)", "rgba(255, 165, 0, 0)");

            // Orange glow at sunset
            drawArcGlow(setAngle, "rgba(255, 165, 0, 1)", "rgba(255, 165, 0, 0)");

            for (let i = 0; i < 24; i++) {
// 24 hours, i = 24; Position is indicated by 3/4ths of the circle's thickness
                const timeIndicatorPosition = circle.radius + 3*circle.thickness / 4;
                const timeIndicator = i * ((Math.PI * 2) /24);
                const timeIndicatorWidth = i * ((Math.PI * 2) /24) + Math.PI/500;

                ctx.beginPath();
                ctx.arc(center.x, center.y, timeIndicatorPosition, timeIndicator,timeIndicatorWidth);
                ctx.lineWidth = circle.thickness/2;
                ctx.strokeStyle = "#ffffffff";
                ctx.stroke();

                const translatedX = center.x + Math.cos(Math.PI/24 * (i*2))*(circle.radius + 3*circle.thickness/8);
                const translatedY = center.y + Math.sin(Math.PI/24 * (i*2))*(circle.radius + 3*circle.thickness/8);
                const rotateFacingCentre = Math.PI/2 + Math.PI/24 * (i*2);

// Add text for hour of the day last so it appears on top
                ctx.save();
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.font = `${(circle.thickness/2)/1.5}px serif`;
                ctx.fillStyle = 'white';
                ctx.translate(translatedX, translatedY);
                ctx.rotate(rotateFacingCentre);  
                ctx.fillText(`${String(i).padStart(2, "0")}`, 0, 0);  
                ctx.restore(); 
                dataCounter++;
            };
        }

        if (circle.id == 1) {
            console.log(circle.dataset);
            const midPeak = circle.dataset[circle.dataset.length-1]["midPeak"];
            const onPeak = circle.dataset[circle.dataset.length-1]["onPeak"];

            midPeak.forEach(peakHour => {
                let peakAngleStart = Math.PI*peakHour[0]/12;
                let peakAngleEnd = Math.PI*peakHour[1]/12
                ctx.beginPath();
                ctx.lineWidth = circle.thickness;
                ctx.arc(center.x, center.y, circle.radius + circle.thickness/2, peakAngleStart, peakAngleEnd) 
                ctx.strokeStyle = "rgba(231, 208, 76, 1)";
                ctx.stroke();
            });
            onPeak.forEach(peakHour => {
                let peakAngleStart = Math.PI*peakHour[0]/12;
                let peakAngleEnd = Math.PI*peakHour[1]/12
                ctx.beginPath();
                ctx.lineWidth = circle.thickness;
                ctx.arc(center.x, center.y, circle.radius + circle.thickness/2, peakAngleStart, peakAngleEnd) 
                ctx.strokeStyle = "rgba(250, 113, 59, 1)";
                ctx.stroke();
            });

// Draw a track for everyday, which is the number of items in the dataset minus the last one indicating peak times
            if (circle.dataset.length <= 1) return;
            for (let i = 0; i < (circle.dataset.length-1); i++){
                let trackPosition = i*circle.thickness/(circle.dataset.length-1);
                ctx.beginPath();
                ctx.strokeStyle = "rgba(0, 0, 0, 1)";
                ctx.lineWidth = Math.PI/50;
                ctx.arc(center.x, center.y, circle.radius + trackPosition, 0, Math.PI* 2)
                ctx.stroke();
            }

            // We'll move modes to be a universal array when we properly sort out the datasets
            const modes = [];
            circle.dataset.slice(0,-1).forEach((dayTrack, index) => {
                if (dayTrack.length < 1) return;
                dayTrack.forEach(appliance => {
                    //
                    if (!modes.includes(appliance["mode"])) modes.push(appliance["mode"]);
                    //
                    const baseHue = (modes.indexOf(appliance.mode) * 360 / modes.length); // original evenly spaced hue
                    const shift = 15; // shift hue by 0–15 degrees
                    const colourChoice = (baseHue + shift) % 360; // wrap around 360
                    let time = appliance["from"];
                    let [startHours, startMinutes] = time.split(":").map(Number);
                    let starting = startHours * 60 + startMinutes;
// Slightly offset or turn the arcs to align with the correct time
                    const baseAngle = (2 * Math.PI) - Math.PI / 2 + (6*2*Math.PI/24);
                    const startAngle = (starting / 1440) * baseAngle;
                    time = appliance["to"];
                    let [endHours, endMinutes] = time.split(":").map(Number);
                    let ending = endHours * 60 + endMinutes;
                    const endAngle = (ending / 1440) * baseAngle;
// 2.75 is the ratio size for the space between the track lines calculated by the track space proportional to the thickness
// arcTrack calculated by identifying the day of the arc and dividing it by the total number of days and then offsetting to be in between the lines
                    let arcThickness = 2.75*circle.thickness/((circle.dataset.length-1)*5)
                    let arcTrack = circle.radius + (((index*2)+1)*circle.thickness)/((circle.dataset.length-1)*2);
                    ctx.beginPath();
                    ctx.lineWidth = arcThickness;
                    ctx.arc(center.x, center.y, arcTrack, startAngle, endAngle)  
                    ctx.strokeStyle = `hsl(${colourChoice}, 100%, 30%)`;
                    ctx.stroke();
                })

            });
        }

// SVR inner line
        ctx.beginPath();
        ctx.arc(center.x, center.y, circle.radius, 0, Math.PI*2);
        ctx.strokeStyle = "rgba(0, 0, 0, 1)";
        ctx.lineWidth = Math.PI/5;
        ctx.stroke();

// SVR outer line 
        ctx.beginPath();
        // circle.lineWidth = 10000;
        ctx.arc(center.x, center.y, circle.radius + circle.thickness, 0, Math.PI*2);
        ctx.lineWidth = Math.PI/5;
        ctx.strokeStyle = "#000000ff";
        ctx.stroke();
        
        for (let i = 0; i < circle.numOfSegments; i++) {
            let segment = i * ((Math.PI * 2) / circle.numOfSegments);
            let segmentBorder = i * ((Math.PI * 2) / circle.numOfSegments) + Math.PI/3000;

            ctx.beginPath();
            ctx.arc(center.x, center.y, circleInnerRadius, segment, segmentBorder);
            ctx.lineWidth = circle.thickness;
            ctx.strokeStyle = "#000000";
            ctx.stroke();
        }
    });    
}

// Hover for svr
canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const dx = x - center.x;
    const dy = y - center.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    let angle = Math.atan2(dy, dx);
    if (angle < 0) angle += Math.PI * 2; // Normalize

    let foundHover = false;

    drawCircles();
    hoverArcs.forEach(arc => {
        if (
        distance >= arc.innerRadius &&
        distance <= arc.outerRadius &&
        angle >= arc.startAngle &&
        angle <= arc.endAngle
        ) {
        foundHover = true;

        //tooltip code is code additional to whats already in html
        //unlike the other html section below, this one does not have "create...('div')"
        tooltip.innerHTML = `
              <strong>Day:</strong> ${arc.index + 1}<br>
              <strong>Total:</strong> ${arc.total}<br>
              <strong>Partial:</strong> ${arc.partial}
            `;
            // tooltip.textAlign.center;
            tooltip.style.left = `${50}%`;
            tooltip.style.top = `${50}%`;
            tooltip.style.display = 'block';

            // Highlight the arc
            ctx.beginPath();
            ctx.arc(center.x, center.y,
                    (arc.innerRadius + arc.outerRadius) / 2,
                    arc.startAngle, arc.endAngle);
            ctx.lineWidth = arc.thickness;
            ctx.strokeStyle = "rgba(196, 68, 0, 0.9)";
            ctx.shadowColor = "orange";       // set this BEFORE stroke
            ctx.shadowBlur = 2;
            ctx.stroke();

            // Clear glow settings so it doesn't affect the next draw
            ctx.shadowColor = "transparent";
            ctx.shadowBlur = 0;
        }
        //reset stack
        hoverArcs = [];
    });

    if (!foundHover) {
        tooltip.style.display = 'none';
    }
    canvas.style.cursor = foundHover ? "pointer" : "default";
});

// Event listeners for circles
[innerRadiusSlider, innerColorPicker].forEach(control => {
    control.addEventListener('input', () => {
        if (control === innerRadiusSlider) {
            // circles[0].thickness =
            drawCircles();
            updateSnappedCircles(0); // Update any circle snapped to inner
            checkAllOverlaps(); 
            updateCircleControls();
        } else {
            drawCircles();
            updateCircleControls();
        }
    });
});

// Get sorted circles by inner edge but don't modify original array
function getSortedCirclesByInnerEdge() {
    return [...circles].sort((a, b) => {        // If a is not visible and b is visible, a goes after b
        if (!a.visible && b.visible) return 1;
        // If a is visible and b is not, a goes before b
        if (a.visible && !b.visible) return -1;
        // Otherwise, sort by radius
        return a.radius - b.radius;});
}

// Sort circles by inner edge (smallest to largest) - for internal operations
function sortCirclesByInnerEdge() {
    circles.sort((a, b) => {
        // If a is not visible and b is visible, a goes after b
        if (!a.visible && b.visible) return 1;
        // If a is visible and b is not, a goes before b
        if (a.visible && !b.visible) return -1;
        // Otherwise, sort by radius
        return a.radius - b.radius;
    });
}

// Snap-on logic: Snap to next smallest (index-1), or inner circle if smallest
function snapCircleToNextSmallest(circle) {
    // Find the circle by its original index
    
    const sortedCircles = getSortedCirclesByInnerEdge();
    const sortedIndex = sortedCircles.findIndex(c => c.id === circle.id);

    if (!sortedIndex) return;
    if (sortedIndex === 1) {
        // Snap to inner circle
        circle.radius = parseInt(innerRadiusSlider.value); // innerRadius
        circle.snappedTo = 0;
        circles[0].snappedBy = circle.id;

        updateSnappedCircles(circle.id);
        sortCirclesByInnerEdge();
        updateCircleControls();
        drawCircles();
        checkAllOverlaps();
        return;
    }
    // Snap to the next smallest (index - 1 in sorted array)
    const target = sortedCircles[sortedIndex - 1];

    circle.radius = target.radius + target.thickness ;
    circle.snappedTo = target.id;
    target.snappedBy = circle.id;
    updateSnappedCircles(circle.id);
    sortCirclesByInnerEdge();
    updateCircleControls();
    drawCircles();
    checkAllOverlaps();
}

// When a snapped-to circle changes, update all snapped circles recursively
function updateSnappedCircles(changedCircleId) {
        const changedCircle = circles.find(c => c.id === changedCircleId);
        if (changedCircle.snappedBy !== null) {
            const snappedCircle = circles.find(c => c.id === changedCircle.snappedBy);
            if (!snappedCircle) return;
            if (changedCircleId == 0){
                snappedCircle.radius = parseInt(innerRadiusSlider.value);
            } else {
                snappedCircle.radius = changedCircle.radius + changedCircle.thickness;
            }
            updateSnappedCircles(snappedCircle.id);
            checkAllOverlaps();
        }
}

// Helper: Get all circles in a snap chain
function getSnapChain(circleId) {
    const chain = [];
    const visited = new Set();
    function addToChain(id) {
        if (visited.has(id)) return;
        visited.add(id);
        
        const circle = circles.find(c => c.id === id);
        if (circle) {
            chain.push(circle);
            // Add circles snapped to this one
                if (circle.snappedBy != null && !visited.has(circle.snappedBy)) {
                    addToChain(circle.snappedBy);
                }
        }
    }
    addToChain(circleId);
    return chain;
}

// Helper: Get the combined edges of a snap chain
function getSnapChainEdges(circleId) {

    
    const chain = getSnapChain(circleId);
    if (chain.length === 0) return [0, 0];
    
    let minInner = Infinity;
    let maxOuter = -Infinity;
    if (circleId === 0) {
        minInner = 0;
        maxOuter = parseInt(innerRadiusSlider.value);
    }
    chain.forEach(circle => {
        const inner = circle.radius;
        const outer = circle.radius + circle.thickness;
        minInner = Math.min(minInner, inner);
        maxOuter = Math.max(maxOuter, outer);
    });
    
    return [minInner, maxOuter];
}

// Overlap check and resolve
function checkAllOverlaps() {
    let changed;
    do {
        changed = false;
        const processedChains = new Set();
        
        // Group circles into snap chains
        const chains = [];
        // chains.push({ id: 'inner', edges: [0, parseInt(innerRadiusSlider.value)] });
        
        circles.forEach(circle => {
            if (!circle.visible) return; // Skip invisible circles
            if (!processedChains.has(circle.id)) {
                const chain = getSnapChain(circle.id);
                if (chain.length > 0) {
                    const edges = getSnapChainEdges(circle.id);
                    chains.push({ 
                        id: circle.id, 
                        chain: chain,
                        edges: edges,
                    });
                    chain.forEach(c => processedChains.add(c.id));
                }
            }
        });

        // Check overlaps between chains
        for (let i = 1; i < chains.length; i++) {
            for (let j = 0; j < i; j++) {
                const chainI = chains[i];
                const chainJ = chains[j];
                const [innerI, outerI] = chainI.edges;
                const [innerJ, outerJ] = chainJ.edges;
                
                // Check for overlap
                const overlap = (
                    (innerI < outerJ && outerI > innerJ) || // chain i overlaps chain j
                    (innerJ < outerI && outerJ > innerI)    // chain j overlaps chain i
                );
                
                
                if (overlap) {
                    if (j === 0) {
                        // If overlapping with the inner circle (j === 0), always move chain i outward
                        
                        // Apply adjustment to all circles in chain i
                        chainI.chain.forEach(circle => {
                            circle.radius = outerJ;
                        });
                        
                        // Update any circles snapped to circles in this chain
                        chainI.chain.forEach(circle => {
                            updateSnappedCircles(circle.id);
                        });
                        
                        changed = true;
                        break;
                    } else {
                        // For overlaps between non-inner chains, move chain i outward
                        const adjustment = outerJ - innerI;
                        
                        // Apply adjustment to all circles in chain i
                        chainI.chain.forEach(circle => {
                            circle.radius += adjustment;
                        });
                        
                        // Update any circles snapped to circles in this chain
                        chainI.chain.forEach(circle => {
                            updateSnappedCircles(circle.id);
                        });
                        
                        changed = true;
                        break;
                    }
                }
            }
            if (changed) break;
        }
    } while (changed);
    updateCircleControls();
    drawCircles();
    sortCirclesByInnerEdge();
}

//This function removes the doubly linked list between circles which snaps them together
function breakSnap(circle) {
    circle.snappedTo = null;
    const findSnappedBy = circles.find(c => c.snappedBy === circle.id);
    if (!findSnappedBy) {return;}
    else {findSnappedBy.snappedBy = null;}
}

//This function generates and updates the control panels
function updateCircleControls() {
    const circleList = document.getElementById('arcList');
    circleList.innerHTML = '';

// Display circles in their original order, not sorted order: .sort()
// Inner circle does not need control panel, start at index 1 for Svr 2: .slice(1)
    const circlesInOriginalOrder = [...(circles.slice(1))].sort((a, b) => a.originalIndex - b.originalIndex);
    circlesInOriginalOrder.forEach((circle, displayIndex) => {
        const circleDiv = document.createElement('div');
        circleDiv.className = 'arc-item';
        circleDiv.innerHTML = `
            <h4>SVR ${displayIndex + 2}</h4>
            <div class="slider-container">
                <span class="slider-label">Radius</span>
                <input type="range" class="circle-radius" min="40" max="1000" value="${circle.radius}">
            </div>
            <div class="slider-container">
                <span class="slider-label">Thickness</span>
                <input type="range" class="circle-thickness" min="15" max="200" value="${circle.thickness}">
            </div>
            <div class="slider-container">
                <span class="slider-label">Color</span>
                <input type="color" class="circle-color" value="${circle.color}">
            </div>
            <button class="show-hide">${circle.visible ? 'Hide' : 'Show'}</button>
            <button class="snap-on"${circle.snappedTo ? ' disabled' : ''}>${circle.snappedTo ? 'Snapped' : 'Snap-On'}</button>
        `;

        // Add event listeners
        const radiusSlider = circleDiv.querySelector('.circle-radius');
        radiusSlider.addEventListener('input', () => {
            circle.radius = parseInt(radiusSlider.value);
            updateSnappedCircles(circle.id);
            breakSnap(circle);
            sortCirclesByInnerEdge();
            drawCircles();
            sortCirclesByInnerEdge();
        });
        radiusSlider.addEventListener('change', () => {
            sortCirclesByInnerEdge();
            checkAllOverlaps();
            updateCircleControls();
        });

        const thicknessSlider = circleDiv.querySelector('.circle-thickness');
        thicknessSlider.addEventListener('input', () => {
            circle.thickness = parseInt(thicknessSlider.value);
            updateSnappedCircles(circle.id);
            sortCirclesByInnerEdge();
            drawCircles();
            sortCirclesByInnerEdge();   
        });
        thicknessSlider.addEventListener('change', () => {
            sortCirclesByInnerEdge();
            checkAllOverlaps();
            updateCircleControls();
        });

        const colorPicker = circleDiv.querySelector('.circle-color');
        colorPicker.addEventListener('input', () => {
            circle.color = colorPicker.value;
            drawCircles();
        });

        const showHideButton = circleDiv.querySelector('.show-hide');
        showHideButton.addEventListener('click', () => {
            circle.visible = !circle.visible;
            showHideButton.textContent = circle.visible ? 'Hide' : 'Show';
            drawCircles();
            sortCirclesByInnerEdge;
        });

        const snapOnButton = circleDiv.querySelector('.snap-on');
        snapOnButton.style.display = gapless ? 'none': '';
        snapOnButton.disabled = !!circle.snappedTo;
        snapOnButton.addEventListener('click', () => {
            snapCircleToNextSmallest(circle);
        });

        circleList.appendChild(circleDiv);
    });
}

document.getElementById('resetCircle').addEventListener('click', () => {
    initializeDefaultCircles();
});

document.getElementById('gapToggle').addEventListener('click', () => {
    gapless = !gapless;
    updateCircleControls();
    drawCircles();
    circles.forEach(circle => {
        breakSnap(circle);
    })
});


document.getElementById('arcList').style.display = '';

initializeDefaultCircles();


initializeApp();