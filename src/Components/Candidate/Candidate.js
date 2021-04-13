import {useEffect,useState} from 'react';
import {BASE_URL} from '../../config';
import axios from 'axios';
import JobCard from '../Common/JobCard'; 
import './candidate.css';
import {Pagination} from '../Common/Pagination';
import {LoadingComponent} from '../../Utility/LoadingComponent';

const Candidate = () => {
    const [loading,setLoading] = useState(false);
    const [jobsAll,setJobsAll] = useState([]);
    const [jobs,setJobs] = useState([]);
    const [totalJobs,setTotalJobs] = useState(0);
    const [page,setPage] = useState(1);
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
        axios.get(`${BASE_URL}/candidates/jobs?page=${page}`,config)
        .then((res)=>{
            if(res.data){
                setTotalJobs(res.data.metadata.count);
                setJobsAll(arr => [...arr,...res.data.data]);
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
        setJobs(jobsAll.slice(startIndex,endIndex));

        if(displayPage === 1 && jobsAll.length<jobsPerPage){
            setDisableNext(true);
        }
        else if(displayPage === 1) {
            setDisableNext(false);
        }

    },[jobsAll,displayPage]);

    const applyJob = (e)=>{
        let eleClasses = e.target.classList;
        let eleType = e.target.type;
        if(eleClasses.contains("job-card__action-btn") && eleType === "button"){
            let elementId = Number(e.target.parentNode.parentNode.parentNode.id);
            let index = elementId + ((displayPage-1)*jobsPerPage);
            let jobId = jobsAll[index].id;
            const config = {
                headers: { Authorization: user.data.token }
            };
            axios.post(`${BASE_URL}/candidates/jobs`,{
                "jobId": jobId
            },config)
            .then((res)=>{
                alert("Job applied successfully.");
                let tempArr = jobsAll.filter((pr, i) => i !== index);
                setJobsAll(tempArr)
            })
            .catch((err)=>{
                console.log(err);
            });
        }
    }

    const handleNextPage = () =>{
        if(displayPage+1 > 1){
            setDisablePrevious(false);
        }
        if(displayPage+1 === Math.ceil(totalJobs/12)){
            setDisableNext(true);
        }
        if((displayPage+1)*jobsPerPage > jobsAll.length
            && jobsAll.length !==totalJobs){
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
        setJobs(jobsAll.slice(startIndex,endIndex));
    };

    let button = {
        text : "Apply"
    };
    
    return (
        loading ? 
        <LoadingComponent/>
        :
        <>
        <div className="home-link">
            <div className="home-icon"></div>
            <div className="home-text"><a>Home</a></div>
        </div>
        <div className="page-title">Jobs for you</div>
        {
            jobs.length > 0 ?
            <section className="list-of-jobs" onClick={applyJob}>
            {
                jobs.map((job,index)=>{
                        return <JobCard key={job.id ? job.id : index} job={job} button={button} index={index} />;
                })
            }
            <Pagination displayPage={displayPage} 
                handleNextPage={handleNextPage}
                handlePreviousPage={handlePreviousPage} 
                disableNext={disableNext}
                disablePrevious={disablePrevious}
            />
            </section>
            :
            null
        }
    </> 
   ) 
}

export default Candidate;