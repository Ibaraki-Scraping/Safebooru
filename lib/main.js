"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = require("path");
function createWindow() {
    const win = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        icon: path.join(__dirname, '../htdocs/icon.png'),
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            preload: path.join(__dirname, '../htdocs/preload.js')
        }
    });
    //win.setMenu(null);
    win.maximize();
    win.loadFile(path.join(__dirname, '../htdocs/index.html'));
}
electron_1.app.whenReady().then(() => {
    createWindow();
    electron_1.app.on('activate', () => {
        if (electron_1.BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
