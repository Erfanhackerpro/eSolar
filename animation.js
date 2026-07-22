// ===== SOLAR RAYS GENERATOR =====
document.addEventListener('DOMContentLoaded', function() {
    const rayContainer = document.getElementById('rayContainer');
    if (!rayContainer) return;

    const numRays = 24;
    for (let i = 0; i < numRays; i++) {
        const ray = document.createElement('div');
        ray.className = 'ray';
        const angle = (i / numRays) * 360;
        ray.style.transform = `rotate(${angle}deg)`;
        ray.style.animationDelay = `${(i / numRays) * 20}s`;
        rayContainer.appendChild(ray);
    }
});

// ===== INTERSECTION OBSERVER FOR STATS COUNTER =====
document.addEventListener('DOMContentLoaded', function() {
    const stats = document.querySelectorAll('.stats span, .stats-detailed span');
    let counted = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counted) {
                counted = true;
                stats.forEach(stat => {
                    const text = stat.textContent;
                    const num = parseInt(text);
                    if (!isNaN(num)) {
                        let current = 0;
                        const increment = Math.ceil(num / 40);
                        const timer = setInterval(() => {
                            current += increment;
                            if (current >= num) {
                                current = num;
                                clearInterval(timer);
                            }
                            stat.textContent = current + '+';
                        }, 30);
                    }
                });
            }
        });
    }, { threshold: 0.5 });

    if (stats.length) {
        observer.observe(stats[0].closest('.stats') || stats[0].closest('.stats-detailed'));
    }
});