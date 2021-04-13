import {Form,Button} from 'react-bootstrap';
import {useState} from 'react';
import axios from 'axios';
import {BASE_URL} from '../../config';
import {useHistory} from "react-router-dom";
import './changepassword.css'
const ChangePassword = () =>{ 
    const history = useHistory();
    const [validPassword,setvalidPassword] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");

    const handleOnReset = () =>{
        let token = localStorage.getItem("reset-token");
        axios.get(`${BASE_URL}/auth/resetpassword/${token}`)
        .then((res)=>{
            axios.post(`${BASE_URL}/auth/resetpassword`,{
                "password": password,
                "confirmPassword": confirmPassword,
                "token": token
            })
            .then((res)=>{
                alert("password changed successfully");
                history.push('/login');
            })
            .catch((err)=>{
                setvalidPassword(err.response.data.message);
            });
        })
        .catch((err)=>{
            history.push('/fp');
        });
    }

    const handleChange = (e) =>{
       e.target.name === "pass" ? setPassword(e.target.value) : setConfirmPassword(e.target.value); 
    }

    const handleOnFocus = (e) =>{
        setvalidPassword("");
    }

    return(
        <div className="cp-container">
            <Form className="cp-form__wrapper">
                <div className="cp-form__heading">Reser Your Password</div>
                <br/>
                <div className="cp-form__info">Enter your new password below.</div>
                <br/>
                <Form.Group controlId="cp-form__password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="pass" type="password" placeholder="Enter your password"
                    value = {password}
                    onFocus={handleOnFocus}  
                    onChange={handleChange}
                    /> 
                </Form.Group>
                <Form.Group controlId="cp-form__confirmPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control name="cpass" type="password" placeholder="Confirm your password"
                    value = {confirmPassword}
                    onFocus={handleOnFocus}  
                    onChange={handleChange}
                    /> 
                </Form.Group>
                { validPassword.length > 0 ? <p className="error-text">{validPassword}</p> : null}
                <div className="reset-btn__warapper">
                    <Button className="reset-btn"
                    onClick={handleOnReset}>
                        Reset
                    </Button>
                </div>                
            </Form>
        </div>
    );
}

export default ChangePassword;