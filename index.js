var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");
var connection = require("./mysqlConnection");


/* パスに対して呼び出すメソッドを定義
*/

var handle = []
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/commit"] = requestHandlers.commit;


/*
  server.jsのserverメソッドを実行
  requestHandlers.[パス名]のメソッドを実行
*/

server.start(router.route, handle);
