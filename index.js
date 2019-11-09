const { app, BrowserWindow, dialog, Menu } = require('electron');
const Settings = require('electron-store');
const windowState = require('electron-window-state');
const path = require('path');
const url = require('url');

const settings = new Settings();
let mainWindow;

app.on('ready', () => {
    let mainWindowState = windowState({
        defaultWidth: 400,
        defaultHeight: 600
    });

    mainWindow = new BrowserWindow({
        x: mainWindowState.x,
        y: mainWindowState.y,
        width: mainWindowState.width,
        height: mainWindowState.height,
        minWidth: 400,
        minHeight: 200,
        backgroundColor: (settings.get('dark')) ? '#292929' : '#FFFFFF',
        title: process.env.npm_package_build_productName,
        titleBarStyle: 'hiddenInset',
        webPreferences: {
            nodeIntegration: true
        }
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    mainWindow.webContents.on('will-navigate', (event) => {
        event.preventDefault();
    });

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:'
    }));

    mainWindowState.manage(mainWindow);

    Menu.setApplicationMenu(Menu.buildFromTemplate([
        {
            label: 'File',
            submenu: [
                { label: `About ${ process.env.npm_package_build_productName }`, click() {
                    dialog.showMessageBox({
                        message: process.env.npm_package_build_productName
                                + ' v' + process.env.npm_package_version + '.\n'
                                + process.env.npm_package_build_copyright + '.'
                    });
                }},
                { label: `View License`, click() {
                    dialog.showMessageBox({
                        message: JSON.stringify(settings.get('license.data'))
                    });
                }},
                { type: "separator" },
                { label: 'Quit', accelerator: 'CmdOrCtrl+Q', click() { app.quit(); } },
            ]
        }, {
            label: "Edit",
            submenu: [
                { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
                { label: "Redo", accelerator: "CmdOrCtrl+Shift+Z", selector: "redo:" },
                { type: "separator" },
                { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
                { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
                { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
                { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
            ]
        }, {
            label: 'View',
            submenu: [
                {
                    label: 'Developer Tools',
                    accelerator: 'CmdOrCtrl+Option+I',
                    click() {
                        mainWindow.toggleDevTools();
                    }
                },
                {
                    label: 'Invert',
                    accelerator: 'CmdOrCtrl+I',
                    click() {
                        const isDark = settings.get('dark');
                        settings.set('dark', !isDark);
                        mainWindow.webContents.send('invert');
                    }
                }
            ]
        }
    ]));
});

app.on('window-all-closed', () => {
    app.quit();
});