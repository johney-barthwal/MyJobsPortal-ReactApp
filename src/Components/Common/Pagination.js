import './pagination.css'
export const Pagination = (props) =>{
    return(
        <div className="pagination-container">
            <button 
                disabled={props.disablePrevious}
                onClick={props.handlePreviousPage}>Previous</button>
            <span>{props.displayPage}</span>
            <button 
                disabled={props.disableNext}
                onClick={props.handleNextPage}>Next
            </button>
        </div>
    );
}