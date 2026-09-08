// =============================================
// REFERÊNCIAS - INDEX
// =============================================
const pg_index = document.getElementById('pg-index')
const input_nome = document.getElementById('nomePedido')

// =============================================
// REFERÊNCIAS - CARDAPIO
// =============================================
const pg_cardapio = document.getElementById('pagina-cardapio')

// =============================================
// REFERÊNCIAS - PEDIDO
// =============================================
const pg_pedido = document.getElementById('pagina-pedido')

// =============================================
// REFERÊNCIAS - PAGAMENTO
// =============================================
const pg_pagamento = document.getElementById('pagina-pagamento')

// =============================================
// REFERÊNCIAS - PAGAR
// =============================================
const pg_pagar = document.getElementById('pagina-pagar')

// =============================================
// FUNCOES - INDEX
// =============================================

function iniciarPedido() {
    let nome = input_nome.value

    if (input_nome.value.trim() !== "") {
        localStorage.setItem('nomeCliente', nome)
        window.location.href = "cardapio.html"
    } else {
        console.log('teste')
        Swal.fire({
            text: "Por favor, preencha o campo 'Seu Nome'",
            icon: "error"
        });
    }
}

// =============================================
// FUNCOES - CARDAPIO
// =============================================
if (pg_cardapio) {
    let nomeCliente = document.getElementById('nome-cliente')
    // querySelectorAll permite usar o forEach
    let itens = document.querySelectorAll('.cardapio-sidebar li');

    itens.forEach(li => {
        li.addEventListener('click', () => {
            // Remove a classe de todos os li da sidebar
            itens.forEach(i => i.classList.remove('ativo'));

            // Adiciona a classe ativo apenas no li que foi clicado
            li.classList.add('ativo');
        });
    });

    nomeCliente.textContent = localStorage.getItem('nomeCliente')
    fetch("http://localhost:3000/produtos")
        .then(res => res.json())
        .then(produtos => {

            const cardapio = document.getElementById("cardapio");
            produtos.forEach(produto => {

                const item = document.createElement("div");

                item.innerHTML = `
            <div id="produtoCard">
            <div class="produto-cima">
            <img src="${produto.imagem}">
            <p id="nome-produto">${produto.nome}</p>
            </div>
            <div class="produto-baixo">
            <p>a partir de <br><span id="produto-preco">R$ ${produto.preco}</span></p>
            </div>
            </div>
            `;

                // QUANDO CLICAR NO PRODUTO
                item.addEventListener("click", () => {
                    adicionarAoCarrinho(produto);
                });

                console.log(item)
                console.log(produtos)
                console.log(produto)
                cardapio.appendChild(item);
            });

        });


    // FUNÇÃO DO CARRINHO
    function adicionarAoCarrinho(produto) {

        // pega carrinho atual ou cria vazio
        let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

        // adiciona produto
        carrinho.push(produto);

        // salva novamente
        localStorage.setItem("carrinho", JSON.stringify(carrinho));

        alert("Produto adicionado!");


    }

    function direcionarPedido() {
        window.location.href = 'pedido.html'
    }


}
// =============================================
// FUNCOES - PEDIDO
// // =============================================
if (pg_pedido) {
    const lista = document.getElementById("lista-produtos");
    console.log(lista)

    // pega carrinho
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    let total = 0;

    carrinho.forEach((produto, index) => {

        total += produto.preco;

        const item = document.createElement("div");
        item.classList.add("pedido");

        item.innerHTML = `

            <div class="apagar-pedido">
                <button onclick="remover(${index})">🗑️</button>
            </div>

            <div class="descricao-pedido">
                <h2>${produto.nome}</h2>
                <h2><span class="preco-pedido">R$ ${produto.preco}</span></h2>
            </div>


    `;

        lista.appendChild(item);
    });

    // mostrar total
    document.getElementById("preco-total").innerHTML = `
    <img id="carrinho" src="img/imgCompra/carrinho-de-compras.png" width="100px" height="100px">
    <h1>R$ ${total}</h1>
`;

    // remover item
    function remover(index) {
        carrinho.splice(index, 1);
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
        location.reload();
    }

    // botão pagar
    function pagar() {
        alert("Compra realizada!");
        localStorage.removeItem("carrinho");
        window.location.href = "index.html";
    }

    function redirecionarPagamento() {
        window.location.href = 'pagamento.html'
    }

}

// =============================================
// FUNCOES - PAGAMENTO
// // =============================================

if (pg_pagamento) {



    function redirecionarPagar() {
        window.location.href = 'pagar.html'
    }
    document.getElementById("preco-total").innerHTML = `R$${total}`;
}

// =============================================
// FUNCOES - PAGAR
// // =============================================

if (pg_pagar) {



}