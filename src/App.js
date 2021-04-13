
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css'; 

import {BrowserRouter as Router ,Route, Switch} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {ProtectedRoute} from './Utility/ProtectedRoutes';
import Header from './Components/Header/Header';
import HomePage from './Components/HomePage/HomePage';
import Login from './Components/Login/Login';
import ForgotPassword from './Components/Login/ForgotPassword';
import ChangePassword from './Components/Login/ChangePassword';
import Signup from './Components/Signup/SignUp'; 
import Candidate from './Components/Candidate/Candidate';
import AppliedJobs from './Components/Candidate/AppliedJobs';
import Recruiter from './Components/Recruiter/Recruiter';
import PostJob from './Components/Recruiter/PostJob';
import {PageNotFound} from './Utility/PageNotFound';
function App() {

  const [user,setUser] = useState(null);
  useEffect(()=>{
    if(localStorage.getItem('user')!==null){
      let userApp = JSON.parse(localStorage.getItem('user'));
      setUser(userApp);
    }
  },[]);

  return (
    <Router>
      <div className="App">
        <Header user={user} setUser={setUser} />
        <Switch> 
          <Route exact path='/MyJobsPortal-ReactApp' component={HomePage}/>
          <Route
            path='/MyJobsPortal-ReactApp/login'
            render={(props) => (
              <Login {...props}  setUser={setUser}/>
            )}
          />
          <Route exact path='/MyJobsPortal-ReactApp/fp' component={ForgotPassword}/>
          <Route exact path='/MyJobsPortal-ReactApp/cp' component={ChangePassword}/>
          <Route
            path='/MyJobsPortal-ReactApp/signup'
            render={(props) => (
              <Signup {...props}  setUser={setUser}/>
            )}
          />
          <ProtectedRoute exact path='/MyJobsPortal-ReactApp/candidate' component={Candidate}/>
          <ProtectedRoute exact path='/MyJobsPortal-ReactApp/applied' component={AppliedJobs}/>
          <ProtectedRoute exact path='/MyJobsPortal-ReactApp/recruiter' component={Recruiter}/>
          <ProtectedRoute exact path='/MyJobsPortal-ReactApp/postjob' component={PostJob}/>
          <Route exact path='*' component={PageNotFound}/>
        </Switch>
      </div> 
    </Router>
  );
}

export default App;
