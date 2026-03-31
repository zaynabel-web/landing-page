 const navbar   = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');

    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
      scrollTopBtn.classList.toggle('show', window.scrollY > 400);
    }, { passive: true });

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });

    // Close mobile menu on link click
    mobileMenu.querySelectorAll('a').forEach(link =>
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      })
    );

    /* ----------------------------------
       HERO background subtle zoom-in
    ---------------------------------- */
    window.addEventListener('load', () => {
      document.getElementById('heroBg').classList.add('loaded');
    });

    /* ----------------------------------
       SCROLL REVEAL (IntersectionObserver)
    ---------------------------------- */
    const revealEls = document.querySelectorAll('.reveal');
    const observer  = new IntersectionObserver(
      (entries) => entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger cards in a grid
          const delay = entry.target.closest('.apartments-grid, .testimonials-grid')
            ? [...entry.target.parentNode.children].indexOf(entry.target) * 80
            : 0;
          setTimeout(() => entry.target.classList.add('visible'), delay);
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12 }
    );
    revealEls.forEach(el => observer.observe(el));

    /* ----------------------------------
       FAVOURITE (heart) toggle
    ---------------------------------- */
    document.querySelectorAll('.apt-fav').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.classList.toggle('liked');
        const icon = btn.querySelector('i');
        icon.classList.toggle('fa-regular');
        icon.classList.toggle('fa-solid');
      });
    });

    /* ----------------------------------
       CONTACT FORM submit
    ---------------------------------- */
    document.getElementById('contactForm').addEventListener('submit', function(e) {
      e.preventDefault();
      // Simple fake submission with a loading effect
      const submitBtn = this.querySelector('.btn-submit');
      submitBtn.textContent = 'Sending…';
      submitBtn.disabled = true;

      setTimeout(() => {
        this.style.display = 'none';
        document.getElementById('formSuccess').style.display = 'block';
      }, 1400);
    });

    /* ----------------------------------
       SCROLL-TO-TOP button
    ---------------------------------- */
    const scrollTopBtn = document.getElementById('scroll-top');
    scrollTopBtn.addEventListener('click', () =>
      window.scrollTo({ top: 0, behavior: 'smooth' })
    );

    /* ----------------------------------
       SMOOTH ACTIVE nav highlight
    ---------------------------------- */
    const sections = document.querySelectorAll('section[id]');
    const navAnchors = document.querySelectorAll('.nav-links a');

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            navAnchors.forEach(a => a.style.color = '');
            const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
            if (activeLink) activeLink.style.color = 'var(--accent)';
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach(s => sectionObserver.observe(s));