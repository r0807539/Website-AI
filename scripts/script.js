import { AIPrograms } from "./ai-programs.js"

const lijstSectie = document.querySelector('.list')

const update = new CustomEvent('lijstUpdate')

document.querySelector('#aantal').innerText = `${AIPrograms.length} resultaten gevonden`

const checkboxes = document.querySelectorAll('input[name=soort]')
checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
        lijstSectie.dispatchEvent(update)
    })
})

function maakFilterLijst() {
    const geselecteerdeSoorten = []
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            geselecteerdeSoorten.push(checkbox.value)
        }
    })
    return geselecteerdeSoorten
}

lijstSectie.addEventListener('lijstUpdate', filterZoekresultaat)

function filterZoekresultaat() {
    const geselecteerdeFilters = maakFilterLijst()
    lijstSectie.innerHTML = '';
    let aantalGeselecteerdeAI = document.getElementsByClassName('AI')
    AIPrograms.forEach((AI) => {
        if (geselecteerdeFilters.includes(AI.soort)) {
            voegAIToeBijLijst(AI)
        }
        document.querySelector('#aantal').innerText = `${aantalGeselecteerdeAI.length} resultaten gevonden`
    })
    if (aantalGeselecteerdeAI.length == 0) {
        lijstSectie.innerHTML = "<p id='noResult'>Geen resultaten gevonden</p>"
    }
}

function voegAIToeBijLijst(AI) {
    const searchItem = document.createElement('article')
    searchItem.innerHTML = `<div class="AI"><img class="AI-photo" loading="lazy" src="images/${AI.foto}" alt="Logo van ${AI.titel}" /><div class="AI-desc"><h3>${AI.titel}</h3><p class="sorttext">${AI.soort}</p><p>${AI.info}</p></div></div>`
    searchItem.classList.add(`${AI.soort}`)
    lijstSectie.appendChild(searchItem)
}

AIPrograms.forEach(voegAIToeBijLijst)