var crypto = require('crypto');

var algorithm = 'aes-256-ctr';
var password = '12345678';

function createCipherKey(secret) {
	return crypto.createHash('md5').update(secret).digest('hex');
}
function encrypt(buffer) {
	var cipherKey = createCipherKey(password);
	// Create an iv
	var iv = crypto.randomBytes(16);
	// Create a new cipher
	var cipher = crypto.createCipheriv(algorithm, cipherKey, iv);
	// Create the new chunk
	var result = Buffer.concat([iv, cipher.update(buffer), cipher.final()]);
	return result;
}

function decrypt(buffer) {
	var cipherKey = createCipherKey(password);
	// Get the iv: the first 16 bytes
	var iv = buffer.slice(0, 16);
	// Get the rest
	var newBuffer = buffer.slice(16);
	// Create a decipher
	var decipher = crypto.createDecipheriv(algorithm, cipherKey, iv);
	// Actually decrypt it
	var result = Buffer.concat([decipher.update(newBuffer), decipher.final()]);
	return result;
}

module.exports = {
	encrypt,
	decrypt
};