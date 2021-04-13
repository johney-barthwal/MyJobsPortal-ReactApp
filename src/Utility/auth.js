import {BASE_URL} from '../config';
import axios from 'axios';

class Auth{
    constructor(){
        if(localStorage.getItem("user") === null){
            this.authenicated = false;
        }
        else{
            this.authenicated = true;
        }
    }

    login(data,cb,errcb){
        axios.post(`${BASE_URL}/auth/login`,data)
        .then((res)=>{
            this.authenicated = true;
            cb(res);
        })
        .catch((err)=>{
            errcb(err);
        })
    }
    
    logout(cb){
        this.authenicated = false;
        cb();
    }

    isAuthenticated(){
        return this.authenicated;
    }
}

export default new Auth();