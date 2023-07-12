
export default class ViewProductDTO {
    constructor(product) {
        this.title = product.title;
        this.description = product.description;
        this.price = product.price;
    }
}