var quizModel = require("../models/quizModel");

function cadastrarHistorico(req, res) {
  var idUsuario = req.body.idUsuarioServer;
  var qtdAcertos = req.body.qtdAcertosServer;

  quizModel.cadastrarHistorico(idUsuario, qtdAcertos).then((resultado) => {
    if (resultado.length > 0) {
      res.status(200).json(resultado);
    } else {
      res.status(204).json([]);
    }
  }).catch(function (erro) {
    console.log(erro);
    console.log("Houve um erro ao cadastrar histórico: ", erro.sqlMessage);
    res.status(500).json(erro.sqlMessage);
  });
}

function buscarHistorico(req, res) {
    
    quizModel.buscarHistorico().then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).json([]);
      }
    }).catch(function (erro) {
      console.log(erro);
      console.log("Houve um erro ao cadastrar histórico: ", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
  }

module.exports = {
    cadastrarHistorico,
    buscarHistorico
}