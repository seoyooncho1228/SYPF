document.addEventListener("DOMContentLoaded", () => {

    const menuLinks = document.querySelectorAll(".categories-nav a");
    const sections = document.querySelectorAll(".content-block");

    menuLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();

            menuLinks.forEach(i => i.classList.remove("active"));
            link.classList.add("active");

            const target = link.dataset.category;

            sections.forEach(sec => sec.style.display = "none");
            document.getElementById(target).style.display = "block";
        });
    });

});
