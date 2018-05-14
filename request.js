var http = require('http');
var fs = require('fs');
var nodecmd = require('node-cmd');

var server = http.createServer(function (req, res) {
	
	var serv = "104.152.185.190"; //your server ip
	
	function getRndInteger(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}
	
	if (req.method === "POST") {
    
        var body = "";
        req.on("data", function (chunk) {
            body += chunk;
			
			if(body.length <= 6){
				body = "You should choose a password And bigger than 4 words"
			}else{
				var arr = chunk.toString('utf8').replace("=", " ");
				var port = getRndInteger(1000, 9999);
				var comm = "ssserver -s "+ serv +" -p " + port + " " + arr;
				//console.log(comm);
				var pass = arr.replace("-k", "");
				body = "Your shadowsocks vpn server run on 104.152.185.190:" + port + "\nAnd your password is " + pass;
				nodecmd.run(comm)
			}
        });

        req.on("end", function(){
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(body);
        });
    }

}).listen(80);

console.log("Server started...");