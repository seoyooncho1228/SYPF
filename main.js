let activeCategory = "all"; // 현재 활성 카테고리

document.addEventListener("DOMContentLoaded", () => {
    const allItems = [...document.querySelectorAll("#all .grid-item")];
    const navLinks = document.querySelectorAll(".categories-nav a");
    const sections = document.querySelectorAll(".content-block");
    const main = document.querySelector("main");

    // 데이터 정의: 상세페이지 정보
const projectData = {
    "branding01": {
        title: "작품 제목 01",
        subtitle: "간단 설명",
        description: "브랜딩 프로젝트 01 상세 설명입니다.",
        mainImage: "assets/branding/branding01_main.png",
        detailImages: [
            "assets/branding/branding01_1.png",
            "assets/branding/branding01_2.png"
        ]
    },
    "branding02": {
        title: "작품 제목 02",
        subtitle: "간단 설명",
        description: "브랜딩 프로젝트 02 상세 설명입니다.",
        mainImage: "assets/branding/branding02_main.png",
        detailImages: [
            "assets/branding/branding02_1.png",
            "assets/branding/branding02_2.png"
        ]
    },
    "branding03": {
        title: "작품 제목 03",
        subtitle: "간단 설명",
        description: "브랜딩 프로젝트 03 상세 설명입니다.",
        mainImage: "assets/branding/branding03_main.png",
        detailImages: [
            "assets/branding/branding03_1.png",
            "assets/branding/branding03_2.png"
        ]
    },
    "graphic01": {
        title: "Digital Panopticon",
        subtitle: "덕성여대 졸업전시",
        description: "그래픽 프로젝트 01 상세 설명입니다.",
        mainImage: "assets/graphics/graphic01_main.png",
        detailImages: [
            "assets/graphics/graphic01_1.png",
            "assets/graphics/graphic01_2.png"
        ]
    },
    "graphic02": {
        title: "GRAPHIC 02",
        subtitle: "그래픽 설명",
        description: "그래픽 프로젝트 02 상세 설명입니다.",
        mainImage: "assets/graphics/graphic02_main.png",
        detailImages: [
            "assets/graphics/graphic02_1.png",
            "assets/graphics/graphic02_2.png"
        ]
    },
    "movie01": {
        title: "MOVIE 01",
        subtitle: "무비 설명",
        description: "MOVIE 프로젝트 상세 설명입니다.",
        mainImage: "assets/movie/movie01_main.png",
        detailImages: []
    },
    "uxui01": {
        title: "UXUI 01",
        subtitle: "UXUI 설명",
        description: "UXUI 프로젝트 상세 설명입니다.",
        mainImage: "assets/uxui/uxui01_main.png",
        detailImages: []
    },
    "etc01": {
        title: "ETC 01",
        subtitle: "기타 설명",
        description: "기타 프로젝트 상세 설명입니다.",
        mainImage: "assets/etc/etc01_main.png",
        detailImages: []
    }
};


    // 메뉴 클릭
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const category = link.dataset.category;

            // 상세페이지 제거
            const existingDetail = document.querySelector(".detail-page");
            if (existingDetail) existingDetail.remove();

            activeCategory = category; // 현재 카테고리 기록

            navLinks.forEach(n => n.classList.remove("active"));
            link.classList.add("active");

            sections.forEach(sec => sec.style.display = "none");

            if (category === "all") {
                document.querySelector("#all").style.display = "block";
                return;
            }

            const target = document.querySelector(`#${category}`);
            target.innerHTML = '<div class="portfolio-grid"></div>';
            const grid = target.querySelector(".portfolio-grid");

            const filteredItems = allItems.filter(item => item.dataset.category === category);
            filteredItems.forEach(item => grid.appendChild(item.cloneNode(true)));

            target.style.display = "block";

            // 카드 클릭 이벤트
            grid.querySelectorAll(".grid-item").forEach(card => {
                card.addEventListener("click", () => {
                    const id = card.querySelector(".placeholder-box").dataset.id;
                    activeCategory = card.dataset.category; // 상세페이지 열 때 현재 카테고리 기록
                    showDetailPage(id);
                });
            });
        });
    });

    // ALL 카드 클릭 이벤트
    allItems.forEach(card => {
        card.addEventListener("click", () => {
            const id = card.querySelector(".placeholder-box").dataset.id;
            activeCategory = card.dataset.category || "all";
            showDetailPage(id);
        });
    });

    // 상세페이지 표시 함수
    function showDetailPage(id) {
        if (!projectData[id]) {
            alert("상세 정보가 없습니다.");
            return;
        }
        const data = projectData[id];

        // 기존 콘텐츠 숨기기
        sections.forEach(sec => sec.style.display = "none");

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

        // 뒤로가기 버튼
        detailSection.querySelector(".back-btn").addEventListener("click", () => {
            detailSection.remove();
            // 이전 카테고리 섹션 표시
            document.querySelector(`#${activeCategory}`).style.display = "block";
        });
    }
});