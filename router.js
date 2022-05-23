const express = require('express');
const app = express();
const cors = require('cors'); // Instalar isto via   npm install cors
const router = express.Router();

app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

router.get( "/", function(req,res){
   res.send("Servidor iniciado com sucesso");
})

module.exports = router;