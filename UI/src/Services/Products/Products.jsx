import Interceptors from '../Interceptors/Interceptors';

class Products {
    constructor() {
        this.interceptors = new Interceptors();
    }

    async list(data) {
        return this.interceptors.POST('products/search', data);
    }
}

export default Products;