//app handles the event lifecycle of the electron app
// BrowserWindow takes care of the creating and managing application windows
const { app, BrowserWindow, Menu, ipcMain, dialog, webContents, Notification, shell } = require('electron')
const path = require('path');

//custom modules
const { isMac, freeMem } = require('./utils/osUtil');
const { menutemplate } = require('./utils/menu.utils');
const { handleFile } = require('./utils/ipcHandlers/fileHandlers.utils');
const menuItems = menutemplate(app)

require('electron-reload')(__dirname);

isMac ? menuItems.unshift({label:''}) : null

const mainMenu = Menu.buildFromTemplate(menuItems)


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

      
      //saying to the win object that load this HTML file to the window
      win.loadFile('index.html')
      win.webContents.openDevTools()

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
  
    // console.log(shell.openExternal("mailto:incopraveen@gmail.com"))
}

app.whenReady().then(() => {
    createWindow()
});

//Defining Menu


//View this in Terminal
// console.log(`Hello from Electron 👋`)