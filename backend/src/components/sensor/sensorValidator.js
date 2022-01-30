import { respondWithError } from '../../helpers/messageResponse';
import { ErrorCodes } from '../../helpers/constants';

const BaseJoi = require('joi');
const Extension = require('@joi/date');

const Joi = BaseJoi.extend(Extension);

const getSensorValidSchema = Joi.object().keys({
    dateBegin: Joi.date().iso().required(),
    dateEnd: Joi.date().iso().required(),
});

export async function getSensorValidator(req, res, next) {
    const { query } = req;
    const result = getSensorValidSchema.validate(query);
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
