var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',author: 'Edwin Zacatelco' ,appName: 'WebApp'});
});

router.get('/greeting',function(req,res,next){
  res.status(200).json({message:'Hola Campeon de la FullStack web'})

})

router.get('/saludo',function(req,res,next){
  res.send('Saludos desde Marte <-0->')

})
module.exports = router;
