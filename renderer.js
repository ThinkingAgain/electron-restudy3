
const information = document.getElementById('info')
information.innerText = `Chrome (v${versions.chrome()}), Node.js(v${versions.node()}), Electron(v${versions.electron()})`

const func = async () => {
    const response = await window.versions.ping()

    console.log(response)
    //alert(response)
}

func()




const saveButton = document.getElementById('btn')
const contentInput = document.getElementById('content')




saveButton.addEventListener('click', () => {
    const content = contentInput.value
    window.versions.save(content)
})

const loadContent =  async () => {
    const content = await window.versions.load()
    console.log(content)
    contentInput.value = content
    /*const data =  await window.versions.load()
    console.log(data)
    contentInput.value = data*/


}

loadContent()