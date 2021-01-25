const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const url = require('url')
const fs = require('fs')
const path = require('path')

let win

function createWindow() {

    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.loadFile('./dist/index.html');
    //abbiamo inserito questo per poter vedere eventuali eccezioni sollevate
    mainWindow.webContents.openDevTools();

}

app.whenReady().then(createWindow).catch((err) => {
    console.log(err);
});