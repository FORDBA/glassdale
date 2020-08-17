export const witnessHTMLConverter = (witnessObj) => {
    return `
      <section class="witness__card"  
     <h1 class="witness__name">Witness Name: ${witnessObj.name} </h1>
     <div class="witness__statement">Statments: ${witnessObj.statements}</div>
    </section>
        `
}

const contentTarget = document.querySelector(".showWitness")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", clickEvent => {
    if(clickEvent.target.id === "showWitnessButton") {
        const customEvent = new CustomEvent("showWitnessClicked")
        eventHub.dispatchEvent(customEvent)
    }
})

export const showWitnessButton = () => {
    contentTarget.innerHTML = `<button id="showWitnessButton">Show Witnesses</button>`
}