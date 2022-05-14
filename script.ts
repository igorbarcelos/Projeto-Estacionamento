interface Veiculo {
    modelo: string;
    placa: string;
    entrada: Date;
}
let estacionamentos = [
  { id: '1'},
  { id: '2'},
  { id: '3'},
  { id: '4'},
  { id: '5'},
  { id: '6'},
  { id: '7'},
  { id: '8'},
  { id: '9'},
  { id: '10'}
];

let patio: any [];

(function (){
    const $ = (query: string):HTMLInputElement | null => document.querySelector(query);
    ler();
    render();
    confere (estacionamentos);

    //event listner para receber a entrada de dados da interface
    $("#estacionar")?.addEventListener("click", () => {
        const modelo = $("#modelo")?.value;
        const placa = $("#placa")?.value;

        if(!modelo || !placa) {
            alert("Todos os campos devem ser preenchidos!");
            return;
        }

        adicionar({modelo, placa, entrada:new Date()}, estacionamentos);

        
    });

    //Recebe dados de registro do estacionamento que foram salvos no local storage
    function ler (){
        return localStorage.patio ? JSON.parse(localStorage.patio): [];
    }


    //Grava os registros do estacionamentos no localstorage, com o objetivo de se ter os
    //dados dos carros registrados, mesmo se atualizar a página.
    //
    function salvar (estacionamentos: any[]){
        localStorage.setItem("patio", JSON.stringify(estacionamentos));

    }

    //Caso tenha algum dado salvo, imprime na interface.
    function render (){
        patio = ler ();
        if (patio.length==estacionamentos.length){
            converteTempo(patio);
            estacionamentos = patio;
        }
        else return;
    }

    //os registros de Data e hora recebidos do local storage são em formato string,
    // o objetivo desta função é pasar do formato string para Date.
    function converteTempo (patio: any [], ){
        for (let z = 0; z < patio.length; z++) {
            if (patio[z].hasOwnProperty(`veiculo`) == true) {
                const dataConv = new Date(patio[z].veiculo.entrada);
                console.log(dataConv);
                patio[z].veiculo.entrada = dataConv;
            }
            else continue;
        }
    }

    //Confere cada uma das vagas do estacionamento e imprime as informações do veículo na interface
    function confere(estacionamentos: any[]) {
        for (let i = 0; i < estacionamentos.length; i++) {
            if (estacionamentos[i].hasOwnProperty(`veiculo`) == false) {
                const adc = $(`#vaga${i + 1}`);
                adc.innerHTML = `Disponível`;
            }
            else if (estacionamentos[i].hasOwnProperty(`veiculo`) == true) {
                const adc = $(`#vaga${i + 1}`);
                adc.innerHTML = `
                    <div>Modelo: ${estacionamentos[i].veiculo.modelo}</div>
                    <div>Placa: ${estacionamentos[i].veiculo.placa}</div>
                    <div>Entrada: ${estacionamentos[i].veiculo.entrada}</div>
                    <button class="saida" data-placa="${estacionamentos[i].id}">Saída</button>
                    `;

                    adc.querySelector(`.saida`)?.addEventListener("click", function () {
                        remover (this.dataset.placa, estacionamentos);
                    })
            }
        }
        let naoTem = estacionamentos.filter(tem=>tem.veiculo == undefined);
        const contador = $(`#contador`);
        contador.innerHTML= `Número de Clientes: ${estacionamentos.length - naoTem.length}`;
    }

    //função que adiciona os dados de entrada da interface do html para o array "estacionamentos"
    function adicionar(veiculo:Veiculo, estacionamentos: any[]){
        for (let x = 0; estacionamentos.length>x; x++) {
            if(estacionamentos[x].veiculo==undefined){
                const vaga = estacionamentos.find(item=> item.id == estacionamentos[x].id);
                vaga.veiculo = veiculo;
                salvar(estacionamentos);
                confere(estacionamentos);
                break;
            }
            if (x==estacionamentos.length-1) {
                alert (`Não há vagas disponíveis!`)
            }
        }
    }

    //remove o veículo do array "estacionamentos", calcula o tempo de permanência e o valor a pagar
    function remover(delplaca: string, estacionamentos: any []) {
        const vaga = estacionamentos.find(item => item.id == delplaca);
        const permanencia = new Date().getTime() - vaga.veiculo.entrada.getTime();
        const tempoFix = tempo(permanencia);
        const preco = valor(permanencia);
        delete vaga.veiculo;
        salvar(estacionamentos);
        confere(estacionamentos);
        alert (`O tempo de permanência foi de ${tempoFix}, valor a pagar: R$ ${preco}`);
    }

    //converte a const "permanencia" que está em milisegundos para o formado de minutos e segundos.
    function tempo(mil: number) {
        var min = Math.floor(mil / 60000);
        var sec = Math.floor((mil % 60000) / 1000);
        return `${min}m e ${sec}s`;
    };

    //calcula o preco a pagar, e trunca para 2 casas decimais.
    function valor (tempomil:number) {
        if (tempomil<3600000) {
            return `10,00`;
        }
        else return (tempomil*10/3600000).toFixed(2);
    }
})();