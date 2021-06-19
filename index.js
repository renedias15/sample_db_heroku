let express = require('express');
let app = express();
let mongoose = require("mongoose");
let bodyParser = require('body-parser');
const engines = require('consolidate');
var hbs = require('handlebars');
let port = process.env.PORT || 80
let user = require('./app/models/user')

app.engine('hbs', engines.handlebars);
app.set('views', './views');
app.set('view engine', 'hbs');

//parse application/json and look for raw text                                        
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));

app.use(express.static('public'));

try {
	mongoose.connect(
	  "mongodb+srv://sadanand:vKazSunVLSQw7tpU@cluster0.g513h.mongodb.net/new?retryWrites=true&w=majority"
	);
	let db = mongoose.connection;
	db.on("error", console.error.bind(console, "connection error:"));
  } catch (e) {
	throw e;
  }

app.get('/', function (req, res) {
	res.render("index",{login:"x"});
});

app.get('/signup', function (req, res) {
	res.render("index",{signup:"x"});
});

app.post("/login",
	function (req, res) {
		user.findOne(req.body,(err,block)=>{
			if(block){
				res.render('landing',{name: block.name})
			}else{
				res.render('index',{login:"x",message: "User not found"})
			}
		});
		
});

app.post("/signup",
	function (req, res) {
		var u = new user(req.body);
		u.save((err,block)=>{
			if(block){
				res.render('index',{login: block})
			}else{
				res.render('index',{signup:"x",message:err})
			}
		});
});

app.listen(port);
console.log("Listening on port " + port);

module.exports = app
