// Variable Declaration 
const spiner = document.getElementById('spiner')
const searchTextElement = document.getElementById('input-bookname')
const bookContainer = document.getElementById('book-container')
const totalResult = document.getElementById('total-result')
const message = document.getElementById('message-text')
// search button handler
document.getElementById('button-addon2').addEventListener('click', () => {
    // input validation
    message.innerText = ''
    if (searchTextElement.value === '') {
        message.innerText = 'Input field could not be Empty'
        return
    }
    spiner.classList.remove('d-none')
    const searchText = searchTextElement.value
    loadData(searchText)
    bookContainer.innerText = ''
    totalResult.innerText = ''
})
// load data from api 
const loadData = (searchText) => {
    fetch(`https://openlibrary.org/search.json?q=${searchText}`)
        .then(res => res.json())
        .then(data => {
            console.log(data.docs)
            bookContainerUpdate(data)
        })
}
// update the dom fill the server data 
const bookContainerUpdate = (data) => {
    totalResult.innerText = `${data.numFound || 'No'} result found`
    // empty input field and spiner remove 
    spiner.classList.add('d-none')
    searchTextElement.value = ''
    data.docs.forEach((book) => {
        const div = document.createElement('div');
        div.classList.add('col-lg-4', 'mb-3');
        // single book element 
        div.innerHTML = `
        <div class="card">
            <img src=" https://covers.openlibrary.org/b/id/${book.cover_i || 10194533}-M.jpg" class="card-image" alt="Image" height="250px">
            <div class="card-body">
                <h5 class="card-title fw-bold">${book.title}</h5>
                <p class="card-text"><b>Author Name: </b>${book.author_name || ''}</p>
                <p class="card-text"><b>Published Date: </b>${book.publish_date || ''}</p>
                <p class="card-text"><b>First Published Year: </b>${book.first_publish_year || ''}</p>

            </div>
        </div>
        `
        bookContainer.appendChild(div)
    })
}