import Business from "../../dao/models/business.model.js";
import BaseRepository from "./BaseRepository.js";

export default class BusinessRepository extends BaseRepository {
    constructor(dao) {
        super(dao,Business.collection);
    }
}