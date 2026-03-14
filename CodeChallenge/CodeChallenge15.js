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
    for (let i = 0; i < coords.length; i++) {
      this.points.push(new Point(coords[i][0], coords[i][1]));
    }
  }
}

class Figure {
  constructor(elements = []) {
    this.elements = { points: [], lines: [] };
    
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
    if (!isAppend) {
      this.deleteAll();
    }
    let parsedData = JSON.parse(jsonString);

    if (parsedData.points) {
      for (let i = 0; i < parsedData.points.length; i++) {
        this.addPoint(parsedData.points[i].x, parsedData.points[i].y);
      }
    }
    if (parsedData.lines) {
      for (let i = 0; i < parsedData.lines.length; i++) {
        let coords = [];
        for (let j = 0; j < parsedData.lines[i].points.length; j++) {
          coords.push([parsedData.lines[i].points[j].x, parsedData.lines[i].points[j].y]);
        }
        this.addLine(coords);
      }
    }
  }

  deleteAll() {
    this.elements = { points: [], lines: [] };
  }

  // Task 15: New method to sort and remove duplicates
  sortAndClean() {
    // 1. Sort points by X, then by Y
    this.elements.points.sort((a, b) => a.x !== b.x ? a.x - b.x : a.y - b.y);
    
    // 2. Remove duplicate points
    let uniquePoints = [];
    for (let i = 0; i < this.elements.points.length; i++) {
      if (i === 0 || this.elements.points[i].x !== this.elements.points[i-1].x || this.elements.points[i].y !== this.elements.points[i-1].y) {
        uniquePoints.push(this.elements.points[i]);
      }
    }
    this.elements.points = uniquePoints;

    // 3. Sort lines by converting them to strings for easy comparison
    this.elements.lines.sort((a, b) => JSON.stringify(a.points).localeCompare(JSON.stringify(b.points)));

    // 4. Remove duplicate lines
    let uniqueLines = [];
    for (let i = 0; i < this.elements.lines.length; i++) {
      if (i === 0 || JSON.stringify(this.elements.lines[i].points) !== JSON.stringify(this.elements.lines[i-1].points)) {
        uniqueLines.push(this.elements.lines[i]);
      }
    }
    this.elements.lines = uniqueLines;
  }
}

// Testing the new sorting and cleaning method
let f = new Figure();
f.addPoint(10, 20);
f.addPoint(10, 20); // Duplicate point
f.addPoint(5, 5);
f.addLine([[10,20], [30,40]]);
f.addLine([[10,20], [30,40]]); // Duplicate line
f.addLine([[0,0], [1,1]]);

console.log("Before sorting and cleaning:");
console.log("Total Points:", f.elements.points.length); // Will be 3
console.log("Total Lines:", f.elements.lines.length); // Will be 3

f.sortAndClean();

console.log("After sorting and cleaning:");
console.log("Total Points:", f.elements.points.length); // Will be 2
console.log("Total Lines:", f.elements.lines.length); // Will be 2