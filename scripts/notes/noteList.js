import { getNotes, useNotes } from "./noteProvider.js";
import { noteHTMLConverter } from "./noteHTMLConverter.js";


const contentTarget = document.querySelector(".noteListContainer")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("showNotesClicked", customEvent => {
    noteList()
})

export const noteList = () => {
    getNotes()
        .then(() => {
            const allNotes = useNotes()
            render(allNotes)
        })
}

const render = (noteArray) => {
    const allNotesConvertedtoStrings = noteArray.map(
        (currentNote) => {
            return noteHTMLConverter(currentNote)
        }
    ).join("")
    contentTarget.innerHTML = allNotesConvertedtoStrings
}