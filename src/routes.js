const { Router } = require('express');
const routes = Router();
const connection = require('./config/dbConfig');



// Dados
routes.get(`/dados`, (req, res) => {

    let arrayLocais = [

    {id: 0, rua: "R. Sacadura Cabral, 135 - Saúde, Rio de Janeiro - RJ, 20081-261", long: -22.8977205, lati: -43.1863216, categoria: 'bar'},

    {id: 1, rua: "Rua dos Arcos s/n, Rio de Janeiro - RJ, 20230-060", long: -22.9129469, lati: -43.1807353, categoria: 'lanchonete'},

    {id: 2, rua: "R. Ceará - Praca da Bandeira, Rio de Janeiro - RJ, 20270-200", long: -22.8930707, lati: -43.2324169, categoria: 'Bar'}

    ]
    
    res.json({response: arrayLocais})

});


// Login
routes.get('/login', (req, res) => {
    connection.query(`SELECT email, senha FROM cadastro WHERE email = '${req.body.loginEmail}' and senha = '${req.body.loginPassword}';`, (err, dados) => {
        if (err){
            return err.stack
        } else {
            if (dados == '') {
                res.send("usuário cadastrado");
            } else {
                res.send('Usuário encontrado');
            };
        };
    });
});


// Insert data into database
routes.post('/users', (req, res) => {
    connection.query(`select email from cadastro where email = '${req.body.email}';`, (err, dados) => {
        if(err){
            return err.stack;
        }
        else {
            if (dados == '') {
                connection.query(`INSERT INTO cadastro (dtnascimento, email, id, nome, password) VALUES 
                (default, "${req.body.email}", default ,"${req.body.name}", "${req.body.password}")`)
                res.send('<h1 style="color: green">Cadastrado com sucesso</h1>');
            }
            else {
                res.send('<h1 style="color: red">Usuário já cadastrado<h1>')
            }
        }
    });
});


// delete data from database
routes.delete('/users', (req, res) => {
    connection.query(`SELECT email FROM cadastro WHERE email = "${req.body.email}"`, (err, results) => {
        console.log(`resultado: ${results}, erro: ${err}`)
        if (err){
            return err.stack;
        }
        else {
            if (results == '') {
                res.json({ mensagem: "Usuário não existe" });
            }
            else {
                connection.query(`DELETE FROM cadastro WHERE email = "${req.body.email}"`)
                res.json({mensagem: "Usuário deletado com sucesso"});
            };
        };
    });
});


module.exports = routes;