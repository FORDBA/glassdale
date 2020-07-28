import { useOfficers, getOfficers } from "./OfficerProvider.js"


const contentTarget = document.querySelector(".filters__officer")
const eventHub = document.querySelector(".container")

contentTarget.addEventListener("change", (changeEvent) => {
    const customEvent = new CustomEvent("officerSelected", {
        detail: {
            officerId: changeEvent.target.value
        }
    })
    eventHub.dispatchEvent(customEvent)
})

const render = officerCollection => {
    contentTarget.innerHTML = `
    <select class="dropdown" id="officerSelect">
        <option value="0">Please select an officer...</option>
        ${
            officerCollection.map(
                officerObject => {
                    return `<option value="${ officerObject.id }">${officerObject.name}</option>`
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