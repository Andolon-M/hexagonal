// Implementa la lógica de negocio y coordina las interacciones entre el dominio y la infraestructura.
const ProductsRepository = require('../../domain/repositories/ProductsRepository');

class ProductsService {
    constructor() {
        this.ProductsRepository = new ProductsRepository();
    }

    async getProductsById(id) {
        const Products = await this.ProductsRepository.getById(id);
        if (!Products) {
            throw new Error(JSON.stringify({status: 404, message: 'Products not found'}));
        }
        return Products;
    }

    async createProducts(data) {
        // Puedes agregar validaciones o lógica adicional aquí antes de guardar
        return await this.ProductsRepository.save(data);
    }

    async updateProducts(id, data) {
        const updatedProducts = await this.ProductsRepository.updateById(id, data);
        if (!updatedProducts) {
            throw new Error(JSON.stringify({status: 404, message: 'Products not found or could not be updated'}));
        }
        return updatedProducts;
    }

    async deleteProducts(id) {
        const deletedProducts = await this.ProductsRepository.deleteById(id);
        if (!deletedProducts) {
            throw new Error(JSON.stringify({status: 404, message: 'Products not found or could not be deleted'}));
        }        
        return deletedProducts;
    }
    
    async searchProductssByName(name) {
        return await this.ProductsRepository.searchByName(name);
    }
}

module.exports = ProductsService;