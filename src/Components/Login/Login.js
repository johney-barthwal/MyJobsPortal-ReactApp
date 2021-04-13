import './login.css'
import {Form,Button} from 'react-bootstrap'
import {useState} from 'react';

import auth from '../../Utility/auth';

const Login = (props) =>{
    const [isValid,setIsValid] = useState(true);
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [errorMsg,setErrorMsg] = useState('Incorrect email address or password');
    const handleChange = (e) => {
        e.target.type === "email" ? setEmail(e.target.value) : setPassword(e.target.value) 
    }

    const handleOnLogin = (e) =>{
        if(!validateForm()){
            setIsValid(false);    
        }
        else{
           auth.login({
                "email": email,
                "password": password
            },(res)=>{
                props.setUser(res.data);
                localStorage.setItem("user",JSON.stringify(res.data));
                res.data.data.userRole == 0 ? props.history.push('/recruiter') : props.history.push('/candidate');
            },(err)=>{
                if(err.response){
                    setErrorMsg(err.response.data.message);
                }
                setIsValid(false);
            })
        }
    }

    const validateForm = () => {
        if(email === "" || password === ""){
            return false;
        }
        return true;
    }

    const handleOnFocus = (e) => {
        setIsValid(true);
    }
    return(
        <>
        <div className="login-container">
            <div className="login_text">Login</div>
            <br/>
            <Form className="login-form__wrapper">
                <Form.Group controlId="loginEmail"> 
                    <Form.Label className="login_label">Email address</Form.Label>
                    <Form.Control type="email" className={`login_email ${!isValid ? 'error' :''}`}  placeholder="Enter your email"
                    value = {email} 
                    onFocus={handleOnFocus}
                    onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group controlId="loginPassword">
                    <Form.Label className="login_label">Password</Form.Label>
                    <a className="login_forgot-link" onClick={()=>{props.history.push('/fp')}}>Forgot your password?</a>
                    <Form.Control  type="password" className={`login_password ${!isValid ? 'error' :''}`} placeholder="Enter your password"
                    value = {password}
                    onFocus={handleOnFocus}  
                    onChange={handleChange}
                    /> 
                </Form.Group>
                <Button className="login_btn"
                onClick={handleOnLogin}>
                    Login
                </Button>
                { !isValid ? <p className="error-text">{errorMsg}</p> : null}
                <p className="register-link">New to MyJobs? <a onClick={()=>{props.history.push('/signup')}}>Create an account</a></p>
            </Form>
        </div>
        </>
    )
}

export default Login;

