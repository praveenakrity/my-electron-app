//app handles the event lifecycle of the electron app
// BrowserWindow takes care of the creating and managing application windows
const { app, BrowserWindow, Menu, ipcMain, dialog, webContents } = require('electron')
require('electron-reload')(__dirname);
const path = require('path')

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


      ipcMain.handle('newWin',() => {
        const win = new BrowserWindow({
          width: 800,
          height: 600,
          webPreferences: {
            devTools: true,
            preload: path.join(__dirname, 'preload.js')
          }
        })
        win.loadURL('new.html')
      })
      
      //saying to the win object that load this HTML file to the window
      win.loadFile('index.html')
      win.webContents.openDevTools()

      //Build menu from the template
      const mainMenu = Menu.buildFromTemplate(menuTemplate)
      
      //set Menu to the App
      Menu.setApplicationMenu(mainMenu)
      //webContents is an object of
      // console.log(webContents.getAllWebContents())
}

app.whenReady().then(() => {
    createWindow()
});

//Defining Menu
menuTemplate = [
  {
    label: 'File',
    submenu: [{
      label: 'Add Item',
    },
    {
      label: 'Clear Items',
    },
    {
      label: 'Quit',
      accelerator: 'CmdOrCtrl+Q',
      click: () => {
        app.quit()
      }
    }
  ]
  },
  {
    label: 'Edit'
  },
  {
    label: 'View'
  },
]

//View this in Terminal
// console.log(`Hello from Electron 👋`)