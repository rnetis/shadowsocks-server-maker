var http = require('http');
var fs = require('fs');
const dgram = require('dgram');

var server = http.createServer(function (req, res) {
	
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
				//var comm = "ssserver -p " + port + " " + arr + " -d start";
				var pass = arr.replace("-k", "");
				var mess = "add: {'server_port': "+ port +", 'password': "+ pass +"}";
				var comm = Buffer.from(mess);
				const client = dgram.createSocket('udp4');
				console.log(comm);
				
				client.send(comm, 6001, "localhost", (err) => {
					client.close();
				});
				
				//var pass = arr.replace("-k", "");
				body = "Your shadowsocks vpn server run on 188.40.20.151:" + port + "\nAnd your password is " + pass;
				
			}
        });

        req.on("end", function(){
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(body);
        });
    }

}).listen(80);

console.log("Server started...");
