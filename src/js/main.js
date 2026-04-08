/**
 * main.js - Funcionalidad interactiva para el tutorial de Git & GitHub
 */

document.addEventListener('DOMContentLoaded', () => {

    // ========== VARIABLES GLOBALES ==========
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.querySelector('.site-nav ul.menu');
    const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');
    const sections = document.querySelectorAll('section[id]');

    // ========== MENÚ MÓVIL ==========
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show');
            // Cambiar icono de hamburguesa a X
            menuToggle.textContent = navMenu.classList.contains('show') ? '✕' : '☰';
        });
    }

    // ========== BOTONES DE COPIAR CÓDIGO ==========
    const commandBlocks = document.querySelectorAll('.command-block');

    commandBlocks.forEach(block => {
        const codeElement = block.querySelector('code');

        if (codeElement) {
            // Crear botón de copiar
            const copyBtn = document.createElement('button');
            copyBtn.className = 'copy-btn';
            copyBtn.textContent = 'Copiar';
            copyBtn.setAttribute('aria-label', 'Copiar código');

            // Crear elemento de feedback
            const feedback = document.createElement('span');
            feedback.className = 'copy-feedback';
            feedback.textContent = '¡Copiado!';

            // Insertar elementos
            block.appendChild(copyBtn);
            block.appendChild(feedback);

            // Evento de clic
            copyBtn.addEventListener('click', async () => {
                try {
                    await navigator.clipboard.writeText(codeElement.textContent);

                    // Mostrar feedback
                    feedback.classList.add('show');
                    copyBtn.textContent = '¡Listo!';

                    // Ocultar después de 2 segundos
                    setTimeout(() => {
                        feedback.classList.remove('show');
                        copyBtn.textContent = 'Copiar';
                    }, 2000);

                } catch (err) {
                    console.error('Error al copiar:', err);
                    copyBtn.textContent = 'Error';
                    setTimeout(() => {
                        copyBtn.textContent = 'Copiar';
                    }, 2000);
                }
            });
        }
    });

    // ========== NAVEGACIÓN ACTIVA ==========
    function setActiveLink() {
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', setActiveLink);
    setActiveLink(); // Ejecutar al cargar

    // ========== SCROLL SUAVE ==========
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Cerrar menú móvil si está abierto
                if (navMenu && navMenu.classList.contains('show')) {
                    navMenu.classList.remove('show');
                    if (menuToggle) {
                        menuToggle.textContent = '☰';
                    }
                }
            }
        });
    });

    console.log('✅ Tutorial Git & GitHub - Scripts cargados correctamente');
});