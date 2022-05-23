
const  nodemailer = require('nodemailer');
const sql = require('mssql');

const connStr = "Server=localhost;Database=bd_portal_estagio;User Id=sa;Password=123;";

//const Smtp_Config = require('./config/configSmtp')

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


async function sendEmail(){
	
	
	await transporter.sendMail({
		text: "teste de email pelo node js",
		subject: "assunto do email",
		from: "infoportalestagioagora@gmail.com",   // Quem vai enviar o email  
		//to:["email 1", "email 2", "email 3"]
		to: ['infoportalestagioagora@gmail.com','joaoeduardopequeno@gmail.com'],   // Quem vai receber o email
	})
	.then( response=> {console.log("response",response)})
	.catch( error=>{console.log("erro send email",error)} )
	//console.log("emailSend",emailSend)
}

sendEmail();

let conexao;



//fazendo a conexão global com o sql server

const config = {
    user: '...',
    password: '...',
    server: 'localhost',
    database: '...',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
}


sql.connect(connStr)
   .then(conn => {
	      //global.conn = conn;
		  conexao= conn;
        console.log('Conexão com sql server feito com sucesso. Detalhe:');
		console.log('conexao:',conexao);
   })
   .catch(err => console.log("Erro com a conexão com o SQL server. Detalhe do erro: ",err));


   async () => {
    try {
        // make sure that any items are correctly URL encoded in the connection string   
        await sql.connect('mssql://sa:123@localhost/bd_portal_estagio')
		
        const result = await sql.query`SELECT * FROM Tb_Candidato`
        console.dir(result)
    } catch (err) {
        console.log("err ",err);
    }
}

   /*const request = new sql.Request()
   request.query("SELECT * FROM Tb_Candidato")
		  .then(result => console.log('funcionou',result))
		  .catch(err => console.log('erro no bulk. ' + err));  */


		
   //fazendo conexao  com o sql server --dml
async function execSQLQuery(sqlQry,conexao, res){
    //global.conn.request()
	     //conexao.request()
              //.query(sqlQry)
               //.then(result => res.json(result.recordset))
               //.catch(err => res.json(err));
			   /*try{
                
				let result= await request.query(sqlQry)
				console.dir("result",result)
 
				
				const result1 = await sql.query`SELECT * FROM Tb_Candidato`
				console.log(result1)

                
				const request1 = new sql.Request()
				let resposta = await request1.query('SELECT * FROM Tb_Candidato') 
				console.log("respposta",resposta)

			   }

			   catch(err) {
				console.log("err ",err)

			}*/
			  
			const request1 = new sql.Request()
				let resposta = await request1.execute.query('SELECT * FROM Tb_Candidato') 
				console.log("respposta",resposta)
			   
			   sql.close();
}

let comando= "select * from Tb_Candidato"
//execSQLQuery(comando,"")


