// Packages
const fs = require('fs');

// Modal
const productModel = new (require('../Models/product'))();

// Configs
const fileManager = new (require('./../Configs/fileManager'))();
const { PATHS } = require('./../Configs/constants')

class ProductsController {
    async add(req, res) {
        try {
            // Read data from json
            fs.readFile('Assets/Temp/Original/' + req.body.products[0], 'utf8', async (error, productData) => {
                if (productData) {
                    productData = JSON.parse(productData);

                    // Add Product data
                    await productModel.add(productData);

                    // Remove files from location
                    fileManager.removeFile(req.body.products[0], PATHS.IMAGES.TEMP + PATHS.IMAGES.ORIGINAL)
                }
            });

            res.handler.success();
        } catch (error) {
            res.handler.serverError(error)
        }
    }

    async list(req, res) {
        try {
            let data = await productModel.list(req.body);

            res.handler.success(data);
        } catch (error) {
            res.handler.serverError(error)
        }
    }
}

module.exports = ProductsController;