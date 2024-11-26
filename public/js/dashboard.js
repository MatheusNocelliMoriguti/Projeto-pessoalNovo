vetorEquipes = [];
vetorAcertos = [];

function buscarHistorico() {
    var pessoasFerrari = 0;
    var pessoasMercedes = 0;
    var pessoasRedbull = 0;
    var pessoasMcLaren = 0;
    var basico = 0;
    var intermediario = 0;
    var avancado = 0;

    fetch("/quiz/historico", {
      method: "GET",
      headers: {
          "Content-Type": "application/json"
      }
  }).then(function (resposta) {
  
      if (resposta.ok) {
        resposta.json().then(json => {
            console.log(json);
            console.log(JSON.stringify(json));
            

            for(i = 0; i < json.length; i++) {
                console.log(json[i].equipe)

                if(json[i].equipe == 'mercedes') {
                    pessoasMercedes++;
                } else if(json[i].equipe == 'ferrari') {
                    pessoasFerrari++;
                } else if(json[i].equipe == 'redbull') {
                    pessoasRedbull++;
                } else if(json[i].equipe == 'mclaren') {
                    pessoasMcLaren++;
                }

                if(!vetorEquipes.includes(json[i].equipe)) {
                    vetorEquipes.push(json[i].equipe);
                }

                if(json[i].QtdAcerto <= 4) {
                    basico++;
                } else if(json[i].QtdAcerto <= 7) {
                    intermediario++;
                } else if(json[i].QtdAcerto <= 10) {
                    avancado++;
                }
            }
            grafico(vetorEquipes, pessoasMercedes, pessoasFerrari, pessoasRedbull, pessoasMcLaren)
            resultadoKPI1.innerHTML = basico;
            resultadoKPI2.innerHTML = intermediario;
            resultadoKPI3.innerHTML = avancado;
        })

      } else {
  
          alert("Houve um erro ao tentar buscar o histórico!");
  
  
          resposta.text().then(texto => {
              console.error(texto);
              // finalizarAguardar(texto);
          });
      }
  
  }).catch(function (erro) {
      console.log(erro);
  })



  
  }

  function grafico(a, b, c, d, e) {
    var equipes = a;
    var numeroM = b;
    var numeroF = c;
    var numeroR = d;
    var numeroMc = e;
    var graficoMedicao = document.getElementById('setor');

    new Chart(graficoMedicao, {
        type: 'pie',
        data: {
          labels: equipes,
          datasets: [{
            label: 'Quantidade',
            backgroundColor: [
              'rgb(000, 202, 220)',
              'rgb(73, 195, 251)',
              'rgb(101, 166, 250)',
              'rgb(126, 128, 231)',],
            borderColor: [
            'rgb(000, 202, 220)',
              'rgb(73, 195, 251)',
              'rgb(101, 166, 250)',
              'rgb(126, 128, 231)',
            ],
            data: [numeroM, numeroF, numeroR, numeroMc],
            borderWidth: 1
          }]
        }
    })

  }