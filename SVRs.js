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


// Data for Svr 2-7 in order
const datasets = [
    [[
    {"mode": "light", "from": "00:00", "to": "01:00"},
    {"mode": "medium", "from": "12:00", "to": "13:30"}
  ],
  [
    {"mode": "heavy", "from": "18:00", "to": "20:00"}
  ],
  [],
  [
    {"mode": "light", "from": "06:45", "to": "08:00"},
    {"mode": "medium", "from": "11:15", "to": "12:45"},
    {"mode": "heavy", "from": "19:30", "to": "21:00"}
  ],
  [
    {"mode": "medium", "from": "10:00", "to": "11:20"}
  ],
  [],
  [],
  [
    {"mode": "light", "from": "08:15", "to": "09:30"}
  ],
  [
    {"mode": "heavy", "from": "17:45", "to": "19:15"}
  ],
  [
    {"mode": "medium", "from": "12:30", "to": "14:00"}
  ],
  [],
  [
    {"mode": "light", "from": "07:00", "to": "08:15"},
    {"mode": "heavy", "from": "20:00", "to": "22:00"}
  ],
  [],
  [
    {"mode": "medium", "from": "11:30", "to": "12:45"},
    {"mode": "light", "from": "13:15", "to": "14:30"}
  ],
  [
    {"mode": "heavy", "from": "18:15", "to": "20:00"}
  ],
  [],
  [
    {"mode": "light", "from": "06:30", "to": "07:45"}
  ],
  [
    {"mode": "medium", "from": "10:00", "to": "11:15"},
    {"mode": "heavy", "from": "16:30", "to": "18:00"}
  ],
  [],
  [
    {"mode": "light", "from": "08:30", "to": "09:45"}
  ],
  [],
  [],
  [
    {"mode": "medium", "from": "12:45", "to": "14:00"}
  ],
  [
    {"mode": "heavy", "from": "19:45", "to": "21:00"},
    {"mode": "light", "from": "22:30", "to": "23:50"}
  ],
  [],
  [
    {"mode": "medium", "from": "10:15", "to": "11:30"}
  ],
  [],
  [
    {"mode": "light", "from": "06:45", "to": "08:00"},
    {"mode": "heavy", "from": "18:00", "to": "20:15"}
  ],
  [],
  [],
  [
    {"mode": "medium", "from": "12:30", "to": "13:45"}
  ],

// Last item in dataset is mid peak and on peak times, off peak removed as it's the default status
  {midPeak:[[13,15],[17,18]], onPeak:[[18,0]]}
],

// First item showing sunrise and sunset times
    {sunrise:"08:00", sunset:"22:00"},
    [
        ["Sunday",
            { appliance: "washer", mode: "delicate", from: "08:15" }
        ],
        ["Monday",
            { appliance: "oven", mode: "bake", from: "12:30" },
            { appliance: "fridge", mode: "eco", from: "04:10" }
        ],
        ["Tuesday",
            { appliance: "dishwasher", mode: "auto", from: "19:45" }
        ],
        ["Wednesday",
            { appliance: "microwave", mode: "reheat", from: "07:20" },
            { appliance: "washer", mode: "quick", from: "15:50" }
        ],
        ["Thursday",
            { appliance: "oven", mode: "pizza", from: "18:05" }
        ],
        ["Friday",
            { appliance: "fridge", mode: "maxcool", from: "02:55" },
            { appliance: "dishwasher", mode: "intense", from: "21:30" }
        ],
        ["Saturday",
            { appliance: "washer", mode: "wool", from: "09:10" }
        ],
        ["Sunday",
            { appliance: "microwave", mode: "grill", from: "16:40" }
        ],
        ["Monday",
            { appliance: "oven", mode: "roast", from: "11:20" },
            { appliance: "washer", mode: "delicate", from: "06:50" }
        ],
        ["Tuesday",
            { appliance: "fridge", mode: "energy", from: "03:15" }
        ],
        ["Wednesday",
            { appliance: "dishwasher", mode: "light", from: "14:05" }
        ],
        ["Thursday",
            { appliance: "microwave", mode: "popcorn", from: "20:50" }
        ],
        ["Friday",
            { appliance: "washer", mode: "quick", from: "07:35" },
            { appliance: "oven", mode: "bake", from: "18:25" }
        ],
        ["Saturday",
            { appliance: "fridge", mode: "fastfreeze", from: "05:10" }
        ],
        ["Sunday",
            { appliance: "dishwasher", mode: "eco", from: "13:55" }
        ],
        ["Monday",
            { appliance: "microwave", mode: "defrost", from: "09:30" }
        ],
        ["Tuesday",
            { appliance: "washer", mode: "delicate", from: "00:45" }
        ],
        ["Wednesday",
            { appliance: "oven", mode: "pizza", from: "19:15" }
        ],
        ["Thursday",
            { appliance: "fridge", mode: "maxcool", from: "02:20" },
            { appliance: "dishwasher", mode: "auto", from: "16:40" }
        ],
        ["Friday",
            { appliance: "microwave", mode: "reheat", from: "06:35" }
        ],
        ["Saturday",
            { appliance: "washer", mode: "wool", from: "10:00" }
        ],
        ["Sunday",
            { appliance: "oven", mode: "bake", from: "12:10" }
        ],
        ["Monday",
            { appliance: "dishwasher", mode: "intense", from: "21:50" }
        ],
        ["Tuesday",
            { appliance: "fridge", mode: "energy", from: "03:45" },
            { appliance: "microwave", mode: "grill", from: "14:25" }
        ],
        ["Wednesday",
            { appliance: "washer", mode: "quick", from: "09:40" }
        ],
        ["Thursday",
            { appliance: "oven", mode: "roast", from: "17:55" }
        ],
        ["Friday",
            { appliance: "dishwasher", mode: "eco", from: "07:20" }
        ],
        ["Saturday",
            { appliance: "fridge", mode: "fastfreeze", from: "01:15" }
        ],
        ["Sunday",
            { appliance: "microwave", mode: "popcorn", from: "22:40" }
        ],
        ["Monday",
            { appliance: "washer", mode: "delicate", from: "05:30" }
        ],
        ["Tuesday",
            { appliance: "oven", mode: "pizza", from: "18:20" }
        ],
        ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday", "Saturday"]
    ],
//[Number of Appliances, [[Number of Operation Modes per appliance], [The Operation Mode]]
    [
    [3, [
        [2, ['u', 'a']],
        [5, ['a', 'u', 'u', 'a', 'a']],
        [1, ['u']]]],
    [2, [
        [3, ['a', 'u', 'u']],
        [1, ['u']]]],
    [5, [
        [2, ['u', 'a']],
        [1, ['a']],
        [4, ['d', 'a', 'u', 'u']],
        [5, ['a', 'a', 'd', 'f', 'u']],
        [3, ['a', 'u', 'a']]]],
    [1, [
        [4, ['u', 'u', 'a', 'a']]]],
    [4, [
        [3, ['u', 'u', 'a']],
        [1, ['a']],
        [2, ['a', 'a']],
        [5, ['u', 'u', 'a', 'a', 'u']]]],
    [2, [
        [1, ['u']],
        [4, ['a', 'a', 'u', 'd']]]],
    [3, [
        [3, ['a', 'u', 'a']],
        [5, ['u', 'u', 'a', 'u', 'a']],
        [2, ['u', 'u']]]],
    [1, [
        [2, ['a', 'u']]]],
    [4, [
        [1, ['u']],
        [3, ['a', 'a', 'u']],
        [4, ['u', 'd', 'u', 'a']],
        [2, ['a', 'a']]]],
    [3, [
        [2, ['u', 'a']],
        [1, ['a']],
        [5, ['u', 'a', 'u', 'u', 'a']]]],
    [2, [
        [3, ['a', 'u', 'u']],
        [4, ['u', 'a', 'a', 'u']]]],
    [1, [
        [5, ['a', 'a', 'u', 'u', 'a']]]]
    ],

// [Months[[total, partial]xDays in the month]] max 100, partial 1-100
// 12 rows for 12 months; x entries of [#,#] for each day in the month
    [
        [[79, 24], [83, 25], [89, 37], [52, 12], [60, 5], [98, 10], [95, 76], [87, 44], [81, 6], [91, 22], [97, 49], [100, 73], [56, 3], [74, 20], [68, 8], [66, 32], [90, 62], [93, 11], [72, 4], [96, 52], [65, 9], [58, 29], [84, 55], [78, 14], [88, 36], [70, 13], [99, 41], [94, 18], [75, 27], [92, 33], [61, 16]],
        [[85, 7], [60, 11], [98, 69], [100, 26], [76, 24], [96, 46], [80, 47], [73, 3], [91, 14], [65, 43], [89, 32], [87, 48], [77, 10], [88, 18], [66, 5], [64, 8], [78, 13], [92, 54], [70, 23], [81, 20], [84, 50], [86, 41], [72, 30], [68, 25], [74, 12], [90, 34], [62, 28], [67, 31]],
        [[73, 17], [98, 35], [90, 25], [84, 27], [82, 50], [80, 12], [96, 44], [95, 58], [71, 20], [97, 49], [78, 43], [94, 62], [99, 31], [85, 67], [81, 13], [79, 46], [93, 11], [100, 63], [66, 23], [91, 16], [77, 59], [83, 7], [64, 40], [89, 19], [70, 10], [92, 28], [74, 8], [88, 18], [76, 6], [68, 14], [63, 9]],
        [[99, 68], [93, 31], [85, 50], [72, 3], [74, 43], [76, 38], [60, 10], [88, 29], [94, 45], [62, 9], [90, 59], [87, 35], [100, 16], [96, 19], [83, 13], [84, 20], [65, 12], [89, 6], [98, 33], [91, 25], [66, 7], [79, 17], [86, 27], [97, 64], [80, 15], [73, 28], [67, 11], [75, 39], [92, 37], [61, 8]],
        [[84, 33], [87, 30], [91, 65], [100, 28], [92, 37], [95, 6], [83, 16], [98, 58], [90, 39], [89, 15], [60, 25], [94, 59], [72, 8], [96, 26], [85, 62], [93, 13], [79, 5], [70, 12], [86, 35], [63, 24], [69, 7], [66, 23], [82, 9], [88, 17], [80, 40], [77, 11], [75, 32], [64, 10], [81, 31], [61, 14], [73, 4]],
        [[81, 62], [98, 69], [85, 60], [83, 3], [88, 27], [91, 34], [94, 7], [99, 28], [73, 8], [66, 25], [96, 33], [92, 26], [100, 64], [79, 15], [87, 44], [65, 11], [84, 17], [89, 53], [75, 30], [63, 16], [70, 4], [93, 31], [86, 19], [74, 5], [80, 23], [61, 12], [76, 21], [60, 9], [78, 6], [67, 22]],
        [[80, 38], [83, 17], [100, 29], [96, 33], [94, 10], [87, 62], [97, 6], [72, 5], [65, 7], [70, 8], [91, 12], [73, 22], [66, 3], [90, 4], [78, 11], [61, 9], [92, 25], [89, 24], [81, 15], [60, 2], [88, 18], [86, 27], [74, 16], [67, 13], [76, 26], [69, 19], [68, 23], [85, 21], [95, 14], [79, 30], [63, 20]],
        [[95, 40], [87, 3], [60, 10], [98, 55], [63, 20], [100, 36], [92, 12], [96, 33], [97, 46], [72, 4], [79, 11], [93, 24], [84, 17], [67, 7], [89, 28], [91, 13], [85, 25], [73, 9], [86, 8], [66, 6], [94, 18], [65, 5], [64, 2], [77, 31], [68, 23], [62, 14], [78, 27], [90, 34], [81, 15], [88, 16], [69, 26]],
        [[84, 5], [91, 18], [63, 11], [100, 27], [80, 19], [85, 6], [97, 39], [90, 23], [65, 12], [93, 42], [78, 31], [94, 33], [60, 2], [70, 8], [96, 36], [72, 9], [62, 7], [74, 21], [69, 14], [73, 26], [67, 25], [88, 29], [83, 4], [98, 16], [76, 17], [81, 13], [92, 10], [95, 32], [61, 20], [68, 22]],
        [[88, 22], [90, 18], [100, 25], [92, 33], [84, 8], [66, 2], [94, 27], [79, 11], [80, 7], [98, 21], [60, 1], [87, 16], [85, 20], [70, 12], [96, 6], [74, 3], [89, 9], [73, 14], [69, 13], [75, 10], [68, 4], [95, 23], [93, 17], [71, 5], [72, 19], [65, 15], [91, 24], [67, 26], [76, 30], [62, 28], [63, 29]],
        [[95, 22], [97, 28], [93, 27], [88, 9], [99, 31], [92, 18], [96, 30], [90, 20], [91, 23], [70, 7], [100, 32], [73, 6], [80, 19], [78, 4], [74, 5], [76, 3], [66, 13], [60, 2], [89, 10], [67, 8], [87, 15], [65, 14], [64, 1], [84, 11], [86, 16], [69, 12], [75, 21], [71, 17], [62, 24], [63, 26]],
        [[85, 14], [95, 19], [96, 27], [98, 33], [78, 25], [100, 12], [91, 20], [89, 13], [92, 31], [83, 28], [90, 23], [60, 1], [73, 6], [84, 3], [62, 9], [74, 4], [65, 7], [94, 22], [86, 2], [63, 5], [82, 11], [64, 8], [81, 10], [76, 24], [93, 21], [66, 17], [79, 26], [88, 15], [77, 18], [87, 29], [69, 16]]
    ],
    ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
];

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
        color: innerColorPicker,
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
            dataset: datasets[i]
        });
    }
    updateCircleControls();
    drawCircles();
}

