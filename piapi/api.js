/*
    import the sql module as well as
    the file system and operational system modulas
*/
const sql = require('mssql');
const fs = require("fs");
const os = require("os");
const config = require("./config.js");
const { connect } = require('./app.js');

let connection;


async function search(req, res) {
  try {
    const query = "SELECT UENOMEFANTASIA AS 'empresa', NAMEVAGA AS 'vaga', ID AS 'id' FROM TB_USEREMPRESA E INNER JOIN TA_VAGA V ON E.UEID = V.FK_EMPRESA;";

    connection = await new sql.ConnectionPool(config.db_settings).connect();

    const result = await connection.request().query(query);

    let info = [];

    for (let i = 0; i < result.recordset.length; i++) {
      info[i] = {
        vaga: result.recordset[i].vaga,
        empresa: result.recordset[i].empresa,
        id: result.recordset[i].id
      };
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(info));
  }
  catch (err) {
    console.log(err)
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      "err": err
    }));
  }
}

async function alterarsituacaocandidato(req, res) {
  try {
    const bodyData = req.body;

    const updatequery = `UPDATE TA_CANDIDATURA SET IND_ACEITO = '${bodyData.situacao}' WHERE ID = '${bodyData.id}';`

    connection = await new sql.ConnectionPool(config.db_settings).connect();

    const result = await connection.request().query(updatequery);

    if (result.rowsAffected.length === 0) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        "err": "Houve um erro no Delete!"
      }));
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      "msg": "Usuario Excluido."
    }));
  }
  catch (err) {
    console.log(err);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      "err": err
    }));
  }
}
async function vacancyCompanyList(req, res) {
  try {
    const id = req.query.id;

    const query = `SELECT C.ID AS 'VAGAID',P.UPID AS 'USERID', P.UPNOME AS 'NOMECANDIDATO' , P.UPCIDADE AS 'CIDADE', P.UPEMAIL AS 'EMAIL', P.UPTELEFONE AS 'TELEFONE', P.UPCURSO AS 'CURSO', C.IND_ACEITO AS 'ACEITO', V.NAMEVAGA AS 'NOMEVAGA' FROM TB_USERPESSOA P 
    INNER JOIN TA_CANDIDATURA C ON P.UPID = C.FK_USUARIO 
    INNER JOIN TA_VAGA V ON C.FK_VAGA = V.ID  
    INNER JOIN TB_USEREMPRESA E ON E.UEID = V.FK_EMPRESA
    WHERE UEID = '${id}' ;`

    connection = await new sql.ConnectionPool(config.db_settings).connect();

    const result = await connection.request().query(query);

    if (result.rowsAffected.length === 0) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        "err": "Houve um erro ao buscar os dados das vagas!"
      }));
      return;
    }

    let info = [];

    console.log(result)

    for (let i = 0; i < result.recordset.length; i++) {
      info[i] = {
        nomecandidato: result.recordset[i].NOMECANDIDATO,
        cidade: result.recordset[i].CIDADE,
        email: result.recordset[i].EMAIL,
        telefone: result.recordset[i].TELEFONE,
        vagaid: result.recordset[i].VAGAID,
        nomevaga: result.recordset[i].NOMEVAGA,
        aceito: result.recordset[i].ACEITO,
      };
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(info));
  }
  catch (err) {
    console.log(err);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      "err": err
    }));
  }
}
async function vacancyUserList(req, res) {
  try {

    const id = req.query.id;

    const query = `SELECT V.NAMEVAGA AS 'nomevaga', V.TIPO AS 'tipovaga', V.[LOCAL] AS 'local', V.TIPO AS 'tipo', E.UENOMEFANTASIA AS 'nomeempresa', C.FK_USUARIO AS 'userid' , C.IND_ACEITO AS 'aceito'  FROM TA_VAGA AS V INNER JOIN TA_CANDIDATURA AS C ON V.ID = C.FK_VAGA INNER JOIN TB_USEREMPRESA AS E ON V.FK_EMPRESA = E.UEID WHERE C.FK_USUARIO = '${id}'`

    connection = await new sql.ConnectionPool(config.db_settings).connect();

    const result = await connection.request().query(query);

    if (result.rowsAffected.length === 0) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        "err": "Houve um erro ao buscar os dados da vagas!"
      }));
      return;
    }

    let info = [];

    console.log(result)

    for (let i = 0; i < result.recordset.length; i++) {
      info[i] = {
        nomevaga: result.recordset[i].nomevaga,
        nomeempresa: result.recordset[i].nomeempresa,
        tipo: result.recordset[i].tipovaga,
        local: result.recordset[i].local,
        aceito: result.recordset[i].aceito,
      };
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(info));
  }
  catch (err) {
    console.log(err);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      "err": err
    }));
  }
}

