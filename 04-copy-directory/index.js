let fs = require('fs');
const path = require('path');

const note = '/Users/asus/Desktop/проекты/HTML-builder/04-copy-directory/';

fs.mkdir(note + 'files-copy',{recursive:true}, (err) => {
   if (err) throw err; 
   console.log('Папка успешно создана');
   
   fs.readdir(note+'/files/', {withFileTypes: true}, (err, files) => {
    if (err) throw err;
    for (let file of files){
  
      let base = path.basename(file.name);
  
      fs.copyFile(note+'/files/'+base, note+'/files-copy/'+base, (err) => {
        if(err) throw err; // не удалось скопировать файл
        console.log('Файл успешно скопирован');
     });
    }
   
  });

   
});
