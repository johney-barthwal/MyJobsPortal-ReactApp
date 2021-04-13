import {Modal} from 'react-bootstrap';
import ApplicantCard from '../Common/ApplicantCard';
import './viewapplicationmodal.css'
const ViewApplicantsModal = (props) =>{
    const {showModal,handleModalClose,jobApplicants} = props;
    document.getElementsByClassName(".applicant-modal__body").innerHTML = "";
    return(
        <>  
            <Modal 
                size="lg"
                show={showModal} 
                onHide={handleModalClose} 
                backdrop="static"
                keyboard={false}
                scrollable={true}>
                <Modal.Header closeButton>
                    <Modal.Title>Applicants for this job</Modal.Title>
                </Modal.Header>
                <Modal.Body className="applicant-modal__body" >
                    <div className="no-of-applicants">{jobApplicants.length>0 ? `Total ${jobApplicants.length}` : "0"} applications</div>
                    <br/>
                    <div className="applicants-cards">
                    {
                        jobApplicants.length > 0 ?
                        jobApplicants.map((applicant)=>{
                            return <ApplicantCard applicant={applicant} />
                        })

                        :

                        <div className="no-application__wrapper">
                            <div>No applications available</div>
                        </div>
                    }
                    </div>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ViewApplicantsModal;