async function vacancyCreate(req, res) {
  try {
    const bodyData = req.body;

    const query = `INSERT INTO TA_VAGA (NAMEVAGA, DESCVAGA, TIPO, LOCAL, EMAIL, TELEFONE ,FK_EMPRESA) VALUES ('${bodyData.nome}', '${bodyData.desc}','${bodyData.tipo}', '${bodyData.local}', '${bodyData.email}', '${bodyData.telefone}' ,'${bodyData.id}');`;

    connection = await new sql.ConnectionPool(config.db_settings).connect();

    const result = await connection.request().query(query);

    if (result.rowsAffected.length === 0) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        "err": "Houve um erro na criação da vaga!"
      }));
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      "msg": "Vaga criada."
    }));
  }
  catch (err) {
    console.log(err)
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      "err": err
    }));
  }
}

async function applyVacancy(req, res) {
  try {
    const bodyData = req.body;

    const query = `INSERT INTO TA_CANDIDATURA (FK_VAGA, FK_USUARIO, IND_ACEITO) VALUES ('${bodyData.vagaid}', '${bodyData.userid}', NULL);`;

    console.log(query);

    connection = await new sql.ConnectionPool(config.db_settings).connect();

    const result = await connection.request().query(query);

    if (result.rowsAffected.length === 0) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        "err": "Houve um erro na criação da candidatura!"
      }));
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      "msg": "Candidatura Registrada."
    }));
  }
  catch (err) {
    console.log(err)
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      "err": err
    }));
  }
}

async function getVacancy(req, res) {
  try {
    const id = req.query.id;

    const query = `SELECT NAMEVAGA, DESCVAGA, EMAIL, TELEFONE, TIPO, LOCAL ,UENOMEFANTASIA FROM TA_VAGA V INNER JOIN TB_USEREMPRESA E ON V.FK_EMPRESA = E.UEID WHERE ID = '${id}'`

    connection = await new sql.ConnectionPool(config.db_settings).connect();

    const result = await connection.request().query(query);

    if (result.rowsAffected.length === 0) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        "err": "Houve um erro ao buscar os dados da vaga!"
      }));
      return;
    }

    let info = {
      "name": result.recordset[0].NAMEVAGA,
      "desc": result.recordset[0].DESCVAGA,
      "empresa": result.recordset[0].UENOMEFANTASIA,
      "telefone": result.recordset[0].TELEFONE,
      "tipo": result.recordset[0].TIPO,
      "local": result.recordset[0].LOCAL,
      "email": result.recordset[0].EMAIL,
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(info));
  }
  catch (err) {
    console.log(err);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      "err": err
    }));
  }
}

async function changePasswordUser(req, res) {
  try {
    const bodyData = req.body;

    const query = `UPDATE TB_USERPESSOA SET UPSENHA = '${bodyData.senha}' WHERE UPEMAIL = '${bodyData.email}'`;

    connection = await new sql.ConnectionPool(config.db_settings).connect();

    const result = await connection.request().query(query);

    if (result.rowsAffected.length === 0) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        "err": "Houve um erro ao salvar a senha nova!"
      }));
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      "msg": "Senha Salva."
    }));
  }
  catch (err) {
    console.log(err)
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      "err": err
    }));
  }
}

