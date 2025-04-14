document.addEventListener('DOMContentLoaded', function() {
    // Configuração do Firebase
    const firebaseConfig = {
        apiKey: "AIzaSyBQdw7hIkhoby8n_4pl41zwjEqHYNtQDRw",
        authDomain: "ecommerce-jj.firebaseapp.com",
        projectId: "ecommerce-jj",
        storageBucket: "ecommerce-jj.firebasestorage.app",
        messagingSenderId: "773988929532",
        appId: "1:773988929532:web:6bff6f6ad3968436edac79"
    };

    // Inicialize o Firebase
    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const db = firebase.firestore();
    
    // Configurar provedor de autenticação do Google
    const googleProvider = new firebase.auth.GoogleAuthProvider();

    // Estado do usuário
    let currentUser = null;
    let cart = [];

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
    const checkoutBtn = document.querySelector('.checkout-btn');
    
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

    // Autenticação e Perfil
    const userBtn = document.querySelector('.user-btn');
    const authOverlay = document.querySelector('.auth-overlay');
    const authPanel = document.querySelector('.auth-panel');
    const closeAuth = document.querySelector('.close-auth');
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');
    
    const profileOverlay = document.querySelector('.profile-overlay');
    const profilePanel = document.querySelector('.profile-panel');
    const closeProfile = document.querySelector('.close-profile');
    const logoutBtn = document.querySelector('.logout-btn');
    
    const addressOverlay = document.querySelector('.address-overlay');
    const addressPanel = document.querySelector('.address-panel');
    const closeAddress = document.querySelector('.close-address');
    const addressForm = document.getElementById('addressForm');
    const addAddressBtn = document.querySelector('.add-address');
    
    const paymentOverlay = document.querySelector('.payment-overlay');
    const paymentPanel = document.querySelector('.payment-panel');
    const closePayment = document.querySelector('.close-payment');
    const paymentTabs = document.querySelectorAll('.method-tab');
    const paymentForms = document.querySelectorAll('.method-content');
    const paymentForm = document.getElementById('paymentForm');
    const generatePixBtn = document.querySelector('.generate-pix');
    
    // Alternar entre painéis
    function toggleAuthPanel() {
        authOverlay.classList.toggle('active');
        authPanel.classList.toggle('active');
    }
    
    function toggleProfilePanel() {
        profileOverlay.classList.toggle('active');
        profilePanel.classList.toggle('active');
    }
    
    function toggleAddressPanel() {
        addressOverlay.classList.toggle('active');
        addressPanel.classList.toggle('active');
    }
    
    function togglePaymentPanel() {
        paymentOverlay.classList.toggle('active');
        paymentPanel.classList.toggle('active');
    }
    
    // Event Listeners
    userBtn.addEventListener('click', () => {
        if (currentUser) {
            toggleProfilePanel();
        } else {
            toggleAuthPanel();
        }
    });
    
    closeAuth.addEventListener('click', toggleAuthPanel);
    authOverlay.addEventListener('click', toggleAuthPanel);
    
    closeProfile.addEventListener('click', toggleProfilePanel);
    profileOverlay.addEventListener('click', toggleProfilePanel);
    
    closeAddress.addEventListener('click', toggleAddressPanel);
    addressOverlay.addEventListener('click', toggleAddressPanel);
    
    closePayment.addEventListener('click', togglePaymentPanel);
    paymentOverlay.addEventListener('click', togglePaymentPanel);
    
    // Alternar entre abas de login/cadastro
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            
            authTabs.forEach(t => t.classList.remove('active'));
            authForms.forEach(f => f.classList.remove('active'));
            
            tab.classList.add('active');
            document.querySelector(`.auth-form[data-form="${tabName}"]`).classList.add('active');
        });
    });
    
    // Alternar entre métodos de pagamento
    paymentTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const method = tab.dataset.method;
            
            paymentTabs.forEach(t => t.classList.remove('active'));
            paymentForms.forEach(f => f.classList.remove('active'));
            
            tab.classList.add('active');
            document.querySelector(`.method-content[data-method="${method}"]`).classList.add('active');
        });
    });
    
    // Login com Google
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('auth-google') || e.target.closest('.auth-google')) {
            auth.signInWithPopup(googleProvider)
                .then((result) => {
                    // Verificar se é um novo usuário
                    const isNewUser = result.additionalUserInfo.isNewUser;
                    const user = result.user;
                    
                    if (isNewUser) {
                        // Salvar informações do usuário no Firestore
                        return db.collection('users').doc(user.uid).set({
                            name: user.displayName || 'Usuário Google',
                            email: user.email,
                            phone: user.phoneNumber || '',
                            createdAt: firebase.firestore.FieldValue.serverTimestamp()
                        });
                    }
                })
                .then(() => {
                    showNotification('Login com Google realizado com sucesso!');
                    toggleAuthPanel();
                })
                .catch((error) => {
                    console.error('Erro no login com Google:', error);
                    showNotification('Erro ao fazer login com Google: ' + error.message);
                });
        }
    });
    
    // Login
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                showNotification('Login realizado com sucesso!');
                toggleAuthPanel();
                loadUserProfile(userCredential.user.uid);
            })
            .catch((error) => {
                showNotification('Erro ao fazer login: ' + error.message);
            });
    });
    
    // Cadastro
    const registerForm = document.getElementById('registerForm');
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const name = document.getElementById('registerName').value;
        const phone = document.getElementById('registerPhone').value;
        const cpf = document.getElementById('registerCpf').value;
        const birth = document.getElementById('registerBirth').value;
        
        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Salvar informações adicionais no Firestore
                return db.collection('users').doc(userCredential.user.uid).set({
                    name: name,
                    email: email,
                    phone: phone,
                    cpf: cpf,
                    birth: birth,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                });
            })
            .then(() => {
                showNotification('Cadastro realizado com sucesso!');
                toggleAuthPanel();
                loadUserProfile(auth.currentUser.uid);
            })
            .catch((error) => {
                showNotification('Erro ao cadastrar: ' + error.message);
            });
    });
    
    // Logout
    logoutBtn.addEventListener('click', () => {
        auth.signOut().then(() => {
            showNotification('Você saiu da sua conta');
            toggleProfilePanel();
            currentUser = null;
            updateUserUI();
        }).catch((error) => {
            showNotification('Erro ao sair: ' + error.message);
        });
    });
    
    // Adicionar endereço
    addAddressBtn.addEventListener('click', toggleAddressPanel);
    addressForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const addressData = {
            cep: document.getElementById('addressCep').value,
            street: document.getElementById('addressStreet').value,
            number: document.getElementById('addressNumber').value,
            complement: document.getElementById('addressComplement').value,
            neighborhood: document.getElementById('addressNeighborhood').value,
            city: document.getElementById('addressCity').value,
            state: document.getElementById('addressState').value,
            isDefault: document.getElementById('addressDefault').checked,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        };
        
        db.collection('users').doc(currentUser.uid).collection('addresses').add(addressData)
            .then(() => {
                showNotification('Endereço adicionado com sucesso!');
                toggleAddressPanel();
                addressForm.reset();
            })
            .catch((error) => {
                showNotification('Erro ao adicionar endereço: ' + error.message);
            });
    });
    
    // Finalizar compra
    checkoutBtn.addEventListener('click', () => {
        if (!currentUser) {
            showNotification('Por favor, faça login para finalizar a compra');
            toggleAuthPanel();
            return;
        }
        
        if (cart.length === 0) {
            showNotification('Seu carrinho está vazio');
            return;
        }
        
        // Atualizar resumo do pedido
        const orderItems = document.querySelector('.order-items');
        orderItems.innerHTML = '';
        
        cart.forEach(item => {
            const orderItem = document.createElement('div');
            orderItem.className = 'order-item';
            orderItem.innerHTML = `
                <span>${item.name} x${item.quantity}</span>
                <span>R$ ${(item.price * item.quantity).toFixed(2)}</span>
            `;
            orderItems.appendChild(orderItem);
        });
        
        // Atualizar total
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        document.querySelector('.order-total-price').textContent = `R$ ${total.toFixed(2)}`;
        
        toggleCart();
        togglePaymentPanel();
    });
    
    // Processar pagamento
    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const cardNumber = document.getElementById('cardNumber').value;
        const cardName = document.getElementById('cardName').value;
        const cardExpiry = document.getElementById('cardExpiry').value;
        const cardCvv = document.getElementById('cardCvv').value;
        const installments = document.getElementById('cardInstallments').value;
        
        // Aqui você integraria com a API de pagamento (Stripe, Pagar.me, etc.)
        // Esta é uma simulação básica
        
        showNotification('Processando pagamento...');
        
        // Simular processamento
        setTimeout(() => {
            // Criar pedido no Firestore
            const orderData = {
                userId: currentUser.uid,
                items: cart,
                total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
                paymentMethod: 'credit_card',
                status: 'processing',
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            };
            
            db.collection('orders').add(orderData)
                .then(() => {
                    showNotification('Pagamento aprovado! Pedido realizado com sucesso.');
                    cart = [];
                    updateCart();
                    togglePaymentPanel();
                })
                .catch((error) => {
                    showNotification('Erro ao registrar pedido: ' + error.message);
                });
        }, 2000);
    });
    
    // PIX
    generatePixBtn.addEventListener('click', () => {
        // Simular geração de PIX
        showNotification('Gerando código PIX...');
        
        setTimeout(() => {
            // Criar pedido no Firestore
            const orderData = {
                userId: currentUser.uid,
                items: cart,
                total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
                paymentMethod: 'pix',
                status: 'waiting_payment',
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            };
            
            db.collection('orders').add(orderData)
                .then(() => {
                    showNotification('Código PIX gerado! Verifique seu e-mail para efetuar o pagamento.');
                    cart = [];
                    updateCart();
                    togglePaymentPanel();
                })
                .catch((error) => {
                    showNotification('Erro ao gerar PIX: ' + error.message);
                });
        }, 1000);
    });
    
    // Carregar perfil do usuário
    function loadUserProfile(userId) {
        db.collection('users').doc(userId).get()
            .then((doc) => {
                if (doc.exists) {
                    currentUser = {
                        uid: userId,
                        ...doc.data()
                    };
                    updateUserUI();
                    updateProfileUI();
                }
            })
            .catch((error) => {
                console.error('Erro ao carregar perfil:', error);
            });
    }
    
    // Atualizar UI com estado do usuário
    function updateUserUI() {
        if (currentUser) {
            userBtn.innerHTML = `
                <div class="user-avatar">${currentUser.name.charAt(0).toUpperCase()}</div>
            `;
        } else {
            userBtn.innerHTML = '<i class="fas fa-user"></i>';
        }
    }
    
    // Atualizar informações do perfil
    function updateProfileUI() {
        if (!currentUser) return;
        
        document.getElementById('profileName').textContent = currentUser.name;
        document.getElementById('profileEmail').textContent = currentUser.email;
        document.getElementById('profilePhone').textContent = currentUser.phone || 'Não informado';
        document.getElementById('profileCpf').textContent = currentUser.cpf || 'Não informado';
        document.getElementById('profileBirth').textContent = currentUser.birth ? new Date(currentUser.birth).toLocaleDateString('pt-BR') : 'Não informado';
    }
    
    // Observador de estado de autenticação
    auth.onAuthStateChanged((user) => {
        if (user) {
            loadUserProfile(user.uid);
        } else {
            currentUser = null;
            updateUserUI();
        }
    });
    
    // Inicializar máscaras (opcional)
    if (window.Inputmask) {
        Inputmask('999.999.999-99').mask(document.getElementById('registerCpf'));
        Inputmask('(99) 99999-9999').mask(document.getElementById('registerPhone'));
        Inputmask('99999-999').mask(document.getElementById('addressCep'));
        Inputmask('9999 9999 9999 9999').mask(document.getElementById('cardNumber'));
        Inputmask('99/99').mask(document.getElementById('cardExpiry'));
        Inputmask('999').mask(document.getElementById('cardCvv'));
    }
});
