//tooltip for hovering effects
const tooltip = document.getElementById("tooltip"); 
// canvas for drawing
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const center = { x: canvas.width / 2, y: canvas.height / 2 };
let circles = [];
// for svg 5 on-hover information
let hoverArcs = [];

//inner refers to svg 1- the inner circle
const innerRadiusSlider = document.getElementById('innerRadius');
const innerColorPicker = document.getElementById('innerColor');

// Initial colours of circles svg 2-7
const initialColors = [
    '#e74c3c',
    '#e67e22', 
    '#f1c40f',
    '#2ecc71', 
    '#3498db', 
    '#9b59b6'  
];

const datasets = [
    // svg2
    [],
    //svg 3
    [],
    // svg 4
    [],
    //[number of applicances, [[number of operations modes per appliance], [mode per appliance]]
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
    // can change # of days in a month in the future when we accept data, by replacing days for variables
    // [months[days in a month[total, partial]]] max 100, partial 1-100
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

// Initialize 6 circles with unique radius, color, and thickness
function initializeDefaultCircles() {
    circles = [
        {
        id:0,
        thickness: parseInt(innerRadiusSlider.value),
        radius: 0, // for sorting and calculation purposes
        color: innerColorPicker,
        visible: true, //this doesnt matter since theres no condition to check visibility of inner circle
        snappedTo: null, //also shouldnt matter since it'll never snap to anything but we'll keep it for sake of consistency
        snappedBy: null, // linked-list style
        numOfSegments: 0, // 0 for the time being to avoid errors
        dataset: []
        }
];
    circleIdCounter = 1;
    innerRadiusSlider.value = 150; // Reset inner radius
    // base segmentation conditions
    // later applies unique segmentations like for svg 5 and 6 at index 3 and 4 (respective)
    const segments = [24,24,7,0,0,12];
    const startingThickness = 35;
    // CURRENTLY USING STACK AND HASHMAP - maybe adapt to OOP if necessary?
    for (let i = 0; i < 6; i++) {
        const baseRadius = parseInt(innerRadiusSlider.value) + i * startingThickness; 
        circles.push({
            id: circleIdCounter++,
            thickness: startingThickness,
            radius: baseRadius,
            color: initialColors[i % initialColors.length],
            visible: true,
            snappedTo: null, // Track which circle this is snapped to
            snappedBy: null,
            originalIndex: i, // Add original index to maintain display order
            numOfSegments: segments[i],
            dataset: datasets[i]
        });
    }
    updateCircleControls();
    drawCircles();
}
function drawCircles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw inner circle
    // circles[0].radius = parseInt(innerRadiusSlider.value);
    ctx.beginPath();
    ctx.arc(center.x, center.y, parseInt(innerRadiusSlider.value), 0, Math.PI * 2);
    ctx.fillStyle = innerColorPicker.value;
    ctx.fill();
    
    // Draw circles
    circles.slice(1).forEach(circle => {
        if (!circle.visible) return;
        ctx.beginPath();
        ctx.strokeStyle = circle.color;
        ctx.arc(center.x, center.y, parseInt(circle.radius) + circle.thickness / 2, 0, Math.PI * 2);
        // + circle.thickness / 2 so that the change in thickness is applied to the outer edge
        ctx.lineWidth = circle.thickness;
        ctx.strokeStyle = circle.color;
        ctx.stroke();

        for (let i = 0; i < circle.numOfSegments; i++) {
            ctx.beginPath();
            ctx.arc(center.x, center.y, parseInt(circle.radius) + circle.thickness / 2, 
            i * ((Math.PI * 2) / circle.numOfSegments), 
            (i * (Math.PI * 2) / circle.numOfSegments) + Math.PI/3000);
            ctx.lineWidth = circle.thickness;
            ctx.strokeStyle = "#000000";
            ctx.stroke();
        }

        //counter used for sorting in calculation of sectionalizing all svgs
        let dataCounter = 0;
        if (circle.id == 6)
            {
            circle.dataset.forEach(data => {
                const angleGap = Math.PI / circle.numOfSegments;

                ctx.save();
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.font = `${circle.thickness/2}px serif`;
                ctx.fillStyle = 'black';
                ctx.translate(center.x + Math.cos(angleGap * (dataCounter*2 +1))*(circle.radius + circle.thickness/2) - 1,
                center.y + Math.sin(angleGap * (dataCounter*2+1))*(circle.radius + circle.thickness/2)-1);
                ctx.rotate(Math.PI/2 + angleGap * (dataCounter*2 +1));  
                ctx.fillText(data, 0, 0);   
                ctx.restore(); 
                dataCounter++;
            })
        }

        if (circle.id == 5) {
            (circle.dataset).forEach(days => {
                // let nextDay = 5;
                for (let i = 0; i < days.length; i++) {
                    ctx.beginPath();
                    // 12 sections from the circle denoted by PI/6
                    // 1/days in month for space per day
                    ctx.strokeStyle = "#000000";
                    ctx.arc(center.x, center.y, parseInt(circle.radius) + circle.thickness / 2, 
                    (dataCounter*(Math.PI/6)) + ((i/days.length)*(Math.PI/6)), 
                    (dataCounter*(Math.PI/6)) + ((i/days.length)*(Math.PI/6)) + Math.PI/3000);
                    ctx.lineWidth = circle.thickness;
                    ctx.stroke();

                    ctx.beginPath();
                    // 12 sections from the circle denoted by PI/6
                    // 1/days in month for space per day
                    // total is proportional to the highest total size
                    ctx.strokeStyle = "#ed7504ef";
                    ctx.arc(center.x, center.y, parseInt(circle.radius) + ((days[i][0]/100)*circle.thickness) / 2, 
                        (dataCounter*(Math.PI/6)) + ((i/days.length)*(Math.PI/6)) + 0.0017, 
                        (dataCounter*(Math.PI/6)) + ((i/days.length)*(Math.PI/6)) + 0.014
                    );
                    ctx.lineWidth = (days[i][0]/100) * circle.thickness;
                    ctx.stroke();

                    ctx.beginPath();
                    // 12 sections from the circle denoted by PI/6
                    // 1/days in month for space per day
                    // partial is also proportional to the highest total size, should it just be proportional to its respective total size?
                    ctx.strokeStyle = "#0a50ffff";
                    ctx.arc(center.x, center.y, parseInt(circle.radius) + ((days[i][1]/100)*circle.thickness) / 2, 
                        (dataCounter*(Math.PI/6)) + ((i/days.length)*(Math.PI/6))+ 0.0017, 
                        (dataCounter*(Math.PI/6)) + ((i/days.length)*(Math.PI/6)) + 0.014
                    );
                    // 100 is the highest total of all possible totals
                    ctx.lineWidth = (days[i][1]/100) * circle.thickness;
                    ctx.stroke();

                    hoverArcs.push({ //redirect to canvas.addEventListener("mousemove", (e) => {
                        startAngle: (dataCounter*(Math.PI/6)) + ((i/days.length)*(Math.PI/6))+ 0.0017,     // where the arc starts (in radians)
                        endAngle: (dataCounter*(Math.PI/6)) + ((i/days.length)*(Math.PI/6)) + 0.014,       // where the arc ends (in radians)
                        innerRadius: parseInt(circle.radius),    // distance from center to inner edge of arc
                        outerRadius: parseInt(circle.radius) + ((days[i][0]/100)*circle.thickness),    // distance from center to outer edge of arc
                        thickness:(days[i][0]/100) * circle.thickness,
                        centerX: center.x,   // center of your canvas / circle
                        centerY: center.y,
                        index: i,             // (optional) index of day if you want to reference it
                        total: days[i][0],
                        partial: days[i][1]
                    });
                
                }
                dataCounter++;
            })
        }

        if (circle.id == 4) {
            (circle.dataset).forEach(appliances => {
                for (let i = 0; i < appliances[0]; i++) {
                    ctx.beginPath();
                    // 12 sections from the circle denoted by PI/6
                    // 1/days in month for space per day
                    ctx.strokeStyle = "#000000";
                    ctx.arc(center.x, center.y, parseInt(circle.radius) + circle.thickness / 2, 
                    (dataCounter*(Math.PI/6)) + ((i/appliances[0])*(Math.PI/6)), 
                    (dataCounter*(Math.PI/6)) + ((i/appliances[0])*(Math.PI/6)) + Math.PI/3000);
                    ctx.lineWidth = circle.thickness;
                    ctx.stroke();
                    
                    for (let j = 0; j < appliances[1][i][0]; j++){
                        ctx.beginPath();
                        ctx.strokeStyle = "#000000";
                        ctx.arc(center.x, center.y, parseInt(circle.radius) + (j*circle.thickness/appliances[1][i][0]),
                        (dataCounter*(Math.PI/6)) + ((i/appliances[0])*(Math.PI/6)) + 0.0017, 
                        (dataCounter*(Math.PI/6)) + (((i+1)/appliances[0])*(Math.PI/6)));
                        // width of line that just works
                        ctx.lineWidth = Math.PI/8;
                        ctx.stroke();

                        ctx.beginPath();
                        if (appliances[1][i][1][j] == 'a'){
                            ctx.strokeStyle = 'rgba(163, 162, 162, 1)';
                        } else if (appliances[1][i][1][j] == 'u'){
                            ctx.strokeStyle = 'rgba(68, 155, 47, 0.63)';
                        } else {
                            ctx.strokeStyle = 'rgba(186, 26, 26, 0.78)';}
                        ctx.arc(center.x, center.y, parseInt(circle.radius) + (j*circle.thickness/appliances[1][i][0])+ (circle.thickness/appliances[1][i][0])/2,
                        (dataCounter*(Math.PI/6)) + ((i/appliances[0])*(Math.PI/6)) + 0.0017, 
                        (dataCounter*(Math.PI/6)) + (((i+1)/appliances[0])*(Math.PI/6)));
                        ctx.lineWidth = circle.thickness/appliances[1][i][0];
                        ctx.stroke();
                    }
                }

                dataCounter++;
            });
        }

    });
    console.log('--------------------------');

}

