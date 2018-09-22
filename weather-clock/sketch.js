function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  var geoSuccess = function(position) {
    hideNudgeBanner();
    // We have the location, don't display banner
    clearTimeout(nudgeTimeoutId);

    // Do magic with location
    startPos = position;
    document.getElementById('startLat').innerHTML = startPos.coords.latitude;
    document.getElementById('startLon').innerHTML = startPos.coords.longitude;
  };
  var geoError = function(error) {
    switch(error.code) {
      case error.TIMEOUT:
        // The user didn't accept the callout
        showNudgeBanner();
        break;
    }
  };

  navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
}

function draw() {
  translate(windowWidth / 2, windowHeight / 2); // Center Clock
  rotate(-90);
  clear();
  background("#eeeeee");
  drawClock();
}

function drawClock() {
  const milsec = () => { const now = new Date(); return now.getMilliseconds() }

  push();
    noFill();

    // Hours
    stroke("#1769aa");
    strokeWeight(10);
    const map_hour = map(hour() < 11 ? hour() : hour() - 11, 0, 12, 0, 360);
    line(0, 0, cos(map_hour) * 200, sin(map_hour) * 200);

    // Minutes
    stroke("#2196f3");
    strokeWeight(10);
    const map_minute = map(minute(), 0, 60, 0, 360);
    line(0, 0, cos(map_minute) * 150, sin(map_minute) * 150);

    // Seconds
    stroke("#4dabf5");
    strokeWeight(5);
    const map_second = map(second() + (milsec() / 1000), 0, 60, 0, 360);
    line(0, 0, cos(map_second) * 130, sin(map_second) * 130);
  pop();
  
  // Center Dot
  noStroke();
  fill("#252525c5");
  ellipse(0, 0, 15, 15);
}



