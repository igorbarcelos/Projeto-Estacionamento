"use strict";
let estacionamentos = [
    { num: 1, disponibilidade: "disp" }, { num: 2, disponibilidade: "disp" }, { num: 3, disponibilidade: "disp" }, { num: 4, disponibilidade: "disp" }, { num: 5, disponibilidade: "disp" },
    { num: 6, disponibilidade: "disp" }, { num: 7, disponibilidade: "disp" }, { num: 8, disponibilidade: "disp" }, { num: 9, disponibilidade: "disp" }, { num: 10, disponibilidade: "disp" },
];
(function () {
    var _a;
    const $ = (query) => document.querySelector(query);
    (_a = $("#estacionar")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
        var _a, _b;
        const modelo = (_a = $("#modelo")) === null || _a === void 0 ? void 0 : _a.value;
        const placa = (_b = $("#placa")) === null || _b === void 0 ? void 0 : _b.value;
        if (!modelo || !placa) {
            alert("Todos os campos devem ser preenchidos!");
            return;
        }
        adicionar({ modelo, placa, entrada: new Date() }, estacionamentos);
    });
    function adicionar(veiculo, estacionamentos) {
        for (let x = 0; estacionamentos.length > x; x++) {
            if (estacionamentos[x].disponibilidade == "disp") {
                const adc = $(`#vaga${x + 1}`);
                if (!adc) {
                    continue;
                }
                ;
                adc.innerHTML = `
                    <div>Modelo: ${veiculo.modelo}</div>
                    <div>Placa: ${veiculo.placa}</div>
                    <div>Entrada: ${veiculo.entrada}</div>
                    <button class"delete" data-placa="${veiculo.placa}">Saída</buttton>
                    `;
                estacionamentos[x].disponibilidade = "indisp";
                break;
            }
            if (x == 9) {
                alert(`Não há vagas disponíveis!`);
            }
            ;
        }
    }
    for (let i = 0; estacionamentos[i].disponibilidade == "disp" && i < estacionamentos[i].num; i++) {
        const adc = $(`#vaga${i + 1}`);
        if (!adc) {
            continue;
        }
        ;
        adc.innerHTML = `Disponível`;
    }
})();
