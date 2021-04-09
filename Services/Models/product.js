// Schemas
const productSchema = require('../Database/Schemas/products');

class Product {
    async add(data) {
        return await productSchema.insertMany(data);
    }

    async list(data) {
        let searchText = data.searchText;
        let currentPage = data.currentPage || 1;

        let count = await productSchema.count({
            name: { $regex: `.*${searchText}.*` }
        });

        let products = await productSchema.aggregate([{
            $match: {
                $and: [
                    { name: { $regex: `.*${searchText}.*` } },
                ]
            }
        }, {
            $skip: ((currentPage - 1) * PAGE_SIZE),
        }, {
            $limit: (PAGE_SIZE)
        }])

        return { rows: products, count }
    }
}

module.exports = Product;