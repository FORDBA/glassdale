import { useCriminals, getCriminals } from "./criminalDataProvider.js";
import { criminalHTMLConverter } from "./criminalHTMLConverter.js";
import { useConvictions } from "../convictions/convictionProvider.js";
import { useOfficers } from "../officers/OfficerProvider.js"
import { associatesDialog } from "./associatesDialog.js";
import { getCriminalFacilities, useCriminalFacilities } from "../Facilities/criminalFacilityProvider.js";
import { getFacilities, useFacilities } from "../Facilities/facilityProvider.js";

const contentTarget = document.querySelector(".criminalsContainer")
const eventHub = document.querySelector(".container")

let criminals = []
let criminalFacilities = []
let facilities = []
const chosenFilters = {
    crime: "0",
    officer: "0"
}




export const criminalList = () => {

    getCriminals()
        .then(getFacilities)
        .then(getCriminalFacilities)
        .then(() => {
            criminals = useCriminals()
            criminalFacilities = useCriminalFacilities()
            facilities = useFacilities()

            render()
        })
}

const render = () => {

    let criminalHTMLRepresentations = ""

    const arrayofCriminalHTMLRepresentations = criminals.map(
        (criminal) => {
            const criminalFacilityRelationships = criminalFacilities.filter(
                (cf) => {
                    return criminal.id === cf.criminalId
                }
            )
            const matchingFacilities = criminalFacilityRelationships.map(
                (currentRelationship) => {
                    return facilities.find(
                        (facility) => {
                            return currentRelationship.facilityId === facility.id
                        }
                    )
                }
            )
            return criminalHTMLConverter(criminal, matchingFacilities)
        }
    )

    contentTarget.innerHTML = `
                    <h2>Glassdale Convicted Criminals</h2>
                    <article class="criminalList">
                    ${ arrayofCriminalHTMLRepresentations.join("")}
                    </article>
                    ${ associatesDialog()}
                    `
}


const filteredCriminals = () => {
    criminals = useCriminals()
    const arrayOfCrimes = useConvictions()

    if (chosenFilters.crime !== "0") {
        const foundCrimeObject = arrayOfCrimes.find(
            (crime) => {
                return parseInt(chosenFilters.crime) === crime.id
            }
        )
        criminals = criminals.filter(
            (currentCriminalObject) => {
                return foundCrimeObject.name === currentCriminalObject.conviction
            }
        )
    }
    if (chosenFilters.officer !== "0") {
        criminals = criminals.filter(
            (currentCriminal) => {
                if (currentCriminal.arrestingOfficer === chosenFilters.officer) {

                    return true
                }
                return false
            }
        )
    }
}



eventHub.addEventListener("crimeSelected", (crimeSelectedEvent) => {

    chosenFilters.crime = crimeSelectedEvent.detail.crimeId
    filteredCriminals()
    render()

})

eventHub.addEventListener("officerSelected", (officerSelectedEvent) => {

    chosenFilters.officer = officerSelectedEvent.detail.officerName

    
    filteredCriminals()
    console.log(filteredCriminals)
    render()

})
                            
                            