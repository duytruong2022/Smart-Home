import { logSystemError, respondSuccess } from '../../helpers/messageResponse';
import { getSensorList } from './sensorService';

export async function getList(req, res) {
    try {
        const { dateBegin, dateEnd } = req.query;
        const option = {
            dateBegin,
            dateEnd,
        };
        const result = await getSensorList(option);
        return res.json(respondSuccess(result));
    } catch (error) {
        return logSystemError(res, error, 'userController - getList');
    }
}
