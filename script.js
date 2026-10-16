const doodles = portfolioData.doodles;

// Build repeatable page sections from the structured content in data.js.
const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
}[character]));

const renderPortfolioContent = () => {
    const hero = portfolioData.hero;
    document.querySelector(".hero-badge").innerHTML = `<span class="pulse"></span> ${escapeHtml(hero.badge)}`;
    document.querySelector(".hero-title").innerHTML = `${escapeHtml(hero.name)} <span class="gradient-text">— ${escapeHtml(hero.title)}</span>`;
    document.querySelector(".hero-subtitle").textContent = hero.introduction;
    document.querySelector(".hero-specialties").innerHTML = `<i class="fas fa-wand-magic-sparkles" aria-hidden="true"></i> ${hero.specialties.map(escapeHtml).join(" · ")}`;
    document.querySelector(".hero-buttons").innerHTML = hero.buttons.map(({ label, href, icon, style }) =>
        `<a href="${href}" class="btn btn-${style}"><i class="fas ${icon}"></i> ${escapeHtml(label)}</a>`
    ).join("");
    document.querySelector(".ai-shortcuts-title").innerHTML = `<i class="fas fa-sparkles" aria-hidden="true"></i> ${escapeHtml(hero.aiPrompt)}`;
    document.querySelector(".ai-shortcuts-list").innerHTML = hero.aiShortcuts.map((shortcut) => {
        const destination = new URL(shortcut.url);
        destination.searchParams.set(shortcut.queryParameter, `${shortcut.prompt} https://poulvinay.github.io/`);
        const mark = shortcut.image
            ? `<img src="${escapeHtml(shortcut.image)}" alt="" aria-hidden="true">`
            : `<i class="${escapeHtml(shortcut.icon)}" aria-hidden="true"></i>`;
        return `<a class="ai-shortcut ${escapeHtml(shortcut.className)}" href="${escapeHtml(destination.href)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(shortcut.ariaLabel)}">${mark}<span>${escapeHtml(shortcut.name)}</span></a>`;
    }).join("");

    portfolioData.sectionHeadings.forEach(({ id, tag, title, description, icon }) => {
        const section = document.getElementById(id);
        section.querySelector(".section-tag").innerHTML = `<i class="fas ${icon}"></i> ${escapeHtml(tag)}`;
        section.querySelector(".section-title").textContent = title;
        section.querySelector(".section-desc").textContent = description;
    });

    const about = portfolioData.about;
    document.querySelector(".about-text").innerHTML = `<h3>${escapeHtml(about.title)}</h3>${about.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}<div class="about-highlights">${about.highlights.map(({ icon, label }) => `<div class="highlight-item"><div class="highlight-icon"><i class="fas ${icon}"></i></div><span class="highlight-text">${escapeHtml(label)}</span></div>`).join("")}</div>`;

    const contact = portfolioData.contact;
    const fieldMarkup = contact.fields.map(({ id, label, placeholder, type, required }) => {
        const control = type === "textarea"
            ? `<textarea id="${id}" placeholder="${escapeHtml(placeholder)}"${required ? " required" : ""}></textarea>`
            : `<input type="${type}" id="${id}" placeholder="${escapeHtml(placeholder)}"${required ? " required" : ""}>`;
        return `<div class="form-group"><label for="${id}">${escapeHtml(label)}</label>${control}</div>`;
    });
document.querySelector(".contact-wrapper").innerHTML = `<div class="glass-card contact-form"><h3>${escapeHtml(contact.formTitle)}</h3><form id="contactForm"><div class="form-row">${fieldMarkup.slice(0, 2).join("")}</div>${fieldMarkup.slice(2).join("")}<button type="submit" class="btn btn-primary" style="width: 100%; justify-content: center;"><i class="fas fa-paper-plane"></i> ${escapeHtml(contact.submitLabel)}</button></form></div><div class="glass-card contact-info"><p>${escapeHtml(contact.invitation)}</p><div class="contact-links">${contact.links.map(({ label, value, href, icon }) => `<a href="${href}" class="contact-link" target="${href.startsWith("mailto:") ? "_self" : "_blank"}" rel="noopener noreferrer"><div class="contact-link-icon"><i class="${icon}"></i></div><div class="contact-link-text"><span class="contact-link-label">${escapeHtml(label)}</span><span class="contact-link-value">${escapeHtml(value)}</span></div></a>`).join("")}</div></div>`;
    const footer = portfolioData.footer;
    document.querySelector(".footer-social").innerHTML = footer.socials.map(({ label, href, icon }) =>
        `<a href="${href}" aria-label="${escapeHtml(label)}"${href.startsWith("mailto:") ? "" : ' target="_blank" rel="noopener noreferrer"'}><i class="${icon}"></i></a>`
    ).join("");
    document.querySelector(".footer-contact-links").innerHTML = footer.contactLinks.map(({ label, href }) =>
        `<a href="${href}"${href.startsWith("mailto:") ? "" : ' target="_blank" rel="noopener noreferrer"'}>${escapeHtml(label)}</a>`
    ).join("");
    document.querySelector(".footer-text").textContent = footer.text;

    const navLinks = document.getElementById("navLinks");
    navLinks.innerHTML = portfolioData.navigation.map(({ label, href }, index) =>
        `<li><a href="${href}"${index === 0 ? ' class="active"' : ""}>${escapeHtml(label)}</a></li>`
    ).join("");

    document.querySelector(".hero-stats").innerHTML = portfolioData.stats.map(({ value, label }) =>
        `<div class="stat-item"><div class="stat-number">${escapeHtml(value)}</div><div class="stat-label">${escapeHtml(label)}</div></div>`
    ).join("");

    document.querySelector(".skills-grid").innerHTML = portfolioData.skills.map(({ icon, title, description, tags }) =>
        `<article class="glass-card skill-card reveal"><div class="skill-card-icon"><i class="fas ${icon}"></i></div><h4>${escapeHtml(title)}</h4><p>${escapeHtml(description)}</p><div class="skill-tags">${tags.map((tag) => `<span class="skill-tag">${escapeHtml(tag)}</span>`).join("")}</div></article>`
    ).join("");

    document.querySelector(".timeline").innerHTML = portfolioData.experience.map(({ date, title, company, description, award }) =>
        `<article class="timeline-item reveal"><div class="timeline-dot"></div><div class="glass-card timeline-content"><div class="timeline-date"><i class="fas fa-calendar"></i> ${escapeHtml(date)}</div><h3 class="timeline-title">${escapeHtml(title)}</h3><p class="timeline-company">${escapeHtml(company)}</p><p class="timeline-desc">${escapeHtml(description)}</p>${award ? `<div class="timeline-award"><i class="fas fa-award"></i> ${escapeHtml(award)}</div>` : ""}</div></article>`
    ).join("");

    document.querySelector(".projects-grid").innerHTML = portfolioData.projects.map(({ title, image, alt, description, technologies, links }) => {
        const primaryLink = links[0];
        return `<article class="glass-card project-card reveal"><div class="project-image"><img src="${image}" width="1024" height="1024" alt="${escapeHtml(alt)}" loading="lazy" decoding="async"><div class="project-overlay"><a href="${primaryLink.href}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="padding: 10px 20px; font-size: 0.85rem;"><i class="${primaryLink.icon}"></i> View Code</a></div></div><div class="project-body"><div class="project-tech">${technologies.map((technology) => `<span>${escapeHtml(technology)}</span>`).join("")}</div><h4 class="project-title">${escapeHtml(title)}</h4><p class="project-desc">${escapeHtml(description)}</p><div class="project-links">${links.map(({ label, href, icon }) => `<a href="${href}" target="_blank" rel="noopener noreferrer"><i class="${icon}"></i> ${escapeHtml(label)}</a>`).join("")}</div></div></article>`;
    }).join("");

    document.querySelector(".certs-grid").innerHTML = portfolioData.certifications.map(([title, issuer, icon]) =>
        `<article class="glass-card cert-card reveal"><div class="cert-icon"><i class="${icon.includes("fab ") ? icon : `fas ${icon}`}"></i></div><div class="cert-info"><h5>${escapeHtml(title)}</h5><p>${escapeHtml(issuer)}</p></div></article>`
    ).join("");
};

