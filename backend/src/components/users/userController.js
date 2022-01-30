import { logSystemError, respondSuccess } from '../../helpers/messageResponse';
import { ORDER_BY, ORDER_DEFAULT } from './userConstant';
import {
    getUserList,
    createUser,
    getDeltailUser,
    updateUser,
    updateUserPassword,
    deleteUserById,
} from './userService';

export async function getList(req, res) {
    try {
        const {
            page, limit, orderBy, order, keyword,
        } = req.query;
        const option = {
            page,
            limit,
            orderBy: orderBy ?? ORDER_BY.FULL_NAME,
            order: order ?? ORDER_DEFAULT,
            keyword: keyword ?? '',
        };
        const result = await getUserList(option);
        return res.json(
            respondSuccess({
                items: result.userList,
                totalItems: result.totalItems,
            }),
        );
    } catch (error) {
        return logSystemError(res, error, 'userController - getList');
    }
}

export async function create(req, res) {
    try {
        const {
            email, password, fullname, phone, birthday, gender,
        } = req.body;
        const newUser = {
            email,
            password,
            fullname,
            phone,
            birthday,
            gender,
        };
        const user = await createUser(newUser);
        return res.json(respondSuccess(user));
    } catch (error) {
        return logSystemError(res, error, 'userController - create');
    }
}
export async function getDetail(req, res) {
    try {
        const userId = req.params.id;
        const user = await getDeltailUser(userId);
        return res.json(respondSuccess(user));
    } catch (error) {
        return logSystemError(res, error, 'userController - getDetail');
    }
}
export async function update(req, res) {
    try {
        const userId = req.params.id;
        const user = req.body;
        const userUpdate = await updateUser(userId, user);
        return res.json(respondSuccess(userUpdate));
    } catch (error) {
        return logSystemError(res, error, 'userController - update');
    }
}

export async function updatePassword(req, res) {
    try {
        const userId = req.params.id;
        const { newPassword } = req.body;
        await updateUserPassword(userId, newPassword);
        return res.json(respondSuccess());
    } catch (error) {
        return logSystemError(res, error, 'userController - update');
    }
}

export async function deleteUser(req, res) {
    try {
        const userId = req.params.id;
        const userDeleted = await deleteUserById(userId);
        return res.json(respondSuccess(userDeleted));
    } catch (error) {
        return logSystemError(res, error, 'userController - deleteUser');
    }
}
