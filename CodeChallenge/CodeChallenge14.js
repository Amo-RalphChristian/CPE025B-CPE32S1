class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.type = 'point';
  }
}

class Line {
  constructor(coords) {
    this.type = 'line';
    this.points = [];
    // Convert the array of coordinate pairs into Point objects
    for (let i = 0; i < coords.length; i++) {
      this.points.push(new Point(coords[i][0], coords[i][1]));
    }
  }
}

class Figure {
  constructor(elements = []) {
    this.elements = { points: [], lines: [] };
    
    // If starting elements are provided, sort them into the right arrays
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].type === 'point') {
        this.elements.points.push(elements[i]);
      } else if (elements[i].type === 'line') {
        this.elements.lines.push(elements[i]);
      }
    }
  }

  addPoint(x, y) {
    this.elements.points.push(new Point(x, y));
  }

  addLine(coords) {
    this.elements.lines.push(new Line(coords));
  }

  toJSON() {
    return JSON.stringify(this.elements);
  }

  fromJSON(jsonString, isAppend = false) {
    // If we are not appending, clear the existing data first
    if (!isAppend) {
      this.deleteAll();
    }

    let parsedData = JSON.parse(jsonString);

    // Reconstruct the points
    if (parsedData.points) {
      for (let i = 0; i < parsedData.points.length; i++) {
        let p = parsedData.points[i];
        this.addPoint(p.x, p.y);
      }
    }

    // Reconstruct the lines
    if (parsedData.lines) {
      for (let i = 0; i < parsedData.lines.length; i++) {
        let l = parsedData.lines[i];
        let coords = [];
        for (let j = 0; j < l.points.length; j++) {
          coords.push([l.points[j].x, l.points[j].y]);
        }
        this.addLine(coords);
      }
    }
  }

  deleteAll() {
    this.elements = { points: [], lines: [] };
  }
}

// Test code provided in the scenario
let f = new Figure();
f.addPoint(10,20);
f.addPoint(10,10);
f.addLine([[10,20], [30,40], [50,60]]);

let json = f.toJSON();
console.log(json);

f.fromJSON(json, true);
console.log(f.elements.points.length);
console.log(f.elements.lines.length);

f.fromJSON('{"points":[{"type":"point","x":10,"y":20},{"type":"point","x":10,"y":30},{"type":"point","x":10,"y":-30},{"type":"point","x":10,"y":20},{"type":"point","x":20,"y":20},{"type":"point","x":30,"y":20},{"type":"point","x":130,"y":20},{"type":"point","x":30,"y":20},{"type":"point","x":0,"y":20},{"type":"point","x":0,"y":-20},{"type":"point","x":0,"y":20}],"lines":[{"type":"line","points":[{"x":0,"y":0},{"x":10,"y":0},{"x":0,"y":10},{"x":20,"y":0},{"x":0,"y":20}]},{"type":"line","points":[{"x":30,"y":0},{"x":10,"y":0},{"x":0,"y":10},{"x":20,"y":0},{"x":0,"y":20}]},{"type":"line","points":[{"x":30,"y":0},{"x":10,"y":-10},{"x":0,"y":10},{"x":20,"y":0},{"x":0,"y":20}]},{"type":"line","points":[{"x":0,"y":0},{"x":10,"y":0},{"x":0,"y":10},{"x":20,"y":0},{"x":0,"y":20}]}]}');

console.log(f.elements.points.length);
console.log(f.elements.lines.length);