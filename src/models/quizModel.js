var database = require("../database/config");

function cadastrarHistorico(idUsuario, qtdAcertos) {

    var instrucaoSql = `INSERT INTO historico (fkUsuario, fkQuiz, QtdAcerto, dtHora) VALUE (${idUsuario}, 1, ${qtdAcertos}, NOW())`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarHistorico() {

    var instrucaoSql = `SELECT * FROM historico JOIN usuario ON fkUsuario = idUsuario`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrarHistorico,
    buscarHistorico
}