renderPortfolioContent();

const heroVideo = document.querySelector(".hero-profile video");
const startHeroVideo = () => {
    if (!heroVideo || heroVideo.dataset.loaded) return;
    heroVideo.dataset.loaded = "true";
    heroVideo.src = heroVideo.dataset.src;
    heroVideo.load();
    heroVideo.addEventListener("canplay", () => heroVideo.play().catch(() => {}), { once: true });
};

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const usesDataSaver = Boolean(navigator.connection && navigator.connection.saveData);

if (!prefersReducedMotion && !usesDataSaver && "IntersectionObserver" in window && heroVideo) {
    const videoObserver = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        startHeroVideo();
        videoObserver.disconnect();
    }, { rootMargin: "160px" });
    videoObserver.observe(heroVideo);
} else if (!prefersReducedMotion && !usesDataSaver) {
    window.setTimeout(startHeroVideo, 1500);
}

const addDecorativeDoodles = () => {
    const selectedDoodles = [...doodles].sort(() => Math.random() - 0.5).slice(0, 6);
    const aspectRatio = window.innerWidth / window.innerHeight;
    const numCols = Math.ceil(Math.sqrt(selectedDoodles.length * Math.max(aspectRatio, 0.5)));
    const numRows = Math.ceil(selectedDoodles.length / numCols);
    const cellWidth = 100 / numCols;
    const cellHeight = 100 / numRows;
    const cellIndices = Array.from({ length: numCols * numRows }, (_, index) => index);

    for (let index = cellIndices.length - 1; index > 0; index--) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [cellIndices[index], cellIndices[randomIndex]] = [cellIndices[randomIndex], cellIndices[index]];
    }

    selectedDoodles.forEach((doodle, index) => {
        const cellIndex = cellIndices[index];
        const row = Math.floor(cellIndex / numCols);
        const column = cellIndex % numCols;
        const image = document.createElement("img");
        image.src = `assets/images/doodles/${doodle}`;
        image.className = "doodle";
        image.loading = "lazy";
        image.decoding = "async";
        image.fetchPriority = "low";
        image.alt = "";
        image.setAttribute("aria-hidden", "true");
        image.style.position = "fixed";
        image.style.top = `${row * cellHeight + Math.random() * Math.max(1, cellHeight - 12)}vh`;
        image.style.left = `${column * cellWidth + Math.random() * Math.max(1, cellWidth - 8)}vw`;
        image.style.width = `${45 + Math.random() * 45}px`;
        image.style.height = "auto";
        image.style.zIndex = "-1";
        image.style.opacity = "0.15";
        image.style.pointerEvents = "none";
        if (Math.random() > 0.5) image.style.transform = "scaleX(-1)";
        document.body.appendChild(image);
    });
};

