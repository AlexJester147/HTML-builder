var fs = require('fs');
// const path = require('path');

const note = '/Users/asus/Desktop/проекты/HTML-builder/01-read-file/text.txt';

fs.readFile(note,'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

