
const slider = document.querySelector(".slider");
const leftButton = document.getElementById("left");
const rightButton = document.getElementById("right");

let isDragging = false;
let startX;
let scrollLeft;

slider.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});

slider.addEventListener("mouseleave", () => {
    isDragging = false;
});

slider.addEventListener("mouseup", () => {
    isDragging = false;
});

slider.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2; //scroll-fast
    slider.scrollLeft = scrollLeft - walk;
});

leftButton.addEventListener("click", () => {
    slider.scrollBy({
        left: -200,
        behavior: "smooth"
    });
});

rightButton.addEventListener("click", () => {
    slider.scrollBy({
        left: 200,
        behavior: "smooth"
    });
});


