//this handle() is not called until the invoke() is called on the preload.js.
      // ipcMain.handle('book',() => 'Coding Book')

const { dialog } = require("electron");


const handleFile = (ipcMain) => {ipcMain.handle('openFile', async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog()
        if(canceled)
          return
        else
          return filePaths[0]
});
}


module.exports = {
 handleFile
}