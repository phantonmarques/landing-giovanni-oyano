document.addEventListener('DOMContentLoaded', () => {

    // Load Fonts
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Poppins:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&display=swap';
    document.head.appendChild(link);

    // Toggle Sidebar Mobile
    const sideBarOpen = { value: false };

    const toggleSidebar = () => {
        sideBarOpen.value = !sideBarOpen.value;
        document.body.style.overflow = sideBarOpen.value ? 'hidden' : '';
        document.querySelector('.menu-sidebar').classList.toggle('show', sideBarOpen.value);
    };

    document.querySelector('.menu-icon').addEventListener('click', (event) => {
        event.preventDefault();
        toggleSidebar();
    });
    
    document.querySelector('.btn-close').addEventListener('click', toggleSidebar);

    // Scroll to Section Navigation
    const scrollToSection = (event) => {

        event.preventDefault();

        const href = event.target.getAttribute('href');
        const id = href.startsWith('#') ? href.substring(1) : null;
        const element = document.getElementById(id);

        if (!element) return;

        element.scrollIntoView({ behavior: 'smooth' });

        if (event.target.classList.contains('menu-link-mobile')) {
            toggleSidebar();
        }
    };

    let links = document.querySelectorAll('.menu-link, .menu-link-mobile');

    links.forEach(link => {
        link.addEventListener('click', scrollToSection);
    });

    // Animate Elements
    const animateElements = () => {

        const elements = document.querySelectorAll('[class*="animate-"]');

        if (!elements.length) {
            return;
        }

        const observer = new IntersectionObserver((entries, observer) => {

            entries.forEach(entry => {

                const animationClasses = Array.from(entry.target.classList).filter(cls => cls.startsWith('animate-'));

                if (entry.isIntersecting) {

                    animationClasses.forEach(animationClass => {
                        entry.target.classList.remove(`${animationClass}`);
                        void entry.target.offsetWidth; // Trigger reflow to restart animation
                        entry.target.classList.add(`${animationClass}`);
                    });

                    // Unobserve the element after the animation is triggered
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        elements.forEach(element => observer.observe(element));
    };

    animateElements();
});