var express = require("express");
var router = express.Router();

var quizController = require("../controllers/quizController");

//Recebendo os dados do html e direcionando para a função cadastrar de quizController.js
router.get("/historico", function (req, res) {
    quizController.buscarHistorico(req, res);
})

router.post("/cadastrar", function (req, res) {
    quizController.cadastrarHistorico(req, res);
})

module.exports = router;