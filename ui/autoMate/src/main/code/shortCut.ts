import { BrowserWindow, IpcMainInvokeEvent } from "electron"
import { ipcMain } from "electron"
const { app, globalShortcut } = require('electron')

const config = {
  search: ""
}
export const registerShortCut = (win: BrowserWindow) => {

  ipcMain.handle("shortCut", (_event: IpcMainInvokeEvent, type: 'search', shortCut: string) => {
    // react 严格模式会执行两次，可能会导致快捷键重复注册，这里在注册前会删除旧快捷键
    if (config.search) globalShortcut.unregister(config.search)
    switch(type){
      case 'search':
        return registerSearchShortCut(shortCut, win)
    }
  })
}

function registerSearchShortCut(shortCut: string, win: BrowserWindow){
  return globalShortcut.register(shortCut, () => {
    win.isVisible() ? win.hide() : win.show()
  })
}
app.on('will-quit', () => {
  // Unregister all shortcuts.
  globalShortcut.unregisterAll()
})