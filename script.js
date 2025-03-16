let carrinho = [];

// Função para abrir o pop-up
function abrirPopup() {
  const popup = document.getElementById('popup-pascoa');
  popup.style.display = 'flex';
}

// Função para fechar o pop-up
function fecharPopup() {
  const popup = document.getElementById('popup-pascoa');
  popup.style.display = 'none';
}

// Fechar o pop-up ao clicar fora dele
window.onclick = function (event) {
  const popup = document.getElementById('popup-pascoa');
  if (event.target === popup) {
    popup.style.display = 'none';
  }
};

// Função para adicionar produtos ao carrinho
function adicionarAoCarrinho(botao) {
  const produtoCard = botao.parentElement;
  const nome = produtoCard.getAttribute('data-nome');
  const preco = parseFloat(produtoCard.getAttribute('data-preco'));

  // Verifica se o produto já está no carrinho
  const itemExistente = carrinho.find((item) => item.nome === nome);

  if (itemExistente) {
    itemExistente.quantidade += 1; // Incrementa a quantidade
  } else {
    carrinho.push({ nome, preco, quantidade: 1 }); // Adiciona novo item
  }

  atualizarCarrinho();
}

// Função para remover produtos do carrinho
function removerDoCarrinho(nome) {
  carrinho = carrinho.filter((item) => item.nome !== nome);
  atualizarCarrinho();
}

// Função para atualizar o carrinho na tela
function atualizarCarrinho() {
  const itensCarrinho = document.getElementById('itens-carrinho');
  const totalCarrinho = document.getElementById('total-carrinho');

  // Limpa o carrinho
  itensCarrinho.innerHTML = '';

  // Adiciona os itens ao carrinho
  let total = 0;
  carrinho.forEach((item) => {
    const itemElemento = document.createElement('div');
    itemElemento.classList.add('item-carrinho');
    itemElemento.innerHTML = `
      <span>${item.nome} (${item.quantidade}x)</span>
      <span>R$${(item.preco * item.quantidade).toFixed(2)}</span>
      <button onclick="removerDoCarrinho('${item.nome}')">Remover</button>
    `;
    itensCarrinho.appendChild(itemElemento);

    total += item.preco * item.quantidade;
  });

  // Atualiza o total
  totalCarrinho.textContent = `R$${total.toFixed(2)}`;
}

// Adicionar evento de clique ao link de Páscoa no menu principal
document.getElementById('link-pascoa').addEventListener('click', function (e) {
  e.preventDefault(); // Evita o comportamento padrão do link
  abrirPopup(); // Abre o pop-up
});

// Adicionar evento de clique ao link de Páscoa no sidebar
document.getElementById('sidebar-link-pascoa').addEventListener('click', function (e) {
  e.preventDefault(); // Evita o comportamento padrão do link
  abrirPopup(); // Abre o pop-up
});

// Inicializar o Swiper
document.addEventListener('DOMContentLoaded', function () {
  const swiper = new Swiper('.swiper-container', {
    loop: true, // Permite rolagem infinita
    navigation: {
      nextEl: '.swiper-button-next', // Botão de próxima
      prevEl: '.swiper-button-prev', // Botão de anterior
    },
    slidesPerView: 3, // Quantidade de slides visíveis
    spaceBetween: 20, // Espaço entre os slides
    breakpoints: {
      // Responsividade
      320: {
        slidesPerView: 1, // 1 slide em telas pequenas
      },
      768: {
        slidesPerView: 2, // 2 slides em telas médias
      },
      1024: {
        slidesPerView: 3, // 3 slides em telas grandes
      },
    },
  });
});
