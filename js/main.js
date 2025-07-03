/**
 * Paintball Tático Londrina - JavaScript Principal
 * Desenvolvido para site responsivo de empresa de paintball
 */

document.addEventListener('DOMContentLoaded', function() {
    // Menu Mobile Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
            
            // Animação do hamburger
            const hamburger = this.querySelector('.hamburger');
            hamburger.classList.toggle('active');
            
            if (hamburger.classList.contains('active')) {
                hamburger.style.transform = 'rotate(45deg)';
                hamburger.style.backgroundColor = 'transparent';
                hamburger.style.before = 'transform: rotate(90deg) translate(0, 0)';
                hamburger.style.after = 'transform: rotate(0) translate(0, 0)';
            } else {
                hamburger.style.transform = 'rotate(0)';
                hamburger.style.backgroundColor = 'var(--dark-color)';
            }
        });
    }
    
    // Header Scroll Effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(50, 85, 61, 0.98)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.backgroundColor = 'rgba(58, 106, 78, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
    });
    
    // Testimonials Slider
    const testimonials = document.querySelectorAll('.testimonial-card');
    const prevButton = document.querySelector('.prev-testimonial');
    const nextButton = document.querySelector('.next-testimonial');
    
    if (testimonials.length > 0 && prevButton && nextButton) {
        let currentTestimonial = 0;
        
        // Esconder todos os depoimentos exceto o primeiro
        for (let i = 1; i < testimonials.length; i++) {
            testimonials[i].style.display = 'none';
        }
        
        // Função para mostrar depoimento específico
        function showTestimonial(index) {
            for (let i = 0; i < testimonials.length; i++) {
                testimonials[i].style.display = 'none';
            }
            testimonials[index].style.display = 'block';
        }
        
        // Event listeners para botões de navegação
        prevButton.addEventListener('click', function() {
            currentTestimonial--;
            if (currentTestimonial < 0) {
                currentTestimonial = testimonials.length - 1;
            }
            showTestimonial(currentTestimonial);
        });
        
        nextButton.addEventListener('click', function() {
            currentTestimonial++;
            if (currentTestimonial >= testimonials.length) {
                currentTestimonial = 0;
            }
            showTestimonial(currentTestimonial);
        });
        
        // Auto-rotação dos depoimentos
        setInterval(function() {
            currentTestimonial++;
            if (currentTestimonial >= testimonials.length) {
                currentTestimonial = 0;
            }
            showTestimonial(currentTestimonial);
        }, 5000);
    }
    
    // Validação de Formulário
    const contactForm = document.getElementById('home-contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação básica
            let valid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const phone = document.getElementById('phone');
            const message = document.getElementById('message');
            const interest = document.getElementById('interest');
            
            if (!name.value.trim()) {
                valid = false;
                name.style.borderColor = 'var(--primary-color)';
            } else {
                name.style.borderColor = 'var(--light-gray)';
            }
            
            if (!email.value.trim() || !validateEmail(email.value)) {
                valid = false;
                email.style.borderColor = 'var(--primary-color)';
            } else {
                email.style.borderColor = 'var(--light-gray)';
            }
            
            if (!phone.value.trim()) {
                valid = false;
                phone.style.borderColor = 'var(--primary-color)';
            } else {
                phone.style.borderColor = 'var(--light-gray)';
            }
            
            if (!interest.value.trim()) {
                valid = false;
                interest.style.borderColor = 'var(--primary-color)';
            } else {
                interest.style.borderColor = 'var(--light-gray)';
            }
            
            if (!message.value.trim()) {
                valid = false;
                message.style.borderColor = 'var(--primary-color)';
            } else {
                message.style.borderColor = 'var(--light-gray)';
            }
            
            if (valid) {
                // Formatar mensagem para WhatsApp
                let whatsappMessage = `Olá! Meu nome é ${name.value}.\n`;
                whatsappMessage += `Email: ${email.value}\n`;
                whatsappMessage += `Telefone: ${phone.value}\n`;
                whatsappMessage += `Interesse: ${interest.options[interest.selectedIndex].text}\n\n`;
                whatsappMessage += `Mensagem: ${message.value}`;
                
                // Codificar a mensagem para URL
                const encodedMessage = encodeURIComponent(whatsappMessage);
                
                // Abrir WhatsApp com a mensagem
                window.open(`https://wa.me/5543996016409?text=${encodedMessage}`, '_blank');
                
                // Resetar formulário
                contactForm.reset();
            } else {
                alert('Por favor, preencha todos os campos corretamente.');
            }
        });
    }
    
    // Função auxiliar para validar email
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Animação de elementos ao scroll
    const animateElements = document.querySelectorAll('.feature-card, .package-card, .gallery-item, .event-item');
    
    function checkScroll() {
        const triggerBottom = window.innerHeight * 0.8;
        
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerBottom) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Inicializar elementos com opacidade 0
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Verificar elementos visíveis no carregamento inicial
    
    // Galeria Lightbox
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <img src="${imgSrc}" alt="Imagem ampliada">
                    <span class="close-lightbox">&times;</span>
                </div>
            `;
            
            document.body.appendChild(lightbox);
            document.body.style.overflow = 'hidden';
            
            // Estilo para o lightbox
            lightbox.style.position = 'fixed';
            lightbox.style.top = '0';
            lightbox.style.left = '0';
            lightbox.style.width = '100%';
            lightbox.style.height = '100%';
            lightbox.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
            lightbox.style.display = 'flex';
            lightbox.style.alignItems = 'center';
            lightbox.style.justifyContent = 'center';
            lightbox.style.zIndex = '9999';
            
            const lightboxContent = lightbox.querySelector('.lightbox-content');
            lightboxContent.style.position = 'relative';
            lightboxContent.style.maxWidth = '90%';
            lightboxContent.style.maxHeight = '90%';
            
            const lightboxImg = lightbox.querySelector('img');
            lightboxImg.style.maxWidth = '100%';
            lightboxImg.style.maxHeight = '90vh';
            lightboxImg.style.display = 'block';
            lightboxImg.style.margin = '0 auto';
            
            const closeButton = lightbox.querySelector('.close-lightbox');
            closeButton.style.position = 'absolute';
            closeButton.style.top = '-40px';
            closeButton.style.right = '0';
            closeButton.style.fontSize = '30px';
            closeButton.style.color = 'white';
            closeButton.style.cursor = 'pointer';
            
            // Fechar lightbox
            closeButton.addEventListener('click', function() {
                document.body.removeChild(lightbox);
                document.body.style.overflow = 'auto';
            });
            
            // Fechar ao clicar fora da imagem
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    document.body.removeChild(lightbox);
                    document.body.style.overflow = 'auto';
                }
            });
        });
    });
    
    // Smooth Scroll para links internos
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    
    scrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Fechar menu mobile se estiver aberto
                if (navList.classList.contains('active')) {
                    navList.classList.remove('active');
                }
            }
        });
    });
    
    // Efeito hover nos cards de pacotes
    const packageCards = document.querySelectorAll('.package-card');
    packageCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover');
        });
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover');
        });
    });
});
