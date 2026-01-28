
function getPhaseSettings(phaseName) {
    switch (phaseName) {
        case "Новолуние":
            return { startDay: 0, endDay: 1.0, img: "новолуние.png" };
        case "Растущий серп":
            return { startDay: 1.0, endDay: 6.38, img: "растущая_справа.png" };
        case "Первая четверть":
            return { startDay: 6.38, endDay: 8.38, img: "первая четверть.png" };
        case "Растущая луна":
            return { startDay: 8.38, endDay: 13.76, img: "растущаю_слева.png" };
        case "Полнолуние":
            return { startDay: 13.76, endDay: 15.76, img: "полнолуние.png" };
        case "Убывающая луна":
            return { startDay: 15.76, endDay: 21.14, img: "убывающая_справа.png" };
        case "Последняя четверть":
            return { startDay: 21.14, endDay: 23.14, img: "третья_четверть.png" };
        case "Убывающий серп":
            return { startDay: 23.14, endDay: 28.53, img: "убывающий.png" };
        default:
            return null;
    }
}

function calculatePhaseDates() {
    const selectedPhase = document.getElementById('phaseSelect').value;
    const resultsContainer = document.getElementById('phaseResults');
    if (!resultsContainer) return;

    // Если ничего не выбрано прячем контейнер
    if (!selectedPhase) {
        resultsContainer.innerHTML = '';
        resultsContainer.style.display = 'none';
        return;
    } else {
        resultsContainer.style.display = '';
    }

    const settings = getPhaseSettings(selectedPhase);
    if (!settings) {
        resultsContainer.innerHTML = '';
        resultsContainer.style.display = 'none';
        return;
    }


    const now = new Date();
    const cycleLength = 29.530588 * 24 * 60 * 60 * 1000;
    const newMoonRef = new Date(Date.UTC(2024, 11, 30, 22, 27, 0));

    let resultsHTML = '';
    let foundCount = 0;
    
    let currentCycleNum = Math.floor((now.getTime() - newMoonRef.getTime()) / cycleLength);

    for (let i = 0; foundCount < 3; i++) {
        let cycleStart = newMoonRef.getTime() + (currentCycleNum + i) * cycleLength;
        
        let startDate = new Date(cycleStart + settings.startDay * 24 * 60 * 60 * 1000);
        let endDate = new Date(cycleStart + settings.endDay * 24 * 60 * 60 * 1000);

        if (endDate < now) continue;

        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const dateRange = `${startDate.toLocaleDateString('ru-RU', options)} — ${endDate.toLocaleDateString('ru-RU', options)}`;
        
        // html карточка
        resultsHTML += ` 
            <div class="phase-result-item">
                <div class="phase-result-info">
                    <h3>Период #${foundCount + 1}</h3>
                    <div class="phase-result-dates">${dateRange}</div>
                </div>
                <img src="../media/${settings.img}" class="phase-result-img" alt="${selectedPhase}">
            </div>
        `;
        foundCount++;
    }

    resultsContainer.innerHTML = resultsHTML;
}

document.addEventListener('DOMContentLoaded', () => {
    const select = document.getElementById('phaseSelect');
    if (select) {
        select.addEventListener('change', calculatePhaseDates);
        calculatePhaseDates();
    }
});