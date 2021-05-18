const { response } = require('express');
var express = require('express');
var router = express.Router();
const { Pool, Client } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sanpham',
  password: 'postgre1147@',
  port: 5432,
})

/* GET home page. */
router.get('/', function(req, res, next) {});
// apo get data from postgreSql


router.get('/getdata01', function(req, res, next) {
  pool.query('SELECT * FROM product_info', (erro,response) => {
    if(erro){
      console.log(erro)
    }
    else{
      res.send(response.rows) 
     // pool.end()
    }
  
    
  })
});

router.get('/add', function(req, res, next) {
  res.render("add",{})
});
router.post('/add', function(req, res, next) {
  
  var product_name = req.body.product_name
  var product_price = req.body.product_price
  var img = req.body.img
  
  pool.query("INSERT INTO product_info (product_name,product_price,img) values ($1,$2,$3)",
  [product_name,product_price,img], (err,response) => {
     if(err){ 
       res.send(err)
      }
     else{
       res.send("data đã nhận được " +product_name + product_price +img)
     }        
   })
});
module.exports = router;
