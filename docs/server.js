const express = require('express');

let app = express();
const PORT = 3000;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,HEAD,DELETE,OPTIONS');
  // 判断是否是 AJAX 请求
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  // 设定服务器类型与程序类型，如果让程序默认显示，会产生一些不安全的因素
  res.header('X-Powered-By', '3.2.1');
  if (req.method === 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
});

app.get('/user', (req, res) => {
  console.log(req.query);
  res.json({
    name: 'mark',
    age: 18
  });
});


app.listen(PORT, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is running at http://localhost:${PORT}`);
  }
})
