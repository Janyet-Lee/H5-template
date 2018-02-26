import request from '../../utils/request';

const ApiCollection = {
  checkLogin() {
    return request.get('/api/isLogin', null, 'noProcessing');
  }
};

export default ApiCollection;
