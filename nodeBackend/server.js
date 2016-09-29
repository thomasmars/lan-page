"use strict"

var express = require('express');
var r = require('rethinkdb');

var app = express();
let nextCommand = {};


app.get('/', function (req, res) {
  res.send(JSON.stringify(nextCommand));
});

app.listen(8020, function () {
  console.log('Example app listening on port 3000!');
});

var connection = null;
r.connect({
  host: process.env.RETHINKDB_PORT_28015_TCP_ADDR,
  port: 28015
}, (err, conn) => {
  if (err) throw err;
  connection = conn;
  console.log("hurra, established connection to db");


  console.log("do we have any envs ??", process.env.RETHINKDB_PORT);

  r.db('nodeThomas').table('roboQueue').run(connection, (err, result) => {
    if (err) {
      return console.log(err);
    }

    result.toArray((err, arrRes) => {
      if (err) {
        console.log("err: ", err);
      }

      console.log("toarray result", arrRes);
    })
  })

  r.db('nodeThomas').table('roboQueue').changes().run(connection, (err, cursor) => {
    cursor.each((cErr, res) => {
      if (err) throw err
      console.log("res", res)
      nextCommand = res;
    })
  })
})

