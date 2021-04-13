import {useEffect,useState} from 'react';
import {BASE_URL} from '../../config';
import axios from 'axios';
import JobCard from '../Common/JobCard'; 
import './appliedjobs.css';
import {Pagination} from '../Common/Pagination';
import {LoadingComponent} from '../../Utility/LoadingComponent';

const AppliedJobs = (props) => {
    const [loading,setLoading] = useState(false);
    const [appliedJobsAll,setAppliedJobsAll] = useState([]);
    const [appliedJobs,setAppliedJobs] = useState([]);
    const [displayPage,setDisplayPage] = useState(1);
    const [disableNext,setDisableNext] = useState(false);
    const [disablePrevious,setDisablePrevious] = useState(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const jobsPerPage = 12;

    useEffect(()=>{ 
        setLoading(true);
        const config = {
            headers: { Authorization: user.data.token }
        };
        axios.get(`${BASE_URL}/candidates/jobs/applied`,config)
        .then((res)=>{
            if(res.data.data)
                setAppliedJobsAll(res.data.data);
                setLoading(false);
        }) 
        .catch((err)=>{
            console.log(err);
            setLoading(false);
        });
    },[]);

    useEffect(()=>{
        let startIndex = (displayPage-1)*jobsPerPage;
        let endIndex = displayPage*jobsPerPage;
        setAppliedJobs(appliedJobsAll.slice(startIndex,endIndex));
        
        if(appliedJobsAll.length<jobsPerPage){
            setDisableNext(true);
        }

    },[appliedJobsAll,displayPage]);

    const handleNextPage = () =>{
        if(displayPage+1 > 1){
            setDisablePrevious(false);
        }
        if(displayPage+1 === Math.ceil(appliedJobsAll.length/12)){
            setDisableNext(true);
        }
        setDisplayPage(displayPage+1);
    };

    const handlePreviousPage = () =>{
        if(displayPage-1 == 1){
            setDisablePrevious(true);
        }
        else{
            setDisableNext(false);
        }
        setDisplayPage(displayPage-1);
    }; 

    const pagination =  <Pagination displayPage={displayPage} 
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage} 
        disableNext={disableNext}
        disablePrevious={disablePrevious}
    />
    return (
        <>
            <div className="home-link">
                <div className="home-icon"></div>
                <div className="navigation-text">
                    <a onClick={()=>{props.history.push('/candidate')}}>Home</a>
                    <span>&nbsp;>&nbsp;</span>
                    <a>Applied Jobs</a>
                </div>
            </div>
            <div className="page-title">Jobs applied by you</div> 
            {
                loading ? 
                <LoadingComponent/>
                :
                <section className="list-of-jobs">
                {
                    appliedJobs.length > 0 ?
                    appliedJobs.map((job,index)=>{
                        return <JobCard key={job.id ? job.id : index} job={job} index={index} />
                    })
                    : 
                    <div className="rec-no-post-container">
                        <div className="rec-no-post__img"></div>
                        <div className="rec-no-post__text">
                            Your applied jobs will show here!
                        </div>
                        <br/>
                        <br/>
                        <div className="rec-no-post__button">
                            <button onClick={()=>{props.history.push('/candidate')}}>See all Jobs</button> 
                        </div>
                    </div>
                }
                {
                    appliedJobs.length > 0 ?
                    <Pagination displayPage={displayPage} 
                        handleNextPage={handleNextPage}
                        handlePreviousPage={handlePreviousPage} 
                        disableNext={disableNext}
                        disablePrevious={disablePrevious}
                    /> 
                    :
                    null
                }
                </section>
            }
        </>
    
   ); 
}

export default AppliedJobs;