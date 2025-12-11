let activeCategory = "all";

document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".categories-nav a");
    const main = document.querySelector("main");
    const contentSection = document.querySelector("#content");

    // 프로젝트 데이터
    const projectData = {
        "branding01": { category:"branding", title:"작품 제목 01", subtitle:"간단 설명", description:"브랜딩 프로젝트 01 상세 설명입니다.", mainImage:"assets/branding/branding01_main.png", detailImages:["assets/branding/branding01_1.png","assets/branding/branding01_2.png"] },
        "branding02": { category:"branding", title:"작품 제목 02", subtitle:"간단 설명", description:"브랜딩 프로젝트 02 상세 설명입니다.", mainImage:"assets/branding/branding02_main.png", detailImages:["assets/branding/branding02_1.png","assets/branding/branding02_2.png"] },
        "branding03": { category:"branding", title:"작품 제목 03", subtitle:"간단 설명", description:"브랜딩 프로젝트 03 상세 설명입니다.", mainImage:"assets/branding/branding03_main.png", detailImages:["assets/branding/branding03_1.png","assets/branding/branding03_2.png"] },
        "graphic01": { category:"graphic", title:"Digital Panopticon", subtitle:"덕성여대 졸업전시", description:"그래픽 프로젝트 01 상세 설명입니다.", mainImage:"assets/graphics/graphic01_main.png", detailImages:["assets/graphics/graphic01_1.png","assets/graphics/graphic01_2.png"] },
       "graphic02": { category:"graphic", title:"GRAPHIC 02", subtitle:"그래픽 설명", description:"그래픽 프로젝트 02 상세 설명입니다.", mainImage:"assets/graphics/graphic02_main.png", detailImages:["assets/graphics/graphic02_1.png","assets/graphics/graphic02_2.png"] },
        "movie01": { category:"movie", title:"MOVIE 01", subtitle:"무비 설명", description:"MOVIE 프로젝트 상세 설명입니다.", mainImage:"assets/movie/movie01_main.png", detailImages:[] },
        "uxui01": { category:"uxui", title:"UXUI 01", subtitle:"UXUI 설명", description:"UXUI 프로젝트 상세 설명입니다.", mainImage:"assets/uxui/uxui01_main.png", detailImages:[] },
        "etc01": { category:"etc", title:"ETC 01", subtitle:"기타 설명", description:"기타 프로젝트 상세 설명입니다.", mainImage:"assets/etc/etc01_main.png", detailImages:[] }
    };

    // 카드 렌더링 함수
    function renderCards(category = "all") {
        contentSection.innerHTML = '<div class="portfolio-grid"></div>';
        const grid = contentSection.querySelector(".portfolio-grid");

        const items = Object.entries(projectData).filter(([id, data]) => category === "all" || data.category === category);

        items.forEach(([id, data]) => {
            const card = document.createElement("div");
            card.classList.add("grid-item");
            card.dataset.category = data.category;
            card.innerHTML = `
                <div class="placeholder-box" data-id="${id}">
                    ${data.detailImages[0] ? `<img src="${data.detailImages[0]}" alt="${data.title}">` : ""}
                </div>
                <p class="item-title">${data.title}</p>
                <p class="item-subtitle">${data.subtitle}</p>
            `;
            grid.appendChild(card);

            // 카드 클릭
            card.addEventListener("click", () => showDetailPage(id));
        });
    }

    // 상세페이지 표시
    function showDetailPage(id) {
        if (!projectData[id]) { alert("상세 정보가 없습니다."); return; }
        const data = projectData[id];

        contentSection.style.display = "none";

        const detailSection = document.createElement("section");
        detailSection.classList.add("detail-page");
        detailSection.innerHTML = `
            <button class="back-btn">←</button>
            <div class="detail-container">
                <div class="left">
                    <img src="${data.mainImage}" alt="${data.title}">
                </div>
                <div class="right">
                    <h2>${data.title}</h2>
                    <h3>${data.subtitle}</h3>
                    <p>${data.description}</p>
                    <div class="detail-images">
                        ${data.detailImages.map(img => `<img src="${img}" alt="${data.title}">`).join("")}
                    </div>
                </div>
            </div>
        `;
        main.appendChild(detailSection);

        detailSection.querySelector(".back-btn").addEventListener("click", () => {
            detailSection.remove();
            contentSection.style.display = "block";
        });
    }

    // 카테고리 클릭
    navLinks.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const category = link.dataset.category;
            activeCategory = category;

            navLinks.forEach(n => n.classList.remove("active"));
            link.classList.add("active");

            renderCards(category);
        });
    });

    // 초기 ALL 렌더링
    renderCards();
});
