const fs = require('fs');
const p = require('path');
const filterLog = require('./filter-log.js')

const util = {
  dir(filePath) {
    return new Promise((resolve, reject) => {
      fs.readdir(filePath, (error, fileList) => {
        if (error) return reject(error)
        resolve(fileList)
      })
    })
  },
  read(dir) {
    return new Promise((resolve, reject) => {
      fs.readFile(dir, 'utf-8', (error, content) => {
        const result = filterLog(content)
        if (!result) return false
        resolve(result)
      })
    })
  },
  write(dir, result) {
    return new Promise((resolve, reject) => {
      fs.writeFile(dir, result, 'utf8', (error) => {
        if (error) return reject(error)
        resolve()
      })
    })
  }
}

async function gitFilePath(path) {
  const filePath = p.resolve(path);
  const fileList = await util.dir(filePath)
  fileList.forEach(name => {
    const fileDir = p.join(filePath, name)
    // stat: get file information
    fs.stat(fileDir, async (error, state) => {
      if (error) return console.log(error)

      const isFile = state.isFile()
      const isDir = state.isDirectory()

      if (isFile) {
        const result = await util.read(fileDir)
        await util.write(fileDir, result)
      } else if (isDir) {
        await gitFilePath(fileDir)
      }
    })
  })
}

function dirLoop(param) {
  let pathList
  if (!param || param.length === 0) {
    pathList = ['src']
  } else {
    pathList = [...param]
  }
  pathList.forEach(path => gitFilePath(path))
}

module.exports.gitFilePath = gitFilePath
module.exports.dirLoop = dirLoop
