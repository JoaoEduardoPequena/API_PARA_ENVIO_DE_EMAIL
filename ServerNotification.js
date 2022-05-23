let express = require('express')
let app = express()
const cors = require('cors'); // Instalar isto via   npm install cors
//let load = require('express-load')
//let error = require('./middleware/error')
let server = require('http').createServer(app)
let socketio = require('socket.io')
let router = express.Router();

const port = process.env.PORT || 5000;

app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

//global.hoje = "global variavel"
const enableCors={
    cors: {
      origin: '*',
    }
  }

let io = socketio(server,enableCors);
   /*Socket irĂ¡ aqui depois */
  var emitir = function(req, res, next){
	var notificar = req.query.notificacao || '';
		if(notificar == '')	 {
		io.emit('notificacao', notificar);
		next();
	} else {
			next();
		}
	}
  app.use(emitir);
  app.use('/api', router);
  router.route('/notificar')
    .get(function(req, res){
    //aqui vamos receber a mensagem
    res.json({message: "testando essa rota"})

    })
  app.listen(port);
  console.log('conectado a porta ' + port);