const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')
const fs = require('fs')
const fsp = require('fs/promises')

const file = "./file/test.txt"

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    win.loadFile('index.html')


}

const saveFile = (event, content) => {

    fs.writeFile(file, content, err => {
        if(err) {
            console.log("save file Fail")
            return;
        }
        console.log("Successful!")
    })
}

const loadFile =   async () => {
    /*const content = fs.readFileSync(file)
    console.log(content.toString())
    return content.toString()*/

    const content = await fsp.readFile(file, {encoding: 'utf8'})

    console.log(content)
    return content



}




app.whenReady().then(() => {
    ipcMain.handle('ping', () => 'pong')
    ipcMain.on('saveFile', saveFile)
    ipcMain.handle('loadFile', loadFile)

    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') {
            app.quit()
        }
    })

})