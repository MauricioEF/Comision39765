
export default class CreateProductDTO {
    constructor(product) {
        this.title = product.title,
        this.price = product.price,
        this.description = product.description || 'Sin descripción',
        this.categories = product.categories
    }
}