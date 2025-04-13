document.addEventListener('DOMContentLoaded', function() {
    // Efeito de cursor personalizado
    const cursor = document.querySelector('.cursor');
    const links = document.querySelectorAll('a, button, .add-to-cart, .showcase-add');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.opacity = '0.7';
        });
        
        link.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.opacity = '1';
        });
    });

    // Notificação
    const notification = document.querySelector('.notification');
    const notificationClose = document.querySelector('.notification-close');
    
    function showNotification(message) {
        notification.querySelector('p').textContent = message;
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
    
    notificationClose.addEventListener('click', () => {
        notification.classList.remove('show');
    });

    // Carrinho de compras
    const cartBtn = document.querySelector('.cart-btn');
    const cartOverlay = document.querySelector('.cart-overlay');
    const cartPanel = document.querySelector('.cart-panel');
    const closeCart = document.querySelector('.close-cart');
    const cartCount = document.querySelector('.cart-count');
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalPriceElement = document.querySelector('.total-price');
    
    let cart = [];
    
    // Abrir/fechar carrinho
    cartBtn.addEventListener('click', toggleCart);
    cartOverlay.addEventListener('click', toggleCart);
    closeCart.addEventListener('click', toggleCart);
    
    function toggleCart() {
        cartOverlay.classList.toggle('active');
        cartPanel.classList.toggle('active');
    }
    
    // Adicionar ao carrinho
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart') || e.target.classList.contains('showcase-add')) {
            const productCard = e.target.closest('.product-card, .showcase-item');
            const productName = productCard.querySelector('.product-name, h4').textContent;
            const productPrice = parseFloat(productCard.querySelector('.product-price, .showcase-price').textContent.replace('R$ ', '').replace(',', '.'));
            
            addToCart({
                name: productName,
                price: productPrice,
                quantity: 1
            });
            
            showNotification(`${productName} adicionado ao carrinho`);
        }
    });
    
    function addToCart(product) {
        const existingItem = cart.find(item => item.name === product.name);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push(product);
        }
        
        updateCart();
    }
    
    function updateCart() {
        // Atualizar contador
        const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = itemCount;
        
        // Atualizar itens do carrinho
        cartItemsContainer.innerHTML = '';
        
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="item-info">
                    <h4>${item.name}</h4>
                    <p>R$ ${item.price.toFixed(2)} x ${item.quantity}</p>
                </div>
                <button class="remove-item">&times;</button>
            `;
            
            cartItemsContainer.appendChild(cartItem);
        });
        
        // Atualizar total
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        totalPriceElement.textContent = `R$ ${total.toFixed(2)}`;
    }
    
    // Remover item do carrinho
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-item')) {
            const itemName = e.target.closest('.cart-item').querySelector('h4').textContent;
            cart = cart.filter(item => item.name !== itemName);
            updateCart();
            showNotification(`${itemName} removido do carrinho`);
        }
    });

    // Formulário de cotação
    const quoteForm = document.getElementById('quoteForm');
    
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const eggType = document.getElementById('eggType').value;
            const eggSize = document.getElementById('eggSize').value;
            const eggFilling = document.getElementById('eggFilling').value;
            
            // Simular envio
            showNotification('Cotação enviada! Entraremos em contato em breve.');
            this.reset();
        });
    }

    // Header scroll
    function updateHeader() {
        if (window.scrollY > 100) {
            document.querySelector('.main-header').classList.add('scrolled');
        } else {
            document.querySelector('.main-header').classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', updateHeader);
    updateHeader();

    // Menu mobile
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    menuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Smooth scroll para links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Fechar menu mobile se aberto
                if (navLinks.classList.contains('active')) {
                    menuBtn.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            }
        });
    });

    // Efeito parallax
    const parallaxElements = document.querySelectorAll('.parallax-divider');
    
    function updateParallax() {
        parallaxElements.forEach(element => {
            const speed = 0.3;
            const scrollPosition = window.pageYOffset;
            const elementPosition = element.offsetTop;
            const windowHeight = window.innerHeight;
            
            if (scrollPosition > elementPosition - windowHeight && scrollPosition < elementPosition + element.offsetHeight) {
                const offset = (scrollPosition - elementPosition) * speed;
                element.style.backgroundPositionY = `${offset}px`;
            }
        });
    }
    
    window.addEventListener('scroll', updateParallax);
    window.addEventListener('resize', updateParallax);
    updateParallax();

    // Inicializar carrosséis
    function initCarousels() {
        const carousels = document.querySelectorAll('.products-carousel');
        
        carousels.forEach(carousel => {
            const container = carousel.closest('.carousel-container');
            const prevBtn = container.querySelector('.carousel-prev');
            const nextBtn = container.querySelector('.carousel-next');
            
            prevBtn.addEventListener('click', () => {
                carousel.scrollBy({
                    left: -300,
                    behavior: 'smooth'
                });
            });
            
            nextBtn.addEventListener('click', () => {
                carousel.scrollBy({
                    left: 300,
                    behavior: 'smooth'
                });
            });
        });
    }
    
    initCarousels();

    // Animação de entrada dos elementos
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.product-card, .section-header');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Configuração inicial para elementos animados
    document.querySelectorAll('.product-card, .section-header').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Executa uma vez ao carregar
});
