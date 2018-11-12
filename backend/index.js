const fs = require('fs');
var cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const app = express()

app.use(cors({ allowedHeaders: 'Content-Type, Cache-Control' }));
app.options('*', cors());

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.post('/api/cats', function (req, res) {
  readDirAsync("../src/components/cats/").then(all => {
    res.send(JSON.stringify(all))
  })
  
})

app.post('/api/check', function (req, res) {
  
  res.send({
    code: 400,
    response: fs.existsSync('../src/components/cats/'+req.body.path)
  })  
})

app.listen(3001, function (err) {
  if (err) {
    throw err
  }

  console.log('Server started on port 3001')
})

function base64_encode(file) {
  // read binary data
  var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString('base64');
}

function readFiles(dirname, onFileContent, onError) {
  fs.readdir(dirname, function(err, filenames) {
    if (err) {
      onError(err);
      return;
    }
    filenames.forEach(function(filename) {
      fs.readFile(dirname + filename, 'utf-8', function(err, content) {
        if (err) {
          onError(err);
          return;
        }
        onFileContent(filename, content);
      });
    });
  });
}

function readDirAsync(dirname){
  return new Promise((resolve, reject) => {
   let promise = []
   readFiles(dirname, (file, content) => {
  //   console.log(file)
      promise.push(new Promise((resolve, reject) => {
        resolve({
          path: file
          //content: base64_encode(dirname+file)
        })
      }))
      setTimeout(() => {
        resolve(Promise.all(promise))
        
      }, 1000)      
    }, err => console.log(err))
  })
}