// Hover for SVG 6
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
        // Do something on hover!        
        // console.log("Hovered arc index:", arc.index);

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
            drawCircles();
            updateSnappedCircles(0); // Update any circle snapped to inner
            checkAllOverlaps(0); // Check overlaps starting from the inner circle
            updateCircleControls();
        } else {
            drawCircles();
            updateCircleControls();
        }
    // control.addEventListener('change', () => {
    //     sortCirclesByInnerEdge();
    //     checkAllOverlaps(0);
    //     updateCircleControls();
    //     });
    });
});

// Helper: Get sorted circles by inner edge but don't modify original array
function getSortedCirclesByInnerEdge() {
    return [...circles].sort((a, b) => {        // If a is not visible and b is visible, a goes after b
        if (!a.visible && b.visible) return 1;
        // If a is visible and b is not, a goes before b
        if (a.visible && !b.visible) return -1;
        // Otherwise, sort by radius
        return a.radius - b.radius;});
}

// Helper: Sort circles by inner edge (smallest to largest) - for internal operations
function sortCirclesByInnerEdge() {
    // console.log(circles.sort((a, b) => {
    //     // If a is not visible and b is visible, a goes after b
    //     if (!a.visible && b.visible) return 1;
    //     // If a is visible and b is not, a goes before b
    //     if (a.visible && !b.visible) return -1;
    //     // Otherwise, sort by radius
    //     return a.radius - b.radius;
    // }));
    // sort circles by size but put invisible circles to the end
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
    // const circle = circles.find(c => c.originalIndex === originalIndex);
    // if (!circle) return;
    
    const sortedCircles = getSortedCirclesByInnerEdge();
    const sortedIndex = sortedCircles.findIndex(c => c.id === circle.id);
    console.log(sortedCircles);
    if (!sortedIndex) return;
    if (sortedIndex === 1) {
        // Snap to inner circle
        // const innerRadius = parseInt(innerRadiusSlider.value);
        circle.radius = parseInt(innerRadiusSlider.value); // innerRadius
        circle.snappedTo = 0;
        circles[0].snappedBy = circle.id;
        // console.log(circle.snappedTo, circles[0].snappedBy);

        updateSnappedCircles(circle.id);
        sortCirclesByInnerEdge();
        updateCircleControls();
        drawCircles();
        checkAllOverlaps(sortedIndex);
        return;
    }
    // Snap to the next smallest (index - 1 in sorted array)
    const target = sortedCircles[sortedIndex - 1];
    // for(i = sortedIndex-1; i < sortedIndex; i--){
    
    // }
    circle.radius = target.radius + target.thickness ;
    circle.snappedTo = target.id;
    target.snappedBy = circle.id;
    updateSnappedCircles(circle.id);
    sortCirclesByInnerEdge();
    updateCircleControls();
    drawCircles();
    checkAllOverlaps(sortedIndex);
}

