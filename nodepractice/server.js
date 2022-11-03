// const express = require("express");

// const app = express();

// const port = 5000;

// app.listen(port, () => {
//   console.log("서버가 정상적으로 실행되었습니다.");
// });

// app.get("/", (request, response) => {
//   response.send("성공입니다!");
// });

var http = require("http");
var fs = require("fs");
var url = require("url");

var app = http.createServer(function (request, response) {
  var url2 = request.url;
  console.log(url2, "url2");
  var queryData = new URL("http://localhost:3000" + url2).searchParams;
  console.log(queryData.get(`id`), "queryData");
  // console.log(request.url, "request.url");
  if (url2 == "/") {
    url2 = "/index.html";
  }
  if (url2 == "/favicon.ico") {
    response.writeHead(404);
    response.end();
    return;
  }
  response.writeHead(200);
  response.end("?" + queryData);
  //   console.log(__dirname + url2, "__dirname + url");
});
app.listen(3000);
