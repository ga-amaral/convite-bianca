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

    rsvpForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // UI Feedback - Desabilitar botão e mostrar status
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Enviando... ✨';
        feedback.classList.add('hidden');

        // Capturar dados
        const formData = new FormData(rsvpForm);
        const payload = Object.fromEntries(formData.entries());
        payload.timestamp = new Date().toLocaleString('pt-BR');

        try {
            const response = await fetch('https://n8n.globalportfolio.com.br/webhook/bia', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                // Sucesso
                feedback.innerHTML = "Obrigada por confirmar sua presença! A Bianca e o Luis Felipe estão muito felizes em contar com você nesse momento especial.";
                feedback.className = 'form-feedback success';
                feedback.classList.remove('hidden');
                rsvpForm.reset();
                submitBtn.innerHTML = 'Confirmado! 💙💗';
            } else {
                throw new Error('Falha no envio');
            }
        } catch (error) {
            // Erro
            console.error('Erro RSVP:', error);
            feedback.innerHTML = "Ocorreu um erro ao enviar sua confirmação. Tente novamente em alguns instantes.";
            feedback.className = 'form-feedback error';
            feedback.classList.remove('hidden');
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Tentar Novamente 🔄';
        }
    });
});
