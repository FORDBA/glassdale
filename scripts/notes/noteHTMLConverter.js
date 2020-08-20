import { deleteNote } from "./noteProvider.js";

const eventHub = document.querySelector(".container")

eventHub.addEventListener("click", clickEvent => {
    if(clickEvent.target.id.startsWith("deleteNote--")) {
        const [ prompt, noteIdString ] = clickEvent.target.id.split("--") 

        deleteNote(noteIdString)
    }
})


export const noteHTMLConverter = (noteObject, criminalObject) => {
    return `
        <section class="note">
            <div class="note--title">Title: ${ noteObject.title }</div>
            <div class="note--criminal">Criminal: ${ criminalObject.name }</div>
            <div class="note--content">${ noteObject.content }</div>
            <div class="note--author">Author: ${ noteObject.author }</div>
            <div class="note--timestamp">Timestamp: ${ new Date(noteObject.timestamp).toLocaleDateString('en-US')  }</div>
            <button id="deleteNote--${noteObject.id}">Delete</button>
        </section>
    `
}