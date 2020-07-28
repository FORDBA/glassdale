import { useCriminals, getCriminals } from "./criminalDataProvider.js";
import { criminalHTMLConverter } from "./criminalHTMLConverter.js";
import { useConvictions } from "../convictions/convictionProvider.js";
import { useOfficers } from "../officers/OfficerProvider.js"

const contentTarget = document.querySelector(".criminalsContainer")
const eventHub = document.querySelector(".container")

eventHub.addEventListener("crimeSelected", (crimeSelectedEvent) => {
    
    const crimeThatWasSelected = crimeSelectedEvent.detail.crimeId

    const arrayOfCrimes = useConvictions()
    const foundCrimeObject = arrayOfCrimes.find((crime) => {
        return parseInt(crimeThatWasSelected) === crime.id
    })
    const allCriminals = useCriminals()

    const filteredCriminals = allCriminals.filter((currentCriminalObject) => {
        return foundCrimeObject.name === currentCriminalObject.conviction
    })
    render(filteredCriminals)

})

eventHub.addEventListener("officerSelected", (officerSelectedEvent) => {
    
    const officerThatWasSelected = officerSelectedEvent.detail.officerId

    const arrayOfOfficers = useOfficers()
    const foundOfficerObject = arrayOfOfficers.find((officer) => {
        return parseInt(officerThatWasSelected) === officer.id
    })
    const allCriminals = useCriminals()

    const filteredCriminals = allCriminals.filter((currentCriminalObject) => {
        return foundOfficerObject.name === currentCriminalObject.arrestingOfficer
    })
    render(filteredCriminals)

})

const render = (criminalArray) => {
    
    let criminalHTMLRepresentations = ""
    criminalArray.forEach(criminal => {
        criminalHTMLRepresentations += criminalHTMLConverter(criminal)
    })
    
    contentTarget.innerHTML = `
    <h2>Glassdale Convicted Criminals</h2>
    <article class="criminalList">
        ${ criminalHTMLRepresentations }
    </article>
    `
}


export const criminalList = () => {
    
    getCriminals()
    .then(() => {
        const criminals = useCriminals()
        render(criminals)
    })
}