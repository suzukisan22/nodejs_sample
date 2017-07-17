var querystring = require('querystring'),
    fs = require('fs'),
    ejs = require('ejs');
var posts = [];

var template = "";

// 表示させるテンプレートを設定
function setTemplate(fileName) {
  template = fs.readFileSync(__dirname + fileName, "utf-8");
}

// 遷移先を設定。
function movePermanently(response, fileName){
  response.writeHead(301, {"Location": "http://localhost:8888/" + fileName});
  response.end();
}


// postデータを設定
function renderForm(posts, response) {
  var data = ejs.render(template, {
    posts: posts
  });
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write(data);
  response.end();
}

// startアクション
function start(response, request) {
  console.log("Request handler 'start' was called.");

  setTemplate("/index.ejs");
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write(template);
  response.end();
}

// confirmアクション
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
    // GETアクションの場合はstartに遷移させる。
    movePermanently(response, "start");
  }
}

exports.start = start;
exports.confirm = confirm;
