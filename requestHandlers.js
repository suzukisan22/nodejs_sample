var querystring = require('querystring'),
    fs = require('fs'),
    ejs = require('ejs');
var posts = [];

var template = "";

function setTemplate(fileName) {
  template = fs.readFileSync(__dirname + fileName, "utf-8");
}

function renderForm(posts, response) {
  var data = ejs.render(template, {
    posts: posts
  });
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write(data);
  response.end();
}

function start(response, request) {
  console.log("Request handler 'start' was called.");


  setTemplate("/index.ejs");
  renderForm(posts, response);
}

function confirm(response, request) {
  setTemplate("/confirm.ejs");

  console.log("Request handler 'confirm' was called.");
  if(request.method === "POST") {
    request.data = "";
    request.on("data", function(chunk){
      request.data += chunk;
      console.log(request.data);
    });
    request.on("end", function(){
      var query = querystring.parse(request.data);
      var posts = {
        title: query.title,
        content: query.content
      };
      renderForm(posts, response);
    });
  } else {
    response.location("/start");
  }
}

exports.start = start;
exports.confirm = confirm;
