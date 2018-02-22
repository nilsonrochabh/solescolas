var express = require('express');
var router = express.Router();

/* GET home page. */
//router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
//});


router.get('/', function(req, res, next) {
  res.render('index', { results: false });
})
router.get('/software', function(req, res, next) {
  res.render('software');
})

/* GET search page. */
router.get('/search', function (req, res, next) {
    var searchParams = req.query.query.toUpperCase();
    var db = require('../db');
    var Escola = db.Mongoose.model('MA6', db.EscolaSchema, 'MA6');
        Escola.find({ TAGS: { $all: searchParams } }, function (e, docs) {
        res.render('resultado', { results: true, search: req.query.query, list: docs });
        
    });

});
router.get('/view/:id', function(req, res, next) {
  var id = req.params.id;
  global.db.findOne(id, (e, docs) => {
      if(e) { return console.log(e); }
      res.render('view', { title: 'Dados da Escola', doc: docs[0], action: '/view/' + docs[0]._id });
    });
})


router.get('/cadEscola', function(req, res, next) {
  res.render('cadEscola', { title: 'Novo Cadastro', doc:{"SRE":"","CODIGO_CIDADE":"","CIDADE":"",
                                                        "ESCOLA":"","LOCALIZACAO":"","CEP":"","ENDERECO":"",
                                                         "NUMERO":"","COMPLEMENTO":"","BAIRRO":"","DDD":"",
                                                         "TELEFONE":"","EMAIL":"","SOFTWARE":"","LABORATORIO":"",
                                                         "REDE":"","COMPUTADORES":"","STATUS":"","SITE":"","TAGS":""},action:'cadEscola' });
});

router.post('/cadEscola', function(req, res, next) {
    var SRE = req.body.SRE;
    var COD_CIDADE = req.body.COD_CIDADE;
    var CIDADE = req.body.CIDADE;
    var CODIESCOLA = req.body.CODIESCOLA;
    var ESCOLA = req.body.ESCOLA;
    var LOCALIZACAO = req.body.LOCALIZACAO;
    var CEP= req.body.CEP;
    var ENDERECO = req.body.ENDERECO;
    var NUMERO =  req.body.NUMERO;
    var COMPLEMENTO =  req.body.COMPLEMENTO;
    var BAIRRO= req.body.BAIRRO;
    var DDD= req.body.DDD;
    var TELEFONE=  req.body.TELEFONE;
    var EMAIL =  req.body.EMAIL;
    var SOFTWARE=  req.body.SOFTWARE;
    var LABORATORIO =  req.body.LABORATORIO;
    var REDE= req.body.REDE;
    var COMPUTADORES =  req.body.COMPUTADORES;
    var STATUS =  req.body.STATUS;
    var SITE=  req.body.SITE;
    var TAGS = req.body.TAGS[String];
    require("../db").insert(SRE,COD_CIDADE,CIDADE,CODIESCOLA,ESCOLA,LOCALIZACAO,ENDERECO,NUMERO,COMPLEMENTO,BAIRRO,CEP,DDD,TELEFONE,EMAIL,SOFTWARE,LABORATORIO,REDE,COMPUTADORES,STATUS,SITE,TAG,function(){res.redirect('/');})
    res.redirect('/?SRE='+SRE);
    });

   
router.get('/construcao', function(req, res, next) {
  res.render('construcao');
})      
      

module.exports = router;
