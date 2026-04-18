const textMobileValidator = (element) => {
    const elementValue = element.value;
    const pattern = "^[0](11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|47|51|52|54|55|57|63|65|66|67|70|71|72|74|75|76|77|78|81|91)[0-9]{7}$";
    const regExp = new RegExp(pattern);

    if (regExp.test(elementValue)) { //chack element value with pattern
        //valid value
        console.log("valid Mobile No");
        element.style.backgroundColor = "#ececec";
        element.style.border="2px solid lightgreen";
        //element.style.borderBottom="2px solid lightgreen"; 
        //element.classList.remove("is-invalid");
        //element.classList.add("is-valid");
    }
    else {
        //invalid value
        console.log("invalid Mobile No");
        element.style.backgroundColor = "pink";  
        element.style.border="2px solid red"; 
        //element.style.borderBottom="2px solid red"; 
        //element.classList.remove("is-valid");
        //element.classList.add("is-invalid");
    }
}

const textCallingNameValidator = (element)=>{
    const elementValue=element.value;
    const pattern ="^[A-z]{1,15}$";
    const regExp = new RegExp(pattern);

    if (regExp.test(elementValue)){
        element.style.backgroundColor = "#ececec";
        element.style.border="2px solid lightgreen";
        //element.style.borderBottom = "2px solid green";
        //element.classList.remove("is-invalid");
        //element.classList.add("is-valid");
    }
    else {
        element.style.backgroundColor = "pink";  
        element.style.border="2px solid red"; 
        //element.style.borderBottom = "2px solid red";
        //element.classList.remove("is-valid");
        //element.classList.add("is-invalid");
    }
}


// google sheet link requestCall

const scriptURL = 'https://script.google.com/macros/s/AKfycbw6ON5fdlcK8BmDBImCff518gHVdG-eyo5pnCbOU-UeDVwN994zoWc6JfrwaQOxY_4k/exec'
const form = document.forms['requestCall']

form.addEventListener('submit', e => {
  
  e.preventDefault()
  
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
  .then(response => alert("Thank you for contacting us. We will get back to you within 24 hours." ))
  .then(() => { window.location.reload(); })
  .catch(error => error('Error!', error.message))
})


// inrto count

    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        const speed = 200; // The lower the slower

        counters.forEach(counter => {
            const updateCount = () => {
                const target = parseInt(counter.getAttribute('data-target'));
                const count = parseInt(counter.innerText);

                // Lower inc means smoother and slower animation
                const inc = target / speed;

                if (count < target) {
                    // Add inc to count and output in counter
                    counter.innerText = Math.ceil(count + inc);
                    // Call function every ms
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    }

    // Intersection Observer to trigger when section is in view
    const statsSection = document.getElementById('stats-section');
    const observerOptions = {
        root: null,
        threshold: 0.1 // 10% of the section is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    if (statsSection) {
        observer.observe(statsSection);
    }


//slide show


    document.addEventListener('DOMContentLoaded', () => {
        const slides = document.querySelectorAll('.carousel-slide');
        const dots = document.querySelectorAll('.dot-btn');
        const prevBtn = document.getElementById('prev-slide');
        const nextBtn = document.getElementById('next-slide');
        let currentIndex = 0;
        let slideInterval;

        function updateCarousel(newIndex) {
            // Handle wrap around
            if (newIndex < 0) newIndex = slides.length - 1;
            if (newIndex >= slides.length) newIndex = 0;

            // Update slides
            slides.forEach((slide, idx) => {
                if (idx === newIndex) {
                    slide.classList.add('active');
                } else {
                    slide.classList.remove('active');
                }
            });

            // Update dots
            dots.forEach((dot, idx) => {
                if (idx === newIndex) {
                    dot.classList.add('bg-primary');
                    dot.classList.remove('bg-outline-variant');
                } else {
                    dot.classList.remove('bg-primary');
                    dot.classList.add('bg-outline-variant');
                }
            });

            currentIndex = newIndex;
        }

        function startAutoSlide() {
            stopAutoSlide();
            slideInterval = setInterval(() => {
                updateCarousel(currentIndex + 1);
            }, 6000); // 6 seconds per slide
        }

        function stopAutoSlide() {
            clearInterval(slideInterval);
        }

        prevBtn.addEventListener('click', () => {
            updateCarousel(currentIndex - 1);
            startAutoSlide();
        });

        nextBtn.addEventListener('click', () => {
            updateCarousel(currentIndex + 1);
            startAutoSlide();
        });

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const index = parseInt(dot.getAttribute('data-index'));
                updateCarousel(index);
                startAutoSlide();
            });
        });

        // Initialize
        startAutoSlide();
    });