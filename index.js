const fs = require('fs');
const p = require('path');
const filterLog = require('./filter-log.js')

const util = {
  dir(filePath) {
    return new Promise((resolve, reject)=>{
      fs.readdir(filePath, (error, fileList) => {
        if (error) return reject(error)
        resolve(fileList)
      })
    })
  },
  read(dir) {
    return new Promise((resolve, reject) => {
      fs.readFile(dir, 'utf-8', (e, content)=>{
        const result = filterLog(content)
        if (!result) return reject('文件内容为空')
        resolve(result)
      })
    })
  },
  write(dir, result) {
    return new Promise((resolve, reject) => {
      fs.writeFile(dir, result, 'utf8', (error)=>{
        if (error) return reject(error)
        resolve()
      })
    })
  }
}

function clearLog(...pathList) {
  pathList = pathList || ['src']
  pathList.forEach(async path => {
    const filePath = p.resolve(path);
    const fileList = await util.dir(filePath)
    fileList.forEach(fileName => {
      const fileDir = p.join(filePath, fileName)
      // stat: get file information
      fs.stat(fileDir, async (err, state) => {
        if (err) return console.log(err)

        const isFile = state.isFile()
        const isDir = state.isDirectory()

        if (isFile) {
          const result = await util.read(fileDir)
          await util.write(fileDir, result)
        } else if (isDir) {
          clearLog(fileDir)
        }
      })
    })
  })
}

module.exports.clearLog = clearLog