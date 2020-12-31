import fs from 'fs'
import path from 'path'

const isFile = path => fs.statSync(path).isFile()
const isDirectory = path => fs.statSync(path).isDirectory()

export const getSubDirsOfDir = dir =>
    fs.readdirSync(dir).filter(elem => isDirectory(path.join(dir, elem)))

/**
 * 
 * @returns 
        '005-001': require('../../content/audios/phrases/005-001.mp3'),
        '005-002': require('../../content/audios/phrases/005-002.mp3'),
        '005-003': require('../../content/audios/phrases/005-003.mp3'),
 */
export const getFileMapOfDir = dir =>
    fs
    .readdirSync(dir)
    .filter(elem => isFile(path.join(dir, elem)))
    .reduce((prev, elem) => {
        const fileId = elem.replace(/\.[^.]+$/, '')
        const filePath = `../../${dir}/${elem}`
            // path.join('../../', dir, elem) -- causes error on windows:
            // the only valid numeric escape in strict mode is '\0'

        return prev + `"${fileId}": require("${filePath}"), `
    }, '')

export const getFilesOfDir = dir =>
    fs.readdirSync(dir).filter(elem => isFile(path.join(dir, elem)))

export const writeFileSyncRecursive = (filename, content, charset) => {
    const folders = filename.split(path.sep).slice(0, -1)
    folders.forEach((elem, index, array) => {
        const folderPath = path.join(...array.slice(0, index + 1))
        fs.mkdirSync(folderPath, { recursive: true })
    })
    fs.writeFileSync(filename, content, charset)
}