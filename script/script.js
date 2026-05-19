document.addEventListener('DOMContentLoaded', function() {
    
    // --- Navigation and Scrolling Code ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    // Mobile menu toggle
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // Active link highlighting on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // --- Contact Form Code (MOVED INSIDE) ---
    const form = document.getElementById('contact-form');
    const result = document.getElementById('form-result');

    // Check if the form exists on the page before adding the listener
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(form);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            result.innerHTML = "Sending...";
            result.classList.remove('text-green-500', 'text-red-500');

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
                    if (response.status == 200) {
                        result.innerHTML = jsonResponse.message;
                        result.classList.add('text-green-500');
                    } else {
                        console.log(response);
                        result.innerHTML = jsonResponse.message;
                        result.classList.add('text-red-500');
                    }
                })
                .catch(error => {
                    console.log(error);
                    result.innerHTML = "Something went wrong!";
                    result.classList.add('text-red-500');
                })
                .then(function() {
                    form.reset();
                    setTimeout(() => {
                        result.innerHTML = '';
                    }, 5000);
                });
        });
    }

}); // <-- The DOMContentLoaded listener curly brace closes here, enclosing ALL the code.