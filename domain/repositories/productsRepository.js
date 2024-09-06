// Contiene la interfaz para interactuar con la base de datos o cualquier otro tipo de almacenamiento de datos.
const Products = require('../models/productsModel')

class ProductsRepository {
    async getById(id) {
        try {
            const Products = new Products();
            return await Products.findById(id);
        } catch (error) {
            throw new Error(JSON.stringify({status: 400, message: 'Error retrieving Products'}));
        }
    }

    async save(ProductsData) {
        try {
            const Products = new Products();
            return await Products.insert(ProductsData);
        } catch (error) {
            throw new Error(JSON.stringify({status: 500, message: 'Error saving Products'}));
        }
    }

    async updateById(id, updateData) {
        try {
            const Products = new Products();
            // { upsert: true } // Si es verdadero, inserta un nuevo documento si no existe
            return await Products.findByIdAndUpdate(id, updateData, { upsert: true });
        } catch (error) {
            throw new Error(JSON.stringify({status: 500, message: 'Error updating Products'}));
        }
    }

    async deleteById(id) {
        try {
            const Products = new Products();
            return await Products.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(JSON.stringify({status: 404, message: 'Error deleting Products'}));
        }
    }

    async searchByName(name) {
        try {
            return await Products.find({ name: new RegExp(name, 'i') });
        } catch (error) {
            throw new Error('Error searching for Productss');
        }
    }
}

module.exports = ProductsRepository;