/* eslint import/no-extraneous-dependencies: ["off"] */
const electron = require('electron');
const path = require('path');
const search = require('./lib/search');
const set = require('./lib/set');
const error = require('./lib/error');
const cacheSize = require('./lib/cacheSize');
const clearCache = require('./lib/clearCache');
const saveCollection = require('./lib/saveCollection');
const readCollection = require('./lib/readCollection');

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

ipcMain.on('get-cache-size', (event) => {
  cacheSize().then((data) => {
    event.sender.send('cache-size-result', data);
  }).catch((err) => {
    error(err);
  });
});

ipcMain.on('clear-cache', (event, category) => {
  clearCache(category).then(() => {
    cacheSize().then((data) => {
      event.sender.send('cache-size-result', data);
    }).catch((err) => {
      error(err);
    });
  }).catch((err) => {
    error(err);
  });
});

ipcMain.on('save-collection', (event, collection) => {
  saveCollection(collection).then(() => {
    event.sender.send('collection-saved');
  }).catch((err) => {
    error(err);
  });
});

ipcMain.on('request-collection', (event) => {
  readCollection().then((collection) => {
    event.sender.send('load-collection', collection);
  }).catch((err) => {
    error(err);
  });
});
