async function getCotacoes() {
    let campoValor = document.getElementById('valor');
    let campoResposta = document.getElementById('resposta');
    let campoValorReais = document.getElementById('valorReais');
    let campoValorDolares = document.getElementById('valorDolares');
    let campoValorEuros = document.getElementById('valorEuros');
    let dados;
    try {
        let url = 'https://api.hgbrasil.com/finance?format=json-cors&key=e33a1dfe';
        let resposta = await fetch(url);
        dados = await resposta.json();
    } catch(err) {
        campoResposta.style.display = 'none';
        return;
    }
    let formatadorReais = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
    let formatadorDolares = new Intl.NumberFormat('pt-br', {
        style: 'currency',
        currency: 'USD',
    });
    let formatadorEuros = new Intl.NumberFormat('pt-br', {
        style: 'currency',
        currency: 'EUR',
    });
    let valorReais = parseFloat(campoValor.value);
    let valorDolares = parseFloat(dados.results.currencies.USD.buy)
    let valorEuros = parseFloat(dados.results.currencies.EUR.buy)
    campoResposta.style.display = 'block';
    campoValorReais.innerText = formatadorReais.format(valorReais);
    campoValorDolares.innerText = formatadorDolares.format(valorReais / valorDolares);
    campoValorEuros.innerText = formatadorEuros.format(valorReais / valorEuros);
}

function checaValor() {
    let valorReais = parseFloat(document.getElementById('valor').value);
    let campoErro = document.getElementById('erro');
    if(isNaN(valorReais) || valorReais < 0) {
        campoErro.style.display = 'block';
    } else {
        campoErro.style.display = 'none';
        getCotacoes();
    }
}