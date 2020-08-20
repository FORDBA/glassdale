import { useOfficers, getOfficers } from "./OfficerProvider.js"


const contentTarget = document.querySelector(".filters__officer")
const eventHub = document.querySelector(".container")

contentTarget.addEventListener("change", (changeEvent) => {
    if (changeEvent.target.id === "officerSelect") {

        const officerSelectedEvent = new CustomEvent("officerSelected", {
            detail: {
                officerName: changeEvent.target.value
            }
        })
        eventHub.dispatchEvent(officerSelectedEvent)
    }
})

const render = (officerCollection) => {
    contentTarget.innerHTML = `
    <select class="dropdown" id="officerSelect">
        <option value="0">Please select an officer...</option>
        ${
        officerCollection.map(
            officerObject => {
                return `<option value="${officerObject.name}">${officerObject.name}</option>`
            }
        ).join("")
        }
    </select>
`
}

export const officerSelect = () => {
    getOfficers().then(() => {

        const officers = useOfficers()

        render(officers)
    })
}