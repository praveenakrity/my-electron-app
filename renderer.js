const hi = document.getElementById('hi');
hi.innerText = electron.sayHi('Keshav');
const bBtn = document.getElementById('submit_book');
const openNot = document.getElementById('openNot')

const openFile = document.getElementById('openFile')

openFile.addEventListener('click', async () => {
    const filePath = await window.fileApi.openFile()
    console.log(filePath)
    document.getElementById('filename').innerText = filePath
})

const getBookClub = async () => {
    //this window global is shared by the preload.js to the renderer process, however.
    const bookName = document.getElementById('bookName')
    const bookList = document.getElementById('bookClub')
    // const response = await window.electron.bookClub(bookName)
    const li = document.createElement('li')
    li.appendChild(document.createTextNode(bookName.value))
    bookList.appendChild(li)
}

const showNames = () => {
    console.log(window.electron.namesArray)
    const app = document.getElementById('app')
    app.innerText = window.electron.namesArray.join(', ')
}

showNames()

bBtn.addEventListener('click',getBookClub)

const newWindow = async () => {
    const result = await window.electron.newWin()
    console.log(result)
}

const newWin = document.getElementById('new-win');
newWin.addEventListener('click', newWindow)