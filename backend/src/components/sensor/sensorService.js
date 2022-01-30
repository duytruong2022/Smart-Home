import { logger } from '../../helpers/logger';

const moment = require('moment');
const Sensor = require('../../modelsMongoose/sensor');

export async function getSensorList(option) {
    try {
        const dateBegin = moment(option.dateBegin);
        const dateEnd = moment(option.dateEnd);
        const start = dateBegin.valueOf();
        const end = dateEnd.valueOf();
        const range = end - start;
        // 20 khoảng thời gian
        const miniRange = range / 20;
        // lấy thông tin theo các mốc thời gian
        const rs = await Sensor.find({
            createdDate: {
                $gte: dateBegin.get('time'),
                $lte: dateEnd.get('time'),
            },
        }).sort({ field: 'asc', createdDate: -1 });
        // Biến lưu danh sách kết quả trung bình, kết quả trung bình chia làm 20 khoảng
        const result = [];
        for (let i = start; i < end; i += miniRange) {
            const value = {
                humidityAir: 0,
                temperature: 0,
                time: moment(i),
            };

            // biến lưu số bản ghi trong một khoảng thời gian
            let count = 0;
            const arr = rs.filter(
                (obj) =>
                    moment(obj.createdDate).valueOf() > i &&
                    moment(obj.createdDate).valueOf() < i + miniRange,
            );
            if (Array.isArray(arr) && arr.length) {
                console.log(arr);
                arr.forEach((item) => {
                    // if (item && item !== 'null' && item !== 'undefined') {
                        value.humidityAir += item.humidityAir;
                        value.temperature += item.temperature;
                        count += 1;
                    // }
                });
                // nếu trong khoảnh thời gian không có bản ghi nào thì count = 0 => 0/0 = null;
                if (count !== 0) {
                    value.humidityAir /= count;
                    value.temperature /= count;
                }
            } 
            result.push(value);
        }
        return result;
    } catch (error) {
        logger.error(`Error in getUserList ${error.message}`);
        throw error;
    }
}