window.addEventListener("load", () => {
    if (prefersReducedMotion || usesDataSaver) {
        // Decorative images are skipped when motion is reduced or data is constrained.
    } else if ("requestIdleCallback" in window) {
        window.requestIdleCallback(addDecorativeDoodles, { timeout: 2500 });
    } else {
        window.setTimeout(addDecorativeDoodles, 1200);
    }
    window.setTimeout(() => document.getElementById("loader").classList.add("hidden"), 800);
});

// Theme Switcher Logic
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

// Check local storage or system preference
const currentTheme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

// Set initial theme
if (currentTheme === 'light') {
    document.documentElement.removeAttribute('data-theme');
    themeIcon.classList.replace('fa-sun', 'fa-moon');
} else {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.hasAttribute('data-theme');
    
    if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
});

const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => { navbar.classList.toggle('scrolled', window.scrollY > 50); });

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', navLinks.classList.contains('active'));
    navToggle.setAttribute('aria-label', navLinks.classList.contains('active') ? 'Close navigation menu' : 'Open navigation menu');
    const icon = navToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open navigation menu');
        const icon = navToggle.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });
});

const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);
        const scrollDot = document.querySelector(`.scroll-indicator a[href="#${sectionId}"]`);
        
        const isActive = scrollY > sectionTop && scrollY <= sectionTop + sectionHeight;
        
        if (navLink) {
            navLink.classList.toggle('active', isActive);
        }
        if (scrollDot) {
            scrollDot.classList.toggle('active', isActive);
        }
    });
});

