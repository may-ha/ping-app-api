var express = require('express');
var router = express.Router();
var DataService = require('../services/DataService')
/* GET home page. */
router.get('/topfive', function(req, res, next) {
  var dataService = new DataService()
  dataService.topFivePings().then(result=>{
      res.send(result); 
  });
});
router.post('/ping', function(req, res, next) {
  var url = req.body.url;
  var count = req.body.count;
  console.log(req.body)
  var dataService = new DataService();
  dataService.addUrl(url).then(()=>{
    var sys = require('sys')
    var exec = require('child_process').exec;
    
    exec(`ping -n ${count} ${url}`, (error, stdout, stderr)=>{
      res.send(stdout);
    });
  });
  
  //res.render('index', { title: 'Express' });
});

module.exports = router;
