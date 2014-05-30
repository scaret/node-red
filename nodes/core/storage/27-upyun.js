/**
 * Copyright 2013, 2014 IBM Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

module.exports = function(RED) {
    "use strict";
    var upyun = require("upyun");

    function UpyunNode(n) {
        RED.nodes.createNode(this,n);

        this.filename = n.filename;
        this.username = n.username;
        this.password = n.password;
        this.bucket = n.bucket;



        this.format = n.format;
        var node = this;
        var options = {};
        if (this.format) {
            options['encoding'] = this.format;
        }
        this.on("input",function(msg) {
            var filename = msg.filename || this.filename || msg.topic;
            var username = this.username;
            var password  = this.password;
            var bucket = this.bucket;

            if (!filename) {
                node.warn('No filename specified');
            } else if (!username){
                node.warn("No username specified");
            }else if (!password){
                node.warn("No password specified");
            }else if (!bucket){
                node.warn("No bucket specified");
            }else {
                var client = upyun(bucket, username, password );

                if (msg.payload instanceof Buffer || msg.payload instanceof String)
                {
                    var payload = msg.payload;
                }
                else if (msg.payload instanceof Object)
                {
                    var payload = JSON.stringify(msg.payload);
                }
                else
                {
                    var payload = msg.payload.toString();
                }

                client.uploadFile(filename, payload, function(err, status, data){
                    if (err)
                    {
                        node.warn(err);
                    }
                    else
                    {
                        msg.status = status;
                        node.send(msg);
                    }
                });
            }
        });
    }
    RED.nodes.registerType("upyun",UpyunNode);
}
