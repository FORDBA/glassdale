import { getNotes, useNotes } from "./noteProvider.js";
import { noteHTMLConverter } from "./noteHTMLConverter.js";
import { useCriminals } from "../criminals/criminalDataProvider.js";



const contentTarget = document.querySelector(".noteListContainer")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("noteStateChanged", customEvent => {
    const allNotes = useNotes()
    render(allNotes)
})



const render = (notes) => {
    const criminals = useCriminals()
    contentTarget.innerHTML = notes.reverse().map(
        (noteObject) => {
            const foundCriminal = criminals.find(
                (criminalObject) => {
                    return criminalObject.id === noteObject.criminalID
                }
                )
                return noteHTMLConverter(noteObject, foundCriminal)
            }
            ).join("")
        }
        
        export const noteList = () => {
            getNotes()    
            .then(useNotes)
            .then(render)
        }
        
        
        eventHub.addEventListener("showNotesClicked", noteList)
        eventHub.addEventListener("notesStateChanged", () => {
            const newNotes = useNotes()
            render(newNotes)
        })