const bodyParser = require('body-parser');
const port = 4000; //porta padrão
const sql = require('mssql');
const  nodemailer = require('nodemailer');
const cors = require('cors'); // Instalar isto via   npm install cors
const connStr = "Server=localhost;Database=bd_portal_estagio;User Id=sa;Password=123;";

const express = require('express');
const app = express();   

app.use(cors());
app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //app.use(cors());
    next();
});


//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//fazendo a conexão global
/*sql.connect(connStr)
   .then(conn => global.conn = conn)
   .catch(err => console.log(err));*/



//definindo as rotas
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));
app.use('/', router);



// Funcao para enviar email
async function sendEmail(emailDestino,textoEmail,assuntoEmail){

// configuraçoes de smtp para envio de email
const transporter = nodemailer.createTransport({
   //service:'smtp.gmail.com',
   //host: Smtp_Config.host,
   //port: Smtp_Config.port,
    host: "smtp.gmail.com",
	port: 587,
	user: "infoportalestagioagora@gmail.com",
	pass: "2012@jep@",

   secure: false,
   auth:{
	   //user: Smtp_Config.user,
	   //pass: Smtp_Config.pass
	   user: "infoportalestagioagora@gmail.com",
	   pass: "2012@jep@",
   },
   tls:{
	   rejectUnauthorized: false
   }	
});

console.log("objEmail",emailDestino,textoEmail,assuntoEmail)
    // configuração de transporte de envio de  email
    //if(estados!=="CandidaturaAceite") return null
	await transporter.sendMail({
		//text: "teste de email pelo node js",
        text: textoEmail,
		//subject: "assunto do email",
        subject: `Equipa Estágio Agora - ${assuntoEmail}`,
		from: "infoportalestagioagora@gmail.com",   // Quem vai enviar o email  
		//to: ['infoportalestagioagora@gmail.com','joaoeduardopequeno@gmail.com'],   // Quem vai receber o email
        to: emailDestino,
	})
	.then( response=> {console.log("response",response)})
	.catch( error=>{console.log("erro send email",error)} )
	//console.log("emailSend",emailSend)
    transporter.close();

}



/*function execSQLQuery(sqlQry, res){
    global.conn.request()
               .query(sqlQry)
               //.then(result => res.json(result.recordset))
               .then(  (result) => 
                        //res.json(result.recordset[0].estadoCandidatura)  
                        // Chamar Aqui a funcao de enviar email 
                        sendEmail(res.json(result.recordset[0].estadoCandidatura) )
                        .then( res=>console.log(resposemail))
                        .catch(err => res.json(err))
                   
               )
               .catch(err => res.json(err));
}*/

// Enviar email
router.post('/enviar_email', (req, res) =>{
    //const id = parseInt(req.body.id);
    //const nome = req.body.nome.substring(0,150);
    let emailDestino= req.body.emailDestino;
    let textoEmail = req.body.textoEmail;
    let assuntoEmail = req.body.assuntoEmail;
    //const cpf = req.body.cpf.substring(0,11);
    //execSQLQuery(`INSERT INTO Clientes(ID, Nome, CPF) VALUES(${id},'${nome}','${cpf}')`, res);
    sendEmail(emailDestino,textoEmail,assuntoEmail)
    .then( response=> {console.log("response",response)})
	.catch( error=>{console.log("erro send email",error)} )
})
// Candidato
/*router.get('/candidato', (req, res) =>{
    execSQLQuery('SELECT * FROM Tb_Candidato', res);
})*/


// Empresa
/*router.get('/empresa', (req, res) =>{
    //execSQLQuery('select * from Tb_Empresa', res);  
    execSQLQuery('select * from Tb_Candidato', res);
})*/


// Candidaturas
/*router.get('/candidaturas', (req, res) =>{
    execSQLQuery('select * from Tb_Candidaturas', res);
})*/


// Publicar Estagio
/*router.get('/estagio', (req, res) =>{
    execSQLQuery('select * from Tb_Estagio', res);
})*/





//  Executando muitas operações SQL
/*function execute(items, i, conn){
    if(!items[i]) return console.log("terminou");
 
    conn.request()
        .query(`DELETE Usuario WHERE email='${items[i]}'`)
        .then(result => {
            console.log(result)
            execute(items, ++i, conn)  // faz o próximo
        })
        .catch(err => console.log(err));
}*/


//inicia o servidor
app.listen(port);
console.log('API funcionando com banco de dados sql server na porta: '+port);