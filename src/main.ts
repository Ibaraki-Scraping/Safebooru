import { app, BrowserWindow, dialog } from 'electron';
import * as path from 'path';

function createWindow () {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      icon: path.join(__dirname, '../htdocs/icon.png'),
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        preload: path.join(__dirname, '../htdocs/preload.js')
      }
    })
  
    //win.setMenu(null);
    win.maximize();
    win.loadFile(path.join(__dirname, '../htdocs/index.html'))
}
  
app.whenReady().then(() => {
    createWindow()
  
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
      }
    })
})
  
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
})