module.exports = {
    getConnectionByUser : function getConnectionByUser(sessionKey){
        var conn = signalR._connectionManager._connections;
        return conn.getByUser(sessionKey);//@note: Doesn't return a connection
    },
    verify : function verfyConnection(identity){
        var conList = signalR._connectionManager._connections;
        if(identity){
            if(conList.hasOwnProperty(identity)){
                return true;
            }else {
                return false;
            }
        }
    },
    hook : function(){
        return 'difference in connection since last check';
    },
    connections:  function connectionNum(){
        var currentConnections = signalR._connectionManager._connections; 
        var conCount = 0;
        for(var key in props){
            count += 1;
        }
        console.log("Number count:"+count-1);
        return conCount-1;
    },
    sendNotification : function sendNotification(identity,msg){
        if(identity){
            //@Todo: get a single user by token or sessionKey
        }else {
            //connections => signalR._connectionManager.[<methods>_connections/_userTokens/delByTokens/forEach/getByToken/getByUser/put]._connections{Object}
            var clientManager = signalR._connectionManager;
            msg = msg.toString();
            var messageObj = {
                Args:['server',msg],
                Hub:'MyHub',
                Method:'AddMessage',
                State:1
            };
            clientManager.forEach(function(client){
                signalR._transports.longPolling.send(client.connection,messageObj);// √
            });
            
            res.json("Notification sent !");
        }
    }

}