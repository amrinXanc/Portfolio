// Initialize GSAP and ScrollTrigger
const text = "Crafting seamless digital experiences, from backend logic to frontend magic.";
        const typewriterText = document.getElementById("typewriter-text");
        let index = 0;
        function type() {
            if (index < text.length) {
                typewriterText.innerHTML += text.charAt(index);
                index++;
                setTimeout(type, 70); 
            }
        }
        window.onload = type; 
gsap.registerPlugin(ScrollTrigger);

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Hero section animation
gsap.from(".hero h1", {
    duration: 1.5,
    y: 50,
    opacity: 0,
    ease: "back.out(1.7)",
    delay: 0.3
});

gsap.from(".tagline", {
    duration: 1.5,
    y: 30,
    opacity: 0,
    ease: "power3.out",
    delay: 0.6
});

// About section animation
gsap.from(".profile-img", {
    scrollTrigger: {
        trigger: ".about",
        start: "top 75%",
        toggleActions: "play none none none"
    },
    duration: 1.2,
    x: -100,
    opacity: 0,
    ease: "power3.out"
});

gsap.from(".about-text h2, .about-text p", {
    scrollTrigger: {
        trigger: ".about",
        start: "top 75%",
        toggleActions: "play none none none"
    },
    duration: 1,
    x: 100,
    opacity: 0,
    stagger: 0.2,
    ease: "power3.out"
});

// Skills section animation
gsap.from(".skill-tabs", {
    scrollTrigger: {
        trigger: ".skills",
        start: "top 75%",
        toggleActions: "play none none none"
    },
    duration: 0.8,
    y: 50,
    opacity: 0,
    ease: "power3.out"
});

// Projects section animation
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    ScrollTrigger.create({
        trigger: card,
        start: "top 80%",
        onEnter: () => {
            gsap.to(card, {
                duration: 0.8,
                y: 0,
                opacity: 1,
                ease: "power3.out",
                delay: index * 0.1,
                onComplete: () => card.classList.add('animate')
            });
        }
    });
});

// Contact form animation
gsap.from(".form-input, .form-textarea", {
    scrollTrigger: {
        trigger: ".contact-form",
        start: "top 75%",
        toggleActions: "play none none none"
    },
    duration: 0.6,
    y: 10,
    opacity: 0.9,
    // stagger: 0.1,
    ease: "power3.out"
});
gsap.from("#bouncy-text", {
    y: -50,
    duration: 1,
    ease: "bounce.out",
    repeat: -1,
    yoyo: true
});
// Footer animation
gsap.from("footer p", {
    scrollTrigger: {
        trigger: "footer",
        start: "top 80%",
        toggleActions: "play none none none"
    },
    duration: 1,
    y: 30,
    opacity: 0,
    ease: "power3.out"
});

// Fixed Skill Tabs Functionality
const tabButtons = document.querySelectorAll('.tab-btn');
const skillLists = document.querySelectorAll('.skills-list');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.dataset.tab;
        const targetList = document.getElementById(tabId);

        // Remove active state from all buttons and lists
        tabButtons.forEach(btn => btn.classList.remove('active'));
        skillLists.forEach(list => list.classList.remove('active'));

     
        button.classList.add('active');
        targetList.classList.add('active');
        
        const skills = targetList.querySelectorAll('li');
        
       
        gsap.set(skills, { y: 20, opacity: 0 });
        
   
        gsap.to(skills, {
            duration: 0.6,
            y: 0,
            opacity: 1,
            stagger: 0.1,
            ease: "power3.out"
        });
    });
});

// Initialize first tab as active
document.querySelector('.tab-btn').click();

// Fixed Smooth Scrolling for Navigation
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            
            history.pushState(null, null, targetId);
        }
    });
});

// Click spark effect
document.addEventListener("click", function(e) {
    const numSparks = 7;
    for (let i = 0; i < numSparks; i++) {
        const spark = document.createElement("div");
        spark.className = "click-spark";
        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * 60 + 20;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        spark.style.left = e.pageX + "px";
        spark.style.top = e.pageY + "px";
        spark.style.setProperty('--x', x + "px");
        spark.style.setProperty('--y', y + "px");
        document.body.appendChild(spark);
        setTimeout(() => spark.remove(), 700);
    }
});

// Parallax background effect
document.addEventListener('mousemove', (e) => {
    const bg = document.querySelector('.background-effect');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    bg.style.transform = `translate(-${x * 20}px, -${y * 20}px)`;
});

// Contact form submission with EmailJS
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    
    // Send the email
    emailjs.sendForm('service_ztozg64', 'template_6z0gcbh', this)
        .then(function(response) { 
            console.log('SUCCESS!', response.status, response.text);
            // Show success message
            document.getElementById('form-success').style.display = 'block';
            document.getElementById('form-error').style.display = 'none';
            // Reset form
            document.getElementById('contact-form').reset();
        }, function(error) {
            console.log('FAILED...', error);
            // Show error message
            document.getElementById('form-error').style.display = 'block';
            document.getElementById('form-success').style.display = 'none';
        })
        .finally(function() {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
            
            // Hide messages after 5 seconds
            setTimeout(() => {
                document.getElementById('form-success').style.display = 'none';
                document.getElementById('form-error').style.display = 'none';
            }, 5000);
        });
});

// Form validation
// document.getElementById('contact-form').addEventListener('input', function() {
//     const name = document.getElementById('from_name').value;
//     const email = document.getElementById('from_email').value;
//     const message = document.getElementById('message').value;
//     const submitBtn = this.querySelector('button[type="submit"]');
    
//     submitBtn.disabled = !(name && email && message);
// });