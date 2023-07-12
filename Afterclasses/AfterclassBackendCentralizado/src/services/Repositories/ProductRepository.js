import Product from "../../dao/models/products.model.js";
import BaseRepository from "./BaseRepository.js";

export default class ProductRepository extends BaseRepository{
    constructor(dao) {
        super(dao,Product.collection);
    }
}