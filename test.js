var request = require('request');
request.post({
  url:     'http://www.botman.dx.am/setContent.php',
  form:    {cname: "fucking", cvalue: "faggot"}
}, function(error, response, body){
  console.log(body);
});

/*const https = require('https');
var querystring = require('querystring');

var data = querystring.stringify({cname: "fucking",
cvalue: "faggot"});

const options = {
  hostname: "botman.dx.am",
  port: '80',
  path: "/setContent.php",
  method: "POST",
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length,
  }
}

const req = https.request(options, (res) =>{
  console.log(res.body);
  res.setEncoding('utf8');
      res.on('data', function (chunk) {
          console.log('Response: ' + chunk);
      });
})

req.on('error', (error) => {
  console.error(error);
})

req.write(data);
req.end();*/
