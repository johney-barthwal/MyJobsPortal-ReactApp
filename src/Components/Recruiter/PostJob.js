import {Form,Button} from 'react-bootstrap';
import {useState} from 'react';
import axios from 'axios';
import {BASE_URL} from '../../config';
import {useHistory} from "react-router-dom";
import './postjob.css'

const PostJob = () =>{
    const [validInputs,setvalidInputs] = useState({
        title : "",
        description : "",
        location : ""
    }); 
    const [validPost,setvalidPost] = useState("");
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [location,setLocation] = useState("");
    const user = JSON.parse(localStorage.getItem('user'));
    const history = useHistory();

    const handleOnPost = () =>{
        console.log(validateForm());
        if(validateForm()){
            const config = {
                headers: { Authorization: user.data.token }
            };
            axios.post(`${BASE_URL}/jobs`,{
                "title": title,
                "description": description,
                "location": location
            },config)
            .then((res)=>{
                alert("Job posted successfully.");
                history.push("/recruiter");
            })
            .catch((err)=>{
                console.log(err.response);
                if(err.response.message){
                    setvalidPost(err.response.message);
                }
                else{
                    setvalidPost("Something went wrong!!");
                }
            });
        }
    }

    const validateForm = () =>{
        let validTitle,validDesc,validLoc;
        validTitle = validDesc = validLoc = "";
        if(title === ""){
            validTitle="The field is mandatory.";
        }
        else if(title.length < 4){
            validTitle="Job title should be between 3 and 100 characters.";
        }
        if(description === ""){
            validDesc="The field is mandatory."
        }
        else if(description.length < 4){
            validDesc="Jop description should be between 3 and 150 characters";
        }
        if(location === ""){
            validLoc="The field is mandatory."
        }
        else if(location.length < 4){
            validLoc="Job location invalid. Must be between 3 and 100 characters.";
        }

        setvalidInputs({
            ...validInputs,
            title : validTitle,
            description : validDesc,
            location : validLoc
        });

        if(validTitle.length === 0 && validDesc.length ===0 && validLoc.length===0){
            return true;
        }
        return false;
    }

    const handleChange = (e) =>{
        if(e.target.name === "title"){
            setTitle(e.target.value);
        }
        else if(e.target.name === "description"){
            setDescription(e.target.value);
        }
        else if(e.target.name === "location"){
            setLocation(e.target.value);
        }
    }

    const handleOnFocus = (e) =>{
        setvalidInputs({
            ...validInputs,
            [e.target.name] : ""
        });
    }

    return(
        <>
            <div className="home-link">
                <div className="home-icon"></div>
                <div className="navigation-text">
                    <a onClick={()=>{history.push('/recruiter')}}>Home</a>
                    <span>&nbsp;>&nbsp;</span>
                    <a>Post a Job</a>
                </div>
            </div>
            <div className="jp-container">
                <Form className="jp-form__wrapper">
                    <div className="jp-form__heading">Post a Job</div>
                    <br/>
                    <Form.Group controlId="jp-form__title">
                        <Form.Label className="jp-form__title-label">Job Title</Form.Label>
                        <Form.Control className={`${validInputs.title.length > 0 ? 'error' :''}`}   name="title" type="text" placeholder="Enter job title"
                        value = {title}
                        onFocus={handleOnFocus}  
                        onChange={handleChange}
                        /> 
                        { validInputs.title.length > 0 ? <p className="error-text">{validInputs.title}</p> : null}
                    </Form.Group>
                    <Form.Group controlId="jp-form__description">
                        <Form.Label className="jp-form__description-label">Description</Form.Label>
                        <Form.Control className={`${validInputs.description.length > 0 ? 'error' :''}`} name="description" as="textarea" rows={3}  type="text" placeholder="Enter job description"
                        value = {description}
                        onFocus={handleOnFocus}  
                        onChange={handleChange}
                        /> 
                        { validInputs.description.length > 0 ? <p className="error-text">{validInputs.description}</p> : null}
                    </Form.Group>
                    <Form.Group controlId="jp-form__location">
                        <Form.Label className="jp-form__location-label">Location</Form.Label>
                        <Form.Control className={`${validInputs.location.length > 0 ? 'error' :''}`} name="location" placeholder="Enter location"
                        value = {location}
                        onFocus={handleOnFocus}  
                        onChange={handleChange}  
                        />
                        { validInputs.location.length > 0 ? <p className="error-text">{validInputs.location}</p> : null} 
                    </Form.Group>
                    { validPost.length > 0 ? <p className="error-text">{validPost}</p> : null}
                    <div className="post-btn__warapper">
                        <Button className="post-btn"
                        onClick={handleOnPost}>
                            Post
                        </Button>
                    </div>                
                </Form>
            </div>
        </>
    );
}

export default PostJob;