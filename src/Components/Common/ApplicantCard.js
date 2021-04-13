import {Card} from 'react-bootstrap';
import './applicantcard.css'
const ApplicantCard = (props) => {
    const {applicant,index} = props;
    return (
        <Card id={index} className="applicant-card">
        <Card.Body>
            <div className="applicant-card-info__wrapper">
                <button className="applicant-card__profile-btn">C</button>
                <div>
                    <Card.Text className="applicant-card__profile-name">{applicant.name}</Card.Text>
                    <Card.Text className="applicant-card__profile-email">{applicant.email}</Card.Text>
                </div>
            </div>
            <div className="applicant-card-skills_wrapper">
                <div className="applicant-card__skills-label">Skills</div>
                <Card.Text className="applicant-card__skills-text">{applicant.skills}</Card.Text>
            </div>
        </Card.Body>
    </Card>
    )
}

export default ApplicantCard;