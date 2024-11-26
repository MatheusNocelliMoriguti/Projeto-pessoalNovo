function login() {
  // aguardar();

  var emailVar = input_email.value;
  var senhaVar = input_senha.value;

  // if (emailVar == "" || senhaVar == "") {
  //     cardErro.style.display = "block"
  //     mensagem_erro.innerHTML = "(Mensagem de erro para todos os campos em branco)";
  //     finalizarAguardar();
  //     return false;
  // }
  // else {
  //     setInterval(sumirMensagem, 5000)
  // }

  console.log("FORM LOGIN: ", emailVar);
  console.log("FORM SENHA: ", senhaVar);

  fetch("/usuarios/autenticar", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          emailServer: emailVar,
          senhaServer: senhaVar
      })
  }).then(function (resposta) {
      console.log("ESTOU NO THEN DO entrar()!")

      if (resposta.ok) {
          // console.log(resposta);

          resposta.json().then(json => {
            console.log(json);
            console.log(JSON.stringify(json));
            sessionStorage.ID_USUARIO = json.idUsuario;
            sessionStorage.NOME_USUARIO = json.nome;
            sessionStorage.EMAIL_USUARIO = json.email;

              if(sessionStorage.ID_USUARIO == 1){
                setTimeout(function () {
                    window.location = "dashboard.html";
                }, 500); // apenas para exibir o loading
                
              }else{
                console.log(json.idUsuario)
                setTimeout(function () {
                  window.location = "quiz.html";
              }, 500); // apenas para exibir o loading
              }
              
            
          });

      } else {

          console.log("Houve um erro ao tentar realizar o login!");
          divvalidarSenha.innerHTML =`Houve um erro ao tentar realizar o login!`


          resposta.text().then(texto => {
              console.error(texto);
              // finalizarAguardar(texto);
          });
      }

  }).catch(function (erro) {
      console.log(erro);
  })

  return false;
}

// function sumirMensagem() {
//     cardErro.style.display = "none"
// }
  
  function home() {
    window.location.href = "./index.html"; //redirecionar para a home
  }