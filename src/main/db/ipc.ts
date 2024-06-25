import { IpcMainInvokeEvent, dialog, ipcMain } from "electron";
import * as query from './query'
import { initTable } from "./tables";
ipcMain.handle('sql', (_event: IpcMainInvokeEvent, sql: string, type: SqlActionType, params={}) => {
    return query[type](sql, params)
})


ipcMain.handle('selectDatabaseDirectory', async () => {
    const ret  = await dialog.showOpenDialog({
        title: "选择目录",
        properties: ['openDirectory', 'createDirectory']
    })
    return ret.canceled?'' : ret.filePaths[0]
})


ipcMain.on('initTable', () => {
    initTable()
})
