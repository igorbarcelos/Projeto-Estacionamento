interface Veiculo {
    modelo: string;
    placa: string;
    entrada: Date;
}

interface Estacionamento {
    num: number;
    disponibilidade: "disp" | "indisp";
} 

let estacionamentos: Estacionamento [] = [
    {num: 1, disponibilidade: "disp"}, {num: 2, disponibilidade: "disp"}, {num: 3, disponibilidade: "disp"}, {num: 4, disponibilidade: "disp"}, {num: 5, disponibilidade: "disp"}, 
    {num: 6, disponibilidade: "disp"}, {num: 7, disponibilidade: "disp"}, {num: 8, disponibilidade: "disp"}, {num: 9, disponibilidade: "disp"}, {num: 10, disponibilidade: "disp"}, 
];

(function (){
    const $ = (query: string):HTMLInputElement | null => document.querySelector(query);

    $("#estacionar")?.addEventListener("click", () => {
        const modelo = $("#modelo")?.value;
        const placa = $("#placa")?.value;

        if(!modelo || !placa) {
            alert("Todos os campos devem ser preenchidos!");
            return;
        }

        adicionar({modelo, placa, entrada:new Date()}, estacionamentos);
    });

        function adicionar(veiculo: Veiculo, estacionamentos:Estacionamento[]) {

            for (let x = 0; estacionamentos.length>x; x++) {
                if(estacionamentos[x].disponibilidade=="disp"){
                    const adc = $(`#vaga${x+1}`);
                    if (!adc) {continue};
                    adc.innerHTML=`
                    <div>Modelo: ${veiculo.modelo}</div>
                    <div>Placa: ${veiculo.placa}</div>
                    <div>Entrada: ${veiculo.entrada}</div>
                    <button class"delete" data-placa="${veiculo.placa}">Saída</buttton>
                    `
                    estacionamentos[x].disponibilidade="indisp";
                    break;
                }
                if (x==9) {alert(`Não há vagas disponíveis!`)};
                          
            }

        }

    for (let i = 0; estacionamentos[i].disponibilidade=="disp" && i<estacionamentos[i].num; i++) {
        const adc = $(`#vaga${i+1}`);  
        if (!adc) {continue};              
        adc.innerHTML= `Disponível`;
    }
    
})();