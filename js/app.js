/**
 * PROPUESTA TECNOLÓGICA EMPRESARIAL - JAVASCRIPT DINÁMICO
 * Ajover Darnel S.A.S. | Control de Cambios FADM36-1
 * Funcionalidades: Barra de progreso, pestañas, acordeones, calculadora interactiva,
 * checklist persistente, modo presentación y soporte de exportación/impresión.
 */

document.addEventListener('DOMContentLoaded', () => {
  initReadingProgress();
  initSidebarNavigation();
  initTabs();
  initAccordions();
  initCostCalculator();
  initChecklists();
  initPresentationMode();
  initPrintButton();
});

/* 1. Indicador Visual de Avance de Lectura */
function initReadingProgress() {
  const progressBar = document.getElementById('reading-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;
  });
}

/* 2. Navegación Lateral y Scroll Spy */
function initSidebarNavigation() {
  const sidebar = document.getElementById('sidebar');
  const toggleBtn = document.getElementById('menu-toggle');
  const navLinks = document.querySelectorAll('.sidebar-nav a');
  const sections = document.querySelectorAll('.doc-section');

  // Toggle móvil
  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
  }

  // Cerrar sidebar al hacer clic en móvil
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 992 && sidebar) {
        sidebar.classList.remove('open');
      }
    });
  });

  // ScrollSpy con IntersectionObserver
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* 3. Pestañas Interactivas (Tabs) */
function initTabs() {
  const tabContainers = document.querySelectorAll('.tab-container');

  tabContainers.forEach(container => {
    const buttons = container.querySelectorAll('.tab-btn');
    const panes = container.querySelectorAll('.tab-pane');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-tab');

        buttons.forEach(b => b.classList.remove('active'));
        panes.forEach(p => p.classList.remove('active'));

        btn.classList.add('active');
        const targetPane = container.querySelector(`#${targetId}`);
        if (targetPane) {
          targetPane.classList.add('active');
        }
      });
    });
  });
}

/* 4. Acordeones para Preguntas de TI y Objeciones */
function initAccordions() {
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isOpen = item.classList.contains('open');

      // Si se desea comportamiento tipo acordeón exclusivo dentro del mismo grupo
      const parentAccordion = item.closest('.accordion');
      if (parentAccordion && !parentAccordion.hasAttribute('data-multiselect')) {
        parentAccordion.querySelectorAll('.accordion-item').forEach(i => {
          if (i !== item) i.classList.remove('open');
        });
      }

      item.classList.toggle('open', !isOpen);
    });
  });
}

/* 5. Calculadora Orientativa de Costos con Conversión Dinámica (USD / COP) */
function initCostCalculator() {
  const usersInput = document.getElementById('calc-users');
  const tcoYearsInput = document.getElementById('calc-years');
  const exchangeRateInput = document.getElementById('calc-rate');
  const archTypeSelect = document.getElementById('calc-arch');

  const initialCostUsd = document.getElementById('calc-initial-usd');
  const initialCostCop = document.getElementById('calc-initial-cop');
  const monthlyCostUsd = document.getElementById('calc-monthly-usd');
  const monthlyCostCop = document.getElementById('calc-monthly-cop');
  const tcoCostUsd = document.getElementById('calc-tco-usd');
  const tcoCostCop = document.getElementById('calc-tco-cop');

  if (!usersInput || !archTypeSelect) return;

  function calculate() {
    const users = Math.max(1, parseInt(usersInput.value) || 25);
    const years = Math.max(1, parseInt(tcoYearsInput.value) || 3);
    const rate = Math.max(100, parseFloat(exchangeRateInput.value) || 4150);
    const arch = archTypeSelect.value;

    let initialUsd = 0;
    let monthlyUsd = 0;

    switch (arch) {
      case 'powerapps':
        // A. Power Apps actual: ya existe y corre bajo M365 existente
        initialUsd = 0;
        monthlyUsd = 0;
        break;

      case 'flutter-sharepoint':
        // B. Flutter Desktop directo con SharePoint (Ustedes desarrollan):
        // Flutter, Dart, VS Code, Entra ID, SharePoint y Graph API son 100% gratuitos y ya están en M365.
        // Costo a terceros = $0 COP / $0 USD
        initialUsd = 0;
        monthlyUsd = 0;
        break;

      case 'flutter-spring-render':
        // C. Flutter + Spring Boot en Render
        // Desarrollo interno: $0 desembolso inicial
        // Pago a Render: $25 USD/mes (Instancia Standard de 2GB RAM)
        initialUsd = 0;
        monthlyUsd = 25;
        break;

      case 'flutter-spring-azure':
        // D. Flutter + Spring Boot en Azure
        // Desarrollo interno: $0 desembolso inicial
        // Pago a Microsoft Azure: ~$45 - $55 USD/mes (App Service B2 / Container Apps)
        initialUsd = 0;
        monthlyUsd = 50;
        break;
    }

    const tcoUsd = initialUsd + (monthlyUsd * 12 * years);

    // Formatear montos
    initialCostUsd.textContent = `$${initialUsd.toLocaleString('en-US')} USD`;
    initialCostCop.textContent = `$${Math.round(initialUsd * rate).toLocaleString('es-CO')} COP`;

    monthlyCostUsd.textContent = `$${monthlyUsd.toLocaleString('en-US')} USD/mes`;
    monthlyCostCop.textContent = `$${Math.round(monthlyUsd * rate).toLocaleString('es-CO')} COP/mes`;

    tcoCostUsd.textContent = `$${tcoUsd.toLocaleString('en-US')} USD`;
    tcoCostCop.textContent = `$${Math.round(tcoUsd * rate).toLocaleString('es-CO')} COP`;
  }

  usersInput.addEventListener('input', calculate);
  tcoYearsInput.addEventListener('input', calculate);
  exchangeRateInput.addEventListener('input', calculate);
  archTypeSelect.addEventListener('change', calculate);

  // Ejecución inicial
  calculate();
}

/* 6. Checklists Interactivos Persistentes (LocalStorage) */
function initChecklists() {
  const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');

  checkboxes.forEach((cb, idx) => {
    const storageKey = `checklist_item_${idx}`;
    const saved = localStorage.getItem(storageKey);

    if (saved === 'true') {
      cb.checked = true;
      cb.closest('.checklist-item').classList.add('checked');
    }

    cb.addEventListener('change', () => {
      const parent = cb.closest('.checklist-item');
      if (cb.checked) {
        parent.classList.add('checked');
        localStorage.setItem(storageKey, 'true');
      } else {
        parent.classList.remove('checked');
        localStorage.setItem(storageKey, 'false');
      }
    });
  });
}

/* 7. Modo Presentación para la Reunión Ejecutiva */
function initPresentationMode() {
  const presBtn = document.getElementById('presentation-btn');
  const exitBtn = document.getElementById('exit-presentation-btn');

  if (presBtn) {
    presBtn.addEventListener('click', () => {
      document.body.classList.add('presentation-mode');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if (exitBtn) {
    exitBtn.addEventListener('click', () => {
      document.body.classList.remove('presentation-mode');
    });
  }

  // Tecla Escape para salir de modo presentación
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('presentation-mode')) {
      document.body.classList.remove('presentation-mode');
    }
  });
}

/* 8. Botón de Impresión y Descarga en PDF */
function initPrintButton() {
  const printBtn = document.getElementById('print-doc-btn');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
}
