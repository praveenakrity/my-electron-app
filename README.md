# This README file covers the basics of Electron.
### While getting familiar with the nitty-gritty of Electron, this README will help you get up to speed quickly.

<h2>There are three things imporatnt to take note of:</h2>

<ul>
<li> Main process: Entry point of the electron app, often named as main.js</li>
<li> Index.html: The HTML or presentation part of the app</li>
<li> preload.js: Here, the preloader is where we write what to do and also create IPC or Inter-process communication modules that exposes and exports some functionality to the app as a whole.</li>
<li> Renderer.js: Here, we connect HTML DOM and values exposed by preload.js to show the output or simply render things.</li>
<br>
<li>
<article>
Main and renderer processes have different responsibilities, which is why, it's important to make a bridge between them and make communication process.<br>That bridge is called contextBridge.<br>
contextBridge enables to expose APIs from one process to another process.
</article>
</li>
<li> Renderer.js: Here, we connect HTML DOM and values exposed by preload.js to show the output or simply render things.</li>
</ul>
<article>
We cannot access Node.js APIs from renderer process nor we can access DOM from the main process. This is where IPC comes in: ipcHandle and ipcRenderer modules.
ipcRenderer.invoke() goes inside preload.js and ipcMain.handle goes inside main.js.
</article>
<h3> Some Links for references </h3>
<ul>
<li>https://stackoverflow.com/questions/57807459/how-to-use-preload-js-properly-in-electron</li>
<li>https://www.debugandrelease.com/the-ultimate-electron-guide/</li>
</ul>
<h3>contextIsolation</h3>

<legend>Context Isolation means preload is separate from the renderer.</legend>
<article>This is because of the security purpose. You can use contextBridge module to connect both preload and renderer.</article>

<h4>More about IPC</h4>
<article id='ipc-two-way'>
IPC is a mechanism that allows two processes to communicate with each other. In Electron, the main and renderer processes communicate by passng message through a channel, that is dev-defined. Also, known as API key.

In order to access and invoke, we need to use <code>ipcRenderer.invoke()</code> and <code>ipcMain.handle()</code>. As the name suggests, ipcMain should be in the main.js or the main process. and the renderer in the preload.js.
<br>
contextBridge and IPC work together to make the communication process.
<br>
<h5>There are two patterns to use IPC:</h5>
<ul>
    <li>Pattern 1: Renderer to main: which is a one-way</li>
        <ul>
        <li>To send a one-way message from the renderer(preload.js) to main process (main.js), <code>ipcRenderer.send</code> API is used and then received by the <code>ipcMain.on API</code></li>
        </ul>
    <li><a href='#ipc-two-way'>Pattern 2: Renderer to main: which is a two-way</a></li>
</ul>
</article>
<h3>Live Reload</h3>
<article>
In order to live reload the electron app, you need to install this module <code>npm i electron-reload</code><br>Then, require this in your main.js file:
<code>require('electron-reload')(__dirname)</code>,
For more information on reloading electron app, visit <a href='https://ourcodeworld.com/articles/read/524/how-to-use-live-reload-in-your-electron-project'>How to use live reload in your Electron Project</a>
</article>