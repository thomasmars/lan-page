"use strict"

var express = require('express');
var r = require('rethinkdb');
var net = require('net');

var app = express();
let nextCommand = {};


app.get('/', function (req, res) {
  res.send(JSON.stringify(nextCommand));
});

// app.listen(8020, function () {
//   console.log('Example app listening on port 3000!');
// });

// var connection = null;
// r.connect({
//   host: process.env.RETHINKDB_PORT_28015_TCP_ADDR,
//   port: 28015
// }, (err, conn) => {
//   if (err) throw err;
//   connection = conn;
//   console.log("hurra, established connection to db");
//
//
//   console.log("do we have any envs ??", process.env.RETHINKDB_PORT);
//
//   r.db('nodeThomas').table('roboQueue').run(connection, (err, result) => {
//     if (err) {
//       return console.log(err);
//     }
//
//     result.toArray((err, arrRes) => {
//       if (err) {
//         console.log("err: ", err);
//       }
//
//       console.log("toarray result", arrRes);
//     })
//   })
//
//   r.db('nodeThomas').table('roboQueue').changes().run(connection, (err, cursor) => {
//     cursor.each((cErr, res) => {
//       if (err) throw err
//       console.log("res", res)
//       nextCommand = res;
//     })
//   })
// })


var socketServer = net.createServer((socket) => {
  let socketOpen = true

  const repeatSignal = () => {
    console.log("repeating signal")
    setTimeout(() => {
      if (socketOpen) {
        socket.write('command F')
        repeatSignal();
      }
    }, 500)
  }

  socket.setEncoding('utf8')

  socket.on('data', (data) => {
    console.log("client says", data)
  })

  socket.on('end', () => {
    socketOpen = false
    console.log("client disconnected!");
  })

  socket.write('this is server!\r\n');

  repeatSignal()

  // socket.pipe(socket)
}).on('error', (err) => {
  throw err
})

socketServer.listen(8020, () => {
  console.log("socket listening on 8020, right ?", socketServer.address())
})

