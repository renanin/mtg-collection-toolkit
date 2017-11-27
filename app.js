/* eslint import/no-extraneous-dependencies: ["off"] */
const electron = require('electron');
const path = require('path');

const { app } = electron;
const { BrowserWindow } = electron;

let win;

function createWindow() {
  win = new BrowserWindow({
    title: 'MTG Collection Toolkit',
  });
  win.loadURL(`file://${path.join(__dirname, 'index.html')}`);
  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
