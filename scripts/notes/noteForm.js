import { saveNote } from "./noteProvider.js";
import { useCriminals, getCriminals } from "../criminals/criminalDataProvider.js";

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".noteFormContainer")

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "saveNote") {

        const noteTitle = document.querySelector("#note--title")
        const noteAuthor = document.querySelector("#note--author")
        const noteContent = document.querySelector("#note--content")
        const noteCriminal = document.querySelector("#note--criminal")

        const criminalID = parseInt(noteCriminal.value)

        if (criminalID !== 0) {

        const newNote = {
            title: noteTitle.value,
            author: noteAuthor.value,
            content: noteContent.value,
            criminalID: parseInt(noteCriminal.value),
            timestamp: Date.now()
        }
        saveNote(newNote)
    }
    else{
        window.alert("Choose a Criminal!")
    }
    }
})

const render = (criminals) => {
    contentTarget.innerHTML = `
    <input type="text" id="note--title" placeholder="Enter note title" />
        <input type="text" id="note--author" placeholder="Your name here" />
        <textarea id="note--content" placeholder="Note text here"></textarea>
        <select id="note--criminal">
            <option value="0">Select a Criminal</option>
            ${
                criminals.map(
                    (criminalObject) => {
                        return `<option value="${criminalObject.id}">
                            ${ criminalObject.name }
                            </option>`
                    }
                )
            }
            </select>
        <button id="saveNote">Save Note</button>
        `
}

export const noteForm = () => {
    getCriminals()
        .then(() =>{
            const criminals = useCriminals()
            render(criminals)
        })
  
} 