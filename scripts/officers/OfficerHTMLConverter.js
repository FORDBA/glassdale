export const OfficerHTMLConverter = (officerObj) => {
    return `
        <section class="officer__card">
            <div class="officer__name">${officerObj.name}</div>
        </section>
    `
}