import {useHistory} from 'react-router-dom';
import {Form,Button} from 'react-bootstrap'
import {useState} from 'react';
import {BASE_URL} from '../../config';
import axios from 'axios';
import './signup.css'
const Signup = (props) =>{
    const history = useHistory();
    const [isValid,setIsValid] = useState({
        name  : { value : true, text : ""},
        email : { value : true, text : ""},
        pass  : { value : true, text : ""},
        cpass : { value : true, text : ""}
    });
    const [signInError,setSignInError] = useState({
        value : false,
        text : ""
    })
    const [userRole,setUserRole] = useState(0);
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');   
    const [skills,setSkills] = useState('');   

    const handleOnChange=(e)=>{
        if(e.target.name === "user-role"){
            e.target.id === "recruiter" ? setUserRole(0) : setUserRole(1);
        }
        else if(e.target.name === "name"){
            setName(e.target.value);
        }
        else if(e.target.name === "email"){
            setEmail(e.target.value);
        }
        else if(e.target.name === "pass"){
            setPassword(e.target.value);
        }
        else if(e.target.name === "cpass"){
            setConfirmPassword(e.target.value);
        }
        else if(e.target.name === "skills"){
            setSkills(e.target.value);
        }
    }

    const handleOnFocus=(e)=>{
        setIsValid({
            ...isValid,
            [e.target.name] : { value : true, text : ""}
        });
    }

    const signup = (e) => {
        if(validateForm()){
            console.log(email,userRole,password,confirmPassword,name,skills);
            axios.post(`${BASE_URL}/auth/register`,{
                "email": email,
                "userRole": userRole, 
                "password": password,
                "confirmPassword": confirmPassword,
                "name": name,
                "skills": skills
            })
            .then((res)=>{
                props.setUser(res.data);
                localStorage.setItem("user",JSON.stringify(res.data));
                userRole == 0 ? history.push('/recruiter') : history.push('/candidate');
            })
            .catch((err)=>{
                console.log(err.response);
                setSignInError({
                    ...signInError,
                    value : true,
                    text : err.response.data.message
                });
            });
        }
    }

    const validateForm = () => {
        let validName, validEmail, validPass, validCPass;
        validName = validEmail = validPass = validCPass = true;

        let validNameText,validEmailText,validPassText,validCPassText;
        validNameText = validEmailText = validPassText = validCPassText = "";
        
        if(name===""){
            validName = false;
            validNameText = "The field is mandatory.";
        }
        else if(!name.match(/^[A-Za-z]+$/)){
            validName = false;
            validNameText = "Name cannot have special characters and numbers.";
        }
        if(email===""){
            validEmail = false;
            validEmailText = "The field is mandatory.";
        }
        if(password===""){
            validPass = false;
            validPassText = "The field is mandatory.";
        }
        else if(password.length < 6){
            validPass = false;
            validPassText = "Password must be greater than 6 characters.";
        }
        if(confirmPassword===""){
            validCPass = false;
            validCPassText = "The field is mandatory.";
        }
        else if(password !== confirmPassword){
            validCPass = false;
            validCPassText = "Password doesn't match.";
        }

        setIsValid({
            ...isValid,
            name : {
                ...isValid.name,
                value : validName,
                text : validNameText
            },
            email : {
                ...isValid.email,
                value : validEmail,
                text : validEmailText
            },
            pass : {
                ...isValid.pass,
                value : validPass,
                text : validPassText
            },
            cpass : {
                ...isValid.cpass,
                value : validCPass,
                text : validCPassText
            }
        });

        if(validName && validEmail &&
            validPass && validCPass){
                return true;
            }
        return false;
    }

    return(
        <>
        <div className="signup-container">
            <div className="signup-text">Signup</div>
            <Form className="signup-form__wrapper">
                <div className="user-role__text">I'm a</div>
                <div className="radio-toolbar">
                    <div className="recruiter-image"></div>
                    <input type="radio" id="recruiter" name="user-role" 
                        checked={userRole === 0}
                        onChange={handleOnChange}
                    />
                    <label htmlFor="recruiter">Recruiter</label>
                    <div className="candidate-image"></div>
                    <input type="radio" id="candidate" name="user-role" 
                        checked={userRole === 1}
                        onChange={handleOnChange}
                    />
                    <label htmlFor="candidate">Candidate</label>
                </div> 
                <Form.Group controlId="registerName"> 
                    <Form.Label className="name__label">Full Name</Form.Label>
                    <Form.Control className={`${!isValid.name.value ? 'error' :''}`}  type="text" name="name" placeholder="Enter your full name"
                        value={name} 
                        onChange={handleOnChange}
                        onFocus={handleOnFocus}
                    />
                   {!isValid.name.value ? <div className="error-text">{isValid.name.text}</div> : null}
                </Form.Group>
                <Form.Group controlId="registerEmail"> 
                    <Form.Label className="email__label">Email address</Form.Label>
                    <Form.Control className={`${!isValid.email.value ? 'error' :''}`} type="email" name="email" placeholder="Enter your email"
                        value={email} 
                        onChange={handleOnChange}
                        onFocus={handleOnFocus}
                     />
                    {!isValid.email.value ? <div className="error-text">{isValid.email.text}</div> : null}
                </Form.Group>
                <div className="password-container">
                    <Form.Group controlId="registerPassword">
                        <Form.Label className="pass__label">Password</Form.Label>
                        <Form.Control className={`${!isValid.pass.value ? 'error' :''}`} type="password" name="pass"  placeholder="Enter your password" 
                        value={password} 
                        onChange={handleOnChange}
                        onFocus={handleOnFocus}
                     /> 
                    {!isValid.pass.value ? <div className="error-text">{isValid.pass.text}</div> : null}
                    </Form.Group>
                    <Form.Group controlId="registerConfirmPassword">
                        <Form.Label className="cpass__label">Confirm Password</Form.Label>
                        <Form.Control className={`${!isValid.cpass.value ? 'error' :''}`} type="password" name="cpass" placeholder="Confirm your password"
                        value={confirmPassword} 
                        onChange={handleOnChange}
                        onFocus={handleOnFocus}
                     />
                     {!isValid.cpass.value ? <div className="error-text">{isValid.cpass.text}</div> : null}
                    </Form.Group>
                </div>
                <Form.Group controlId="registerSkills"> 
                    <Form.Label>Skills</Form.Label>
                    <Form.Control type="text" name="skills" placeholder="Enter comma seperated skills" 
                        value={skills} 
                        onChange={handleOnChange}
                     />
                </Form.Group>
                {signInError.value ? <div className="error-text">{signInError.text}</div> : null}
                <div className="signup-btn__warapper">
                    <Button className="signup-btn" onClick={signup}>Signup</Button>
                </div>
                { !isValid ? <p className="error-text">Incorrect email address or password</p> : null} 
                <p className="login-link">Have an account? <a onClick={()=>{history.push('/login')}}>Login</a></p>
            </Form>
        </div>
        </>
    )
}

export default Signup;

