document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Funcionalidad de Pestañas del Menú
    const tabBtns = document.querySelectorAll('.tab-btn');
    const menuItems = document.querySelectorAll('.menu-item');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remover clase activa de todos
            tabBtns.forEach(b => b.classList.remove('active'));
            // Añadir clase activa al clickeado
            btn.classList.add('active');

            const category = btn.getAttribute('data-category');

            menuItems.forEach(item => {
                // Animación de entrada
                item.style.opacity = '0';
                item.style.transform = 'scale(0.95)';
                
                setTimeout(() => {
                    if (category === 'todos' || item.getAttribute('data-category') === category) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.display = 'none';
                    }
                }, 300);
            });
        });
    });

    // 2. Menú Móvil
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // 3. Manejo del Formulario - Envio a WhatsApp
    const form = document.getElementById('reservation-form');
    const whatsappNumber = '584120936783';
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const people = document.getElementById('people').value;
        const phone = document.getElementById('phone') ? document.getElementById('phone').value.trim() : 'No proporcionado';
        const notes = document.getElementById('notes') ? document.getElementById('notes').value.trim() : 'Sin observaciones';
        
        if (!name || !date || !time || !people) {
            alert('Por favor completa todos los campos requeridos');
            return;
        }
        
        const selectedDate = new Date(date + 'T' + time);
        if (selectedDate < new Date()) {
            alert('Por favor selecciona una fecha y hora futura');
            return;
        }
        
        const btn = form.querySelector('button');
        const originalText = btn.innerText;
        btn.innerText = 'Redirigiendo a WhatsApp...';
        btn.disabled = true;
        
        const message = encodeURIComponent(
            'NUEVA RESERVA\n\n' +
            'Nombre: ' + name + '\n' +
            'Fecha: ' + date + '\n' +
            'Hora: ' + time + '\n' +
            'Personas: ' + people + '\n' +
            'Telefono: ' + phone + '\n' +
            'Notas: ' + notes + '\n\n' +
            'Enviado desde La Sazon de Mamaiita'
        );
        
        const whatsappLink = 'https://wa.me/' + whatsappNumber + '?text=' + message;
        
        setTimeout(() => {
            window.open(whatsappLink, '_blank');
            
            setTimeout(() => {
                form.reset();
                btn.innerText = originalText;
                btn.disabled = false;
                alert('Tu reserva ha sido enviada al dueno por WhatsApp. Te contactaremos pronto para confirmarla.');
            }, 500);
        }, 1000);
    });

    // 4. Smooth Scroll para navegadores antiguos (Polyfill simple)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});