const os = require('node:os');

//for macOS
const isMac = process.platform === 'darwin'
const freeMem = os.freemem()

module.exports = {
    isMac,
    freeMem
}