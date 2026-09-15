document.addEventListener("DOMContentLoaded", () => {

  const burger = document.getElementById("burger");
  const navLinks = document.getElementById("navLinks");
  const navItems = document.querySelectorAll(".nav-item");

  if (burger && navLinks) {
    burger.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });

    navItems.forEach(item => {
      item.addEventListener("click", () => {
        navLinks.classList.remove("active");
      });
    });
  }

  const heroImages = [
    "images/IMG_4494.jpeg",
    "images/IMG_2460.jpeg",
    "https://picsum.photos/id/1005/500/500" // მესამე ფოტო
  ];
  let heroIndex = 0;
  const heroImg = document.getElementById("heroImg");

  if (heroImg) {
    setInterval(() => {
      heroIndex = (heroIndex + 1) % heroImages.length;
      heroImg.style.opacity = '0';
      setTimeout(() => {
        heroImg.src = heroImages[heroIndex];
        heroImg.style.opacity = '1';
      }, 400);
    }, 5000);
  }

  const skillsSection = document.getElementById("skillsSection");
  const progressBars = document.querySelectorAll(".progress");

  if (skillsSection && progressBars.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          progressBars.forEach(bar => {
            const widthVal = bar.getAttribute("data-progress");
            if (widthVal) {
              bar.style.width = widthVal;
            }
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    observer.observe(skillsSection);
  }

  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.getAttribute("data-category");

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute("data-category");
        if (category === "all" || cardCategory === category) {
          card.classList.remove("hide");
        } else {
          card.classList.add("hide");
        }
      });
    });
  });

  const testimonials = [
    {
      img: "https://i.pravatar.cc/150?img=32",
      text: "„ლევანთან თანამშრომლობა ძალიან სასიამოვნო იყო. პროექტი ჩაბარდა დროულად და უმაღლეს დონეზე!“",
      name: "ანა ბერიძე",
      role: "CEO, TechLab"
    },
    {
      img: "https://i.pravatar.cc/150?img=12",
      text: "„ძალიან სუფთა კოდი და სწრაფი ვებ-გვერდი. გათვალისწინებული იყო ყველა წვრილმანი დეტალი.“",
      name: "ნიკა კაპანაძე",
      role: "Senior Project Manager"
    },
    {
      img: "https://i.pravatar.cc/150?img=47",
      text: "„დიზაინი და ფუნქციონალი ზუსტად ისეთი გამოვიდა, როგორიც ჩაფიქრებული გვქონდა. მადლობა!“",
      name: "მარიამ შენგელია",
      role: "UI/UX Designer"
    },
    {
      img: "https://i.pravatar.cc/150?img=68",
      text: "„საუკეთესო ტექნიკური მხარდაჭერა და პროფესიონალური მიდგომა. რეკომენდაციას ვუწევ 100%-ით.“",
      name: "დავით მაისურაძე",
      role: "Founder, StartupX"
    }
  ];

  const testiImg = document.getElementById("testiImg");
  const testiText = document.getElementById("testiText");
  const testiName = document.getElementById("testiName");
  const testiRole = document.getElementById("testiRole");
  const dots = document.querySelectorAll(".dot");

  let currentTestiIndex = 0;

  function showSlide(index) {
    currentTestiIndex = index;
    const item = testimonials[currentTestiIndex];

    if (testiImg && testiText && testiName && testiRole) {
      testiImg.src = item.img;
      testiText.textContent = item.text;
      testiName.textContent = item.name;
      testiRole.textContent = item.role;
    }

    dots.forEach(d => d.classList.remove("active"));
    if (dots[currentTestiIndex]) {
      dots[currentTestiIndex].classList.add("active");
    }
  }


  let testiInterval = setInterval(() => {
    let nextIndex = (currentTestiIndex + 1) % testimonials.length;
    showSlide(nextIndex);
  }, 3000);

  dots.forEach(dot => {
    dot.addEventListener("click", (e) => {
      clearInterval(testiInterval);
      const idx = parseInt(e.target.getAttribute("data-index"));
      showSlide(idx);
      
      testiInterval = setInterval(() => {
        let nextIndex = (currentTestiIndex + 1) % testimonials.length;
        showSlide(nextIndex);
      }, 3000);
    });
  });


  const contactForm = document.getElementById("contactForm");
  const modal = document.getElementById("modal");
  const closeModal = document.getElementById("closeModal");

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const payload = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        website: document.getElementById("website").value,
        message: document.getElementById("message").value
      };

      fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(payload)
      })
      .then(res => res.json())
      .then(() => {
        if (modal) modal.style.display = "flex";
        contactForm.reset();
      })
      .catch(() => {
        if (modal) modal.style.display = "flex";
        contactForm.reset();
      });
    });
  }

  if (closeModal) {
    closeModal.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

});