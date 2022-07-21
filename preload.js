/*
  Preload scripts contain code that runs in a renderer process before its web content is loaded.
  These scripts run within the renderer context, but are granted more privileges as they've access to Node.js APIs.
*/

//importing or requiring context bridge to create a bridge
const {contextBridge} = require('electron');
const { ipcRenderer } = require('electron/renderer');

//Here, we're saying that expose some values, properties, etc to the main world of the application
// that is main process
// the electron name here,
//in the first argument, is nothing but a string that is the name of the API
// or the things we are exporting/exposing to the main or render process
//it's called API key or Name and the object is called API
contextBridge.exposeInMainWorld('electron', {
    sayHi : (username) => `Hi ${username}`,
    //invoke means call a channel
    bookClub : (bookName) => bookName,
    newWin : () => ipcRenderer.invoke('newWin'),
    namesArray: ['Praveen','Kumar','Suresh','Rajesh']
});

contextBridge.exposeInMainWorld('fileApi',{
  openFile : () => ipcRenderer.invoke('openFile')
})


const username = () => {
    document.getElementById('name').innerText = "Praveen";
}

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector);
      if (element) element.innerText = text;
    }
    for (const dependency of ['chrome', 'node', 'electron']) {
      replaceText(`${dependency}-version`, process.versions[dependency]);
    }
    username();
});

