class ConnectionService{
     query(qry,callBack) {
        var mysql = require('mysql');

        var con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database:"ping_db"
        });
        con.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
            con.query(qry, function (err, result) {
              if (err) throw err;
              callBack(result);
            });
        });
    }
}
module.exports = ConnectionService;
