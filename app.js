/**
 * Óptica Láser - Lógica de Interacción
 * Desarrollado por Rafael Sarfati
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializar AOS (Animaciones)
    AOS.init({ duration: 800, once: true });

    // 2. Configuración Swiper (Catálogo)
    const swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        autoplay: { delay: 3000, disableOnInteraction: false },
        speed: 800,
        pagination: { el: ".swiper-pagination", clickable: true },
        breakpoints: {
            768: { slidesPerView: 2, spaceBetween: 30 } // 2 Imágenes en PC
        }
    });

    // 3. Gestión de Estadísticas (Efecto Persistencia Local)
    const statsData = JSON.parse(localStorage.getItem('laser_stats')) || {
        likes: 1240,
        satisfaction: 98,
        exams: 15000
    };

    let chartInstance;

    const updateUI = () => {
        // Actualizar Números
        document.getElementById('like-count').textContent = statsData.likes.toLocaleString();
        document.getElementById('satisfaction-count').textContent = `${statsData.satisfaction}%`;
        document.getElementById('exams-count').textContent = statsData.exams >= 1000 
            ? `${(statsData.exams / 1000).toFixed(1)}k+` 
            : statsData.exams;

        // Actualizar Gráfico
        if (chartInstance) {
            chartInstance.data.datasets[0].data[5] = statsData.likes;
            chartInstance.update();
        }

        // Guardar
        localStorage.setItem('laser_stats', JSON.stringify(statsData));
    };

    // 4. Inicializar Chart.js
    const initChart = () => {
        const ctx = document.getElementById('likesChart').getContext('2d');
        chartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Hoy'],
                datasets: [{
                    label: 'Likes en Tiempo Real',
                    data: [1100, 1150, 1180, 1200, 1220, statsData.likes],
                    borderColor: '#00A8B5',
                    backgroundColor: 'rgba(0, 168, 181, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointRadius: 5
                }]
            },
            options: { responsive: true, plugins: { legend: { display: false } } }
        });
    };

    // 5. Eventos
    document.getElementById('like-btn').addEventListener('click', () => {
        statsData.likes += 1;
        updateUI();
    });

    // Simular aumento de exámenes al enviar formulario
    document.getElementById('appointmentForm').addEventListener('submit', () => {
        statsData.exams += 1;
        localStorage.setItem('laser_stats', JSON.stringify(statsData));
    });

    // Iniciar
    initChart();
    updateUI();
});