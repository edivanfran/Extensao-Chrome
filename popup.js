// Qual opção foi selecionada
const seleciado = document.getElementById('opcoes');

const div_adicionar = document.getElementById('div_adicionar');
const div_subtrair = document.getElementById('div_subtrair');
const div_dividir = document.getElementById('div_dividir');
const div_multiplicar = document.getElementById('div_multiplicar');

seleciado.addEventListener('change', trocar_opcao);

function trocar_opcao(event) {
    // Para tornar as divs invisíveis
    div_adicionar.style.visibility = 'hidden';
    div_subtrair.style.visibility = 'hidden';
    div_dividir.style.visibility = 'hidden';
    div_multiplicar.style.visibility = 'hidden';
    // Para fazer elas não continuarem a ocupar o espaço dentro no site
    div_adicionar.style.display = 'none';
    div_subtrair.style.display = 'none';
    div_dividir.style.display = 'none';
    div_multiplicar.style.display = 'none';

    switch (Number(seleciado.value)) {
        // Nenhuma opção, deixando o padrão
        case 0:
            break;

        // Adicionar
        case 1:
            div_adicionar.style.visibility = 'visible';
            div_adicionar.style.display = 'block';
            break;

        // Subtrair
        case 2:
            div_subtrair.style.visibility = 'visible';
            div_subtrair.style.display = 'block';
            break;

        // Multiplicar
        case 3:
            div_multiplicar.style.visibility = 'visible';
            div_multiplicar.style.display = 'block';
            break;

        // Dividir
        case 4:
            div_dividir.style.visibility = 'visible';
            div_dividir.style.display = 'block';
            break;
    }
}

// Para calcular o tempo e mudar o elemento
const mostra_resultado = document.getElementById('faltam');
const botao = document.getElementById('botao_calcular');

function desconverter_de_segundos(t_horas = 0, t_minutos = 0, t_segundos = 0) {
    // Pega os valores passados na função e coloca nas suas respectivas variáveis.
    let segundos = t_segundos;
    let minutos = t_minutos;
    let horas = t_horas;

    let dias = 0;
    let semanas = 0;
    let mes = 0;
    let ano = 0;

    // Essa parte fica fazendo uma conversão de segundos, minutos... até cada um chegar no seu limite que não pode ser mais convertido.
    while (true) {
        if (segundos > 59) {
            minutos += 1;
            segundos -= 60;
        } else if (minutos > 59) {
            horas += 1;
            minutos -= 60;
        } else if (horas > 23) {
            dias += 1;
            horas -= 24;
        } else if (dias > 6) {
            semanas += 1;
            dias -= 7;
        } else if (semanas >= 4) {
            mes += 1;
            semanas -= 4;
        } else if (mes > 11) {
            ano += 1;
            mes -= 12;
        } else break;
    }

    // Aqui cada parte é encaixada para ser colocada como texto.
    let resultado = `${ano} anos, ${mes} meses, ${semanas} semanas, ${dias} dias, ${horas} horas, ${minutos} minutos e ${segundos} segundos.`;
    return resultado;
}

function desconverter_de_segundos_novo(t_horas = 0, t_minutos = 0, t_segundos = 0) {
    // Pega os valores passados na função e coloca nas suas respectivas variáveis.
    let segundos = converter_segundos(t_horas, t_minutos, t_segundos);

    let dias = 0;
    let semanas = 0;
    let mes = 0;
    let ano = 0;

    segundos = segundos % 60;
    minutos = Math.floor(segundos / 60);

    let resultado = `${ano} anos, ${mes} meses, ${semanas} semanas, ${dias} dias, ${horas} horas, ${minutos} minutos e ${segundos} segundos.`;
    return resultado;
}

// t_horas = 0, isso serve caso não tenha nenhum valor definido, assim ele continua a função sendo 0 um valor padrão.
function converter_segundos(t_horas = 0, t_minutos = 0, t_segundos = 0) {
    let segundos = t_segundos;

    // Converter os horários para segundos
    segundos += t_minutos * 60;
    segundos += t_horas * 3600;

    // segundos + (minutos * 60) assim por diante
    return segundos;
}

/**
 * Essa função serve para pegar os valores do usuário e para não repetir código .
 * */
function pegar_valores_input() {
    let tempo_horas = Number(document.getElementById('horas').value);
    let tempo_minutos = Number(document.getElementById('minutos').value);
    let tempo_segundos = Number(document.getElementById('segundos').value);

    return [tempo_segundos, tempo_minutos, tempo_horas];
}

