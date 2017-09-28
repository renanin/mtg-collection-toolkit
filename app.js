/* eslint import/no-extraneous-dependencies: ["off"] */
const electron = require('electron');
const path = require('path');
const search = require('./lib/search');
const set = require('./lib/set');
const error = require('./lib/error');

const { app } = electron;
const { BrowserWindow } = electron;
const { ipcMain } = electron;

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

ipcMain.on('search', (event, name) => {
  search(name).then((results) => {
    event.sender.send('search-result', results);
  }).catch((err) => {
    error(err);
  });
});

ipcMain.on('set', (event, data) => {
  set(data.code, data.name).then((results) => {
    event.sender.send('set-result', results);
  }).catch((err) => {
    error(err);
  });
});
