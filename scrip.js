// Add click event to all project cards
document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll('.project-card').forEach(function(card) {
    card.addEventListener('click', function() {
      const url = card.getAttribute('data-url');
      if (url) window.open(url, '_blank');
    });
  });

  // Optional: Scroll reveal animation
  const scrollElements = document.querySelectorAll(".scroll-reveal");

  const elementInView = (el, offset = 0) => {
    const elementTop = el.getBoundingClientRect().top;
    return elementTop <= (window.innerHeight - offset);
  };

  const displayScrollElement = (el) => {
    el.classList.add("opacity-100", "translate-y-0", "transition-all", "duration-700");
  };

  const hideScrollElement = (el) => {
    el.classList.add("opacity-0");
    el.classList.add("translate-y-8");
    el.classList.remove("opacity-100", "translate-y-0");
  };

  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      if (elementInView(el, 100)) {
        displayScrollElement(el);
      } else {
        hideScrollElement(el);
      }
    });
  };

  window.addEventListener("scroll", handleScrollAnimation);
  scrollElements.forEach(el => hideScrollElement(el));

  // Auto typing sweep effect for About section
  const aboutText = document.getElementById("about-text");
  if (aboutText) {
    // Get texts from data attribute or fallback to single text
    const texts = aboutText.getAttribute("data-texts")
      ? aboutText.getAttribute("data-texts").split("|")
      : [aboutText.textContent.trim()];
    let textIndex = 0;

    function typeWriterEffect(text, callback) {
      aboutText.textContent = "";
      let i = 0;
      function type() {
        if (i < text.length) {
          aboutText.textContent += text.charAt(i);
          i++;
          setTimeout(type, 30);
        } else if (callback) {
          setTimeout(callback, 1200); // Wait before next text
        }
      }
      type();
    }

    function sweepTexts() {
      typeWriterEffect(texts[textIndex], function() {
        textIndex = (textIndex + 1) % texts.length;
        sweepTexts();
      });
    }

    sweepTexts();
  }
});
