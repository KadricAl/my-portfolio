document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // 1. DYNAMIC CONTACT CONFIGURATION RESOLVER
    // ==========================================
    const config = window.PORTFOLIO_CONFIG || {
        phone: "+38761293073",
        email: "almir.kadric@example.com",
        whatsappNumber: "38761293073",
        viberNumber: "38761293073",
        web3formsKey: "1f4c4080-bce9-44e0-8153-4a5171bfe720",
        socials: {
            linkedin: "#",
            github: "https://github.com/KadricAl",
            youtube: "#",
            instagram: "#"
        }
    };

    // Update Phone CTAs
    document.querySelectorAll('.call-btn').forEach(el => {
        el.setAttribute('href', `tel:${config.phone}`);
    });

    // Update Main WhatsApp CTAs
    document.querySelectorAll('.whatsapp-btn').forEach(el => {
        el.setAttribute('href', `https://wa.me/${config.whatsappNumber}`);
    });

    // Update Programming Section WhatsApp CTA
    const programmingWhatsapp = document.querySelector('.whatsapp-programming-btn');
    if (programmingWhatsapp) {
        const text = encodeURIComponent("Hi Almir, I would like to discuss a software development or programming project!");
        programmingWhatsapp.setAttribute('href', `https://wa.me/${config.whatsappNumber}?text=${text}`);
    }

    // Update Design Section WhatsApp CTA
    const designWhatsapp = document.querySelector('.whatsapp-design-btn');
    if (designWhatsapp) {
        const text = encodeURIComponent("Hi Almir, I would like to inquire about a UI/UX or brand design project!");
        designWhatsapp.setAttribute('href', `https://wa.me/${config.whatsappNumber}?text=${text}`);
    }

    // Update Content Section WhatsApp CTA
    const contentWhatsapp = document.querySelector('.whatsapp-content-btn');
    if (contentWhatsapp) {
        const text = encodeURIComponent("Hi Almir, I'm interested in working with you on a content creation or video editing project!");
        contentWhatsapp.setAttribute('href', `https://wa.me/${config.whatsappNumber}?text=${text}`);
    }

    // Update Viber CTAs (Main & Repair)
    document.querySelectorAll('.viber-btn, .viber-service-repair-btn').forEach(el => {
        el.setAttribute('href', `viber://chat?number=%2B${config.viberNumber}`);
    });

    // Update Social Media Footer Links
    const socialClasses = ['linkedin', 'github', 'youtube', 'instagram'];
    socialClasses.forEach(sName => {
        document.querySelectorAll(`.${sName}-btn`).forEach(el => {
            if (config.socials[sName]) {
                el.setAttribute('href', config.socials[sName]);
            }
        });
    });


    // ==========================================
    // 2. STICKY FLOATING CTA WIDGET DRIVER
    // ==========================================
    const ctaWidget = document.getElementById('cta-widget');
    const ctaFab = document.getElementById('cta-fab');
    const ctaMenu = document.getElementById('cta-menu');
    const ctaClose = document.getElementById('cta-close');

    if (ctaFab && ctaMenu) {
        function openCtaMenu() {
            ctaMenu.classList.remove('hidden');
            // Allow layout repaint before transitioning
            setTimeout(() => {
                ctaMenu.classList.remove('opacity-0', 'translate-y-2');
                ctaMenu.classList.add('opacity-100', 'translate-y-0');
            }, 10);
            ctaFab.classList.remove('pulse-cyan'); // Stop pulsing main button when menu is active
        }

        function closeCtaMenu() {
            ctaMenu.classList.remove('opacity-100', 'translate-y-0');
            ctaMenu.classList.add('opacity-0', 'translate-y-2');
            
            // Wait for transition to complete before hiding
            setTimeout(() => {
                ctaMenu.classList.add('hidden');
            }, 300);
            
            ctaFab.classList.add('pulse-cyan'); // Resume pulsing main button
        }

        // Toggle FAB click
        ctaFab.addEventListener('click', function(e) {
            e.stopPropagation();
            if (ctaMenu.classList.contains('hidden')) {
                openCtaMenu();
            } else {
                closeCtaMenu();
            }
        });

        // Close button click
        if (ctaClose) {
            ctaClose.addEventListener('click', function(e) {
                e.stopPropagation();
                closeCtaMenu();
            });
        }

        // Close on clicking outside the widget
        document.addEventListener('click', function(e) {
            if (ctaWidget && !ctaWidget.contains(e.target)) {
                if (!ctaMenu.classList.contains('hidden')) {
                    closeCtaMenu();
                }
            }
        });
    }


    // ==========================================
    // 3. NAVIGATION BAR SCROLL TRIGGER
    // ==========================================
    const header = document.querySelector('header');
    
    function checkHeaderScroll() {
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', checkHeaderScroll);
    window.addEventListener('load', checkHeaderScroll);


    // ==========================================
    // 4. ACTIVE LINK HIGHLIGHTING (SCROLL SPY)
    // ==========================================
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    // Mobile menu toggle
    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu on nav click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    function highlightNavLinks() {
        let scrollPosition = window.scrollY || document.documentElement.scrollTop;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 140; // accounted navbar offset
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').includes(sectionId)) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavLinks);
    window.addEventListener('load', highlightNavLinks);


    // ==========================================
    // 5. CONTACT FORM INTERACTIVE FEEDBACK
    // ==========================================
    const form = document.getElementById('contact-form');
    const result = document.getElementById('form-result');

    if (form && result) {
        // Sync access_key from PORTFOLIO_CONFIG if provided
        const keyInput = form.querySelector('input[name="access_key"]');
        if (keyInput && config.web3formsKey) {
            keyInput.value = config.web3formsKey;
        }

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Botcheck Honeypot protection
            const botcheck = form.querySelector('input[name="botcheck"]');
            if (botcheck && botcheck.checked) {
                return;
            }

            const formData = new FormData(form);
            // Ensure access key from config is used if form input is placeholder
            if (config.web3formsKey && (!formData.get('access_key') || formData.get('access_key') === 'YOUR_WEB3FORMS_ACCESS_KEY')) {
                formData.set('access_key', config.web3formsKey);
            }

            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            // Glass loading notice
            result.innerHTML = `
                <div class="flex items-center justify-center space-x-2.5 text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 py-3.5 px-4 rounded-xl shadow-lg animate-pulse">
                    <svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Transmitting message...</span>
                </div>
            `;
            
            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
            .then(async (response) => {
                let jsonResponse = await response.json();
                if (response.status === 200 && jsonResponse.success !== false) {
                    // Glass Success alert with custom checkmark icon
                    result.innerHTML = `
                        <div class="flex items-center justify-center space-x-2.5 text-green-400 bg-green-500/10 border border-green-500/25 py-3.5 px-4 rounded-xl shadow-lg">
                            <svg class="w-5.5 h-5.5 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>${jsonResponse.message || 'Message dispatched successfully!'}</span>
                        </div>
                    `;
                    form.reset();
                } else {
                    console.log(response);
                    // Glass Error alert
                    result.innerHTML = `
                        <div class="flex items-center justify-center space-x-2.5 text-red-400 bg-red-500/10 border border-red-500/25 py-3.5 px-4 rounded-xl shadow-lg">
                            <svg class="w-5.5 h-5.5 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                            <span>Transmission error: ${jsonResponse.message || 'Verification failed. Please check your Web3Forms access key.'}</span>
                        </div>
                    `;
                }
            })
            .catch(error => {
                console.log(error);
                result.innerHTML = `
                    <div class="flex items-center justify-center space-x-2.5 text-red-400 bg-red-500/10 border border-red-500/25 py-3.5 px-4 rounded-xl shadow-lg">
                        <svg class="w-5.5 h-5.5 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span>Unable to connect. Check internet link.</span>
                    </div>
                `;
            })
            .finally(() => {
                // Clear after 6 seconds
                setTimeout(() => {
                    result.innerHTML = '';
                }, 6000);
            });
        });
    }

});