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

(function (){
    const $ = (query: string):HTMLInputElement | null => document.querySelector(query);
    confere (estacionamentos);

    $("#estacionar")?.addEventListener("click", () => {
        const modelo = $("#modelo")?.value;
        const placa = $("#placa")?.value;

        if(!modelo || !placa) {
            alert("Todos os campos devem ser preenchidos!");
            return;
        }

        adicionar({modelo, placa, entrada:new Date()}, estacionamentos);
    });

    function confere(estacionamentos) {
        let y = 0;
        for (let i=0; i < estacionamentos.length; i++) {
            if (estacionamentos[i].veiculo==undefined){
                const adc = $(`#vaga${i+1}`);  
                if (!adc) {continue};              
                adc.innerHTML= `Disponível`;
            }
            else {
                const adc = $(`#vaga${i+1}`);
                    if (!adc) {continue};
                    adc.innerHTML=`
                    <div>Modelo: ${estacionamentos[i].veiculo.modelo}</div>
                    <div>Placa: ${estacionamentos[i].veiculo.placa}</div>
                    <div>Entrada: ${estacionamentos[i].veiculo.entrada}</div>
                    <button class"saida" data-placa="${estacionamentos[i].veiculo.placa}">Saída</buttton>
                    `;

                    adc.querySelector(".saida")?.addEventListener("click", function () {
                        let delplaca = this.dataset.placa
                        remover (delplaca, estacionamentos);
                        console.log(delplaca);
                    })
                
                    y++;
                    const contador = $(`#contador`);  
                    if (!contador) {continue};              
                    contador.innerHTML= `Número de Clientes: ${y}`;
            }
        }
    }

    function adicionar(veiculo:Veiculo, estacionamentos){
        for (let x = 0; estacionamentos.length>x; x++) {
            if(estacionamentos[x].veiculo==undefined){
                const vaga = estacionamentos.find(item=> item.id == estacionamentos[x].id);
                vaga.veiculo = veiculo;
                confere(estacionamentos);
                break;
            }
            if (x==estacionamentos.length) {
                alert (`Não há vagas disponíveis!`)
            }
        }
    }

    function remover(delplaca, estacionamentos){
        const vaga = estacionamentos.find(veiculo => veiculo.placa == delplaca);
        delete vaga.veiculo;
        confere(estacionamentos);
    }
})();