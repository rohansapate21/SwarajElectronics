/* ============================================
   SWARAJ WEIGHING SCALE & RO PURIFIERS
   Main JavaScript
   ============================================ */

// ===== CONFIGURATION =====
// REPLACE: Put your WhatsApp number here (with country code, no + or spaces)
const WHATSAPP_NUMBER = '919764185445';

// ===== PRODUCT ENQUIRY SYSTEM =====
const selectedProducts = new Set();

function toggleProduct(btn) {
  const card = btn.closest('.product-card');
  const productId = card.dataset.id;
  const productName = card.dataset.name;
  const key = `${productId}|${productName}`;

  if (selectedProducts.has(key)) {
    selectedProducts.delete(key);
    card.classList.remove('selected');
    btn.classList.remove('selected');
    btn.innerHTML = '<i class="fas fa-plus"></i> Add to Enquiry';
  } else {
    selectedProducts.add(key);
    card.classList.add('selected');
    btn.classList.add('selected');
    btn.innerHTML = '<i class="fas fa-check"></i> Selected';
  }

  updateEnquiryBar();
}

function updateEnquiryBar() {
  const bar = document.getElementById('enquiryBar');
  const count = document.getElementById('enquiryCount');
  count.textContent = selectedProducts.size;

  if (selectedProducts.size > 0) {
    bar.classList.add('visible');
  } else {
    bar.classList.remove('visible');
  }
}

function clearEnquiry() {
  selectedProducts.clear();
  document.querySelectorAll('.product-card.selected').forEach(card => {
    card.classList.remove('selected');
    const btn = card.querySelector('.select-btn');
    btn.classList.remove('selected');
    btn.innerHTML = '<i class="fas fa-plus"></i> Add to Enquiry';
  });
  updateEnquiryBar();
}

function sendWhatsAppEnquiry() {
  if (selectedProducts.size === 0) return;

  let message = `Hello! I'm interested in the following products/services from *Swaraj Weighing Scale & RO Purifiers*:\n\n`;

  let index = 1;
  selectedProducts.forEach(item => {
    const [id, name] = item.split('|');
    message += `${index}. ${name} (${id})\n`;
    index++;
  });

  message += `\nPlease share pricing and availability details. Thank you!`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
}

// ===== PRODUCT CATEGORY FILTERS =====
document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      productCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Scroll-to-top button visibility
  const scrollBtn = document.getElementById('scrollTopBtn');
  if (window.scrollY > 500) {
    scrollBtn.classList.add('visible');
  } else {
    scrollBtn.classList.remove('visible');
  }

  // Active nav link based on scroll position
  updateActiveNavLink();
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('open');
});

// Close menu on link click
navMenu.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('open');
  });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// ===== SCROLL REVEAL ANIMATION =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

// ===== ANIMATED COUNTERS =====
function animateCounters() {
  const counters = document.querySelectorAll('.stat-num');
  counters.forEach(counter => {
    const target = parseInt(counter.dataset.target);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };

    updateCounter();
  });
}

// Trigger counters when hero stats become visible
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// ===== CONTACT FORM → WHATSAPP =====
function handleContactForm(e) {
  e.preventDefault();

  const name = document.getElementById('formName').value;
  const phone = document.getElementById('formPhone').value;
  const email = document.getElementById('formEmail').value;
  const subject = document.getElementById('formSubject').value;
  const msg = document.getElementById('formMessage').value;

  let message = `New Inquiry from Website:\n\n`;
  message += `*Name:* ${name}\n`;
  message += `*Phone:* ${phone}\n`;
  if (email) message += `*Email:* ${email}\n`;
  if (subject) message += `*Subject:* ${subject}\n`;
  if (msg) message += `*Message:* ${msg}\n`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
