document.addEventListener('DOMContentLoaded', function() {
    console.log("Script chargé et DOM prêt");

    let currentIndex = 0;

    function moveSlide(step) {
        const items = document.querySelectorAll('.carousel-item');
        if (items.length === 0) {
            console.log("Aucun élément dans le carrousel.");
            return;
        }

        // Mise à jour de l'index
        currentIndex += step;
        if (currentIndex >= items.length) {
            currentIndex = 0;
        } else if (currentIndex < 0) {
            currentIndex = items.length - 1;
        }

        console.log("Changement d'index : ", currentIndex);  // Affiche l'index courant

        // Appliquer le changement de transformation pour déplacer le carrousel
        const carousel = document.querySelector('.carousel');
        console.log("Transform: translateX(-" + (currentIndex * 100) + "%)");  // Vérifie le calcul de la transformation
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    // Assigner les événements aux boutons
    document.querySelector('.prev').addEventListener('click', function() {
        console.log("Clic sur Prev");  // Affiche le clic sur "Prev"
        moveSlide(-1);
    });

    document.querySelector('.next').addEventListener('click', function() {
        console.log("Clic sur Next");  // Affiche le clic sur "Next"
        moveSlide(1);
    });
});