const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
revealElements.forEach(el => revealObserver.observe(el));

const profileCard = document.getElementById('aboutProfileCard');
if (profileCard) {
    const front = profileCard.querySelector('.profile-card-front');
    const back = profileCard.querySelector('.profile-card-back');
    const imageArea = profileCard.querySelector('.profile-card-image');
    let sheenTimer;
    const showProfileCardSheen = (clientX, clientY) => {
        const bounds = imageArea.getBoundingClientRect();
        if (clientX < bounds.left || clientX > bounds.right || clientY < bounds.top || clientY > bounds.bottom) {
            profileCard.style.setProperty('--holo-active', '0');
            return;
        }
        const x = Math.max(0, Math.min(1, (clientX - bounds.left) / bounds.width));
        const y = Math.max(0, Math.min(1, (clientY - bounds.top) / bounds.height));
        profileCard.style.setProperty('--light-x', `${x * 100}%`);
        profileCard.style.setProperty('--light-y', `${y * 100}%`);
        profileCard.style.setProperty('--holo-active', '1');
    };
    const resetProfileCardSheen = () => profileCard.style.setProperty('--holo-active', '0');
    const flipProfileCard = () => {
        const isFlipped = profileCard.classList.toggle('is-flipped');
        profileCard.setAttribute('aria-pressed', String(isFlipped));
        front.setAttribute('aria-hidden', String(isFlipped));
        back.setAttribute('aria-hidden', String(!isFlipped));
        front.inert = isFlipped;
        back.inert = !isFlipped;
    };
    profileCard.addEventListener('click', event => {
        if (!event.target.closest('a')) flipProfileCard();
    });
    profileCard.addEventListener('pointermove', event => {
        if (event.pointerType !== 'touch') {
            showProfileCardSheen(event.clientX, event.clientY);
            const bounds = profileCard.getBoundingClientRect();
            const x = (event.clientX - bounds.left) / bounds.width - 0.5;
            const y = (event.clientY - bounds.top) / bounds.height - 0.5;
            profileCard.style.setProperty('--tilt-x', `${(-y * 5).toFixed(2)}deg`);
            profileCard.style.setProperty('--tilt-y', `${(x * 5).toFixed(2)}deg`);
        }
    });
    profileCard.addEventListener('pointerleave', () => {
        resetProfileCardSheen();
        profileCard.style.setProperty('--tilt-x', '0deg');
        profileCard.style.setProperty('--tilt-y', '0deg');
    });
    profileCard.addEventListener('pointerdown', event => {
        if (event.pointerType === 'touch') {
            showProfileCardSheen(event.clientX, event.clientY);
            window.clearTimeout(sheenTimer);
            sheenTimer = window.setTimeout(resetProfileCardSheen, 700);
        }
    });
    profileCard.addEventListener('keydown', event => {
        if (event.target.closest('a')) return;
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            flipProfileCard();
        }
    });
}

document.querySelectorAll('.skill-tag img').forEach(icon => {
    icon.addEventListener('error', () => icon.remove());
});

const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => { scrollTopBtn.classList.toggle('visible', window.scrollY > 500); });
scrollTopBtn.addEventListener('click', () => { window.scrollTo({ top: 0, behavior: 'smooth' }); });

document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    const fullName = `${name.trim()} ${surname.trim()}`.trim();
    const body = `Name: ${fullName}\n\nMessage:\n${message}`;
    window.location.href = `mailto:thepoulvinay@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    const btn = e.target.querySelector('button');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-envelope-open-text"></i> Opening Email Draft...';
    btn.style.background = 'linear-gradient(135deg, #30D158, #64D2FF)';
    setTimeout(() => { btn.innerHTML = originalHTML; btn.style.background = ''; }, 3000);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

if (window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.glass-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });
        card.addEventListener('mouseleave', () => { card.style.transform = ''; });
    });
}

console.log('%c👋 Hey there, fellow developer!', 'font-size: 20px; font-weight: bold; color: #0A84FF;');
console.log('%cBuilt with ❤ by Vinay Poul', 'font-size: 14px; color: #BF5AF2;');
