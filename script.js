
// === ОТКРЫТИЕ ПЛАТЁЖНОЙ ФОРМЫ ===
function openPayment() {
    // ВАЖНО: замените YOUR_SHOP_ID на реальный ID магазина из ЮKassa
    const SHOP_ID = 'YOUR_SHOP_ID';
    const PAYMENT_AMOUNT = '490.00';
    
    // Создание платежа через ЮKassa
    // Документация: https://yookassa.ru/developers/payment-acceptance/integration-scenarios/quick-start
    
    alert('Переход к оплате через ЮKassa...\n\n⚠️ ВНИМАНИЕ: Для работы оплаты необходимо:\n1. Зарегистрироваться на yookassa.ru\n2. Получить Shop ID\n3. Настроить webhook для автоматической отправки файлов\n4. Заменить YOUR_SHOP_ID в script.js на реальный ID');
    
    // После настройки ЮKassa раскомментируйте этот код:
    /*
    const checkout = new YooMoneyCheckoutWidget({
        confirmation_token: 'YOUR_CONFIRMATION_TOKEN',
        return_url: 'https://yourdomain.com/success.html',
        error_callback: function(error) {
            window.location.href = 'error.html';
        }
    });
    
    checkout.render('payment-form');
    */
}

// === ПЛАВНАЯ ПРОКРУТКА К ЯКОРЯМ ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// === АККОРДЕОН ДЛЯ FAQ (опционально) ===
document.querySelectorAll('.faq-question').forEach(question => {
    question.style.cursor = 'pointer';
    question.addEventListener('click', function() {
        const answer = this.nextElementSibling;
        const isVisible = answer.style.display === 'block';
        
        // Закрыть все ответы
        document.querySelectorAll('.faq-answer').forEach(ans => {
            ans.style.display = 'none';
        });
        
        // Открыть текущий (если был закрыт)
        if (!isVisible) {
            answer.style.display = 'block';
        }
    });
});

// === АНИМАЦИЯ ПОЯВЛЕНИЯ ЭЛЕМЕНТОВ ПРИ СКРОЛЛЕ ===
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Применить анимацию к секциям
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// === СЧЁТЧИК ПОСЕТИТЕЛЕЙ (опционально) ===
function updateVisitorCount() {
    // Имитация счётчика посетителей
    const minVisitors = 147;
    const maxVisitors = 289;
    const count = Math.floor(Math.random() * (maxVisitors - minVisitors + 1)) + minVisitors;
    
    const counterElement = document.getElementById('visitor-count');
    if (counterElement) {
        counterElement.textContent = count;
    }
}

// === ТАЙМЕР АКЦИИ (опционально) ===
function startCountdown(hours) {
    const endTime = new Date().getTime() + (hours * 60 * 60 * 1000);
    
    const timerElement = document.getElementById('countdown-timer');
    if (!timerElement) return;
    
    const interval = setInterval(function() {
        const now = new Date().getTime();
        const distance = endTime - now;
        
        const hoursLeft = Math.floor(distance / (1000 * 60 * 60));
        const minutesLeft = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const secondsLeft = Math.floor((distance % (1000 * 60)) / 1000);
        
        timerElement.innerHTML = `${hoursLeft}ч ${minutesLeft}м ${secondsLeft}с`;
        
        if (distance < 0) {
            clearInterval(interval);
            timerElement.innerHTML = 'Акция завершена';
        }
    }, 1000);
}

// === ОТСЛЕЖИВАНИЕ СОБЫТИЙ (Google Analytics / Yandex.Metrika) ===
function trackEvent(category, action, label) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
    
    // Yandex.Metrika
    if (typeof ym !== 'undefined') {
        ym(XXXXXX, 'reachGoal', action); // Замените XXXXXX на ваш номер счётчика
    }
}

// Отслеживание кликов на кнопки
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', function() {
        const buttonText = this.textContent.trim();
        trackEvent('Button', 'click', buttonText);
    });
});

// === ИНИЦИАЛИЗАЦИЯ ===
document.addEventListener('DOMContentLoaded', function() {
    // updateVisitorCount();
    // startCountdown(24); // Таймер на 24 часа
    
    console.log('🎉 Сайт "Меню на месяц" загружен');
});

