var ConnectionService = require('./ConnectionService')
class DataService{
    
    addUrl(url){
      return new Promise((resolve,reject)=>{
        var connectionService = new ConnectionService();
        var callBack = function(result){
            
            if(!result || result.length == 0){
                connectionService.query(`insert into pings(url,count) values('${url}',1)`,()=>{
                    resolve();
                })
            }
            else{
                var count = result[0].count + 1;
                var id = result[0].id;
                connectionService.query(`update pings set count = ${count} where id = ${id}`,()=>{
                    resolve();
                })
            }
            //resolve();
        }
        connectionService.query(`select * from pings where url='${url}'`,callBack)
        // google 3
        // yahoo  4
      });
    }
    topFivePings(){
        return new Promise((resolve,reject)=>{

            var connectionService = new ConnectionService();
            connectionService.query("select * from pings order by count limit 5",(result)=>{
                resolve(result);
            });
        })
        
    }
}

module.exports = DataService;