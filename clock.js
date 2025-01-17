
//Declare Variables
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const center = { x: canvas.width / 2, y: canvas.height / 2 };
let arcs = [];

// Circle controls
const outerRadiusSlider = document.getElementById('outerRadius');
const innerRadiusSlider = document.getElementById('innerRadius');
const outerColorPicker = document.getElementById('outerColor');
const innerColorPicker = document.getElementById('innerColor');

function drawCircles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw outer circle
    ctx.beginPath();
    ctx.arc(center.x, center.y, parseInt(outerRadiusSlider.value), 0, Math.PI * 2);
    ctx.fillStyle = outerColorPicker.value;
    ctx.fill();

    // Draw inner circle
    ctx.beginPath();
    ctx.arc(center.x, center.y, parseInt(innerRadiusSlider.value), 0, Math.PI * 2);
    ctx.fillStyle = innerColorPicker.value;
    ctx.fill();

    // Draw arcs
    arcs.forEach(arc => {
        const startAngle = -Math.PI / 2;
        const endAngle = startAngle + (arc.timeValue / (12 * 60)) * (Math.PI * 2);
        
        ctx.beginPath();
        ctx.arc(center.x, center.y, parseInt(arc.radius), startAngle, endAngle);
        ctx.lineWidth = arc.thickness;
        ctx.strokeStyle = arc.color;
        ctx.stroke();
    });
}

// Event listeners for circles
[outerRadiusSlider, innerRadiusSlider, outerColorPicker, innerColorPicker].forEach(control => {
    control.addEventListener('input', drawCircles);
});

function formatTime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}

function updateArcControls() {
    const arcList = document.getElementById('arcList');
    arcList.innerHTML = ''; // Clear current arcs
    
    // Sliders min / max values can be adjusted here
    // change 720 for time slider to 1440 to make 24 hour clock & change mathematical section for const endAngle (24 * 60) for 24 hour, (12 * 60) for 12 hour
    arcs.forEach((arc, index) => {
        const arcDiv = document.createElement('div');
        arcDiv.className = 'arc-item';
        arcDiv.innerHTML = `
            <h4>Arc ${index + 1}</h4>
            <div class="slider-container">
                <span class="slider-label">Radius</span>
                <input type="range" class="arc-radius" 
                    min="${parseInt(outerRadiusSlider.value) + 10}" 
                    max="${parseInt(outerRadiusSlider.value) + 300}" 
                    value="${arc.radius}">
            </div>
            <div class="slider-container">
                <span class="slider-label">Time (<span class="time-display">${formatTime(arc.timeValue)}</span>)</span>
                <input type="range" class="arc-time" min="0" max="720" value="${arc.timeValue}">
            </div>
            <div class="slider-container">
                <span class="slider-label">Thickness</span>
                <input type="range" class="arc-thickness" min="1" max="20" value="${arc.thickness}">
            </div>
            <div class="slider-container">
                <span class="slider-label">Color</span>
                <input type="color" class="arc-color" value="${arc.color}">
            </div>
            <button class="delete">Delete Arc</button>
        `;
        
        // Add event listeners
        const radiusSlider = arcDiv.querySelector('.arc-radius');
        radiusSlider.addEventListener('input', () => {
            arc.radius = parseInt(radiusSlider.value);
            drawCircles();
        });
        
        const timeSlider = arcDiv.querySelector('.arc-time');
        const timeDisplay = arcDiv.querySelector('.time-display');
        timeSlider.addEventListener('input', () => {
            arc.timeValue = parseInt(timeSlider.value);
            timeDisplay.textContent = formatTime(arc.timeValue);
            drawCircles();
        });
        
        const thicknessSlider = arcDiv.querySelector('.arc-thickness');
        thicknessSlider.addEventListener('input', () => {
            arc.thickness = parseInt(thicknessSlider.value);
            drawCircles();
        });
        
        const colorPicker = arcDiv.querySelector('.arc-color');
        colorPicker.addEventListener('input', () => {
            arc.color = colorPicker.value;
            drawCircles();
        });
        
        const deleteButton = arcDiv.querySelector('.delete');
        deleteButton.addEventListener('click', () => {
            deleteArc(arc.id);
        });
        
        arcList.appendChild(arcDiv);
    });
}

// Arc management
const addArcButton = document.getElementById('addArc');
console.log('Add Arc Button:', addArcButton); // Debug line

addArcButton.addEventListener('click', () => {
    console.log('Add Arc clicked'); // Debug line
    // Limit # of arcs creatable with commented section below
    // if (arcs.length >= 3) {
    //     alert('Maximum of 3 arcs allowed');
    //     return;
    // }

    // Arc Min and Max radius will be relative to outer circle size, if circle is bigger, base radius range will be bigger
    const arcRadius = parseInt(outerRadiusSlider.value) + 20;
    const newArc = {
        id: Date.now(),
        radius: arcRadius,
        timeValue: 180,
        color: '#0000ff',
        thickness: 2
    };
    
    arcs.push(newArc);
    console.log('Arcs array after push:', arcs); // Debug line
    updateArcControls();
    drawCircles();
});

document.getElementById('resetCircle').addEventListener('click', () => {
    arcs = [];
    updateArcControls();
    drawCircles();
});

function deleteArc(id) {
    arcs = arcs.filter(a => a.id !== id);
    updateArcControls();
    drawCircles();
}

// Initial draw
drawCircles();