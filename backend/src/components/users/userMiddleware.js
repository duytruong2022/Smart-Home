import i18n from 'i18n';
import { respondWithError } from '../../helpers/messageResponse';
import { ErrorCodes } from '../../helpers/constants';

const models = require('../../models');

export async function checkUserExist(req, res, next) {
    const userId = req.params.id;
    const user = await models.User.findByPk(userId);
    if (!user) {
        res.json(
            respondWithError(
                ErrorCodes.ERROR_CODE_ID_NOT_FOUND,
                i18n.__('Id not found'),
                {},
            ),
        );
        return;
    }
    next();
}

export async function checkEmailExist(req, res, next) {
    const { email } = req.body;
    const user = await models.User.findOne({
        where: {
            email,
        },
    });
    if (user) {
        res.json(
            respondWithError(
                ErrorCodes.ERROR_CODE_EMAIL_IS_EXIST,
                i18n.__('Email is exist'),
                {},
            ),
        );
        return;
    }
    next();
}
