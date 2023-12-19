import axios from 'axios';
const apiEndPoint = 'http://localhost:4001';

class Model {
    get(path: string, params: any, callback: Function) {
        axios
            .get(apiEndPoint + path, {
                params: params,
                headers: {},
            })
            .then(function (res) {
                callback(res.data, null);
                return;
            })
            .catch(function (error) {
                console.log(error);
                callback(
                    null,
                    'Opps there is something wrong with our servers, please try again later',
                );
                return;
            });
    }
    post(path: string, body: object, callback: Function) {
        axios
            .post(apiEndPoint + path, body, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(function (response) {
                if (response !== null) {
                    callback(response.data, null);
                    return;
                }
            })
            .catch(function (error) {
                console.log(error);
                callback(
                    null,
                    'Opps there is something wrong with our servers, please try again later',
                );
                return;
            });
    }
}
export default Model;
