const ECLIPSES = {
    lunar: [
        { date: '2026-03-03', type: 'Полное' },
        { date: '2026-08-28', type: 'Частное' },
        { date: '2027-02-20', type: 'Полутеневое' },
        { date: '2027-08-17', type: 'Полутеневое' }
    ],
    solar: [
        { date: '2026-02-17', type: 'Центральное (кольцеобразное)' },
        { date: '2026-08-12', type: 'Центральное (полное)' },
        { date: '2027-02-06', type: 'Центральное (кольцеобразное)' },
        { date: '2027-08-02', type: 'Частное' }
    ]
};

const prepareEclipses = () => {
    const now = new Date();
    const result = { lunar: [], solar: [] };
    
    for (let type of ['lunar', 'solar']) {
        result[type] = ECLIPSES[type]
            .map(e => ({ ...e, dateObj: new Date(e.date) }))
            .filter(e => e.dateObj >= now)
            .sort((a, b) => a.dateObj - b.dateObj)
            .slice(0, 3);
    }
    return result;
};

async function calculateEclipses(type) {
    const btnLunar = document.getElementById('calcLunarBtn');
    const btnSolar = document.getElementById('calcSolarBtn');
    const calcBox = document.getElementById('calcBox');
    const pBar = document.getElementById('progressBar');
    const res = document.getElementById('results');
    const list = document.getElementById('resultsList');
    const title = document.getElementById('resultTitle');

    if (btnLunar) btnLunar.disabled = true;
    if (btnSolar) btnSolar.disabled = true;
    calcBox.classList.remove('d-none');
    res.classList.add('d-none');
    pBar.style.width = '0%';

    for (let i = 0; i <= 100; i += 25) {
        pBar.style.width = i + '%';
        await new Promise(r => setTimeout(r, 80));
    }

    const allEclipses = prepareEclipses();
    const events = allEclipses[type];

    title.innerText = type === 'solar' ? 'БЛИЖАЙШИЕ СОЛНЕЧНЫЕ ЗАТМЕНИЯ:' : 'БЛИЖАЙШИЕ ЛУННЫЕ ЗАТМЕНИЯ:';
    
    if (events.length === 0) {
        list.innerHTML = '<li>На ближайшие годы данных нет</li>';
    } else {
        list.innerHTML = events.map(item => {
            const dateStr = item.dateObj.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
            return `<li>📅 ${dateStr} — <strong>${item.type}</strong></li>`;
        }).join('');
    }

    res.classList.remove('d-none');
    if (btnLunar) btnLunar.disabled = false;
    if (btnSolar) btnSolar.disabled = false;
}

function hideResults() {
    document.getElementById('calcBox').classList.add('d-none');
}

document.addEventListener('DOMContentLoaded', () => {
    const lunarBtn = document.getElementById('calcLunarBtn');
    const solarBtn = document.getElementById('calcSolarBtn');
    if (lunarBtn) lunarBtn.addEventListener('click', () => calculateEclipses('lunar'));
    if (solarBtn) solarBtn.addEventListener('click', () => calculateEclipses('solar'));
});