    // Váriaveis para validação

    var nomeValidado = false
    var emailValidado = false
    var senhaValidado = false
    var confirmacaoValidado = false
    // var equipeValidado = false
    

  function cadastrar(){

  //variaveis para as inputs

    var nomeVar = document.getElementById("input_nome").value
    var emailVar = document.getElementById("input_email").value
    var senhaVar = document.getElementById("input_senha").value
    var confirmacao = document.getElementById("input_confirmacao_senha").value
    var equipeVar = document.getElementById("slc_equipes").value
    

   // Validações para redirecionar
  
    if(nomeValidado == false || emailValidado == false ||  senhaValidado == false || confirmacaoValidado == false ){



  //validar nome

    if(nomeVar.length > 0){
        divvalidarNome.innerHTML = `✅`;
        nomeValidado = true

    } else {
        divvalidarNome.innerHTML = `⛔ Insira um nome válido `;
        nomeValidado = false
    }


    //validação do email

    if (emailVar.includes("@")) {
        divvalidarEmail.innerHTML = `✅`
        emailValidado = true

    } else {
        divvalidarEmail.innerHTML = `⛔ Insira um email válido `
        emailValidado = false
    }
    
    


    


//variaveis pro if e for da senha

  var temNumero = false;
  var temNumeroCorreto = ``
  var temLetram = false;
  var temLetramCorreto= ``;
  var temLetraM = false;
  var temLetraMCorreto= ``;

if (senhaVar.length >= 8){
    
    for (var atual = 0; atual < senhaVar.length; atual++) {
       
        var atual2 = senhaVar[atual];
        
        if(atual2 >= 'A' && atual2 <= 'Z') {
            temLetraM = true;
            temLetraMCorreto = `✅`

        } else if (atual2 >= 'a' && atual2 <= 'z') {
            temLetram = true;
            temLetramCorreto = `✅`

        } else if (atual2 >= '0' && atual2 <= '9') { 
            temNumero = true;
            temNumeroCorreto = `✅`

        }
    }

    if (temLetraM && temLetram && temNumero) {
        divvalidarSenha.innerHTML = `✅`;
        senhaValidado = true

    } else {
        divvalidarSenha.innerHTML = `
           Senha deve conter ao menos 8 caracteres válidos:<br>
          ${temLetraMCorreto} Letra(s) Maiúscula(s), ${temLetramCorreto} minúsculas(s), ${temNumeroCorreto}número(s)`;
          senhaValidado = false
    }
} else {
  divvalidarSenha.innerHTML = ` Senha deve ter pelo menos 8 caracteres.`;
}


//confirmação da senha

if(confirmacao.length >= 8) {
    if(confirmacao == senhaVar) {
    
        divvalidarSenha2.innerHTML = `✅`;
        confirmacaoValidado = true

    } else {
    
        divvalidarSenha2.innerHTML = ` Senhas diferentes`; 
        confirmacaoValidado = false
    }
} else {
    
    divvalidarSenha2.innerHTML = ` Insira algo válido`;
    confirmacaoValidado = false
    } 

    if(nomeValidado && emailValidado &&  senhaValidado && confirmacaoValidado){
        botao.innerHTML = `Logar`

        input_nome.readOnly = true
        input_email.readOnly = true
        input_senha.readOnly = true
        input_confirmacao_senha.readOnly = true
        slc_equipes.readOnly = true
       
    }

  } else {
    window.location.href = "./login.html"
  }


//    // validação equipe
//    if(equipeVar.includes('Mercedes') || equipeVar.includes('Mclaren') || equipeVar.includes('Ferrari') || equipeVar.includes('RedBull')){
//     divvalidarEquipe.innerHTML = `✅`;
//     equipeValidado = true

// } else {
//     divvalidarEquipe.innerHTML = ` Insira uma Equipe válida `;
//     equipeValidado = false
// }

if (nomeValidado && emailValidado && senhaValidado && confirmacaoValidado ) {
  alert("Cadastro concluído com sucesso!");


fetch("/usuarios/cadastrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // crie um atributo que recebe o valor recuperado aqui
      // Agora vá para o arquivo routes/usuario.js
      nomeServer: nomeVar,
      emailServer: emailVar,
      senhaServer: senhaVar,
      equipeServer: equipeVar
      // idEmpresaVincularServer: idEmpresaVincular
    }),
  })
    .then(function (resposta) {
      console.log("resposta: ", resposta);

      if (resposta.ok) {
        // cardErro.style.display = "block";

        // mensagem_erro.innerHTML =
        //   "Cadastro realizado com sucesso! Redirecionando para tela de Login...";

        setTimeout(() => {
          window.location = "login.html";
        }, "2000");

        // limparFormulario();
        // finalizarAguardar();
      } else {
        throw "Houve um erro ao tentar realizar o cadastro!";
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
      // finalizarAguardar();
    });

  return false;
  }
}



  function home() {
    window.location.href = "../index.html";
  }