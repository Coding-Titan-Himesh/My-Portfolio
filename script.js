(function () {
    emailjs.init("mvXtbh9h90s_lMqUW");
})();

// Cursor-follow glow for skill cards
document.querySelectorAll(".skill-card").forEach(card => {
    card.addEventListener("mousemove", e => {
        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty("--x", `${x}px`);
        card.style.setProperty("--y", `${y}px`);
    });

    card.addEventListener("mouseleave", () => {
        card.style.setProperty("--x", `50%`);
        card.style.setProperty("--y", `50%`);
    });
});

// ===== Journey Slider (Calm & Stable Version) =====

let currentSlide = 0;
let isAnimating = false;

const slides = [
    {
        tag: "EDUCATION",
        title: "Netaji Subhas University of Technology",
        subtitle: "B.Tech · Information Technology",
        desc: "I am currently pursuing my B.Tech in Information Technology at NSUT, focusing on building strong foundations in computer science. My coursework and self-driven learning emphasize problem-solving, logical thinking, and modern software technologies.",
        img: "images/nsut.jpeg"
    },
    {
        tag: "SKILLS & LEARNING",
        title: "Building Strong Foundations",
        subtitle: "Web · DSA · AI/ML",
        desc: "I actively work on strengthening my skills in web development, data structures, and core computer science concepts through hands-on projects. By practicing consistently and exploring new tools, I aim to improve my technical depth while building efficient, scalable, and user-focused solutions.",
        img: "images/skills-pic.jfif"
    },
    {
        tag: "HOBBIES & INTERESTS",
        title: "Beyond Coding",
        subtitle: "Sports · Music · Creativity",
        desc: "Outside academics, I enjoy playing football and cricket, as well as listening to music during my free time. These activities help me maintain discipline, stay mentally refreshed, and develop a balanced lifestyle that positively influences my focus and productivity.",
        img: "images/hobbies.png"
    }
];


const textWrapper = document.getElementById("journey-text");
const tagEl = document.querySelector(".journey-tag");
const titleEl = document.getElementById("journey-title");
const subEl = document.getElementById("journey-subtitle");
const descEl = document.getElementById("journey-desc");
const imgEl = document.getElementById("journey-img");

function updateSlide(index) {
    textWrapper.classList.add("journey-hidden");
    imgEl.classList.add("img-hidden");

    setTimeout(() => {
        const slide = slides[index];

        tagEl.textContent = slide.tag;
        titleEl.textContent = slide.title;
        subEl.textContent = slide.subtitle;
        descEl.textContent = slide.desc;
        imgEl.src = slide.img;

        textWrapper.classList.remove("journey-hidden");
        imgEl.classList.remove("img-hidden");
    }, 400);
}



// Controls
const nextBtn = document.getElementById("next-slide");
const prevBtn = document.getElementById("prev-slide");

if (nextBtn && prevBtn) {
    nextBtn.addEventListener("click", () => {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlide(currentSlide);
    });

    prevBtn.addEventListener("click", () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlide(currentSlide);
    });
}

// ===== Typewriter Role Animation =====
const typewriterEl = document.getElementById("typewriter-role");

const roles = [
    "Web Developer",
    "Problem Solver",
    "Tech Enthusiast",
    "Aspiring Software Engineer"
];

let roleIndexTW = 0;
let charIndex = 0;
let typing = true;

function typewriterEffect() {
    const currentText = roles[roleIndexTW];

    if (typing) {
        typewriterEl.textContent = currentText.slice(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentText.length) {
            typing = false;
            setTimeout(typewriterEffect, 1200); // pause at end
            return;
        }
    } else {
        typewriterEl.textContent = currentText.slice(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            typing = true;
            roleIndexTW = (roleIndexTW + 1) % roles.length;
        }
    }

    setTimeout(typewriterEffect, typing ? 100 : 50);
}

typewriterEffect();

// ===== Contact Form EmailJS =====
const contactForm = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const formStatus = document.getElementById("form-status");

// Remove error & message while typing
[nameInput, emailInput, messageInput].forEach(input => {
    input.addEventListener("input", () => {
        input.classList.remove("error");
        formStatus.textContent = "";
        formStatus.className = "form-status";
    });
});


contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Reset UI
    formStatus.textContent = "";
    formStatus.className = "form-status";
    [nameInput, emailInput, messageInput].forEach(i => i.classList.remove("error"));

    let valid = true;

    if (nameInput.value.trim() === "") {
        nameInput.classList.add("error");
        valid = false;
    }

    if (!emailInput.value.includes("@")) {
        emailInput.classList.add("error");
        valid = false;
    }

    if (messageInput.value.trim().length < 5) {
        messageInput.classList.add("error");
        valid = false;
    }

    if (!valid) {
        formStatus.textContent = "Please fill all fields correctly.";
        formStatus.classList.add("error");
        return;
    }

    formStatus.textContent = "Sending message...";

    emailjs.send(
        "service_jvkqvo8",
        "template_5pybh7j",
        {
            name: nameInput.value,
            email: emailInput.value,
            message: messageInput.value,
        }
    )
        .then(() => {
            formStatus.textContent = "Message sent successfully! 🚀";
            formStatus.className = "form-status success show";

            contactForm.reset();

            setTimeout(() => {
                formStatus.classList.remove("show");

                setTimeout(() => {
                    formStatus.textContent = "";
                    formStatus.className = "form-status";
                }, 300);
            }, 2200);

        })
        .catch(() => {
            formStatus.textContent = "Something went wrong. Please try again.";
            formStatus.classList.add("error");
        });
});

const skillsSection = document.querySelector(".skills-section");

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            skillsSection.classList.add("visible");
            
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});

observer.observe(skillsSection);    