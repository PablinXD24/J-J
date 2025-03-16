// Dados dos produtos
const produtos = {
  roupas: [
    { imagem: "imagens/roupa1.jpg", nome: "Camiseta Branca", descricao: "Estilo casual e confortável." },
    { imagem: "imagens/roupa2.jpg", nome: "Jaqueta Jeans", descricao: "Perfeita para looks urbanos." },
    { imagem: "imagens/roupa3.jpg", nome: "Vestido Floral", descricao: "Ideal para o verão." },
    { imagem: "imagens/roupa4.jpg", nome: "Calça Skinny", descricao: "Conforto e estilo." },
    { imagem: "imagens/roupa5.jpg", nome: "Blazer Slim", descricao: "Elegância para ocasiões especiais." },
  ],
  doces: [
    { imagem: "imagens/doce1.jpg", nome: "Chocolate Amargo", descricao: "Feito com cacau 70%." },
    { imagem: "imagens/doce2.jpg", nome: "Brigadeiro Gourmet", descricao: "Delicioso e cremoso." },
    { imagem: "imagens/doce3.jpg", nome: "Bolo de Chocolate", descricao: "Feito com muito carinho." },
    { imagem: "imagens/doce4.jpg", nome: "Macaron", descricao: "Colorido e saboroso." },
    { imagem: "imagens/doce5.jpg", nome: "Trufas", descricao: "Recheio surpresa." },
  ],
  perfumaria: [
    { imagem: "imagens/perfume1.jpg", nome: "Perfume Florais", descricao: "Fragrância suave e duradoura." },
    { imagem: "imagens/perfume2.jpg", nome: "Colônia Cítrica", descricao: "Ideal para o dia a dia." },
    { imagem: "imagens/perfume3.jpg", nome: "Perfume Amadeirado", descricao: "Para ocasiões especiais." },
    { imagem: "imagens/perfume4.jpg", nome: "Água de Colônia", descricao: "Frescor e leveza." },
    { imagem: "imagens/perfume5.jpg", nome: "Perfume Oriental", descricao: "Exótico e marcante." },
  ],
};

// Função para criar cards dinamicamente
function criarCards(produtos, containerId) {
  const container = document.getElementById(containerId);
  produtos.forEach((produto) => {
    const card = `
      <div class="swiper-slide">
        <div class="product-card">
          <img src="${produto.imagem}" alt="${produto.nome}">
          <h3>${produto.nome}</h3>
          <p>${produto.descricao}</p>
        </div>
      </div>
    `;
    container.innerHTML += card;
  });
}

// Gerar cards para cada categoria
criarCards(produtos.roupas, "roupas-carousel");
criarCards(produtos.doces, "doces-carousel");
criarCards(produtos.perfumaria, "perfumaria-carousel");

// Inicialização do Swiper
document.addEventListener('DOMContentLoaded', function () {
  // Carrossel de Roupas (com setas)
  new Swiper('#roupas .swiper-container', {
    slidesPerView: 3,
    spaceBetween: 20,
    navigation: {
      nextEl: '#roupas .swiper-button-next',
      prevEl: '#roupas .swiper-button-prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });

  // Carrossel de Doces (com setas)
  new Swiper('#doces .swiper-container', {
    slidesPerView: 3,
    spaceBetween: 20,
    navigation: {
      nextEl: '#doces .swiper-button-next',
      prevEl: '#doces .swiper-button-prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });

  // Carrossel de Perfumaria (com setas)
  new Swiper('#perfumaria .swiper-container', {
    slidesPerView: 3,
    spaceBetween: 20,
    navigation: {
      nextEl: '#perfumaria .swiper-button-next',
      prevEl: '#perfumaria .swiper-button-prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });
});
