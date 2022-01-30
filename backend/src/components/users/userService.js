import { logger } from '../../helpers/logger';
import { hashPassword } from '../auth/authService';

const { Op } = require('sequelize');

const models = require('../../models');

export async function getUserList(option) {
    try {
        const offset = (+option.page - 1) * +option.limit;
        const result = await models.User.findAndCountAll({
            offset,
            limit: +option.limit,
            where: {
                [Op.or]: [
                    {
                        fullName: {
                            [Op.like]: `%${option.keyword}%`,
                        },
                    },
                    {
                        email: {
                            [Op.like]: `%${option.keyword}%`,
                        },
                    },
                ],
            },
            order: [[option.orderBy, option.order]],
            attributes: [
                'id',
                'fullName',
                'phone',
                'email',
                'birthday',
                'gender',
            ],
        });
        return { userList: result.rows, totalItems: result.count };
    } catch (error) {
        logger.error(`Error in getUserList ${error.message}`);
        throw error;
    }
}

export async function createUser(user) {
    try {
        user.password = hashPassword(user.password);
        const result = await models.User.create(user);
        delete result.dataValues.password;
        return result;
    } catch (error) {
        logger.error(`Error in creatUser ${error.message}`);
        throw error;
    }
}

export async function getDeltailUser(id) {
    try {
        const user = await models.User.findByPk(id, {
            attributes: [
                'id',
                'fullName',
                'phone',
                'email',
                'birthday',
                'gender',
            ],
        });
        return user;
    } catch (error) {
        logger.error(`Error in getDeltailUser ${error.message}`);
        throw error;
    }
}

export async function updateUser(id, user) {
    try {
        await models.User.update(user, {
            where: {
                id,
            },
        });
        const result = await models.User.findByPk(id, {
            attributes: [
                'id',
                'fullName',
                'phone',
                'email',
                'birthday',
                'gender',
            ],
        });
        return result;
    } catch (error) {
        logger.error(`Error in updateUser ${error.message}`);
        throw error;
    }
}

export async function updateUserPassword(id, newPassword) {
    try {
        const password = hashPassword(newPassword);
        await models.User.update(password, {
            where: {
                id,
            },
        });
    } catch (error) {
        logger.error(`Error in updateUserPassword ${error.message}`);
        throw error;
    }
}

export async function deleteUserById(id) {
    try {
        const result = await models.User.findByPk(id, {
            attributes: [
                'id',
                'fullName',
                'phone',
                'email',
                'birthday',
                'gender',
            ],
        });
        await models.User.destroy({
            where: {
                id,
            },
        });
        return result;
    } catch (error) {
        logger.error(`Error in deleteUser ${error.message}`);
        throw error;
    }
}
