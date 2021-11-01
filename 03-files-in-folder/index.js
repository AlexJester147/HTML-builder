const fs = require('fs');
const path = require('path');

const note = '/Users/asus/Desktop/проекты/HTML-builder/03-files-in-folder/secret-folder/';

fs.readdir(note, {withFileTypes: true}, (err, files) => {
  if (err) throw err;
  for (let file of files){

    let ext = path.extname(file.name);
    let base = path.basename(file.name);

   let size = fs.stat(note+base, (err, stats) => {

     if (!file.isDirectory()){
      console.log(base.slice(0, -ext.length)+' - '+ext.slice(1) + ' - ' + stats.size/1000+'kb');
     }

      if (err) throw err;
    });
  }
 
});

