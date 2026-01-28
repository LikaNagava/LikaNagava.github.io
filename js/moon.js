const prefix = location.pathname.includes('/pages/') ? '../' : './';
const mediaPath = (file) => prefix + 'media/' + file;

function updateMoonPhase() {
    const now = new Date();
    const lp = 2551442.8;
    const newMoonDate = new Date('2000-01-06T18:14:00');
    const diff = (now.getTime() - newMoonDate.getTime()) / 1000;
    const phaseSeconds = diff % lp;
    const daysIntoCycle = phaseSeconds / (24 * 3600);

    let phaseName = "";
    let phaseImg = "";
    let phaseDesc = "";

    if (daysIntoCycle < 1.8) {
        phaseName = "Новолуние";
        phaseImg = "новолуние.png";
        phaseDesc = "Луна не видна. Время для планирования новых дел.";
    } else if (daysIntoCycle < 7.4) {
        phaseName = "Растущий серп";
        phaseImg = "растущая_справа.png";
        phaseDesc = "Луна начинает расти. Энергия прибывает.";
    } else if (daysIntoCycle < 10.4) {
        phaseName = "Первая четверть";
        phaseImg = "первая четверть.png";
        phaseDesc = "Ровно половина Луны освещена справа.";
    } else if (daysIntoCycle < 14.8) {
        phaseName = "Растущая Луна";
        phaseImg = "растущаю_слева.png";
        phaseDesc = "Луна почти полная. Время активных действий.";
    } else if (daysIntoCycle < 16.6) {
        phaseName = "Полнолуние";
        phaseImg = "полнолуние.png";
        phaseDesc = "Пик энергии. Луна полностью освещена.";
    } else if (daysIntoCycle < 22.1) {
        phaseName = "Убывающая Луна";
        phaseImg = "убывающая_справа.png";
        phaseDesc = "Энергия начинает убывать. Время завершения дел.";
    } else if (daysIntoCycle < 25.1) {
        phaseName = "Последняя четверть";
        phaseImg = "третья_четверть.png";
        phaseDesc = "Половина Луны освещена слева.";
    } else if (daysIntoCycle < 28.5) {
        phaseName = "Убывающий серп";
        phaseImg = "убывающий.png";
        phaseDesc = "Тонкий серп. Время для отдыха и очищения.";
    } else {
        phaseName = "Новолуние";
        phaseImg = "новолуние.png";
        phaseDesc = "Луна возвращается в фазу обновления.";
    }

    const nameEl = document.getElementById('moonPhaseName');
    const imgEl = document.getElementById('moonPhaseImg');
    const descEl = document.getElementById('moonPhaseDesc');

    if (nameEl) nameEl.innerText = phaseName;
    if (imgEl) imgEl.src = mediaPath(phaseImg);
    if (descEl) descEl.innerText = phaseDesc;
}

document.addEventListener('DOMContentLoaded', updateMoonPhase);