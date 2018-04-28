let express = require('express')
let path = require('path')
let webRoot = __dirname + '/../dist/'

var app = express()

app.get('/', function(req, res) {
  res.sendFile(path.join(webRoot + 'index.html'))
})

app.use('/', express.static(webRoot))

let port = process.env.PORT || 5000
app.listen(port)

console.log('server started ' + port)
