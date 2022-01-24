const controleGastos = {
    orcamento: 0.00,
    despesas: 0.00,
    saldo: 0.00
}

const campoEntradaOrcamento = document.querySelector(".formularioEntradaOrcamento input")

const buttonOrcamento = document.querySelector(".calcular")

const buttonZerarOrcamento = document.querySelector(".zerarOrcamento")

const campoNomeDespesa = document.querySelector(".formularioEntradaDespesa_nome")

const campoValorDespesa = document.querySelector(".formularioEntradaDespesa_valor")

const buttonDespesa = document.querySelector(".formularioEntradaDespesa button")

buttonOrcamento.addEventListener("click", capturarValorOrcamento)

function capturarValorOrcamento() {
    const valorOrcamento = Number(campoEntradaOrcamento.value);

    controleGastos.orcamento = valorOrcamento
    controleGastos.saldo = valorOrcamento - controleGastos.despesas

    controleGastos.saldo.toFixed(2)

    atualizarInterface()
}

buttonDespesa.addEventListener("click", capturarDespesa)

function capturarDespesa() {
    const nomeDespesa = campoNomeDespesa.value;
    const valorDespesa = Number(campoValorDespesa.value);

    controleGastos.despesas += valorDespesa
    controleGastos.saldo = controleGastos.orcamento - controleGastos.despesas

    atualizarInterface()
    adicionarDespesaInterface(nomeDespesa, valorDespesa)
}

const orcamento = document.querySelector(".secaoImpressaoResultados_orcamento p")
const despesas = document.querySelector(".secaoImpressaoResultados_despesas p")
const saldo = document.querySelector(".secaoImpressaoResultados_saldo p")

function atualizarInterface() {
    orcamento.innerText = `RS${controleGastos.orcamento.toFixed(2)}`
    despesas.innerText = `- RS${controleGastos.despesas.toFixed(2)}`
    
    if (controleGastos.saldo < 0){
        saldo.innerText = `- RS${-controleGastos.saldo.toFixed(2)}`
    } 
    else {
        saldo.innerText = `RS${controleGastos.saldo.toFixed(2)}`
    }
}

buttonZerarOrcamento.addEventListener("click", zerarOrcamento)

function zerarOrcamento() {
    let avisoZerarOrcamento 
    if (confirm("Tem certeza que deseja zerar o orçamento?")) {
        controleGastos.orcamento = 0.00

        if (controleGastos.orcamento >= controleGastos.despesas) {
        controleGastos.saldo = controleGastos.despesas
        }
        else {
        controleGastos.saldo = -controleGastos.despesas
        }

        avisoZerarOrcamento = alert("Orçamento zerado")
    }
    else { 
        avisoZerarOrcamento = alert("Operação cancelada")
    }

    atualizarInterface()
}

const listaDespesas = document.querySelector(".containerDespesas_lista")

function adicionarDespesaInterface(nomeDespesa, valorDespesa) {
    const li = document.createElement("li")
    const h3 = document.createElement("h3")
    const p = document.createElement("p")
    const img = document.createElement("img")

    h3.innerText = nomeDespesa
    p.innerText = `R$${valorDespesa.toFixed(2)}`

    img.src = "./assets/img/trash.jpg"
    img.alt = "Ícone lixeira"

    img.addEventListener("click", excluirDespesa)

    li.dataset.valor = valorDespesa
    li.appendChild(h3)
    li.appendChild(p)
    li.appendChild(img)

    listaDespesas.appendChild(li)
}

const buttonZerarDespesas = document.querySelector(".zerarDespesas")

buttonZerarDespesas.addEventListener("click", zerarDespesas)

function zerarDespesas() {
    let avisoZerarDespesas
    if (confirm("Tem certeza que deseja excluir todas as despesas?")) {
        controleGastos.despesas = 0.00
        controleGastos.saldo = controleGastos.orcamento
    
        listaDespesas.innerHTML = ""
    
        atualizarInterface()

        avisoZerarDespesas = alert("Despesas excluídas")
    }
    else { 
        avisoZerarDespesas = alert("Operação cancelada")
    }
}

function excluirDespesa(evento) {
    let avisoExcluirDespesa;
    if (confirm("Você deseja mesmo excluir esta despesa?") == true) {
        const despesaClicada = evento.target.parentNode
        const valorDespesaClicada = Number(despesaClicada.dataset.valor)

        controleGastos.despesas -= valorDespesaClicada
        controleGastos.saldo += valorDespesaClicada

        atualizarInterface()
        despesaClicada.remove()

        avisoExcluirDespesa = alert("Despesa excluída")
    } 
    else {
        avisoExcluirDespesa = alert("Operação cancelada");
    }
}