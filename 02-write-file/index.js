const fs = require('fs');

const note = '/Users/asus/Desktop/проекты/HTML-builder/02-write-file';

var readlineSync = require('readline-sync');

let text = readlineSync.question('Enter text\n');
console.log(text)

console.log(process.version)


  fs.open((note+'/hello.txt'), 'w', (err) => {
      if(err) throw err; 
  })



  fs.writeFile((note+'/hello.txt'), text, (error) =>{
    if(error) throw error; // если возникла ошибка
  })


  fs.readFile((note+'/hello.txt'),'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
  }); // выводим считанные данные
  // fs.readFile((note+'/hello.txt'),'utf8', (err, data) => {
  //   if (err) throw err;
  //   console.log(data);
  // }); // выводим считанные данные

  fs.appendFile((note+'/hello.txt'), text, function(error){
    if(error) throw error; // если возникла ошибка
    console.log("Запись файла завершена. Содержимое файла:");


    fs.readFile((note+'/hello.txt'),'utf8', (err, data) => {
      if (err) throw err;
      console.log(data);
    }); // выводим считанные данные
});




