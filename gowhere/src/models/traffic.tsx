import Model from './model';

class Traffic extends Model {
    async GetTraffic(callback: Function) {
        super.get(`/traffic`, null, (res, err) => {
            if (res) {
                callback(res, null);
            } else {
                callback(null, err || res.error);
            }
        });
    }

    async GetTrafficByDatetime(datetime: string, callback: Function) {
        super.get(`/traffic/${datetime}`, null, (res, err) => {
            if (res) {
                callback(res, null);
            } else {
                callback(null, err || res.error);
            }
        });
    }
}

export default Traffic;
