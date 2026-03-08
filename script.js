// Плавная прокрутка для навигации
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

// Анимация появления элементов при скролле
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Применяем анимацию к карточкам
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.bypass-item, .function-item');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Анимация для плавающих карточек
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) scale(0.8)';
        card.style.transition = `opacity 0.8s ease ${index * 0.2}s, transform 0.8s ease ${index * 0.2}s`;
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
        }, 300 + (index * 200));
    });
});

// Эффект параллакса для hero секции
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Интерактивность для кнопки скачивания
const downloadBtn = document.getElementById('downloadBtn');
const downloadBtnHero = document.getElementById('downloadBtnHero');

const handleDownloadClick = (btn) => {
    if (btn) {
        btn.addEventListener('click', (e) => {
            // Анимация нажатия
            btn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                btn.style.transform = 'scale(1.05)';
            }, 100);
            
            // Файл будет скачиваться автоматически через атрибут download
        });
    }
};

handleDownloadClick(downloadBtn);
handleDownloadClick(downloadBtnHero);

// Динамическое изменение цвета header при скролле
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const header = document.querySelector('.header');
    
    if (currentScroll > 100) {
        header.style.background = 'rgba(0, 0, 0, 0.9)';
        header.style.boxShadow = '0 4px 40px rgba(107, 70, 193, 0.4)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.7)';
        header.style.boxShadow = '0 4px 30px rgba(107, 70, 193, 0.3)';
    }
});

// Эффект частиц при клике на кнопки
document.addEventListener('click', (e) => {
    const target = e.target;
    const isDownloadButton = target.classList.contains('btn-primary') || 
        target.classList.contains('download-button') ||
        target.closest('.btn-primary') ||
        target.closest('.download-button');
    
    if (isDownloadButton) {
        const button = target.classList.contains('btn-primary') || target.classList.contains('download-button') 
            ? target 
            : target.closest('.btn-primary') || target.closest('.download-button');
        const rect = button.getBoundingClientRect();
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        createParticles(x, y);
    }
});

function createParticles(x, y) {
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = '6px';
        particle.style.height = '6px';
        particle.style.background = '#8b5cf6';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        particle.style.boxShadow = '0 0 10px #8b5cf6';
        document.body.appendChild(particle);
        
        const angle = (Math.PI * 2 * i) / 15;
        const velocity = 80 + Math.random() * 40;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        let posX = x;
        let posY = y;
        let opacity = 1;
        let size = 6;
        
        const animate = () => {
            posX += vx * 0.1;
            posY += vy * 0.1;
            opacity -= 0.02;
            size -= 0.1;
            
            particle.style.left = posX + 'px';
            particle.style.top = posY + 'px';
            particle.style.opacity = opacity;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            
            if (opacity > 0 && size > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };
        
        animate();
    }
}

// Плавное появление страницы
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    // Анимация появления hero контента
    const heroLeft = document.querySelector('.hero-left');
    if (heroLeft) {
        heroLeft.style.opacity = '0';
        heroLeft.style.transform = 'translateX(-50px)';
        heroLeft.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            heroLeft.style.opacity = '1';
            heroLeft.style.transform = 'translateX(0)';
        }, 200);
    }

    const heroRight = document.querySelector('.hero-right');
    if (heroRight) {
        heroRight.style.opacity = '0';
        heroRight.style.transform = 'translateX(50px)';
        heroRight.style.transition = 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s';
        
        setTimeout(() => {
            heroRight.style.opacity = '1';
            heroRight.style.transform = 'translateX(0)';
        }, 500);
    }
});

// Улучшенная анимация молний
function createLightningEffect() {
    const lightning = document.querySelector('.lightning-overlay');
    if (!lightning) return;

    setInterval(() => {
        const randomX = Math.random() * 100;
        const bolt = document.createElement('div');
        bolt.style.position = 'absolute';
        bolt.style.left = randomX + '%';
        bolt.style.top = '0';
        bolt.style.width = '3px';
        bolt.style.height = '100%';
        bolt.style.background = 'linear-gradient(180deg, transparent, rgba(139, 92, 246, 0.8), transparent)';
        bolt.style.pointerEvents = 'none';
        bolt.style.zIndex = '1';
        bolt.style.animation = 'lightning-flash 0.3s ease';
        
        lightning.appendChild(bolt);
        
        setTimeout(() => {
            bolt.remove();
        }, 300);
    }, 3000);
}

// Добавляем CSS анимацию для вспышек молний
const style = document.createElement('style');
style.textContent = `
    @keyframes lightning-flash {
        0% { opacity: 0; }
        50% { opacity: 1; }
        100% { opacity: 0; }
    }
`;
document.head.appendChild(style);

// Запускаем эффект молний после загрузки
window.addEventListener('load', () => {
    setTimeout(createLightningEffect, 1000);
});
