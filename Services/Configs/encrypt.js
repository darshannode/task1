const crypt = require('crypto');
const bcrypt = require('bcrypt');
const algo = process.env.ENCRYPTION_ALGORITHM;
const key = process.env.ENCRYPTION_KEY;


class EncryptionHandler {

    encrypt(data) {

        try {
            let mykey = crypt.createCipher(algo, key);
            let mystr = mykey.update(data, 'utf8', 'hex')
            mystr += mykey.final('hex');
            return {
                status: 200,
                data: mystr
            }
        } catch (error) {
            return {
                status: 500,
                error: error
            }
        }
    }

    decrypt(data) {
        try {
            const dcypher = crypt.createDecipher(algo, key);
            var decrypted_data = dcypher.update(data.trim(), 'hex', 'utf8') + dcypher.final('utf8');

            return {
                status: 200,
                data: JSON.parse(decrypted_data)
            }
        } catch (error) {
            return {
                status: 500,
                error: error
            }
        }
    }

        /* 
        * Encrypt Entity
        */
        encryptEntity(entity) {
            return bcrypt.hashSync(entity.toString(), bcrypt.genSaltSync(parseInt(process.env.BCRYPT_SALT_ROUNDS)), null);
        }

        /* 
        * Compare Encrypt Entity
        */
        compareEncryptEntity(entity, encryptEntity) {
            return bcrypt.compareSync(entity, encryptEntity);
        }
}

module.exports = EncryptionHandler