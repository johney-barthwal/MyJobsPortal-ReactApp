import {Card,Button} from 'react-bootstrap';

const JobCard = (props) => {
    const {job,button,index} = props;
    return (
        <Card id={index} className="job-card">
        <Card.Body>
        <Card.Title className="job-card__title">{job.title}</Card.Title>
        <div className="job-card__text-wrapper">
            <Card.Text className="job-card__text">{job.description}</Card.Text>
        </div>
        <div className="job-card__action">
            <div className="location-img"></div>
            <div className="job-card__location">{job.location}</div>
            { button ? <Button className="job-card__action-btn">{button.text}</Button> : null}
        </div>
        </Card.Body>
    </Card>
    )
}

export default JobCard;