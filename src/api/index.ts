import { message } from "antd";
import axios from "axios";
export const Axios = axios.create({
  // baseURL:'/nest'
});
const successCodeReg = /^20/g;
// Axios.interceptors.request.use()
Axios.interceptors.response.use(
  (response) => {
    console.log(response.status.toString())
    if (successCodeReg.test(response.status.toString())||response.status.toString()==='304') {
      response.data.message
        ? console.log(response.data.message)
        : console.log("success");
    } else {
      
      console.log("error" + response.data.message);
    }
    return response;
  },
  (error) => {
    console.log("???未知错误");
  }
);
export const myHttp = {
  get,
  post,
};

/**
 *
 *
 * @param {string} url 请求url
 * @param {*} [params={}] 请求参数
 * @return {*}
 */
function get(url: string, params = {}) {
  return new Promise((resolve, reject) => {
    Axios.get(url, {
      params: params,
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
/**
 *
 *
 * @param {string} url 请求url
 * @param {object} data  请求体
 * @return {*}
 */
function post(url: string, data: object) {
  return new Promise((resolve, reject) => {
    Axios.post(url, data).then(
      (response) => {
        //关闭进度条
        resolve(response.data);
      },
      (err) => {
        reject(err);
      }
    );
  });
}
