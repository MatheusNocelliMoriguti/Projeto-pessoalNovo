
    var listaNumero = [1, 4, 16, 81, 44];
    var listaPonto = ['393 pontos','331 pontos','307 pontos','262 pontos','190 pontos'];
    var listaImagemPessoa = ['./assets/imgs/max-verstappen.7170b90d.png','./assets/imgs/lando norris2.png','./assets/imgs/charles leclerc.png','./assets/imgs/orcarpiastri.png','./assets/imgs/Lewis-Hamilton.png'];
    var listaNomePessoa=['Max Verstappen','Lando Norris','Charles Leclerc','Oscar Piastri','Lewis Hamilton'];
    var listaBandeira=['./assets/imgs/bandeira holanda.webp','./assets/imgs/reino unido.png','./assets/imgs/monaco.png','./assets/imgs/australia.png','./assets/imgs/reino unido.png'];
    var listaNomeEquipe=['Oracle Red Bull Racing','McLaren Racing Limited','Ferrari','McLaren Racing Limited','Mercedes-Benz'];
    var listaLogo=['./assets/imgs/red-bull-logo-2-1.png','./assets/imgs/logomclaren.png','./assets/imgs/Ferrari-Emblem.png','./assets/imgs/logomclaren.png','./assets/imgs/Mercedes-Benz-Logo.png']
    
    var i = 1;
    
    setInterval(trocar, 3000)
    
    
    function trocar(){
        console.log(i);
        IdNumero.innerHTML= listaNumero[i]
        IdPontos.innerHTML= listaPonto[i]
        IdImgPessoa.src= listaImagemPessoa[i]
        IdNomePessoa.innerHTML= listaNomePessoa[i]
        IdImgBandeira.src= listaBandeira[i]
        IdNomeEquipe.innerHTML= listaNomeEquipe[i]
        IdLogoimg.src= listaLogo[i]
        
        i++
        
        if(i == listaNumero.length ){
            i = 0
        }
             
    }


  

    
    
    

