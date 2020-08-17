import { criminalList } from "./criminals/criminalList.js";
import { convictionSelect } from "./convictions/convictionSelect.js";
import { officerSelect } from "./officers/officerSelect.js";
import { noteForm } from "./notes/noteForm.js";
import { showNoteButton } from "./notes/showNoteButton.js";
import "./notes/noteList.js"
import { showWitnessButton } from "./Witnesses/witnessHTMLGenerator.js";
import "./Witnesses/witnessList.js"


criminalList()
convictionSelect()
officerSelect()
noteForm()
showNoteButton()
showWitnessButton()