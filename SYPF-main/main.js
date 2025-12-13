import { projectData } from "./projectdata.js";


let activeCategory = "all";

document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".categories-nav a");
    const main = document.querySelector("main");
    const contentSection = document.querySelector("#content");
const verticalLine = document.querySelector(".vertical-line");
const horizontalLine = document.querySelector(".horizontal-line");
const cursor = document.createElement("div");
cursor.classList.add("custom-cursor");
document.body.appendChild(cursor);

// 마우스 이동에 따라 커서 위치 업데이트
document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
});

// 클릭 시 90도 회전 토글
document.addEventListener("mousedown", () => {
    cursor.classList.add("rotate");
});
document.addEventListener("mouseup", () => {
    cursor.classList.remove("rotate");
});

document.addEventListener("mousemove", (e) => {
    const x = e.clientX;
    const y = e.clientY;

    verticalLine.style.left = x + "px";
    horizontalLine.style.top = y + "px";
});


    function renderCards(category = "all") {
        // 기존 상세페이지 제거
        const existingDetail = document.querySelector(".detail-page");
        if (existingDetail) existingDetail.remove();

        contentSection.style.display = "block";
        contentSection.innerHTML = '<div class="portfolio-grid"></div>';
        const grid = contentSection.querySelector(".portfolio-grid");

        const items = Object.entries(projectData).filter(([id, data]) => category === "all" || data.category === category);

        items.forEach(([id, data]) => {
            const card = document.createElement("div");
            card.classList.add("grid-item");
            card.dataset.category = data.category;
            card.innerHTML = `
                <div class="placeholder-box" data-id="${id}">
                  ${data.mainImage ? `<img src="${data.mainImage}" alt="${data.title}">` : ""}
                </div>
                <p class="item-title">${data.title}</p>
                <p class="item-subtitle">${data.subtitle}</p>
            `;
            grid.appendChild(card);

            card.addEventListener("click", () => showDetailPage(id));
        });
    }

function showDetailPage(id) {
    if (!projectData[id]) { alert("상세 정보가 없습니다."); return; }
    const data = projectData[id];

    contentSection.style.display = "none";

    const detailSection = document.createElement("section");
    detailSection.classList.add("detail-page");
    detailSection.innerHTML =`
        <div class="detail-container">
            <!-- 왼쪽: 메인 이미지 -->
            <div class="left">
                <img src="${data.mainImage}" alt="${data.title}">
            </div>

            <!-- 오른쪽: 텍스트 -->
<div class="right">
    <h2>${data.title}</h2>
    <h3>${data.subtitle}</h3>
    ${
      Array.isArray(data.description)
        ? data.description.map(line => `<p>${line}</p>`).join("")
        : `<p>${data.description}</p>`
    }
</div>

        </div>

        <!-- 상세 이미지: detail-container 아래로 이동 -->
        <div class="detail-images">
            ${data.detailImages.map(img => `<img src="${img}" alt="${data.title}">`).join("")}
        </div>
    `;
    main.appendChild(detailSection);

}


    navLinks.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const category = link.dataset.category;
            activeCategory = category;

            // 상세페이지 제거
            const existingDetail = document.querySelector(".detail-page");
            if (existingDetail) existingDetail.remove();

            navLinks.forEach(n => n.classList.remove("active"));
            link.classList.add("active");

            renderCards(category);
        });
    });

    // 초기 ALL 렌더링
    renderCards();
});
