// Qual opção foi selecionada
const seleciado = document.getElementById("opcoes");

const div_adicionar = document.getElementById("div_adicionar");
const div_subtrair = document.getElementById("div_subtrair");
const div_multi_div = document.getElementById("div_dividir/multiplicar");

seleciado.addEventListener("change", function (event) {
    div_adicionar.style.visibility = 'hidden';
    div_subtrair.style.visibility = 'hidden';
    div_multi_div.style.visibility = 'hidden';
    div_adicionar.style.display = 'none';
    div_subtrair.style.display = 'none';
    div_multi_div.style.display = 'none';

    switch (Number(seleciado.value)) {
        // Nenhuma opção
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
            div_multi_div.style.visibility = 'visible';
            div_multi_div.style.display = 'block';
            break;

        // Dividir
        case 4:
            div_multi_div.style.visibility = 'visible';
            div_multi_div.style.display = 'block';
            break;
    }
}
)

// Para calcular o tempo e mudar o elemento
const mostra_resultado = document.getElementById("faltam");
const botao = document.getElementById("botao_calcular");

function desconverter_de_segundos(t_horas, t_minutos, t_segundos) {
    // Pega os valores passados na função e coloca nas suas respectivas variáveis.
    let segundos = t_segundos;
    let minutos = t_minutos;
    let horas = t_horas;

    let dias = 0;
    let semana = 0;
    let mes = 0;

    // Essa parte fica fazendo uma conversão de segundos, minutos... até cada um chegar no seu limite que não pode ser mais convertido.
    while (true) {
        if (segundos >= 59) {
            minutos += 1
            segundos -= 60
        } else if (minutos > 59) {
            horas += 1
            minutos -= 60
        } else if (horas > 23) {
            dias += 1
            horas -= 24
        } else if (dias > 6) {
            semana += 1
            dias -= 7
        } else if (semana >= 4) {
            mes += 1
            semana -= 4
        } else
            break;
    }

    // Aqui cada parte é encaixada para ser colocada como texto.
    let resultado = `${mes} mes, ${dias} dias, ${horas} horas, ${minutos} minutos e ${segundos} segundos.`;
    return resultado;
}

function converter_segundos(t_horas, t_minutos, t_segundos) {
    let segundos = t_segundos;
    let minutos = t_minutos;
    let horas = t_horas;

    // Converter os horários para segundos
    while (true) {
        if (horas >= 1) {
            minutos += 60
            horas -= 1
        } else if (minutos >= 1) {
            segundos += 60
            minutos -= 1
        } else
            break
    }

    // segundos + (minutos * 60) assim por diante
    return segundos;
}

function calcular_velocidade(t_horas = tempo_horas, t_minutos = tempo_minutos, t_segundos = tempo_segundos) {
    const valor_velocidade = Number(document.getElementById("velocidade").value);

    segundo = converter_segundos(t_horas, t_minutos, t_segundos);

    return segundo / valor_velocidade;
}

historico = [];
function adicionar_tempo(t_horas, t_minutos, t_segundos) {
    historico.push(converter_segundos(t_horas, t_minutos, t_segundos));
}

function atualizar_ao_adicionar() {
    segundos_total = 0

    for (item of historico) {
        segundos_total += converter_segundos(item);
    }

    return segundos_total;
}

// // O horário que foi inserido
//     let tempo_horas = Number(document.getElementById("horas").value);
//     let tempo_minutos = Number(document.getElementById("minutos").value);
//     let tempo_segundos = Number(document.getElementById("segundos").value);

//     if (tempo_horas === 0 && tempo_minutos === 0 && tempo_segundos === 0) {
//         mostra_resultado.textContent = "-Insira um valor-";
//     } else {
//         switch (Number(seleciado.value)) {
//             // Nenhuma opção
//             case 0:
//                 mostra_resultado.textContent = desconverter_de_segundos(tempo_horas, tempo_minutos, tempo_segundos);
//                 break;

//             // Adicionar
//             case 1:
//                 adicionar_tempo(tempo_horas, tempo_minutos, tempo_segundos);
//                 desconverter_de_segundos(t_segundos = atualizar_ao_adicionar());

//             // Subtrair
//             case 2:

//                 break;

//             // Multiplicar
//             case 3:

//                 break;

//             // Dividir
//             case 4:

//                 break;

//                 }
//             }
//         }
//     );

// Adicionar o código que vai toda lógico do botão do que vai acontecer quando for clicado.
botao.addEventListener("click", function () {
    // O horário que foi inserido
    let tempo_horas = Number(document.getElementById("horas").value);
    let tempo_minutos = Number(document.getElementById("minutos").value);
    let tempo_segundos = Number(document.getElementById("segundos").value);

    if (tempo_horas === 0 && tempo_minutos === 0 && tempo_segundos === 0) {
        mostra_resultado.textContent = "-Insira um valor-";
    } else {
        mostra_resultado.textContent = desconverter_de_segundos(tempo_horas, tempo_minutos, tempo_segundos);
    }
}
)
// mostra.textContent = form.addEventListener('submit')
// aba = await chrome.tabs.query({ active: true, currentWindows: true });

// tempo = aba.body.id.ytp - time - current 