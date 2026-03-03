"use strict";

class docGet {
    constructor(name, isOriginal, filePath) {
        this.name = name;
        this.status = isOriginal ? "Оригинал" : "Копия";
        this.filePath = filePath;
    }
    displayInfo() {
        return `📄 ${this.name} [${this.status}]`;
    }
}

const documentsArray = [
    new docGet("Фазы Луны", false, "../media/Фазы.jpg"), 
    new docGet("Знаки зодиака", true, "../media/ЗнакиЗодиака.txt"),
    new docGet("Влияние луны", true, "../media/ВлияниеЛуны.docx"),
];


function setLargeFont() {
    document.body.classList.add("accessibility-active");
    
    if (window.innerWidth > 1000) {
        document.body.style.zoom = "1.2";
    }

    const paragraphs = document.querySelectorAll('p');
    paragraphs.forEach(p => p.style.fontSize = "1.5em");

    const otherTags = document.querySelectorAll('li, cite, td, th, nav a,  h3, .doc-item, .strongerб, .footer-text');
    otherTags.forEach(el => {
        el.style.fontSize = "1.3em";
        el.style.lineHeight = "1.6";
    });
    const Title = document.querySelectorAll('h1');
    Title.forEach(el => {
        el.style.fontSize = "3em";
        el.style.lineHeight = "3.4";
    });

    const moonImg = document.getElementById('moonPhaseImg');
    if (moonImg) {
        moonImg.style.maxWidth = "100%";
        moonImg.style.height = "auto";
    }
}

function setNormalFont() {
    document.body.classList.remove("accessibility-active");
    document.body.style.zoom = "1";

    const allElements = document.querySelectorAll('p, li, cite, td, th, nav a, h1, h2, h3, .doc-item, .stronger');
    allElements.forEach(el => {
        el.style.fontSize = "";
        el.style.lineHeight = "";
    });

    const moonImg = document.getElementById('moonPhaseImg');
    if (moonImg) moonImg.style.maxWidth = "";
}

function toggleAccessibility() {
    const isModeOn = localStorage.getItem("accessibility") === "true";
    if (!isModeOn) {
        setLargeFont();
        localStorage.setItem("accessibility", "true");
    } else {
        setNormalFont();
        localStorage.setItem("accessibility", "false");
    }
}


function renderDocuments(filter = "") {
    const container = document.getElementById("doc-list-container");
    if (!container) return;
    container.innerHTML = "";

    const filtered = documentsArray.filter(doc => 
        doc.name.toLowerCase().includes(filter.toLowerCase())
    );

    filtered.forEach(doc => {
        const link = document.createElement("a");
        link.href = doc.filePath;
        link.className = "doc-item clickable";
        link.textContent = doc.displayInfo();
        link.target = "_blank";
        container.appendChild(link);
    });
}

function clearSearchInput() {
    const searchInput = document.getElementById("docSearchInput");
    if (searchInput) {
        searchInput.value = "";
        renderDocuments();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("accessibility") === "true") {
        setLargeFont();
    }

    renderDocuments();
    
    const searchInput = document.getElementById("docSearchInput");
    if (searchInput) {
        searchInput.addEventListener("input", () => renderDocuments(searchInput.value));
    }
});
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("accessibility") === "true") {
        setLargeFont();
    }
    renderDocuments();
    const searchInput = document.getElementById("docSearchInput");
    const clearButton = document.getElementById("clearSearch");
    if (searchInput) {
        searchInput.addEventListener("input", () => renderDocuments(searchInput.value));
    }
    if (clearButton) {
        clearButton.addEventListener("click", clearSearchInput);
    }
});

