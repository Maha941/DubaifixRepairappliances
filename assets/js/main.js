/**
 * Dubai Local Repair Services - Frontend Engine
 * Optimized for high conversion, instant diagnostic calculation, and one-tap dispatch.
 * Official Contact: +92 314 3110259
 */

document.addEventListener('DOMContentLoaded', () => {
  const WHATSAPP_NUM = '923143110259';
  const PHONE_NUM = '+923143110259';

  // Pricing Matrix in AED for the 6 Core Services
  const PRICING_TABLE = {
    'washing-machine': {
      'drain': 'AED 120 - 160',
      'spin': 'AED 140 - 180',
      'noise': 'AED 150 - 220',
      'leak': 'AED 120 - 160',
      'pcb': 'AED 180 - 260',
      'other': 'AED 120 - 160'
    },
    'refrigerator': {
      'cooling': 'AED 140 - 190',
      'gas': 'AED 150 - 240',
      'compressor': 'AED 200 - 320',
      'ice': 'AED 140 - 190',
      'leak': 'AED 120 - 160',
      'other': 'AED 130 - 170'
    },
    'dishwasher': {
      'drain': 'AED 120 - 160',
      'wash': 'AED 130 - 180',
      'heat': 'AED 150 - 210',
      'leak': 'AED 120 - 160',
      'error': 'AED 140 - 190',
      'other': 'AED 120 - 160'
    },
    'dryer': {
      'heat': 'AED 130 - 180',
      'belt': 'AED 140 - 190',
      'time': 'AED 130 - 170',
      'noise': 'AED 120 - 160',
      'thermal': 'AED 140 - 200',
      'other': 'AED 120 - 160'
    },
    'cooker': {
      'ignition': 'AED 120 - 170',
      'heat': 'AED 140 - 200',
      'thermo': 'AED 130 - 180',
      'gas': 'AED 120 - 160',
      'glass': 'AED 150 - 240',
      'other': 'AED 120 - 160'
    },
    'microwave': {
      'heat': 'AED 100 - 150',
      'spark': 'AED 110 - 160',
      'turntable': 'AED 90 - 130',
      'power': 'AED 120 - 170',
      'keypad': 'AED 110 - 150',
      'other': 'AED 90 - 140'
    }
  };

  // Symptoms Map for the 6 Core Services
  const SYMPTOMS_MAP = {
    'washing-machine': [
      { val: 'drain', text: 'Water not draining (OE/E20 error)' },
      { val: 'spin', text: 'Drum not spinning / unbalanced load' },
      { val: 'noise', text: 'Loud bearing noise or drum vibration' },
      { val: 'leak', text: 'Water leaking from door seal or bottom' },
      { val: 'pcb', text: 'Control board failure or no power' },
      { val: 'other', text: 'Door lock jam or mechanical issue' }
    ],
    'refrigerator': [
      { val: 'cooling', text: 'Fridge warm while freezer works' },
      { val: 'gas', text: 'Refrigerant gas top-up or leak recharge' },
      { val: 'compressor', text: 'Compressor clicking or silent' },
      { val: 'ice', text: 'Heavy frost or ice buildup on back coil' },
      { val: 'leak', text: 'Water pooling in vegetable crisper' },
      { val: 'other', text: 'Thermostat, fan motor or gasket defect' }
    ],
    'dishwasher': [
      { val: 'drain', text: 'Standing water after wash cycle' },
      { val: 'wash', text: 'Dishes coming out dirty or greasy' },
      { val: 'heat', text: 'Heating element or drying failure' },
      { val: 'leak', text: 'Water leaking from door seal gasket' },
      { val: 'error', text: 'Error code E15, E24 or beep alert' },
      { val: 'other', text: 'Wash pump or spray arm blockage' }
    ],
    'dryer': [
      { val: 'heat', text: 'Drum rotates but produces no heat' },
      { val: 'belt', text: 'Drum will not rotate / snapped belt' },
      { val: 'time', text: 'Clothes taking 3+ hours to dry' },
      { val: 'noise', text: 'Loud squeaking, rumbling, or screeching' },
      { val: 'thermal', text: 'Overheating or thermal fuse tripped' },
      { val: 'other', text: 'Moisture sensor or exhaust duct clog' }
    ],
    'cooker': [
      { val: 'ignition', text: 'Burner spark ignition failure' },
      { val: 'heat', text: 'Oven bake element not reaching heat' },
      { val: 'thermo', text: 'Thermocouple: flame goes out on release' },
      { val: 'gas', text: 'Gas safety valve or uneven flame' },
      { val: 'glass', text: 'Oven door hinge loose or seal worn' },
      { val: 'other', text: 'Thermostat or digital timer malfunction' }
    ],
    'microwave': [
      { val: 'heat', text: 'Microwave runs but food remains cold' },
      { val: 'spark', text: 'Sparking / arcing inside cavity' },
      { val: 'turntable', text: 'Turntable glass plate not spinning' },
      { val: 'power', text: 'No power / display dead / fuse trips' },
      { val: 'keypad', text: 'Touchpad buttons unresponsive' },
      { val: 'other', text: 'Mica waveguide or diode replacement' }
    ]
  };

  // Estimator Elements
  const applianceSelect = document.getElementById('estimator-appliance');
  const issueSelect = document.getElementById('estimator-issue');
  const areaSelect = document.getElementById('estimator-area');
  const priceDisplay = document.getElementById('estimator-price-display');
  const estimatorForm = document.getElementById('hero-estimator-form');

  function populateIssues(appKey) {
    if (!issueSelect) return;
    const list = SYMPTOMS_MAP[appKey] || SYMPTOMS_MAP['washing-machine'];
    issueSelect.innerHTML = '';
    list.forEach(item => {
      const opt = document.createElement('option');
      opt.value = item.val;
      opt.textContent = item.text;
      issueSelect.appendChild(opt);
    });
    calculatePrice();
  }

  function calculatePrice() {
    if (!applianceSelect || !issueSelect || !priceDisplay) return;
    const app = applianceSelect.value;
    const issue = issueSelect.value;
    const matrix = PRICING_TABLE[app] || PRICING_TABLE['washing-machine'];
    const rate = matrix[issue] || matrix['other'] || 'AED 120 - 180';
    priceDisplay.textContent = rate;
  }

  if (applianceSelect) {
    applianceSelect.addEventListener('change', (e) => {
      populateIssues(e.target.value);
    });
  }

  if (issueSelect) {
    issueSelect.addEventListener('change', calculatePrice);
  }

  // Hero Quick Selector Pills
  const heroPills = document.querySelectorAll('.selector-pill');
  heroPills.forEach(pill => {
    pill.addEventListener('click', () => {
      heroPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const targetApp = pill.getAttribute('data-appliance');
      if (applianceSelect) {
        applianceSelect.value = targetApp;
        populateIssues(targetApp);
      }
    });
  });

  // Initialize Estimator
  if (applianceSelect) {
    populateIssues(applianceSelect.value || 'washing-machine');
  }

  // Estimator Submit -> WhatsApp
  if (estimatorForm) {
    estimatorForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const app = applianceSelect ? applianceSelect.options[applianceSelect.selectedIndex].text : 'Appliance';
      const issue = issueSelect ? issueSelect.options[issueSelect.selectedIndex].text : 'Repair service';
      const area = areaSelect ? areaSelect.value : 'Dubai Marina';
      const price = priceDisplay ? priceDisplay.textContent : 'Upfront Quote';

      const msg = 'Hello HywizFix Dubai,\n' +
        'I need urgent technician dispatch in ' + area + ', Dubai.\n' +
        '- Service: ' + app + '\n' +
        '- Symptom/Problem: ' + issue + '\n' +
        '- Upfront Estimate: ' + price + '\n' +
        'Please confirm immediate arrival time (30-45 mins).';
      const url = 'https://wa.me/' + WHATSAPP_NUM + '?text=' + encodeURIComponent(msg);
      window.open(url, '_blank');
    });
  }

  // Malfunctions Interactive Tabs
  const tabBtns = document.querySelectorAll('.malfunction-tab-btn');
  const tabPanels = document.querySelectorAll('.malfunction-tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const activePanel = document.getElementById(targetId);
      if (activePanel) {
        activePanel.classList.add('active');
      }
    });
  });

  // Common Appliance Problems Interactive Tabs
  const commonTabBtns = document.querySelectorAll('.common-tab-btn');
  const commonTabPanels = document.querySelectorAll('.common-tab-panel');

  commonTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');

      commonTabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      commonTabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      const activePanel = document.getElementById(targetId);
      if (activePanel) {
        activePanel.classList.add('active');
      }
    });
  });


  // Modal Booking Handling
  const modal = document.getElementById('booking-modal');
  const modalClose = document.getElementById('modal-close-btn');
  const modalOverlay = document.getElementById('modal-overlay');
  const modalForm = document.getElementById('modal-booking-form');
  const modalAppliance = document.getElementById('modal-appliance-select');
  const openModalBtns = document.querySelectorAll('.open-booking-modal');

  function openModal(preselectedAppliance = null) {
    if (!modal) {
      const msg = encodeURIComponent(`Hello HywizFix, I need urgent ${preselectedAppliance || 'appliance'} repair in Dubai.`);
      window.open(`https://wa.me/${WHATSAPP_NUM}?text=${msg}`, '_blank');
      return;
    }
    if (preselectedAppliance && modalAppliance) {
      for (let i = 0; i < modalAppliance.options.length; i++) {
        if (modalAppliance.options[i].text.toLowerCase().includes(preselectedAppliance.toLowerCase()) ||
            modalAppliance.options[i].value.toLowerCase().includes(preselectedAppliance.toLowerCase())) {
          modalAppliance.selectedIndex = i;
          break;
        }
      }
    }
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const applianceAttr = btn.getAttribute('data-appliance');
      openModal(applianceAttr);
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', closeModal);
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });

  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('modal-name')?.value || 'Customer';
      const phone = document.getElementById('modal-phone')?.value || 'Not provided';
      const area = document.getElementById('modal-area')?.value || 'Dubai';
      const app = modalAppliance ? modalAppliance.options[modalAppliance.selectedIndex].text : 'Appliance Repair';
      const notes = document.getElementById('modal-notes')?.value || 'Same-day inspection requested';

      const msg = 'Hello HywizFix Dubai Team,\n' +
        'I would like to book a doorstep technician.\n' +
        '- Name: ' + name + '\n' +
        '- Contact Phone: ' + phone + '\n' +
        '- Dubai Area: ' + area + '\n' +
        '- Appliance Needed: ' + app + '\n' +
        '- Details: ' + notes + '\n' +
        'Please confirm schedule.';
      const url = 'https://wa.me/' + WHATSAPP_NUM + '?text=' + encodeURIComponent(msg);
      window.open(url, '_blank');
      closeModal();
    });
  }

  // FAQ Accordion
  const faqQuestions = document.querySelectorAll('.faq-item-trigger');
  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const parent = btn.closest('.faq-item');
      const isOpen = parent.classList.contains('active');

      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        const trigger = item.querySelector('.faq-item-trigger');
        if (trigger) trigger.setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        parent.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ==========================================================================
  // Smooth Animated Mobile Menu Toggle with Icon Morph & Outside Click
  // ==========================================================================
  const mobileToggleBtn = document.getElementById('mobile-menu-toggle-btn');
  const mobileDropdown = document.getElementById('mobile-nav-dropdown');

  if (mobileToggleBtn && mobileDropdown) {
    // Clear conflicting inline display styles so CSS transitions animate smoothly
    mobileDropdown.style.removeProperty('display');

    function openMobileMenu() {
      mobileDropdown.classList.add('is-open');
      mobileToggleBtn.classList.add('is-active');
      mobileToggleBtn.setAttribute('aria-expanded', 'true');
      mobileToggleBtn.setAttribute('aria-label', 'Close menu');
    }

    function closeMobileMenu() {
      mobileDropdown.classList.remove('is-open');
      mobileToggleBtn.classList.remove('is-active');
      mobileToggleBtn.setAttribute('aria-expanded', 'false');
      mobileToggleBtn.setAttribute('aria-label', 'Open menu');
    }

    function toggleMobileMenu() {
      if (mobileDropdown.classList.contains('is-open')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    }

    mobileToggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });

    // Close smoothly when clicking any link inside drawer
    mobileDropdown.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        closeMobileMenu();
      });
    });

    // Close smoothly when tapping outside header
    document.addEventListener('click', (e) => {
      if (!mobileDropdown.contains(e.target) && !mobileToggleBtn.contains(e.target)) {
        if (mobileDropdown.classList.contains('is-open')) {
          closeMobileMenu();
        }
      }
    });

    // Close on Escape key for accessibility
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDropdown.classList.contains('is-open')) {
        closeMobileMenu();
      }
    });
  }

  // ==========================================================================
  // Dark / Light Theme Mode Toggle (Matches reference media_1789450509722.png)
  // ==========================================================================
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const sunIcon = document.getElementById('sunIcon');
  const moonIcon = document.getElementById('moonIcon');

  function updateThemeUI(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      if (sunIcon) sunIcon.style.display = 'block';
      if (moonIcon) moonIcon.style.display = 'none';
      if (themeToggleBtn) themeToggleBtn.setAttribute('title', 'Switch to light mode');
    } else {
      document.documentElement.removeAttribute('data-theme');
      if (sunIcon) sunIcon.style.display = 'none';
      if (moonIcon) moonIcon.style.display = 'block';
      if (themeToggleBtn) themeToggleBtn.setAttribute('title', 'Switch to dark mode');
    }
  }

  // Initialize theme based on localStorage or default to light as per media_1789450509722.png
  const currentTheme = localStorage.getItem('rua-theme') || 'light';
  updateThemeUI(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const nextTheme = activeTheme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('rua-theme', nextTheme);
      updateThemeUI(nextTheme);
    });
  }

  // ==========================================================================
  // Chatty - Dubai Appliance Diagnostic Chatbot Engine
  // High-converting, interactive diagnostic assistant with bouncy UI
  // ==========================================================================
  const chattyLauncherBtn = document.getElementById('chattyLauncherBtn');
  const chattyWidgetWindow = document.getElementById('chattyWidgetWindow');
  const chattyCloseBtn = document.getElementById('chattyCloseBtn');
  const chattyMessagesArea = document.getElementById('chattyMessagesArea');
  const chattyInputForm = document.getElementById('chattyInputForm');
  const chattyInputField = document.getElementById('chattyInputField');

  if (chattyLauncherBtn && chattyWidgetWindow) {
    chattyLauncherBtn.addEventListener('click', () => {
      chattyWidgetWindow.classList.toggle('active');
      if (chattyWidgetWindow.classList.contains('active')) {
        setTimeout(() => chattyInputField && chattyInputField.focus(), 200);
      }
    });

    if (chattyCloseBtn) {
      chattyCloseBtn.addEventListener('click', () => {
        chattyWidgetWindow.classList.remove('active');
      });
    }

    function scrollChattyToBottom() {
      if (chattyMessagesArea) {
        chattyMessagesArea.scrollTop = chattyMessagesArea.scrollHeight;
      }
    }

    function showTypingIndicator() {
      const typingEl = document.createElement('div');
      typingEl.className = 'chatty-typing-bubble';
      typingEl.id = 'chattyTypingIndicator';
      typingEl.innerHTML = `
        <span class="chatty-typing-dot"></span>
        <span class="chatty-typing-dot"></span>
        <span class="chatty-typing-dot"></span>
      `;
      chattyMessagesArea.appendChild(typingEl);
      scrollChattyToBottom();
      return typingEl;
    }

    function removeTypingIndicator() {
      const typingEl = document.getElementById('chattyTypingIndicator');
      if (typingEl) typingEl.remove();
    }

    function appendUserMessage(text) {
      const bubble = document.createElement('div');
      bubble.className = 'chatty-bubble chatty-bubble-user';
      bubble.textContent = text;
      chattyMessagesArea.appendChild(bubble);
      scrollChattyToBottom();
    }

    function appendBotMessage(htmlContent) {
      const bubble = document.createElement('div');
      bubble.className = 'chatty-bubble chatty-bubble-bot';
      bubble.innerHTML = htmlContent;
      chattyMessagesArea.appendChild(bubble);
      scrollChattyToBottom();

      // Bind dynamic chip clicks inside newly rendered bot message
      bubble.querySelectorAll('.chatty-chip').forEach(chip => {
        chip.addEventListener('click', () => {
          const service = chip.dataset.service;
          handleUserChoice(service, chip.textContent);
        });
      });
    }

    // Knowledge base for Chatty
    const CHATTY_KNOWLEDGE = {
      'washing-machine': {
        title: 'Washing Machine Repair',
        diagnostics: 'Common faults: Clogged drain pump filter, worn drive belt, motor carbon brushes, or faulty balance suspension.',
        estimate: 'AED 120 – AED 160',
        arrival: '30–45 mins anywhere in Dubai',
        chips: ['Water Not Draining', 'Drum Not Spinning', 'Loud Noise/Vibration']
      },
      'refrigerator': {
        title: 'Refrigerator & Freezer Repair',
        diagnostics: 'Common faults: Compressor relay failure, low refrigerant gas, defrost timer malfunction, or clogged condenser fan.',
        estimate: 'AED 140 – AED 190',
        arrival: 'Immediate emergency priority in Dubai',
        chips: ['Fridge Warm / Freezer Cold', 'Gas Leak / Recharge', 'Compressor Clicking']
      },
      'dishwasher': {
        title: 'Dishwasher Repair & Descaling',
        diagnostics: 'Common faults: Blocked drain impeller, faulty inlet water solenoid, heating element scaling, or door seal leakage.',
        estimate: 'AED 120 – AED 160',
        arrival: '30–45 mins anywhere in Dubai',
        chips: ['Dishes Dirty / Soap Residue', 'Standing Water at Bottom', 'Error Code Beeping']
      },
      'cooker': {
        title: 'Cooking Range, Stove & Oven Repair',
        diagnostics: 'Common faults: Blocked gas jet nozzles, thermocouple flame-out, electric spark igniter, or oven thermostat burnout.',
        estimate: 'AED 120 – AED 170',
        arrival: '30–45 mins anywhere in Dubai',
        chips: ['Flame Goes Out Quickly', 'Oven Not Heating', 'Spark Igniter Clicking']
      },
      'dryer': {
        title: 'Clothes Dryer Repair',
        diagnostics: 'Common faults: Tripped thermal safety fuse, snapped drive belt, heating element burnout, or blocked lint duct.',
        estimate: 'AED 130 – AED 180',
        arrival: '30–45 mins anywhere in Dubai',
        chips: ['Tumbling But No Heat', 'Drum Won’t Spin', 'Taking 3+ Hours']
      },
      'ac': {
        title: 'AC Deep Chemical Wash & Gas Top-Up',
        diagnostics: 'Common faults: Clogged cooling coil with dust, low R410A gas pressure, blocked condensate drain tray, or compressor capacitor.',
        estimate: 'AED 130 – AED 180',
        arrival: '30–45 mins doorstep arrival in Dubai',
        chips: ['AC Blowing Warm Air', 'Water Leaking from AC', 'Chemical Coil Wash']
      }
    };

    function generateBotResponseForService(key, customLabel) {
      const data = CHATTY_KNOWLEDGE[key];
      if (!data) return null;

      const waText = encodeURIComponent(`Hello HywizFix, I need urgent ${data.title} in Dubai. Issue: ${customLabel || data.title}`);
      const waUrl = `https://wa.me/${WHATSAPP_NUM}?text=${waText}`;

      let chipsHtml = '';
      if (data.chips && data.chips.length > 0) {
        chipsHtml = `
          <div class="chatty-chips-container" style="margin-top: 8px;">
            ${data.chips.map(c => `<button type="button" class="chatty-chip" data-service="${key}">${c}</button>`).join('')}
          </div>
        `;
      }

      return `
        <strong>⚡ ${data.title} Diagnosis:</strong><br />
        ${data.diagnostics}
        <div class="chatty-card-estimate">
          <div>Estimated Cost: <span class="chatty-estimate-price">${data.estimate}</span></div>
          <div style="font-size: 0.78rem; color: #64748b; margin-top: 2px;">Includes OEM parts warranty + Free inspection upon repair</div>
        </div>
        <div style="font-size: 0.82rem; color: #166534; font-weight: 600; margin: 4px 0;">
          🚐 Van Dispatch ETA: <strong>${data.arrival}</strong>
        </div>
        <a href="${waUrl}" class="chatty-cta-btn" target="_blank" rel="noopener noreferrer">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
          <span>Dispatch Technician on WhatsApp</span>
        </a>
        ${chipsHtml}
      `;
    }

    function handleUserChoice(serviceKey, userLabel) {
      appendUserMessage(userLabel);
      showTypingIndicator();

      setTimeout(() => {
        removeTypingIndicator();
        const responseHtml = generateBotResponseForService(serviceKey, userLabel);
        if (responseHtml) {
          appendBotMessage(responseHtml);
        } else {
          appendBotMessage(`
            Got it! Our licensed Dubai technician can inspect this today.<br />
            Estimated diagnostic & service: <strong>AED 120 – AED 160</strong>.<br />
            <a href="https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent('Hello HywizFix, I need urgent appliance repair in Dubai: ' + userLabel)}" class="chatty-cta-btn" target="_blank" rel="noopener noreferrer">
              👉 Instant WhatsApp Dispatch (+92 314 3110259)
            </a>
          `);
        }
      }, 700);
    }

    // Initial chips binding
    const initialChips = document.querySelectorAll('#chattyQuickChips .chatty-chip');
    initialChips.forEach(chip => {
      chip.addEventListener('click', () => {
        const service = chip.dataset.service;
        handleUserChoice(service, chip.textContent);
      });
    });

    // Form submission
    if (chattyInputForm && chattyInputField) {
      chattyInputForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = chattyInputField.value.trim();
        if (!query) return;

        appendUserMessage(query);
        chattyInputField.value = '';
        showTypingIndicator();

        const lower = query.toLowerCase();
        let matchedService = 'washing-machine';
        if (lower.includes('fridge') || lower.includes('refrigerator') || lower.includes('freeze') || lower.includes('cool')) {
          matchedService = 'refrigerator';
        } else if (lower.includes('dish') || (lower.includes('wash') && lower.includes('dish'))) {
          matchedService = 'dishwasher';
        } else if (lower.includes('ac') || lower.includes('air') || lower.includes('chiller')) {
          matchedService = 'ac';
        } else if (lower.includes('dryer') || lower.includes('clothes')) {
          matchedService = 'dryer';
        } else if (lower.includes('cook') || lower.includes('stove') || lower.includes('oven') || lower.includes('range') || lower.includes('gas')) {
          matchedService = 'cooker';
        }

        setTimeout(() => {
          removeTypingIndicator();
          const responseHtml = generateBotResponseForService(matchedService, query);
          if (responseHtml) {
            appendBotMessage(responseHtml);
          } else {
            const waLink = `https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent('Hello, I have an appliance issue in Dubai: ' + query)}`;
            appendBotMessage(`
              Thanks for sharing! Our team is available 24/7 across all Dubai residential communities.<br />
              <div class="chatty-card-estimate">
                Average repair cost: <span class="chatty-estimate-price">AED 120 – AED 180</span>
              </div>
              <a href="${waLink}" class="chatty-cta-btn" target="_blank" rel="noopener noreferrer">
                🚀 Send details to WhatsApp Dispatch
              </a>
            `);
          }
        }, 750);
      });
    }
  }

  /* --------------------------------------------------------------------------
     Process Section Live Timeline & Step Flow Controller
     -------------------------------------------------------------------------- */
  const processFlowWrapper = document.getElementById('processFlowWrapper');
  if (processFlowWrapper) {
    const processCards = processFlowWrapper.querySelectorAll('.process-card');
    const timelineBar = document.getElementById('processTimelineBar');
    let currentActiveStep = 1;
    let autoCycleTimer = null;
    let isUserInteracting = false;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function setActiveStep(stepNumber) {
      currentActiveStep = stepNumber;
      processCards.forEach(card => {
        const cardStep = parseInt(card.dataset.step, 10);
        if (cardStep === stepNumber) {
          card.classList.add('is-active');
        } else {
          card.classList.remove('is-active');
        }
      });

      if (timelineBar) {
        const percentage = (stepNumber / processCards.length) * 100;
        timelineBar.style.width = `${percentage}%`;
      }
    }

    processCards.forEach(card => {
      const step = parseInt(card.dataset.step, 10);

      card.addEventListener('click', () => {
        isUserInteracting = true;
        stopAutoCycle();
        setActiveStep(step);
      });

      card.addEventListener('mouseenter', () => {
        isUserInteracting = true;
        stopAutoCycle();
        setActiveStep(step);
      });

      card.addEventListener('focus', () => {
        isUserInteracting = true;
        stopAutoCycle();
        setActiveStep(step);
      });
    });

    processFlowWrapper.addEventListener('mouseleave', () => {
      isUserInteracting = false;
      startAutoCycle();
    });

    function startAutoCycle() {
      if (prefersReducedMotion || autoCycleTimer) return;
      autoCycleTimer = setInterval(() => {
        if (!isUserInteracting) {
          let nextStep = currentActiveStep + 1;
          if (nextStep > processCards.length) {
            nextStep = 1;
          }
          setActiveStep(nextStep);
        }
      }, 3500);
    }

    function stopAutoCycle() {
      if (autoCycleTimer) {
        clearInterval(autoCycleTimer);
        autoCycleTimer = null;
      }
    }

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            startAutoCycle();
          } else {
            stopAutoCycle();
          }
        });
      }, { threshold: 0.25 });

      observer.observe(processFlowWrapper);
    } else {
      startAutoCycle();
    }
  }

  /* --------------------------------------------------------------------------
     Scroll-Triggered Falling Brands Grid Observer
     -------------------------------------------------------------------------- */
  const brandsScatteredGrid = document.getElementById('brandsScatteredGrid');

  function triggerBrandCardsDropAnimation() {
    if (brandsScatteredGrid) {
      brandsScatteredGrid.classList.remove('animate-drop');
      void brandsScatteredGrid.offsetWidth; // Force reflow
      brandsScatteredGrid.classList.add('animate-drop');
    }
  }

  if (brandsScatteredGrid) {
    if ('IntersectionObserver' in window) {
      const brandObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            triggerBrandCardsDropAnimation();
          }
        });
      }, { threshold: 0.12 });

      const targetSection = document.getElementById('brands') || brandsScatteredGrid;
      if (targetSection) {
        brandObserver.observe(targetSection);
      }
    } else {
      triggerBrandCardsDropAnimation();
    }
  }

  // Reviews / Testimonials Carousel Slider
  const reviewsTrack = document.getElementById('reviewsTrack');
  const prevBtn = document.getElementById('reviewsPrevBtn');
  const nextBtn = document.getElementById('reviewsNextBtn');

  if (reviewsTrack && prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      const card = reviewsTrack.querySelector('.testimonial-ref-card');
      const step = card ? (card.offsetWidth + 16) : 340;
      reviewsTrack.scrollBy({ left: -step, behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', () => {
      const card = reviewsTrack.querySelector('.testimonial-ref-card');
      const step = card ? (card.offsetWidth + 16) : 340;
      reviewsTrack.scrollBy({ left: step, behavior: 'smooth' });
    });
  }

  // Hero Floating Services Panel Chip Navigation
  const heroServiceChips = document.querySelectorAll('.hero-ref-services-panel .ref-service-chip');
  heroServiceChips.forEach(chip => {
    chip.addEventListener('click', (e) => {
      const destination = chip.getAttribute('href');
      if (destination && destination !== '#' && !destination.startsWith('javascript:')) {
        window.location.href = destination;
      }
    });
  });

  /* --------------------------------------------------------------------------
     Section Scroll Reveal & Stagger Animation Controller
     -------------------------------------------------------------------------- */
  const revealTargets = document.querySelectorAll(
    '.reveal-fade-up, .reveal-slide-left, .reveal-slide-right, .reveal-scale-up, .catalog-card, .review-card, .faq-item, .section-heading-block'
  );

  if (revealTargets.length > 0) {
    if ('IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in-view');
            revealObserver.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      });

      revealTargets.forEach((el, index) => {
        if (!el.classList.contains('reveal-fade-up') &&
            !el.classList.contains('reveal-slide-left') &&
            !el.classList.contains('reveal-slide-right') &&
            !el.classList.contains('reveal-scale-up')) {
          el.classList.add('reveal-fade-up');
        }

        if (el.classList.contains('catalog-card')) {
          const delayNum = (index % 6) + 1;
          el.classList.add(`delay-${delayNum}`);
        }

        revealObserver.observe(el);
      });
    } else {
      revealTargets.forEach(el => el.classList.add('is-in-view'));
    }
  }
});