var http = require("http");
var url = require("url");

function start(route, handle){
  function onRequest(request, response){
    var pathname = url.parse(request.url).pathname;
    console.log("Request for" + pathname + " received.");
    route(handle, pathname, response, request);
  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started");
}

// exports関数を使用すると、外部ファイルからstart関数を使用できる。
exports.start = start;

/*
まず受信データのエンコーディングをUTF-8と定義し、
次に新しいPOSTデータの塊を受信する度にpostData変数に追記していく”data”イベントリスナーを追加、
そして全てのPOSTデータが収集できた時にだけ呼び出されるよう、
ルータ呼び出し部分をendイベントコールバック内に移動しました。
また、POSTデータは後ほどリクエストハンドラ内で必要になるため、ここでは一旦ルータに渡しています。
*/

/*
JSON.parse() メソッドは文字列を JSON として解析し、
また任意で解析によって作り出された値を変換します。
*/
