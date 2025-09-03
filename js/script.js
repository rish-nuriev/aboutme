// Плавный скролл
document.querySelectorAll('№nav-links a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// функционал всплывающего окна
function showPopup(message) {
  const popup = document.getElementById('popup-message');
  const popupText = document.getElementById('popup-text');
  const closeBtn = document.getElementById('popup-close');

  popupText.textContent = message;
  popup.classList.add('show');

  // Закрытие по кнопке
  closeBtn.onclick = () => {
    popup.classList.remove('show');
  };

  // Автоскрытие через 3 секунды
  setTimeout(() => {
    popup.classList.remove('show');
  }, 6000);
}

function getMessage(type) {
  const id = type === 'success' ? 'success-msg' : 'error-msg';
  const elem = document.getElementById(id);
  return elem ? elem.textContent : '';
}

// инициализация EmailJS
(function(){
  emailjs.init("5FENBDsllU3sUw1_6");
})();

// Отправка формы через EmailJS
document.getElementById('contact-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const submitBtn = this.querySelector('button[type="submit"]');
  submitBtn.disabled = true;          // блокируем кнопку
  const originalText = submitBtn.textContent;

  // Определяем язык по классу <body>
  const lang = document.documentElement.lang || 'ru'; // по умолчанию ru
  const sendingText = lang === 'en' ? 'Sending...' : 'Отправка...';  

  submitBtn.textContent = sendingText; // показываем текст отправки

  emailjs.sendForm('service_b28mpvg', 'template_42d8x52', this)
    .then(function() {
      showPopup(getMessage('success'));
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      document.getElementById('contact-form').reset();      
    }, function(error) {
      showPopup(getMessage('error'));
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;      
    });
});

// функционал меню
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('open');
});

// Подставляем текущий год в футере
document.addEventListener('DOMContentLoaded', () => {
  const yearSpan = document.getElementById('current-year');
  if (yearSpan) {
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;
  }
});
