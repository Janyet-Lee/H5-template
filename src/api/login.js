import request from '@/utils/request';

const ApiCollection = {
  login(obj) {
    return request.post('/user/multsteplogin', obj);
  },
  getSmsCode(obj) {
    return request.spePost('/user/smcode', obj);
  },
  setPassword(obj) {
    return request.spePost('/user/multstepsetpassword', obj);
  }
};

export default ApiCollection;
