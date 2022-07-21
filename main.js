//app handles the event lifecycle of the electron app
// BrowserWindow takes care of the creating and managing application windows
const { app, BrowserWindow, Menu, ipcMain, dialog, webContents, Notification } = require('electron')
const { isMac, freeMem } = require('./utils/osUtil');
require('electron-reload')(__dirname);
const path = require('path');
const { menuTemplate } = require('./utils/menu.utils');

isMac ? menuTemplate.unshift({label:''}) : null
const mainMenu = Menu.buildFromTemplate(menuTemplate)
Menu.setApplicationMenu(mainMenu)

const createWindow = () => {
    //creating new browser window instance using BrowserWindow class
    //specifying width and height of the window
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
          devTools: true,
          preload: path.join(__dirname, 'preload.js')
        }
      });

      //this handle() is not called until the invoke() is called on the preload.js.
      // ipcMain.handle('book',() => 'Coding Book')

      ipcMain.handle('openFile', async () => {
        const { canceled, filePaths } = await dialog.showOpenDialog()
        if(canceled)
          return
        else
          return filePaths[0]
      })
      
      //saying to the win object that load this HTML file to the window
      win.loadFile('index.html')
      // win.webContents.openDevTools()

      //Build menu from the template
      const mainMenu = Menu.buildFromTemplate(menuTemplate)
      
      //set Menu to the App
      Menu.setApplicationMenu(mainMenu)
      //webContents is an object of
      // console.log(webContents.getAllWebContents())

      const notification = new Notification({
        title: "Testing Notifcation",
        subtitle: "Subtitle of the notification",
        body: "Wow, this notification is created by electron"
      })
      notification.show()
      notification.on('show',(event)=>{
        console.log('checking show')
        console.log(event)
      })
      
}

app.whenReady().then(() => {
    createWindow()
});

//Defining Menu


//View this in Terminal
// console.log(`Hello from Electron 👋`)