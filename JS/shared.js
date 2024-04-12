function initializeVisitInfo() {
    const visitInfo = localStorage.getItem('visitInfo');
    if (!visitInfo) {
        const initialData = { count: 0, lastVisit: null };
        localStorage.setItem('visitInfo', JSON.stringify(initialData));
    }
}

function updateVisitInfo() {
    const visitInfo = JSON.parse(localStorage.getItem('visitInfo'));
    visitInfo.count++;
    visitInfo.lastVisit = new Date();
    localStorage.setItem('visitInfo', JSON.stringify(visitInfo));

    const visitDate = new Date(visitInfo.lastVisit);
    const formatter = new Intl.DateTimeFormat('pt-BR', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    });
    const formattedDate = formatter.format(visitDate);

    const visitText = `Esta página foi visitada ${visitInfo.count} vezes. A última visita foi: ${formattedDate}`;
    

    const paragraph = document.createElement('p');
    paragraph.textContent = visitText;

    const footer = document.querySelector('footer');
    footer.appendChild(paragraph);
}

document.addEventListener('DOMContentLoaded', function () {
    initializeVisitInfo();
    updateVisitInfo();
});
