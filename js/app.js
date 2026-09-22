document.addEventListener('DOMContentLoaded', () => {
            
    // 1. Cloud Fading
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.cloud-fade');
    fadeElements.forEach(el => observer.observe(el));

    setTimeout(() => {
        fadeElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('is-visible');
            }
        });
    }, 100);

    // 2. Mobile Menu
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('flex');
        });
    }

    // 3. Header Scroll
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                header.classList.add('shadow-sm', 'bg-bone/95');
                header.classList.remove('bg-bone/80');
            } else {
                header.classList.remove('shadow-sm', 'bg-bone/95');
                header.classList.add('bg-bone/80');
            }
        });
    }

    // 4. Constrained Dynamic MoGraph SVG Background
    const svgGroup = document.getElementById('dynamic-paths');

    function generateBackground() {
        if (!svgGroup) return;
        svgGroup.innerHTML = ''; 
        
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        
        const pathCount = Math.max(3, Math.floor(vw / 300));

        for (let i = 0; i < pathCount; i++) {
            createPath(vw, vh);
        }
    }

    function createPath(vw, vh) {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        
        const startX = (Math.random() * 1.2 - 0.1) * vw;
        const startY = (Math.random() * 1.2 - 0.1) * vh;
        const cp1X = Math.random() * vw;
        const cp1Y = Math.random() * vh;
        const cp2X = Math.random() * vw;
        const cp2Y = Math.random() * vh;
        const endX = (Math.random() * 1.2 - 0.1) * vw;
        const endY = (Math.random() * 1.2 - 0.1) * vh;

        const d = `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`;
        
        path.setAttribute('d', d);
        path.setAttribute('class', 'vector-path');
        
        const duration = 15 + Math.random() * 20;
        path.style.animationDuration = `${duration}s`;

        svgGroup.appendChild(path);

        createAnchorPoint(startX, startY);
        createAnchorPoint(endX, endY);
        createHandle(startX, startY, cp1X, cp1Y);
        createHandle(endX, endY, cp2X, cp2Y);
    }

    function createAnchorPoint(x, y) {
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', x - 3);
        rect.setAttribute('y', y - 3);
        rect.setAttribute('width', 6);
        rect.setAttribute('height', 6);
        rect.setAttribute('class', 'anchor-point');
        svgGroup.appendChild(rect);
    }

    function createHandle(startX, startY, cpX, cpY) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', startX);
        line.setAttribute('y1', startY);
        line.setAttribute('x2', cpX);
        line.setAttribute('y2', cpY);
        line.setAttribute('stroke', '#002147');
        line.setAttribute('stroke-width', '0.5');
        line.setAttribute('stroke-dasharray', '2 2');
        line.setAttribute('opacity', '0.2'); 
        svgGroup.appendChild(line);

        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', cpX);
        circle.setAttribute('cy', cpY);
        circle.setAttribute('r', 2.5);
        circle.setAttribute('fill', '#F9F6EE');
        circle.setAttribute('stroke', '#002147');
        circle.setAttribute('stroke-width', '0.5');
        circle.setAttribute('opacity', '0.4'); 
        svgGroup.appendChild(circle);
    }

    if(svgGroup) {
        window.addEventListener('load', generateBackground);
        generateBackground();

        window.addEventListener('resize', () => {
            clearTimeout(window.resizeTimer);
            window.resizeTimer = setTimeout(() => {
                generateBackground();
            }, 250);
        });
    }
});
