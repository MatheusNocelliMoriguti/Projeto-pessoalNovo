const $startGameButton = document.querySelector(".start-quiz") // pegando as variaveis que existem no html
const $questionsContainer = document.querySelector(".questions-container")
const $answersContainer = document.querySelector(".answers-container")
const $questionText = document.querySelector(".question")
const $nextQuestionButton = document.querySelector(".next-question")

$startGameButton.addEventListener("click", startGame)   // capturar o evento de click, depois rodar a função de começar o quiz
$nextQuestionButton.addEventListener("click", displayNextQuestion) // capturar evento do click para proxima pergunta

let currentQuestionIndex = 0  //qual pergunta atual
let totalCorrect = 0 // acertos (index++)


function startGame() {
    $startGameButton.classList.add("hide")  // botao de começar o quiz desaparece
    $questionsContainer.classList.remove("hide") // questões aparece novamente, ela estava com a class hide
    displayNextQuestion() // funcão para a proxima pergunta
}

function displayNextQuestion(){
    resetState()

    if(questions.length == currentQuestionIndex){ // verificando se o jogo acabou
        return finishGame()  // parando o resto da funcção indo para função de finalizar
    }

  $questionText.textContent = questions[currentQuestionIndex].question // vendo proxima pergunta
  questions[currentQuestionIndex].answers.forEach(answer =>{ // pegando respostas da pergunta(foreAach) acessando cada uma das respostas
    const newAnswer = document.createElement("button")
    newAnswer.classList.add("button" ,"answer")
    newAnswer.textContent = answer.text // acessando o texto q esta dentro do elemento
    if (answer.correct) {  // verificando se é correta ou nao 
        newAnswer.dataset.correct = answer.correct // valor do dataset, variavel com valor, adcionando uma informação caso seja true
    }
    $answersContainer.appendChild(newAnswer) // adicionando elemento filho na pergunta

    newAnswer.addEventListener("click", selectAnswer) // quando o usurario clicar roda a funcão para ver se é true

  })
}

function resetState(){ // resetando quiz
    while($answersContainer.firstChild){  // remover filhos do elemento pai while, verificando se tem filho
        $answersContainer.removeChild($answersContainer.firstChild) // se tiver, remove!
      }
      document.body.removeAttribute("class") // removendo as class que o body tem resetando ele 
      $nextQuestionButton.classList.add("hide") // desaparecendo com o button proxima pergunta
}

function selectAnswer(){
    const answerClicked = event.target // qual foi o elemento que o usurario clicou
    if(answerClicked.dataset.correct){ // se estiver o data.set chamdo correct ee clicou na respsta correta
        document.body.classList.add("correct") // adicionando a lista para poder estilizar o body
        totalCorrect++ // adcionando na variavel
    }else{
        document.body.classList.add("incorrect") // se for incorreto nao faça nada, o body fica vermelho no css
     
    }

    document.querySelectorAll('.answer').forEach(button =>{ // selecionando todos o elemt que tenha a class 
        if(button.dataset.correct){ // mesma analise se for o button correct fica verde
            button.classList.add("correct")
        }else{
            button.classList.add("incorrect") //caso contrario vermelho 

        }
        button.disabled = true // desabilitand button. usuario nao clica mais
    })
    $nextQuestionButton.classList.remove("hide") // button proxima pergunta voltando 
    currentQuestionIndex++ // adicionando questões passadas na const

}

function finishGame(){
    const totalQuestions = questions.length // total de questoes
    const performance =  Math.floor(totalCorrect * 100 / totalQuestions)
    //calcular performance arredondando para baixo 
    
    let msg = ''

    switch (true){  // mesma coisa que if else 
        case(performance >= 90):  // caso a performance.....
        msg = 'Parabéns, você está super avançado  '
        break
        case(performance >= 70):
        msg = 'Parabéns, teve um ótimo desempenho'
        break
        case(performance >= 50):
        msg = 'Parabéns, porém se aprofunde mais nos estudos'
        break
        default:
            msg = 'Pode melhorar'
    
    }
    $questionsContainer.innerHTML = 
    `
    <p class='msgFinal'>
    Você acertou ${totalCorrect} de ${totalQuestions} questões!
    
    <span> ${msg}</span>

    </p>
    <button onclick=window.location.reload() class='button'>
    Refazer teste
    <button/>
    `

    sendHistorico(totalCorrect)
}

