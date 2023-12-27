import Model from './model';

class History extends Model {
    async PostQuery(datetime: number, location: string, callback: Function) {
        super.post(`/history`, { datetime, location }, (res, err) => {
            if (res) {
                callback(res, null);
            } else {
                callback(null, err || res.error);
            }
        });
    }
}

export default History;
