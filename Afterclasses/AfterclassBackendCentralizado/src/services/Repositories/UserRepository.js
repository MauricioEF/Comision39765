import User from "../../dao/models/users.model.js";
import BaseRepository from "./BaseRepository.js";

export default class UserRepository extends BaseRepository{
    constructor(dao) {
        super(dao,User.collection);
    }
}