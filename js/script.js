document.addEventListener('DOMContentLoaded', function () {

    /** ===== Carrousel ===== */
    var carouselInner = document.querySelector('.carousel-inner');
    var items = document.querySelectorAll('.carousel-item');
    var prevButton = document.getElementById('prev');
    var nextButton = document.getElementById('next');
    var isMoving = false;
    var itemWidth = items[0].offsetWidth;

    window.addEventListener('resize', function () {
        itemWidth = items[0].offsetWidth;
    });

    function moveRight() {
        if (isMoving) return;
        isMoving = true;
        carouselInner.style.transition = 'transform 0.5s ease-in-out';
        carouselInner.style.transform = 'translateX(-' + itemWidth + 'px)';
        setTimeout(function () {
            carouselInner.appendChild(carouselInner.firstElementChild);
            carouselInner.style.transition = 'none';
            carouselInner.style.transform = 'translateX(0)';
            isMoving = false;
        }, 500);
    }

    function moveLeft() {
        if (isMoving) return;
        isMoving = true;
        carouselInner.style.transition = 'transform 0.5s ease-in-out';
        carouselInner.style.transform = 'translateX(' + itemWidth + 'px)';
        setTimeout(function () {
            carouselInner.insertBefore(carouselInner.lastElementChild, carouselInner.firstElementChild);
            carouselInner.style.transition = 'none';
            carouselInner.style.transform = 'translateX(0)';
            isMoving = false;
        }, 500);
    }

    nextButton.addEventListener('click', moveRight);
    prevButton.addEventListener('click', moveLeft);

    var autoSlide = setInterval(moveRight, 5000);

    carouselInner.addEventListener('mouseenter', function () { clearInterval(autoSlide); });
    carouselInner.addEventListener('mouseleave', function () { autoSlide = setInterval(moveRight, 5000); });
    carouselInner.addEventListener('focusin', function () { clearInterval(autoSlide); });
    carouselInner.addEventListener('focusout', function () { autoSlide = setInterval(moveRight, 5000); });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') { moveLeft(); clearInterval(autoSlide); autoSlide = setInterval(moveRight, 5000); }
        if (e.key === 'ArrowRight') { moveRight(); clearInterval(autoSlide); autoSlide = setInterval(moveRight, 5000); }
    });

    /** ===== Modale projet ===== */
    var modal = document.getElementById('project-modal');
    var modalTitle = document.getElementById('modal-title');
    var modalDescription = document.getElementById('modal-description');
    var modalLink = document.getElementById('modal-link');
    var closeModal = document.querySelector('.close');

    function showModal(item) {
        var title = item.querySelector('h3').innerText;
        var description = item.getAttribute('data-description');
        var link = item.querySelector('a').href;
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        modalLink.href = link;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        closeModal.focus();
    }

    items.forEach(function (item) {
        item.addEventListener('click', function () { showModal(item); });
        item.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showModal(item); }
        });
        item.setAttribute('tabindex', '0');
        item.setAttribute('role', 'button');
    });

    function closeModalFn() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }

    closeModal.addEventListener('click', closeModalFn);

    window.addEventListener('click', function (event) {
        if (event.target === modal) closeModalFn();
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') closeModalFn();
    });

    /** ===== Scroll reveal ===== */
    function isInViewport(element) {
        var rect = element.getBoundingClientRect();
        return rect.top < window.innerHeight - 100 && rect.bottom > 0;
    }

    function handleScroll() {
        document.querySelectorAll('.soft-card, .reflexion-block, .skill-card, .exp-card').forEach(function (el) {
            if (isInViewport(el)) {
                el.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll();
});
