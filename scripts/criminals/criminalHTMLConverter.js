const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id.startsWith("showAlibi")) {
        const [prompt, criminalId] = clickEvent.target.id.split("--")
        const alibiEvent = new CustomEvent("showAlibiClicked", {
                detail: {
                    chosenCriminal: criminalId
                }
        })
        eventHub.dispatchEvent(alibiEvent)
   } 
})

export const criminalHTMLConverter = (criminalObj) => {
    return `
        <section class="criminal__card">
            <div class="criminal__name">${criminalObj.name}</div>
            <div></div>
            <div class="criminal__age">Age: ${criminalObj.age}</div>
            <div class="criminal__crime">Crime: ${criminalObj.conviction}</div>
            <div class="criminal__termStart">Term Start: ${new Date(criminalObj.incarceration.start).toLocaleDateString('en-US')}</div>
            <div class="criminal__termEnd">Term End: ${new Date(criminalObj.incarceration.end).toLocaleDateString('en-US')}</div>
            <button id='showAlibi--${criminalObj.id}'>Show Alibi</button>

        </section>
    `
    
}