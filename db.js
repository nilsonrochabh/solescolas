var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/solescolas")
			.then(conn => global.conn = conn.db("solescolas"))
			.catch(err=>console.log(err))

var mongoClient = require("mongodb").MongoClient;
mongoClient.connect("mongodb://localhost/solescolas")
            .then(conn => global.conn = conn.db("solescolas"))
            .catch(err => console.log(err))			

var escolaSchema = new mongoose.Schema({
	TEC_NTE_RESPONSAVEL : String,
	SRE:String,
	MUNICIPIO : String,
    QUANT_ESCOLAS:String, 
    SITE:String,
	COD_ESCOLA : String,
	ESCOLA : String,
	DDD :String,
	TELEFONE : String,
	EMAIL : String,
	LABORATORIO : String,
	QTOS_LABORATORIOS: String,
	DATA_COLETA_DADOS :String,
	CONTADO_ESCOLA: String,
	QUANTI_DESKTOP_EM_CONDICOES_DE_USO : String,
	QUANTI_DE_DESKTOP_INSERVIVEL : String,
	QUANTIDE_DESKTOP :String ,
	QUANT_DESKTOP_EM_CONDICOES_DE_USO : String,
	QUANTI_DE_DESKTOP_INSERVIVEL_LAB : String,
	LINUX_EDUCACIONAL : String,
	TAGS : [String]},{collection:'MA6'}
	);

function insert(escolaSchema, callback){
    global.conn.collection("MA6").insert(escolaSchema, function(err,result){
    	if(err) return console.log(err)
    		callback();
    })
}
var ObjectId = require("mongodb").ObjectId;
function findOne(id, callback){  
    global.conn.collection("MA6").find(new ObjectId(id)).toArray(callback);
	}

module.exports = {Mongoose: mongoose, EscolaSchema: escolaSchema, findOne}