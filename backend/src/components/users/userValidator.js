import { respondWithError } from '../../helpers/messageResponse';
import { ErrorCodes } from '../../helpers/constants';
import {
    ASC_DESC,
    DATABASE_MAX_LENGTH,
    DATABASE_MIN_LENGTH,
    PHONE,
    FULLNAME,
    EMAIL,
    PASSWORD,
    GENDER,
} from './userConstant';

const BaseJoi = require('joi');
const Extension = require('@joi/date');

const Joi = BaseJoi.extend(Extension);

const getUserListValidSchema = Joi.object().keys({
    page: Joi.number().positive().integer().required(),
    limit: Joi.number().positive().integer().max(1000)
        .required(),
    orderBy: Joi.string().max(DATABASE_MAX_LENGTH).min(DATABASE_MIN_LENGTH),
    order: Joi.string().valid(ASC_DESC.ASC, ASC_DESC.DESC),
    keyword: Joi.string().max(DATABASE_MAX_LENGTH),
});

export async function getUserListValidator(req, res, next) {
    const { query } = req;
    const result = getUserListValidSchema.validate(query);

    if (result.error) {
        res.json(
            respondWithError(
                ErrorCodes.ERROR_CODE_INVALID_PARAMETER,
                result.error.message,
                result.error.details,
            ),
        );
        return;
    }
    next();
}

const createValidSchema = Joi.object().keys({
    fullName: Joi.string().max(FULLNAME.MAX).min(FULLNAME.MIN).required(),
    phone: Joi.string().pattern(new RegExp(PHONE.REG_EXP)),
    email: Joi.string().max(EMAIL.MAX).min(EMAIL.MIN).email(EMAIL.EMAIL_STRUCTURE)
        .required(),
    password: Joi.string().pattern(new RegExp(PASSWORD.REG_EXP)).required(),
    birthday: Joi.date().iso(),
    gender: Joi.valid(GENDER.MALE, GENDER.FEMALE, GENDER.OTHER),
});

export async function createValidator(req, res, next) {
    const { body } = req;
    const result = createValidSchema.validate(body);
    if (result.error) {
        res.json(
            respondWithError(
                ErrorCodes.ERROR_CODE_INVALID_PARAMETER,
                result.error.message,
                result.error.details,
            ),
        );
        return;
    }
    next();
}

const userIdSchema = Joi.number().integer().positive().required();

export async function userIdValidator(req, res, next) {
    const { params } = req;
    const result = userIdSchema.validate(params.id);

    if (result.error) {
        res.json(
            respondWithError(
                ErrorCodes.ERROR_CODE_INVALID_PARAMETER,
                result.error.message,
                result.error.details,
            ),
        );
        return;
    }
    next();
}

const updateValidSchema = Joi.object().keys({
    fullName: Joi.string().max(FULLNAME.MAX).min(FULLNAME.MIN),
    phone: Joi.string().pattern(new RegExp(PHONE.REG_EXP)),
    birthday: Joi.date().iso(),
    gender: Joi.valid(GENDER.MALE, GENDER.FEMALE, GENDER.OTHER),
});

export async function updateValidator(req, res, next) {
    const { body } = req;

    const result = updateValidSchema.validate(body);

    if (result.error) {
        res.json(
            respondWithError(
                ErrorCodes.ERROR_CODE_INVALID_PARAMETER,
                result.error.message,
                result.error.details,
            ),
        );
        return;
    }
    next();
}

const updatePasswordValidSchema = Joi.object().keys({
    newPassword: Joi.string().pattern(new RegExp(PASSWORD.REG_EXP)).required(),
});

export async function updatePasswordValidator(req, res, next) {
    const { body } = req;

    const result = updatePasswordValidSchema.validate(body);

    if (result.error) {
        res.json(
            respondWithError(
                ErrorCodes.ERROR_CODE_INVALID_PARAMETER,
                result.error.message,
                result.error.details,
            ),
        );
        return;
    }
    next();
}

const idValidSchema = Joi.object().keys({
    id: Joi.number().positive().integer().required(),
});

export async function idValidaytor(req, res, next) {
    const { params } = req;
    const result = idValidSchema.validate(params);
    if (result.error) {
        res.json(
            respondWithError(
                ErrorCodes.ERROR_CODE_INVALID_PARAMETER,
                result.error.message,
                result.error.details,
            ),
        );
        return;
    }
    next();
}