function pegar_valores_subtraindo_input() {
    let subtrair_horas = Number(document.getElementById('subtrair_horas').value);
    let subtrair_minutos = Number(document.getElementById('subtrair_minutos').value);
    let subtrair_segundos = Number(document.getElementById('subtrair_segundos').value);

    return [subtrair_segundos, subtrair_minutos, subtrair_horas];
}

// lógica da parte de adicionar
let botao_adicionar = document.getElementById('botao_adicionar');
let botao_desfazer = document.getElementById('botao_desfazer');
let botao_resetar = document.getElementById('botao_resetar');

botao_adicionar.addEventListener('click', function () {
    // desempacota os valores que viram da lista.
    let [tempo_segundos, tempo_minutos, tempo_horas] = pegar_valores_input();

    adicionar_tempo(tempo_horas, tempo_minutos, tempo_segundos);
    total_atual = desconverter_de_segundos(0, 0, (t_segundos = atualizar_ao_adicionar()));

    mostra_resultado.textContent = total_atual;
});

botao_desfazer.addEventListener('click', function () {
    historico.pop();

    total_atual = desconverter_de_segundos(0, 0, atualizar_ao_adicionar());

    mostra_resultado.textContent = total_atual;
});

botao_resetar.addEventListener('click', function () {
    historico = [];

    total_atual = desconverter_de_segundos(0, 0, atualizar_ao_adicionar());

    mostra_resultado.textContent = total_atual;
});

let historico = [];
// Temos duas opções, ou salva na lista já convertido em segundos ou mantem o formato original e fica convertendo e desconverter.
function adicionar_tempo(t_horas, t_minutos, t_segundos) {
    historico.push(converter_segundos(t_horas, t_minutos, t_segundos));
}

function atualizar_ao_adicionar() {
    segundos_total = 0;

    for (item of historico) {
        segundos_total += item;
    }

    return segundos_total;
}

function calcular_velocidade(t_horas, t_minutos, t_segundos, valorVelocidade) {
    segundo = converter_segundos(t_horas, t_minutos, t_segundos);

    return segundo / valorVelocidade;
}

function multiplicar_tempo(t_horas, t_minutos, t_segundos, valorMultiplicar) {
    segundo = converter_segundos(t_horas, t_minutos, t_segundos);

    return segundo * valorMultiplicar;
}

// Adicionar o código que vai toda lógico do botão do que vai acontecer quando for clicado.
botao.addEventListener('click', function () {
    // O horário que foi inserido
    let [tempo_segundos, tempo_minutos, tempo_horas] = pegar_valores_input();

    if (tempo_horas === 0 && tempo_minutos === 0 && tempo_segundos === 0) {
        mostra_resultado.textContent = '-Insira um valor-';
    } else {
        switch (Number(seleciado.value)) {
            // Padrão
            case 0:
                mostra_resultado.textContent = desconverter_de_segundos(
                    tempo_horas,
                    tempo_minutos,
                    tempo_segundos,
                );
                break;
            // Adição
            case 1:
                mostra_resultado.textContent = desconverter_de_segundos(
                    tempo_horas,
                    tempo_minutos,
                    tempo_segundos,
                );
                break;

            // Subtração
            case 2:
                let [subtrair_segundos, subtrair_minutos, subtrair_horas] = pegar_valores_subtraindo_input();
                segundos_normais = converter_segundos(tempo_horas, tempo_minutos, tempo_segundos);
                segundos_subtrair = converter_segundos(subtrair_horas, subtrair_minutos, subtrair_segundos);

                resultado = segundos_normais - segundos_subtrair;
                // Math.abs serve para mesmo que o valor seja negativo ainda consiga acontecer a lógica de conversão normalmente.
                if (resultado < 0) {
                    mostra_resultado.textContent = `Precisaria de mais: ${desconverter_de_segundos(0, 0, Math.abs(resultado))}`;
                } else {
                    mostra_resultado.textContent = desconverter_de_segundos(0, 0, Math.abs(resultado));
                }
                break;

            // Multiplicação
            case 3:
                const valor_multiplicar = Number(document.getElementById('multi_numero').value);
                resultado = multiplicar_tempo(tempo_horas, tempo_minutos, tempo_segundos, valor_multiplicar);

                mostra_resultado.textContent = desconverter_de_segundos(0, 0, resultado);
                break;

            // Divisão
            case 4:
                const valor_divi = Number(document.getElementById('velocidade_divi').value);
                resultado = calcular_velocidade(tempo_horas, tempo_minutos, tempo_segundos, valor_divi);

                mostra_resultado.textContent = desconverter_de_segundos(0, 0, resultado);
                break;
        }
    }
});
// mostra.textContent = form.addEventListener('submit')
// aba = await chrome.tabs.query({ active: true, currentWindows: true });

// tempo = aba.body.id.ytp - time - current