// Gap between circles
let gapless = true
function closeGap() {
    const order = getSortedCirclesByInnerEdge();
    for (i = 1; i < order.length; i++){
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
        circleInnerRadius = circle.radius + circle.thickness/2;

        ctx.beginPath();
// Note, radius of the circle is increased by circle.thickness/2 so that the adjustments made to circle's thickness appear only on the outer edge of the circle
        ctx.arc(center.x, center.y, circleInnerRadius, 0, Math.PI * 2);
        ctx.lineWidth = circle.thickness;
        ctx.strokeStyle = circle.color;
        ctx.stroke();

// Counter used for sorting calculations, resets for the drawing of every new SVR
        let dataCounter = 0;

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
                    totalValuePerDay = days[i][0];
                    partialValuePerDay = days[i][1];

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
                    appliancePerMonthSeperator = (dataCounter*(Math.PI/6)) + ((i/appliances[0])*(Math.PI/6));
                    appliancePerMonthSeperatorWidth = (dataCounter*(Math.PI/6)) + ((i/appliances[0])*(Math.PI/6)) + Math.PI/3000;

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
                trackDivider = circle.radius + i * circle.thickness / 6;

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
            for (let i = 0; i < (circle.dataset.length-1); i++){
                trackPosition = i*circle.thickness/(circle.dataset.length-1);
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
                    arcThickness = 2.75*circle.thickness/((circle.dataset.length-1)*5)
                    arcTrack = circle.radius + (((index*2)+1)*circle.thickness)/((circle.dataset.length-1)*2);

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
