import { Router } from 'express';
import usersModel from '../dao/mongo/models/Users.js';

const router = Router();

router.get('/', async (req, res) => {
  const { page = 1 } = req.query;
  const { docs, hasPrevPage, hasNextPage, prevPage, nextPage, ...rest } =
    await usersModel.paginate({}, { page, limit: 1000, lean: true });
  const users = docs;
  res.render('users', {
    users,
    page: rest.page,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage,
  });
});

export default router;
