var express = require('express'),
    bodyParser = require('body-parser');
    app = express(),
    port = 3000

var todoRoutes = require('./routes/todos');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static(__dirname + '/views'))
app.use(express.static(__dirname + '/public'))

app.get('/', function(req, res){
  res.sendFile("index.html");
});

// app.get('/', function(req, res){
//   res.json({message:"hello my friend"});
// });

app.use('/api/todos', todoRoutes);

app.listen(port, function(){
  console.log("were live");
})