async function changePasswordCompany(req, res) {
  try {
    const bodyData = req.body;

    const query = `UPDATE TB_USEREMPRESA SET UESENHA = '${bodyData.senha}' WHERE UEEMAIL = '${bodyData.email}'`;

    connection = await new sql.ConnectionPool(config.db_settings).connect();

    const result = await connection.request().query(query);

    if (result.rowsAffected.length === 0) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        "err": "Houve um erro ao salvar a senha nova!"
      }));
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      "msg": "Senha Salva."
    }));
  }
  catch (err) {
    console.log(err)
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      "err": err
    }));
  }
}

async function getuser(req, res) {
  try {
    const id = req.query.id;

    let query = "";

    if (id) {
      query = `SELECT UPNOME, UPCPF, NAMEUF, UPANOFORMACAO, UPINSTITUICAO, UPCURSO, UPBIO  FROM TB_USERPESSOA U INNER JOIN TA_UF UF ON UPIDUF = UF.ID WHERE UPID = '${id}'`;
    }
    else {
      const email = req.query.email;
      query = `SELECT UPNOME, UPCPF, NAMEUF, UPANOFORMACAO, UPINSTITUICAO, UPCURSO, UPBIO  FROM TB_USERPESSOA U INNER JOIN TA_UF UF ON UPIDUF = UF.ID WHERE UPEMAIL = '${email}'`;
    }

    connection = await new sql.ConnectionPool(config.db_settings).connect();

    const result = await connection.request().query(query);

    if (result.recordset.length === 0) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        "err": "Houve um erro ao buscar os dados do seu perfil!"
      }));
      return;
    }

    let info = {
      "cpf": result.recordset[0].UPCPF,
      "nome": result.recordset[0].UPNOME,
      "uf": result.recordset[0].NAMEUF,
      "anoformacao": result.recordset[0].UPANOFORMACAO,
      "curso": result.recordset[0].UPCURSO,
      "instituicao": result.recordset[0].UPINSTITUICAO,
      "bio": result.recordset[0].UPBIO
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(info));
  }
  catch (err) {
    console.log(err);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      "err": err
    }));
  }
}

async function getcompany(req, res) {
  try {
    const id = req.query.id;

    let query = "";

    if (id) {
      query = `SELECT UENOMEFANTASIA, UECNPJ, NAMEUF, UEEMAIL, UETELEFONE, UEBIO FROM TB_USEREMPRESA E INNER JOIN TA_UF UF ON E.UEIDUF = UF.ID WHERE UEID = '${id}'`;
    }
    else {
      const email = req.query.email;
      query = `SELECT UENOMEFANTASIA, UECNPJ, NAMEUF, UEEMAIL, UETELEFONE, UEBIO FROM TB_USEREMPRESA E INNER JOIN TA_UF UF ON E.UEIDUF = UF.ID WHERE UEEMAIL = '${email}'`;
    }

    connection = await new sql.ConnectionPool(config.db_settings).connect();

    const result = await connection.request().query(query);

    if (result.recordset.length === 0) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        "err": "Houve um erro ao buscar os dados do seu perfil!"
      }));
      return;
    }

    let info = {
      "nomefantasia": result.recordset[0].UENOMEFANTASIA,
      "cnpj": result.recordset[0].UECNPJ,
      "uf": result.recordset[0].NAMEUF,
      "email": result.recordset[0].UEEMAIL,
      "telefone": result.recordset[0].UETELEFONE,
      "bio": result.recordset[0].UEBIO
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(info));
  }

  catch (err) {
    console.log(err);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      "err": err
    }));
  }

}
async function usercreate(req, res) {
  try {
    const bodyData = req.body;

    const usercreateQuery = `INSERT INTO TB_USERPESSOA (UPNOME, UPCPF, UPENDERECO, UPIDUF, UPCEP, UPSENHA, UPDATA, UPINSTITUICAO, UPCURSO, UPANOFORMACAO, UPCIDADE, UPCOMPLEMENTO, UPTELEFONE, UPEMAIL  ) 
        VALUES ('${bodyData.nome}', '${bodyData.cpf}', '${bodyData.endereco}', '${bodyData.uf}', '${bodyData.cep}', '${bodyData.password}', '${bodyData.datanasc}', '${bodyData.instituicao}', '${bodyData.curso}', '${bodyData.anoforma}', '${bodyData.cidade}', '${bodyData.complemento}', '${bodyData.telefone}', '${bodyData.email}' )`

    connection = await new sql.ConnectionPool(config.db_settings).connect();

    const result = await connection.request().query(usercreateQuery);

    if (result.rowsAffected.length === 0) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        "err": "Houve um erro na criação da conta!"
      }));
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      "msg": "Conta criada."
    }));
  }
  catch (err) {
    console.log(err);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      "err": err
    }));
  }
}

