const fs = require('fs');
const path = require('path');
const multer = require('multer');
const sharp = require('sharp')

const { PATHS } = require('./constants')


/* 
    When any request comes images are first uploaded to TEMP > ORIGINAL folder.
    As of now Images are uploaded to local folder to simulate cloud uploads.
    It is assumed default file will be in respective folder as `default.jpg`.

    keywords :
    primary : primary path /Users
    secondary : /Original, /Thumb

*/

class FileManager {

    constructor() {
        this.imageResizeResolution = parseInt(process.env.IMAGE_RESIZE_RESOLUTION)
    }

    //CREATE FILE NAME
    getFileName(file) {
        return file.originalname.split('.')[0].replace(/[^A-Z0-9]/ig, "_") + '_' + Date.now() + '_' + Math.floor(Math.random() * 999) + 99 + path.extname(file.originalname)
    }

    resolvePath(filePath) {
        // BASE FOLDER
        return path.join(__dirname, "./../Assets" + filePath + "//")
    }

    upload() {
        let storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, this.resolvePath(PATHS.IMAGES.TEMP + PATHS.IMAGES.ORIGINAL))
            }.bind(this),

            filename: function (req, file, cb) {
                let fileName = this.getFileName(file)
                if (!req.body[file.fieldname]) {
                    req.body[file.fieldname] = []
                    req.body[file.fieldname].push(fileName)
                } else
                    req.body[file.fieldname].push(fileName)
                cb(null, fileName)
            }.bind(this)
        })

        return multer({ storage });
    }

    async uploadToCloud(fileName, primary, secondary) {
        if (!fileName) return;

        // FILE UPLOAD LOGIC
        // CURRENTLY IT"S LOCAL
        if (Array.isArray(fileName)) {
            // UPLOAD MULTIPLE
        }
        else {
            // SINGLE

            // REMOVE RESOLVE PATH FROM CLOUD WHEN WE INTEGRATE CLOUD
            fs.rename(this.resolvePath(PATHS.IMAGES.TEMP + secondary) + fileName, this.resolvePath(primary + secondary) + fileName, (err) => {
                if (err) throw err;
            });
        }
    }

    createThumb(fileName) {
        if (fileName) {
            let localPath = PATHS.IMAGES.TEMP + PATHS.IMAGES.ORIGINAL,
                thumbPath = PATHS.IMAGES.TEMP + PATHS.IMAGES.THUMB;

            return new Promise((resolve, reject) => {
                sharp(this.resolvePath(localPath) + fileName)
                    .resize(this.imageResizeResolution, this.imageResizeResolution)
                    .toFile(this.resolvePath(thumbPath) + fileName, async function (err, info) {
                        if (err) reject(err);
                        resolve()
                    })
            })
        }
    }

    async createImageLink(fileName, primary, secondary) {
        // AWAIT FOR FUTURE USE
        // AS WE WILL MOVE FILE LINK GENERATION TO CLOUD
        let image = await this.checkFileExists(fileName, primary + secondary) ? `${primary + secondary}/${fileName}` : `${primary}/default.jpg`
        return await `${(process.env.SHOULD_RUN_ON_HTTP) ? "http" : "https"}://${process.env.HOST}:${process.env.PORT}${image}`
    }

    async checkFileExists(fileName, cloudPath) {
        return (fileName) ? fs.existsSync(this.resolvePath(cloudPath) + fileName) : false;
    }

    async removeFile(fileName, path) {
        try {
            if (!fileName) return;
            await fs.unlink(this.resolvePath(path) + fileName, function (err) {
                if (err) console.log("Error while removing file", err);
            })
            return;
        } catch (error) {
            console.log("FileManager -> removeFile -> removeFile", error)
        }
    }

    /* UTILS */
    async createImageLinkMultiple(array, key, originalKey, primary) {
        let original = PATHS.IMAGES.ORIGINAL,
            thumb = PATHS.IMAGES.THUMB,
            promises = [];

        array.forEach(element => {
            promises.push(this.createImageLink(element[key], primary, thumb))
            promises.push(this.createImageLink(element[key], primary, original))
        });

        let images = await Promise.all(promises);

        for (let imageIndex = 0, arrayIndex = 0; imageIndex < images.length; arrayIndex++) {
            array[arrayIndex][key] = images[imageIndex]
            array[arrayIndex][originalKey] = images[imageIndex + 1]

            imageIndex += 2
        }

        return array;
    }

    async createImageLinkMultipleWithObject(array, ObjKey, key, originalKey, primary) {
        let original = PATHS.IMAGES.ORIGINAL,
            thumb = PATHS.IMAGES.THUMB,
            promises = [];

        array.forEach(element => {
            promises.push(this.createImageLink(element[ObjKey][key], primary, thumb))
            promises.push(this.createImageLink(element[ObjKey][key], primary, original))
        });

        let images = await Promise.all(promises);

        for (let imageIndex = 0, arrayIndex = 0; imageIndex < images.length; arrayIndex++) {
            array[arrayIndex][ObjKey][key] = images[imageIndex]
            array[arrayIndex][ObjKey][originalKey] = images[imageIndex + 1]

            imageIndex += 2
        }

        return array;
    }

    async createThumbAndUploadToCloud(fileName, primary) {
        // RESIZE 
        await this.createThumb(fileName)

        // UPLOAD IMAGE TO S3 (Now Local)
        await Promise.all([
            this.uploadToCloud(fileName, primary, PATHS.IMAGES.ORIGINAL),
            this.uploadToCloud(fileName, primary, PATHS.IMAGES.THUMB)
        ])

        return true;
    }
}

module.exports = FileManager