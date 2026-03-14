let paintings = [
  { title: "Mona Lisa", artist: "Leonardo da Vinci", date: 1503 },
  { title: "The Last Supper", artist: "Leonardo da Vinci", date: 1495 },
  { title: "Starry Night", artist: "Vincent van Gogh", date: 1889 },
  { title: "The Scream", artist: "Edvard Munch", date: 1893 },
  { title: "Guernica", artist: "Pablo Picasso", date: 1937 },
  { title: "The Kiss", Gustav: "Gustav Klimt", date: 1907 },
  { title: "Girl With a Pearl Earring", artist: "Johannes Vermeer", date: 1665 },
  { title: "The Birth of Venus", artist: "Sandro Botticelli", date: 1485 },
  { title: "Las Meninas", artist: "Diego Velázquez", date: 1656 },
  { title: "The Creation of Adam", artist: "Michelangelo", date: 1512 }
];

function Image(title, artist, date) {
  this.title = title;
  this.artist = artist;
  this.date = date;
}

function getImage(title, artist, date) {
  return {
    title: title,
    artist: artist,
    date: date
  };
}

let images1 = [];
paintings.forEach(function(painting) {
  images1.push(new Image(painting.title, painting.artist, painting.date));
});

let images2 = [];
images1.forEach(function(img) {
  images2.push(getImage(img.title, img.artist, img.date));
});

images2.forEach(function(img) {
  console.log("Title: " + img.title + ", Artist: " + img.artist + ", Date: " + img.date);
});