function sendHistorico(totalCorrect) {

  fetch("/quiz/cadastrar", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        idUsuarioServer: sessionStorage.ID_USUARIO,
        qtdAcertosServer: totalCorrect
    })
}).then(function (resposta) {

    if (resposta.ok) {
        // console.log(resposta);

        alert("ENVIADO COM SUCESSO")
    } else {

        alert("Houve um erro ao tentar enviar as respostas!");


        resposta.text().then(texto => {
            console.error(texto);
            // finalizarAguardar(texto);
        });
    }

}).catch(function (erro) {
    console.log(erro);
})

}










// banco de perguntas, array e cada posição do array(answer) é umapossivel resposta
const questions = [
    {
      question: "Dentro de qual elemento HTML colocamos o JavaScript?",
      answers: [
        { text: "<javascript>", correct: false },
        { text: "<js>", correct: false },
        { text: "<script>", correct: true },
        { text: "<scripting>", correct: false }
      ]
    },
    {
      question: "Onde é o lugar correto para inserir JavaScript?",
      answers: [
        { text: "Tanto no <head> quanto no <body> está correto", correct: true },
        { text: "No <body>", correct: false },
        { text: "No <head>", correct: false },
        { text: "Em outro lugar", correct: false }
      ]
    },
    {
      question: 'Qual é a sintaxe correta para se referir a um script externo chamado "xxx.js"',
      answers: [
        { text: '<script src="xxx.js">', correct: true },
        { text: '<script href="xxx.js">', correct: false },
        { text: '<script name="xxx.js">', correct: false },
        { text: "Nenhuma das alternativas", correct: false }
      ]
    },
    {
      question: 'O arquivo JavaScript externo deve conter a tag <script>',
      answers: [
        { text: "Verdadeiro", correct: false },
        { text: "Falso", correct: true }
      ]
    },
    {
      question: 'Como escrever "Hello World" numa caixa de alerta?',
      answers: [
        { text: 'msg("Hello World");', correct: false },
        { text: 'alert("Hello World");', correct: true },
        { text: 'msgBox("Hello World");', correct: false },
        { text: 'alertBox("Hello World");', correct: false }
      ]
    },
    {
      question: 'Como podemos criar uma função no JavaScript?',
      answers: [
        { text: 'function:myFunction()', correct: false },
        { text: 'function myFunction()', correct: true },
        { text: 'function = myFunction()', correct: false },
        { text: 'Nenhum desses códigos criaria uma função', correct: false }
      ]
    },
    {
      question: 'Como podemos chamar uma função chamada "minhaFuncao"?',
      answers: [
        { text: 'call minhaFuncao()', correct: false },
        { text: 'call function minhaFuncao()', correct: false },
        { text: 'Nenhum desses códigos chamaria essa função', correct: false },
        { text: 'minhaFuncao()', correct: true },
      ]
    },
    {
        question: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"?',
        answers: [
          { text: 'cvbcvbcvb', correct: false },
          { text: 'zxczxczxc', correct: false },
          { text: 'dfgdfgdfg', correct: false },
          { text: 'sdfsdfsdf', correct: true },
        ]
      },
      {
        question: 'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"?',
        answers: [
          { text: 'sdfsdfsdf', correct: false },
          { text: 'qweqweqwe', correct: false },
          { text: 'yuiyuiyui', correct: false },
          { text: 'yuiyuiyui', correct: true },
        ]
      },
      {
        question: 'cccccccccccccccccccccccccccccccccccccccccccccccc"?',
        answers: [
          { text: 'dddddddd', correct: false },
          { text: 'hhhhhhhh', correct: false },
          { text: 'iiiiiiii', correct: false },
          { text: 'jjjjjjjj', correct: true },
        ]
      },
    
  ]