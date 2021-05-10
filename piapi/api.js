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
            "msg": "Login ok."
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
    login: login
}