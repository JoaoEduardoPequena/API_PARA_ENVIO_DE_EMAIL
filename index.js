let express = require('express')
let app = express()
const cors = require('cors'); // Instalar isto via   npm install cors
//let load = require('express-load')
//let error = require('./middleware/error')
let server = require('http').createServer(app)
let socketio = require('socket.io')

//const EnviarEmail = require("./EnviarEmail")

const connStr1 = "Server=localhost;Database=bd_portal_estagio;User Id=sa;Password=123;";
const connStr2 = "Data Source = (LocalDB)\\MSSQLLocalDB;AttachDbFilename=C:\\Users\Joao_PC\\AppData\\Local\\Microsoft\\Microsoft SQL Server Local DB\\Instances\\MSSQLLocalDB\\bd_portal_estagio.mdf;Integrated Security = True; Connect Timeout = 60;";
const connStr3 ="server = Persist Security Info = false; Initial Catalog = bd_portal_estagio; Data Source = 192.168.1.65; User Id = sa; Password = 123;";
const sql = require("mssql");
const sql2 = require("tedious");

//global.hoje = "global variavel"
const enableCors={
    cors: {
      origin: '*',
    }
  }
  
  
sql.connect(connStr1)
   .then(conn => console.log("conectou com a bd sql server!"))
   .catch(err => console.log("erro! " + err))
  
   //EnviarEmail;

let io = socketio(server,enableCors);

let router = require("./router");

const porta = process.env.PORT || 5000;

app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});

//let messages = [];

io.on('connection', (socket)=>{ 
    console.log(`Socket conectado ${socket.id}`);

    //socket.emit("MensagensAnteriores",messages);

    socket.on('chat.message', ( data) => {
        //io.emit('message', { name, message })
        //socket.broadcast.emit('receberMessage', data); // Enviar esta mensagem para o front-end ouvir
        console.log("{ name, message }",data);
        //socket.emit('chat.message1', data); // Envia a mensagem para o front-end visualizar
        //messages.push(data); // Guardar a messagens que vindo do front-end no nosso array de messagens
        io.emit('chat.message1', data); // Enviar a mensagem que chegou no servidor para o front-end
        //socket.broadcast.emit('chat.message1', data);

      })
    //socket.on('send-server', function ( ) {

        console.log("conectado");
        //console.log("conectado",data.id);

        //let msg = "<b>"+data.nome+":</b> "+data.msg+"<br>";
        //client.emit('send-client', msg);
        //client.broadcast.emit('send-client', msg);
   //});

   socket.on('disconectado', function ( ) {
       //console.log("disconectou",data.id);
       console.log("disconectou");
   });
});



app.use(router);

server.listen(porta, function (){
   console.log(`Servidor iniciado na porta ${porta}`);
});