import { useCriminals } from "./criminalDataProvider.js"





const eventHub = document.querySelector(".container")

eventHub.addEventListener("showAlibiClicked", customEvent => {
    const contentTarget = document.querySelector(".associatesDialog")
    const criminalId = customEvent.detail.chosenCriminal

    const targetCriminal = useCriminals().find(
        (criminal) => criminal.id === parseInt(criminalId)
    )

    contentTarget.innerHTML = `${
        targetCriminal.known_associates.map(associate => {
            return `
                <h4>${associate.name}</h4>
                <div>${associate.alibi}</div>
            `
        }).join("")
    }`
    contentTarget.showModal()
})
export const associatesDialog = () => {
    return `
        <dialog class="associatesDialog">
        </dialog>
    `
} 

