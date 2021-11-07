let fs = require('fs');
const path = require('path');
var fsExtra = require('fs-extra');

const note = '/Users/asus/Desktop/проекты/HTML-builder/06-build-page/';
const noteFinal = '/Users/asus/Desktop/проекты/HTML-builder/06-build-page/project-dist/';
let arr = [];

//копирование директории
fsExtra.copy(note + '/assets', noteFinal + '/assets', (err) => {
  if (err){ throw err;
  }
  console.log('Copy completed!');
});

//создание папки
fs.mkdir(note + 'project-dist',{recursive:true}, (err) => {
   if (err) throw err; 
   console.log('Папка успешно создана');
});

//сборка стилей
fs.readdir(note + 'styles/', {withFileTypes: true}, (err, files) => {
  if (err) throw err;
  for (let file of files){

    let ext = path.extname(file.name);
    let base = path.basename(file.name);

   fs.stat(note + 'styles/' + base, (err) => {
    
     if (file.isFile() && ext == '.css'){
      let promise = Promise.resolve();
        
          promise = promise.then(() => {
            return new Promise((resolve) => {
              fs.readFile(note + 'styles/' +base, (err, data) => {
                if(err) { return resolve(false); }
                arr+=data;
                return resolve(true);
              });
            });
          });
        promise.then(() => {
         fs.writeFile((noteFinal+'style.css'), arr, (error) =>{
          if(error) throw error; // если возникла ошибка
          console.log('CSS собран!');
          }); 
        });
     }
      if (err) throw err;
    });
  }
});



//сборка html
fs.readdir(note + 'components/', {withFileTypes: true}, (err, files) => {
  if (err) throw err;

  fs.copyFile(note + '/template.html', noteFinal + '/index.html', (err) => {
    if (err) throw err;
  });

  for (let file of files){

    let ext = path.extname(file.name);
    let base = path.basename(file.name);

   fs.stat(note + 'components/' + base, (err) => {
    
    if (err) throw err;

    else if (file.isFile() && ext == '.html'){


        fs.readFile(note + 'components/' + base, 'utf8', (err, data) => {
          function getComp(){
            return data;
          }
          if(err) throw err;
          // console.log(data);
          console.log(base);
          fs.readFile(noteFinal + 'index.html', 'utf8', (err, data) => {
            if (err) throw err;
            data=data.replace(`{{${base.slice(0, - ext.length)}}}`, getComp());
            // console.log(data);
           

            fs.writeFile(noteFinal + 'index.html', data, (err) =>{
              if (err) throw err;
            });
        });
        
      })
              
              };
          })};

     });
