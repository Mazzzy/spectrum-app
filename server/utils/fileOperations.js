const fs = require('fs');
class FileOperations {
  constructor(filePath) {
    this.filePath = filePath;
  }

  readFile(callback, returnJson = false, encoding = 'utf8') {
    fs.readFile(this.filePath, encoding, (err, data) => {
      if (err) {
          throw err;
      }

      callback(returnJson ? JSON.parse(data) : data);
    });
  }

  writeFile(fileData, callback, encoding = 'utf8') {
    fs.writeFile(this.filePath, fileData, encoding, (err) => {
      if (err) {
          throw err;
      }

      callback();
    });
  }
}

module.exports = FileOperations;