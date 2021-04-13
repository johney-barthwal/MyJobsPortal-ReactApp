import './header.css'
import {useState,useEffect} from 'react'
import {useHistory} from 'react-router-dom';
import auth from '../../Utility/auth';

const Header = (props) => {

    const [userRole,setUserRole] = useState(null);
    const [firstNameChar,setfirstNameChar] = useState("");
    const [showLogout,setShowLogout] = useState(false);
    const history = useHistory();
    useEffect(()=>{
        if(props.user){
            setUserRole(props.user.data.userRole);
            setfirstNameChar(props.user.data.name[0].toUpperCase());
        }
    },[props.user]);

    const handeleLogOut = ()=>{
        auth.logout(()=>{
            setShowLogout(false);
            props.setUser(null); 
            setUserRole(null);
            localStorage.removeItem('user'); 
            history.push('/MyJobsPortal-ReactApp');
        });
    }
    return (
        <header> 
            <nav>
                <div className="logo__wrapper">
                    <div className="logo" onClick={()=>{history.push('/MyJobsPortal-ReactApp')}}></div>
                </div>
                <div className="nav-links__wrapper">
                    { props.user? 
                        <>
                            <div className="profile-btn-container" 
                                onClick={()=>{setShowLogout(!showLogout)}}
                                >
                                <button className="profile-btn">{firstNameChar}
                                </button>
                                <i className="arrow-down"></i>
                            </div> 
                            {
                                showLogout ? 
                                <div className="profile-dropdown">
                                    <a onClick={handeleLogOut}>Logout</a>
                                </div>
                                :
                                null
                            }
                        </>
                        : 
                        <button className="login-btn" onClick={()=>{history.push('/MyJobsPortal-ReactApp/login')}}>Login/SignUp</button>
                        }
                    { userRole == 0 ? <a className="post-job" onClick={()=>{history.push('/MyJobsPortal-ReactApp/postjob')}}>Post a job</a> : null}
                    { userRole == 1 ? <a className="applied-jobs" onClick={()=>{history.push('/MyJobsPortal-ReactApp/applied')}}>Applied Jobs</a> : null}
                    
                </div>
            </nav>
        </header>
    )
}

export default Header;