import { witnessHTMLConverter } from "./witnessHTMLGenerator.js";
import { useWitness, getWitness } from "./witnessProvider.js";





const eventHub = document.querySelector(".container")
const witnessTarget = document.querySelector(".witnesses")
const contentTarget = document.querySelector(".criminalsContainer")

eventHub.addEventListener("showWitnessClicked", (witnessSelectedEvent) => {
    getWitness().then(() => {
        const witnesses = useWitness()
        renderWitness(witnesses)
    })
})

const renderWitness = (witnessArray) => {
    contentTarget.innerHTML=""
    let witnessHTML = ""
    witnessArray.forEach(witness => {
        witnessHTML += witnessHTMLConverter(witness)
    })
    witnessTarget.innerHTML = `
    ${ witnessHTML }
`
}