async function usercreatecompany(req, res) {
  try {
    const bodyData = req.body;

    const usercompanycreatequery = `INSERT INTO TB_USEREMPRESA(UENOMEFANTASIA, UERAZAOSOCIAL, UECNPJ, UECEP, UEENDERECO, UECOMPLEMENTO, UEIDUF, UEEMAIL, UETELEFONE, UENOMECONTATO, UECPFCONTATO, UETELEFONECONTATO, UEEMAILCONTATO, UESENHA, UEBIO )
        VALUES ('${bodyData.nomefantasia}', '${bodyData.razaosocial}', '${bodyData.cnpj}', '${bodyData.cep}', '${bodyData.endereco}', '${bodyData.complemento}', '${bodyData.uf}', '${bodyData.email}', '${bodyData.telefone}', '${bodyData.nomecontato}', '${bodyData.cpfcontato}', '${bodyData.telefonecontato}', '${bodyData.emailcontato}', '${bodyData.senha}', '')`

    connection = await new sql.ConnectionPool(config.db_settings).connect();

    const result = await connection.request().query(usercompanycreatequery);

    if (result.rowsAffected.length === 0) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify("Houve um erro na criação da conta!"));
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      "msg": "Conta criada."
    }));
  }
  catch (err) {
    console.log(err);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      "err": err
    }));
  }
}

async function logincompany(req, res) {
  try {
    const bodyData = req.body;

    const logincompanyquery = `SELECT * FROM TB_USEREMPRESA WHERE UECNPJ = '${bodyData.cnpj}' AND UESENHA = '${bodyData.senha}'`

    connection = await new sql.ConnectionPool(config.db_settings).connect();

    const loginResult = await connection.request().query(logincompanyquery);

    if (loginResult.recordset.length === 0) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        "err": "CNPJ ou Senha incorretos!"
      }));
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      "id": loginResult.recordset[0].UEID
    }));
  }
  catch (err) {
    console.log(err);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      "err": err
    }));
  }
}


// function that writes the file
async function login(req, res) {
  try {
    const bodyData = req.body;

    const loginQuery = `SELECT * FROM TB_USERPESSOA WHERE UPCPF = '${bodyData.cpf}' AND UPSENHA = '${bodyData.senha}'`;


    connection = await new sql.ConnectionPool(config.db_settings).connect();

    const loginResult = await connection.request().query(loginQuery);

    if (loginResult.recordset.length === 0) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        "err": "CPF ou Senha incorretos!"
      }));
      return;
    }

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      "id": loginResult.recordset[0].UPID
      //"cpf": result.recordset[0].UPCPF,
    }));
  }
  catch (err) {
    console.log(err);
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      "err": err
    }));
  }
}

module.exports = {
  usercreate: usercreate,
  usercreatecompany: usercreatecompany,
  login: login,
  getuser: getuser,
  logincompany: logincompany,
  getcompany: getcompany,
  vacancyCreate: vacancyCreate,
  search: search,
  getVacancy: getVacancy,
  applyVacancy: applyVacancy,
  changePasswordUser: changePasswordUser,
  changePasswordCompany: changePasswordCompany,
  vacancyUserList: vacancyUserList,
  vacancyCompanyList: vacancyCompanyList,
  alterarsituacaocandidato: alterarsituacaocandidato
}