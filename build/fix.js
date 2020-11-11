/**
 * 修复 node_modules 源码的bug
 */
const fs = require('fs');
const SOCK_FILE = 'node_modules/sockjs-client/dist/sockjs.js';

(function fixsockjs() {
    try {
        let content = fs.readFileSync(SOCK_FILE, 'utf-8')
        if (content.includes('/*flag*/')) {
            return
        }
        // 破解gojs
        const flag = 'self.xhr.send(payload);'
        const index = content.indexOf(flag)
        if (index > 0) {
            content = content.replace(flag, `/*flag*/`)
            fs.writeFileSync(SOCK_FILE, content, 'utf-8')
        } else {
        }
    } catch (e) {
    }
}())
