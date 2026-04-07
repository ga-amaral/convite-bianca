/**
 * Convite Chá Revelação - Theodoro ou Ana Luísa
 * Autor: Gabriel Amaral (https://instagram.com/sougabrielamaral)
 * Data: 31/03/2026
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Countdown Timer
    const targetDate = new Date('2026-05-02T14:00:00').getTime();
    const countdownElement = document.getElementById('countdown');

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            countdownElement.innerHTML = "O momento chegou! 💙💗";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `
            <div class="count-item animate-pulse">
                <span class="count-number">${days}</span>
                <span class="count-label">Dias</span>
            </div>
            <div class="count-item">
                <span class="count-number">${hours}</span>
                <span class="count-label">Horas</span>
            </div>
            <div class="count-item">
                <span class="count-number">${minutes}</span>
                <span class="count-label">Mins</span>
            </div>
            <div class="count-item">
                <span class="count-number">${seconds}</span>
                <span class="count-label">Segs</span>
            </div>
        `;
    };

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // 2. RSVP Form Handling
    const rsvpForm = document.getElementById('rsvp-form');
    const feedback = document.getElementById('form-feedback');
    const submitBtn = document.getElementById('submit-btn');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalMessage = document.getElementById('modal-message');
    const modalClose = document.getElementById('modal-close');

    const showModal = (message) => {
        modalMessage.textContent = message;
        modalOverlay.classList.remove('hidden');
    };

    const hideModal = () => {
        modalOverlay.classList.add('hidden');
    };

    modalClose.addEventListener('click', hideModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) hideModal();
    });

    rsvpForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Enviando... ✨';
        feedback.classList.add('hidden');

        const formData = new FormData(rsvpForm);
        const payload = Object.fromEntries(formData.entries());
        payload.timestamp = new Date().toLocaleString('pt-BR');

        try {
            const response = await fetch('https://n8n.globalportfolio.com.br/webhook/convite-bia', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                const responseData = await response.json();
                const fraldaTamanho = responseData?.[0]?.Fralda || '';

                const formContainer = document.querySelector('.form-container');
                formContainer.querySelector('h2').style.display = 'none';
                formContainer.querySelector('.section-subtitle').style.display = 'none';
                rsvpForm.style.display = 'none';
                feedback.innerHTML = `
                    <div class="success-message">
                        <p>Obrigada por confirmar sua presença! A Bianca e o Felipe estão muito felizes em contar com você nesse momento especial.</p>
                        <p>O bebê liberou a festa, mas vetou o álcool 🚫😅. Se quiser, pode trazer seu kit cooler!</p>
                    </div>
                    <div class="gift-suggestion">
                        <p><strong>Sugestão de presente:</strong></p>
                        <p>Fralda + Um mimo</p>
                        <p>Tamanho Sugerido: ${fraldaTamanho}</p>
                    </div>
                `;
                feedback.className = 'form-feedback success';
                feedback.classList.remove('hidden');
                submitBtn.innerHTML = 'Confirmado! 💙💗';
            } else {
                throw new Error('Falha no envio');
            }
        } catch (error) {
            console.error('Erro RSVP:', error);
            feedback.innerHTML = "Ocorreu um erro ao enviar sua confirmação. Tente novamente em alguns instantes.";
            feedback.className = 'form-feedback error';
            feedback.classList.remove('hidden');
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Tentar Novamente 🔄';
        }
    });
});
