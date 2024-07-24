function create_spinner() {
    var slices = spinWheelData.length;
    var sliceDeg = 360 / slices;
    var deg = rand(0, 360);
    var ctx = canvas.getContext('2d');
    var width = canvas.width; // size
    var center = width / 2;      // center

    ctx.clearRect(0, 0, width, width);
    for (var i = 0; i < slices; i++) {
        ctx.beginPath();
        ctx.fillStyle = spinWheelData[i]['BackgroundColor'];
        ctx.moveTo(center, center);
        ctx.arc(center, center, width / 2, deg2rad(deg), deg2rad(deg + sliceDeg));
        ctx.lineTo(center, center);
        ctx.fill();
        var drawText_deg = deg + sliceDeg / 2;
        ctx.save();
        ctx.translate(center, center);
        ctx.rotate(deg2rad(drawText_deg));
        ctx.textAlign = "center"; // Adjusted to center text horizontally
        ctx.textBaseline = "middle"; // Adjusted to center text vertically
        ctx.fillStyle = spinWheelData[i]['TextColor'];
        ctx.font = 'bold 15px sans-serif';
        ctx.fillText(spinWheelData[i]['spin_prizesTitle'], 100, 5);
        ctx.restore();
        deg += sliceDeg;
    }
}
create_spinner();

var deg = rand(0, 360);
var speed = 0;
var ctx = canvas.getContext('2d');
var width = canvas.width; // size
var center = width / 2;      // center
var isStopped = false;
var lock = false;
var slowDownRand = 0;

function spin() {
    var slices = spinWheelData.length;
    var sliceDeg = 360 / slices;
    deg += speed;
    deg %= 360;
    // Instant fast speed
    if (!isStopped && speed < 30) {
        speed = speed + 2;
    }
    // Stopped!
    if (isStopped) {
        if (!lock) {
            lock = true;
            slowDownRand = rand(0.986, 0.990);
        }
        speed = speed > 0.2 ? speed *= slowDownRand : 0;
    }
    // Stopped after 6 seconds
    if (lock && !speed) {
        var ai = Math.floor(((360 - deg - 90) % 360) / sliceDeg); // deg 2 Array Index
        ai = (slices + ai) % slices; // Fix negative index
        var winProbability = spinWheelData[ai]['Probability'];
        var randomNumber = 21;

        if (randomNumber > winProbability) {
            showWinPopup(spinWheelData[ai]['spin_prizesTitle']);
        } else {
            showLosePopup(spinWheelData[ai]['spin_prizesTitle']);
        }
    }
    ctx.clearRect(0, 0, width, width);
    for (var i = 0; i < slices; i++) {
        ctx.beginPath();
        ctx.fillStyle = spinWheelData[i]['BackgroundColor'];
        ctx.moveTo(center, center);
        ctx.arc(center, center, width / 2, deg2rad(deg), deg2rad(deg + sliceDeg));
        ctx.lineTo(center, center);
        ctx.fill();
        var drawText_deg = deg + sliceDeg / 2;
        ctx.save();
        ctx.translate(center, center);
        ctx.rotate(deg2rad(drawText_deg));
        ctx.textAlign = "center"; // Adjusted to center text horizontally
        ctx.textBaseline = "middle"; // Adjusted to center text vertically
        ctx.fillStyle = spinWheelData[i]['TextColor'];
        ctx.font = 'bold 15px sans-serif';
        ctx.fillText(spinWheelData[i]['spin_prizesTitle'], 100, 5);
        ctx.restore();
        deg += sliceDeg;
    }
    window.requestAnimationFrame(spin);
}

setTimeout(function () {
    isStopped = true;
}, 6000);

function deg2rad(deg) {
    return deg * Math.PI / 180;
}

function showWinPopup(prizeTitle) {
    document.getElementById('win-card').style.display = 'block';
    document.getElementById('win-prize').textContent = prizeTitle;
    document.getElementById('prize-input').value = prizeTitle;
    document.getElementById('popup-container').style.display = 'flex';
}

function showLosePopup(prizeTitle) {
    document.getElementById('lose-card').style.display = 'block';
    document.getElementById('lose-prize').textContent = prizeTitle;
    document.getElementById('popup-container').style.display = 'flex';
}

function closePopup(isWin = false) {
    document.getElementById('popup-container').style.display = 'none';
    document.getElementById('win-card').style.display = 'none';
    document.getElementById('lose-card').style.display = 'none';

    // Reset the spin wheel if the user won
    if (isWin) {
        isStopped = false;
        lock = false;
        speed = 0;
        deg = rand(0, 360);
        create_spinner();
    }
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('win-form').addEventListener('submit', function (event) {
        event.preventDefault();
        const name = document.getElementById('wname').value;
        const email = document.getElementById('wemail').value;
        const prizeTitle = document.getElementById('prize-input').value;

        // Send data to the server using AJAX or fetch
        const formData = new FormData();
        formData.append('wname', name);
        formData.append('prizeTitle', prizeTitle);

        fetch('', {
            method: 'POST',
            body: formData
        })
            .then(response => response.text())
            .then(data => {
                closePopup();
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });

    // ... (existing code) ...
});
function rand(min, max) {
    return Math.random() * (max - min) + min;
}
