const form = document.querySelector('#film-form')
const titleElement = document.querySelector('#title')
const directorElement = document.querySelector('#director')
const urlElement = document.querySelector('#url')
const cardBody = document.querySelectorAll('.card-body')[1]
const clear = document.querySelector('#clear-films')



//Loading Event Listeners

eventListeners()

function eventListeners() {
    form.addEventListener('submit', addFilm)

    document.addEventListener('DOMContentLoaded', function () {
        let films = Storage.getFilmsFromStorage()
        UI.loadAllFilms(films)
    })

    cardBody.addEventListener('click', deleteFilm)

    clear.addEventListener('click', clearAllFilms)
}

function addFilm(e) {
    const title = titleElement.value
    const director = directorElement.value
    const url = urlElement.value

    UI.clearInputs(titleElement, urlElement, directorElement)

    if (title === '' || director === '' || url === '') {
        UI.displayMessages('Tüm Alanları Doldurun', 'danger')
    } else if (checkFilmByName(title)) {
        UI.displayMessages('Bu Film Zaten Mevcut', 'danger', 2000)
    } else {
        const newFilm = new Film(title, director, url)
        UI.addFilmToUI(newFilm)
        Storage.addFilmToStorage(newFilm)
        UI.displayMessages('Film Başarıyla Eklendi', 'success')
    }

    e.preventDefault()
}

function deleteFilm(e) {

    if (e.target.id === 'delete-film') {
        UI.deleteFilmFromUI(e.target)
        Storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent)
        UI.displayMessages('Film Başarıyla Silindi', 'success')
    }
}

function clearAllFilms() {

    if (confirm('Tüm Filmleri Silmek İstediğinize Emin Misiniz?')) {
        UI.clearAllFilmsFromUI()
        Storage.clearAllFilmsFromStorage()
    }
}

function checkFilmByName(title) {
    const storedFilms = Storage.getFilmsFromStorage()
    return storedFilms.some((lsFilms)=>{
        return lsFilms.title == title
    })
}