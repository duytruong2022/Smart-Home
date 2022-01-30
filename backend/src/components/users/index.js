import { authenticate } from '../../middleware/auth';
import {
    getList,
    create,
    update,
    deleteUser,
    getDetail,
    updatePassword,
} from './userController';
import {
    getUserListValidator,
    createValidator,
    userIdValidator,
    updateValidator,
    updatePasswordValidator,
    idValidaytor,
} from './userValidator';
import { checkEmailExist, checkUserExist } from './userMiddleware';

const express = require('express');

module.exports = (app) => {
    const router = express.Router();
    router.get('/', getUserListValidator, getList);
    router.post('/', authenticate(), createValidator, checkEmailExist, create);
    router.get(
        '/:id',
        authenticate(),
        idValidaytor,
        userIdValidator,
        getDetail,
    );
    router.patch(
        '/:id',
        authenticate(),
        idValidaytor,
        updateValidator,
        checkUserExist,
        update,
    );
    router.patch(
        '/:id/password',
        authenticate(),
        idValidaytor,
        updatePasswordValidator,
        checkUserExist,
        updatePassword,
    );
    router.delete('/:id', authenticate(), idValidaytor, checkUserExist, deleteUser);
    app.use('/api/user', router);
};
