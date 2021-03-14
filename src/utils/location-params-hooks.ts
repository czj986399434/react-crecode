import { useHistory } from "react-router";
interface Obj {
    [key: string]: any;
  }
export const useLocationParams =()=>{
    const history = useHistory();
  const paramsArr = history.location.search
    .slice(1)
    ?.split("&")
    .map((val) => {
      const arr = val.split("=");
      return {
        key: arr[0],
        value: arr[1],
      };
    });
  const params :Obj= {};
  paramsArr.forEach((param) => {
    params[param.key] = param.value;
  });
  return params
}