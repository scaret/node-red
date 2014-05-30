# Node-RED with UPYUN
# Node-RED 又拍云插件

如果您想要了解Node-RED的更多细节，请戳： https://github.com/node-red/node-red

使用方法：

1. 在非windows主机上git clone这个repo。
2. 运行npm install --production
3. 运行node red.js
4. 打开浏览器，进入 http://localhost:1880
5. 复制粘贴以下代码到面板

        [{"id":"1580932c.ea7f6d","type":"http in","name":"上传入口","url":"/upload","method":"post","x":58,"y":164,"z":"fe740afa.018bf8","wires":[["17a6afea.e8595"]]},{"id":"b1c45690.4e3ba8","type":"http in","name":"UI入口","url":"/upyun","method":"get","x":141,"y":73,"z":"fe740afa.018bf8","wires":[["ff17fafb.00e808"]]},{"id":"bd42d415.42bd28","type":"http response","name":"show UI","x":521,"y":72,"z":"fe740afa.018bf8","wires":[]},{"id":"ff17fafb.00e808","type":"function","name":"make UI","func":"msg.payload = ''\n+ '<html><body>'\n+ '<form method=\"post\" action=\"/upload\">'\n+ '上传路径 + 文件名：<input name=\"filename\"/><br/>'\n+ '文件内容：<input name=\"content\"/><br/>'\n+ '<input type=\"submit\" value=\"提交\"/>'\n+ '</form></body></html>'\n\nreturn msg;","outputs":1,"x":304,"y":72,"z":"fe740afa.018bf8","wires":[["bd42d415.42bd28"]]},{"id":"17a6afea.e8595","type":"function","name":"格式整理","func":"var filename = msg.req.body.filename;\nvar payload = msg.req.body.content;\nmsg.topic = filename;\nmsg.payload = payload;\nreturn msg;","outputs":1,"x":185,"y":168,"z":"fe740afa.018bf8","wires":[["4706548e.b8f9ac","3147e909.ceb816"]]},{"id":"4706548e.b8f9ac","type":"upyun","name":"","domainName":"","bucket":"","username":"","password":"","filename":"","format":"utf8","x":323,"y":169,"z":"fe740afa.018bf8","wires":[["62f1ff53.9d0e"]]},{"id":"62f1ff53.9d0e","type":"switch","name":"判断上传成功","property":"status","rules":[{"t":"eq","v":200,"v2":0},{"t":"else"}],"checkall":"true","outputs":2,"x":485,"y":167,"z":"fe740afa.018bf8","wires":[["980ce46e.67f318"],["537ec09a.ac814","712559e3.8edaa8"]]},{"id":"980ce46e.67f318","type":"function","name":"","func":"msg.statusCode = 200;\nmsg.payload = '上传成功！<a href=\"' + msg.url +'\">查看</a>'; \nreturn msg;","outputs":1,"x":651,"y":152,"z":"fe740afa.018bf8","wires":[["c222125.f3dddf","cc9edb8e.336128"]]},{"id":"c222125.f3dddf","type":"http response","name":"","x":790,"y":198,"z":"fe740afa.018bf8","wires":[]},{"id":"3147e909.ceb816","type":"debug","name":"","active":true,"console":false,"complete":false,"x":293,"y":230,"z":"fe740afa.018bf8","wires":[]},{"id":"537ec09a.ac814","type":"function","name":"","func":"msg.payload = msg.err;\nreturn msg;","outputs":1,"x":616,"y":239,"z":"fe740afa.018bf8","wires":[["c222125.f3dddf"]]},{"id":"cc9edb8e.336128","type":"debug","name":"","active":true,"console":false,"complete":false,"x":805,"y":117,"z":"fe740afa.018bf8","wires":[]},{"id":"712559e3.8edaa8","type":"debug","name":"","active":true,"console":false,"complete":false,"x":649,"y":306,"z":"fe740afa.018bf8","wires":[]}]

6.设置upyun这个node的domain,bucket,username,password
7.按下deploy，访问http://localhost:1880/upyun