// When a snapped-to circle changes, update all snapped circles recursively
function updateSnappedCircles(changedCircleId) {
        const changedCircle = circles.find(c => c.id === changedCircleId);
        if (changedCircle.snappedBy !== null) {
            const snappedCircle = circles.find(c => c.id === changedCircle.snappedBy);
            if (!snappedCircle) return;
            // console.log(snappedCircle.id);
            if (changedCircleId == 0){
                snappedCircle.radius = parseInt(innerRadiusSlider.value);
            } else {
                snappedCircle.radius = changedCircle.radius + changedCircle.thickness;
            }
            updateSnappedCircles(snappedCircle.id);
            checkAllOverlaps(snappedCircle.id);
        }
}

// Helper: Get all circles in a snap chain
function getSnapChain(circleId) {
    const chain = [];
    const visited = new Set();
    // console.log(circleId);
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
    // console.log(chain);
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
function checkAllOverlaps(sortedIndex) {
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
                // console.log(chain);
                if (chain.length > 0) {
                    const edges = getSnapChainEdges(circle.id);
                    // console.log(edges);
                    chains.push({ 
                        id: circle.id, 
                        chain: chain,
                        edges: edges,
                    });
                    chain.forEach(c => processedChains.add(c.id));
                }
            }
        });
        // console.log(parseInt(innerRadiusSlider.value), circles[1].radius + circles[1].thickness/2);
        // console.log(chains);
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
    // getCircleEdgesList();
}
function breakSnap(circle) {
    circle.snappedTo = null;
    const findSnappedBy = circles.find(c => c.snappedBy === circle.id);
    if (!findSnappedBy) {return;}
    else {findSnappedBy.snappedBy = null;}
}
function updateCircleControls() {
    const circleList = document.getElementById('arcList');
    circleList.innerHTML = '';

    // Display circles in their original order, not sorted order
    // dont include the inner circle, start at index 1
    const circlesInOriginalOrder = [...(circles.slice(1))].sort((a, b) => a.originalIndex - b.originalIndex);
    circlesInOriginalOrder.forEach((circle, displayIndex) => {
        const circleDiv = document.createElement('div');
        circleDiv.className = 'arc-item';
        circleDiv.innerHTML = `
            <h4>SVG ${displayIndex + 1}</h4>
            <div class="slider-container">
                <span class="slider-label">Radius</span>
                <input type="range" class="circle-radius" 
                    min="40" 
                    max="1000" 
                    value="${circle.radius}">
            </div>
            <div class="slider-container">
                <span class="slider-label">Thickness</span>
                <input type="range" class="circle-thickness" min="1" max="100" value="${circle.thickness}">
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
            // if (circle.snappedTo) circle.snappedTo = null;
            sortCirclesByInnerEdge();
            drawCircles();
            sortCirclesByInnerEdge();

            // getCircleEdgesList();
        });
        radiusSlider.addEventListener('change', () => {
            sortCirclesByInnerEdge();
            const sortedCircles = getSortedCirclesByInnerEdge();
            const sortedIndex = sortedCircles.findIndex(c => c.id === circle.id);
            checkAllOverlaps(sortedIndex);
            updateCircleControls();
        });

        const thicknessSlider = circleDiv.querySelector('.circle-thickness');
        thicknessSlider.addEventListener('input', () => {
            circle.thickness = parseInt(thicknessSlider.value);
            updateSnappedCircles(circle.id);
            sortCirclesByInnerEdge();
            drawCircles();
            sortCirclesByInnerEdge();
            // getCircleEdgesList();   
        });
        thicknessSlider.addEventListener('change', () => {
            sortCirclesByInnerEdge();
            const sortedCircles = getSortedCirclesByInnerEdge();
            const sortedIndex = sortedCircles.findIndex(c => c.id === circle.id);
            checkAllOverlaps(sortedIndex);
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
            // getCircleEdgesList();
            sortCirclesByInnerEdge;
        });

        const snapOnButton = circleDiv.querySelector('.snap-on');
        snapOnButton.disabled = !!circle.snappedTo;
        snapOnButton.addEventListener('click', () => {
            snapCircleToNextSmallest(circle);
        });

        circleList.appendChild(circleDiv);
    });
}

// this is fine to leave as is
document.getElementById('resetCircle').addEventListener('click', () => {
    initializeDefaultCircles();
});


document.getElementById('arcList').style.display = '';

// Initial draw and setup
initializeDefaultCircles();



// CURRENTLY NOT IN USE //
// function getCircleEdgesList() {
//     const edges = [];
//     // Add the inner circle as the first entry (optional)
//     // edges.push([0, parseInt(innerRadiusSlider.value)]);
//     // Add all user circles
//     circles.forEach(circle => {
//         const inner = circle.radius;
//         const outer = circle.radius + circle.thickness;
//         edges.push([inner, outer]);
//     });
//     // console.log(edges);
//     return edges;
// }

// Example usage:

// allEdges[i][0] = inner edge, allEdges[i][1] = outer edge for each circle (0 is inner circle)