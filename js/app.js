document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Intersection Observer for Cloud Fade Elements
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.cloud-fade').forEach(el => observer.observe(el));
    setTimeout(() => {
        document.querySelectorAll('.cloud-fade').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('is-visible');
        });
    }, 100);

    // 2. Mobile Menu Toggle Logic
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('flex');
        });
    }

    // 3. Header Scroll Glassmorphism Logic
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

    // 4. Advanced AABB Magnetic Navigation Links using Pythagorean Radial Distance
    const navContainer = document.getElementById('magnetic-nav');
    const magneticLinks = document.querySelectorAll('.nav-link');
    
    if (navContainer && magneticLinks.length > 1) {
        // Calculate the AABB radius based on distance between the first two links
        const rect1 = magneticLinks[0].getBoundingClientRect();
        const rect2 = magneticLinks[1].getBoundingClientRect();
        
        // As requested: Proximity range is set to half (0.5) the distance between adjacent links
        const magneticRadius = Math.abs((rect2.left + rect2.width/2) - (rect1.left + rect1.width/2)) * 0.5;

        document.addEventListener('mousemove', (e) => {
            magneticLinks.forEach(link => {
                const rect = link.getBoundingClientRect();
                const linkCenterX = rect.left + rect.width / 2;
                const linkCenterY = rect.top + rect.height / 2;
                
                // Pythagorean theorem calculates true radial distance from cursor to link center
                const distance = Math.hypot(e.clientX - linkCenterX, e.clientY - linkCenterY);
                
                // AABB Boundary Check: Only apply magnetic pull if INSIDE the specific radius
                if (distance < magneticRadius) {
                    // Calculate pull strength (stronger when closer to center)
                    const pullStrength = 1 - (distance / magneticRadius);
                    const x = (e.clientX - linkCenterX) * 0.2 * pullStrength;
                    const y = (e.clientY - linkCenterY) * 0.2 * pullStrength;
                    
                    link.style.transform = `translate(${x}px, ${y}px)`;
                    link.style.transition = 'none'; // Instant tracking when active
                } else {
                    // Outside AABB radius: snap back to original position smoothly
                    link.style.transform = 'translate(0px, 0px)';
                    link.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.25, 1)';
                }
            });
        });
    }

    // 5. Constrained Dynamic MoGraph SVG Ribbon Background
    const svgGroup = document.getElementById('dynamic-paths');

    function generateBackground() {
        if (!svgGroup) return;
        svgGroup.innerHTML = ''; 
        
        const pathCount = 15; // Creates a dense, visible 3D ribbon of 15 overlapping lines

        for (let i = 0; i < pathCount; i++) {
            // Offset multiplies to create the thickness of the 3D ribbon
            const offset = i * 15; 
            
            // Hardcoded coordinates inside the 1440x900 viewBox.
            // This anchors the ribbon firmly in the right-side negative space.
            const startX = 1300 - (offset * 1.2);
            const startY = 50 + (offset * 0.5);
            
            // The ribbon swoops sharply left towards the center text
            const cp1X = 600 - (offset * 2);
            const cp1Y = 400 + offset;
            
            // Then swoops sharply back right, crossing over itself
            const cp2X = 1500 - offset;
            const cp2Y = 650 + (offset * 0.8);
            
            // And exits cleanly at the bottom right
            const endX = 800 - offset;
            const endY = 1000;

            const d = `M ${startX} ${startY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${endY}`;
            
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', d);
            path.setAttribute('class', 'vector-path');
            
            // Stagger the animation timing to offset the dashed pattern drawing sequentially
            path.style.animationDelay = `${i * 0.05}s`;
            
            // Outer lines are slightly thinner/lighter to enhance the 3D rounded edge illusion
            path.style.opacity = 1 - (i * 0.04);
            path.style.strokeWidth = i === 0 ? 2 : 1; 

            svgGroup.appendChild(path);

            if (i === 0) {
                createAnchorPoint(startX, startY);
                createAnchorPoint(endX, endY);
                createHandle(startX, startY, cp1X, cp1Y);
                createHandle(endX, endY, cp2X, cp2Y);
            }
        }
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
    }
});
