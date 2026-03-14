// Previous Image constructor
function Image(title, artist, date) {
  this.title = title;
  this.artist = artist;
  this.date = date;
}

// Adding show method using prototype
Image.prototype.show = function() {
  console.log(this.title + " (" + this.artist + ", " + this.date + ")");
};

// Previous images object with modified show method
let images = {
  list: [],
  contains: function(title) {
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].title === title) {
        return true;
      }
    }
    return false;
  },
  add: function(title, artist, date) {
    if (!this.contains(title)) {
      this.list.push(new Image(title, artist, date));
    }
  },
  show: function() {
    for (let i = 0; i < this.list.length; i++) {
      this.list[i].show(); // Uses the prototype method now
    }
  },
  clear: function() {
    this.list = [];
  }
};

// Adding new methods without rewriting the object
images.edit = function(title, artist, date) {
  for (let i = 0; i < this.list.length; i++) {
    if (this.list[i].title === title) {
      this.list[i].artist = artist;
      this.list[i].date = date;
      break; 
    }
  }
};

images.delete = function(title) {
  for (let i = 0; i < this.list.length; i++) {
    if (this.list[i].title === title) {
      this.list.splice(i, 1);
      break;
    }
  }
};

// Testing the script
images.add('Mona Lisa', 'Leonardo da Vinci', 1503);
images.add('The Last Supper', 'Leonardo da Vinci', 1495);
images.add('The Starry Night', 'Vincent van Gogh', 1889);
images.edit('Mona Lisa', 'Leonardo da Vinci', 1504);
images.delete('The Last Supper');

images.show();