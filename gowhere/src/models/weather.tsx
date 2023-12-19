import Model from './model';

class Weather extends Model {
    async GetWeather(callback: Function) {
        super.get(`/weather`, null, (res, err) => {
            if (res) {
                callback(res, null);
            } else {
                callback(null, err || res.error);
            }
        });
    }

    async GetWeatherByDatetime(datetime: string, callback: Function) {
        super.get(`/weather/${datetime}`, null, (res, err) => {
            if (res) {
                callback(res, null);
            } else {
                callback(null, err || res.error);
            }
        });
    }
}

export default Weather;
