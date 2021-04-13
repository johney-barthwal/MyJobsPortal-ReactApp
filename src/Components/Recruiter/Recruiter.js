import {useEffect,useState} from 'react';
import {BASE_URL} from '../../config';
import axios from 'axios';
import JobCard from '../Common/JobCard'; 
import './recruiter.css'
import ViewApplicantsModal from './ViewApplicantsModal';
import {Pagination} from '../Common/Pagination';
import {LoadingComponent} from '../../Utility/LoadingComponent';

const Recruiter = (props) => {
    const [loading,setLoading] = useState(false);
    const [jobPostsAll,setJobPostsAll] = useState([]);
    const [jobPosts,setJobPosts] = useState([]);
    const [jobApplicants,setJobApplicants] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [totalJobs,setTotalJobs] = useState(0);
    const [page,setPage] = useState(1);
    const [displayPage,setDisplayPage] = useState(1);
    const [disableNext,setDisableNext] = useState(false);
    const [disablePrevious,setDisablePrevious] = useState(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const jobsPerPage = 12;
    
    useEffect(()=>{ 
        const config = {
            headers: { Authorization: user.data.token }
        };
        axios.get(`${BASE_URL}//recruiters/jobs?page=${page}`,config)
        .then((res)=>{
           if(res.data.data){
                setTotalJobs(res.data.data.metadata.count);
                setJobPostsAll(arr => [...arr,...res.data.data.data]);
                setLoading(false);
            }
        })
        .catch((err)=>{
            console.log(err); 
            setLoading(false);
        });
    },[page]);

    useEffect(()=>{
        let startIndex = (displayPage-1)*jobsPerPage;
        let endIndex = displayPage*jobsPerPage;
        setJobPosts(jobPostsAll.slice(startIndex,endIndex));

        if(displayPage === 1 && totalJobs<jobsPerPage){
            setDisableNext(true);
        }
        else if(displayPage === 1) {
            setDisableNext(false);
        }

    },[jobPostsAll,displayPage]);

    const viewApplicants = (e) => {
        let eleClasses = e.target.classList;
        let eleType = e.target.type;
        if(eleClasses.contains("job-card__action-btn") && eleType === "button"){
            let index = e.target.parentNode.parentNode.parentNode.id;
            let jobId = jobPosts[index].id;
            const config = {
                headers: { Authorization: user.data.token }
            };
            axios.get(`${BASE_URL}/recruiters/jobs/${jobId}/candidates`,config)
            .then((res)=>{
                if(res.data.data){
                    setJobApplicants(res.data.data);
                }
                else{
                    setJobApplicants([]);
                }
                setShowModal(true);
            })
            .catch((err)=>{
                console.log(err);
            });
        }
    }

    const handleModalClose = () =>{
        setShowModal(false);
    }

    const handleNextPage = () =>{
        if(displayPage+1 > 1){
            setDisablePrevious(false);
        }
        if(displayPage+1 === Math.ceil(totalJobs/12)){
            setDisableNext(true);
        }
        if((displayPage+1)*jobsPerPage > jobPostsAll.length
            && jobPostsAll.length !==totalJobs){
            setPage(page+1); 
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
        let startIndex = (page-2)*jobsPerPage;
        let endIndex = (page-1)*jobsPerPage;
        setJobPosts(jobPostsAll.slice(startIndex,endIndex));
    };

    let button = {
        text : "View Application"
    }

    return (
        <>
        <div className="home-link">
            <div className="home-icon"></div>
            <div className="home-text"><a>Home</a></div>
        </div> 
        <div className="page-title">Jobs posted by you</div>
        {
            loading ? 
            <LoadingComponent/>
            :
            <>
            <section className="list-of-jobs" onClick={viewApplicants}>
            {
                jobPosts.length > 0 ?
                jobPosts.map((job,index)=>{
                        return <JobCard key={index} job={job} button={button} index={index} />
                })
                :
                <div className="rec-no-post-container">
                    <div className="rec-no-post__img"></div>
                    <div className="rec-no-post__text">
                        Your posed jobs will show here!
                    </div>
                    <br/>
                    <br/>
                    <div className="rec-no-post__button">
                        <button onClick={()=>{props.history.push('/MyJobsPortal-ReactApp/postjob')}}>Post a Job</button> 
                    </div>
                    </div>
            }
            {
                jobPosts.length > 0 ?
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
            <ViewApplicantsModal showModal={showModal} handleModalClose={handleModalClose} jobApplicants={jobApplicants}/>
            </>
        }
     </>
   ) 
}

export default Recruiter;