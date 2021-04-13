import {Form,Button} from 'react-bootstrap';
import {useState} from 'react';
import axios from 'axios';
import {BASE_URL} from '../../config';
import './forgotpassword.css';
import {useHistory} from "react-router-dom";

const ForgotPassword = () =>{
    const history = useHistory();
    const [validEmail,setValidEmail] = useState("");
    const [email,setEmail] = useState("");
    const handleOnSubmit = () =>{
        //console.log(email,password);
        axios.get(`${BASE_URL}/auth/resetpassword?email=${email}`)
        .then((res)=>{
            localStorage.setItem("reset-token",res.data.data.token);
            history.push('/cp');
        })
        .catch((err)=>{
            //console.log(err);
            setValidEmail("No user found with the provided email");
        });
    }
    const handleChange = (e) =>{
        setEmail(e.target.value);
    }
    const handleOnFocus = (e) =>{
        setValidEmail("");
    }

    return(
        <div className="fp-container">
             <Form className="fp-form__wrapper">
                <div className="fp-form__heading">Forgot your password?</div>
                <br/>
                <div className="fp-form__info">Enter email address associated with your account and we'll send you instructions to reset your password.</div>
                <br/>
                <Form.Group controlId="fp-form__loginEmail"> 
                    <Form.Label className="fp-form__login-label">Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter your email"
                    value = {email} 
                    onChange={handleChange}
                    onFocus={handleOnFocus}
                    />
                </Form.Group>
                { validEmail.length > 0 ? <p className="error-text">{validEmail}</p> : null}
                <div className="submit-btn__warapper">
                    <Button className="submit-btn"
                    onClick={handleOnSubmit}>
                        Submit
                    </Button>
                </div>                
            </Form>
        </div>
    );
}

export default ForgotPassword;