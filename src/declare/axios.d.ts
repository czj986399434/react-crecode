import axios from 'axios'
declare module 'axios'{
    export interface AxiosResponse<T =any> extends Promise<T>{
        message:string;
        status:number;
        result?:object
    }
}