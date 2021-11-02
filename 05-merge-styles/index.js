const fs = require('fs');
const path = require('path');

const note = '/Users/asus/Desktop/проекты/HTML-builder/05-merge-styles/styles/';
const noteFinal = '/Users/asus/Desktop/проекты/HTML-builder/05-merge-styles/project-dist/';

let arr = '';
fs.open((noteFinal+'bundle.css'), 'w', (err) => {
  if(err) throw err; 
});

fs.readdir(note, {withFileTypes: true}, (err, files) => {
  if (err) throw err;
  for (let file of files){

    let ext = path.extname(file.name);
    let base = path.basename(file.name);
  

   fs.stat(note+base, (err) => {

     if (file.isFile() && ext == '.css'){
      let promise = Promise.resolve();
      fs.readFile(note+base,'utf8', (err) => {
        if (err) throw err;
        
          promise = promise.then(() => {
            return new Promise((resolve) => {
              fs.readFile(note+base, (err, data) => {
                if(err) { return resolve(false); }
                arr+=data;
                return resolve(true);
              });
            });
          });
        promise.then(() => {
         fs.writeFile((noteFinal+'bundle.css'), arr, (error) =>{
          if(error) throw error; // если возникла ошибка
          }); 
        });

      });
     }

      if (err) throw err;
    });
    
  }
 


});


