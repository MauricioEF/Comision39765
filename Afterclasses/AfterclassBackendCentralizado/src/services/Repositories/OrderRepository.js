import Order from "../../dao/models/orders.models.js";
import BaseRepository from "./BaseRepository.js";

export default class OrderRepository extends BaseRepository {
    constructor(dao) {
        super(dao,Order.collection)
    }
}