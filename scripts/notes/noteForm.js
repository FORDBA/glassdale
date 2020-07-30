import { saveNote } from "./noteProvider.js";

const eventHub = document.querySelector(".container")
const contentTarget = document.querySelector(".noteFormContainer")

eventHub.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "saveNote") {

        const noteTitle = document.querySelector("#note--title")
        const noteAuthor = document.querySelector("#note--author")
        const noteContent = document.querySelector("#note--content")

        const newNote = {
            title: noteTitle.value,
            author: noteAuthor.value,
            content: noteContent.value,
            timestamp: Date.now()
        }
        saveNote(newNote)
    }
})

const render = () => {
    contentTarget.innerHTML = `
    <input type="text" id="note--title" placeholder="Enter note title" />
        <input type="text" id="note--author" placeholder="Your name here" />
        <textarea id="note--content" placeholder="Note text here"></textarea>

        <button id="saveNote">Save Note</button>
        `
}

export const noteForm = () => {
    render()
} 