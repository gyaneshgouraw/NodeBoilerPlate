var express = require('express');
var app = express();
var path = process.env.PWD;
var dir = require('node-dir');
var bodyParser = require('body-parser')
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var unzip = require('unzip');
var fs = require('fs');
app.use(bodyParser());





app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.use(express.static('public'));
app.use('/static', express.static('public'));

app.use(express.static('client'));
app.use('/client', express.static('client'));



function format(path){
return  path.map(function(v){
  return v.replace("/Users/gyaneshgouraw/TestProj/labs/single/public","http://localhost:3000/static")
  })
}


app.use('/list', function(req,res){
  dir.paths(path + '/public', function(err, paths) {
      if (err) throw err;
    res.send(format(paths.files))  //console.log('files:\n',paths.files);

  });
});

// app.use('/upload',function(req,res){
//   res.send('success');
//   //console.log('success',req);
// })

app.post('/upload', multipartMiddleware, function(req, resp) {
  //resp.send(req.body, req.files);
  //req.files.image.path
fs.createReadStream(req.files.image.path).pipe(unzip.Extract({ path: path + '/public' }));
resp.send('success');
  // don't forget to delete all req.files when done
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
