const crypto = require('crypto');
const randomBytes = crypto.randomBytes(1);
console.log('Random Bytes:', randomBytes.toString('hex'));
