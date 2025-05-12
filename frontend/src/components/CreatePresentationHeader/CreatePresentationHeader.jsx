
import { BackIcon, PreviewIcon, SettingsIcon } from '../../icons/Icon';
import './CreatePresentationHeader.css';

function CreatePresentationHeader() {
    return (
        <div className='create-presentation-header'>
            <div className="left-section">
                <div className='back-icon-container'> <BackIcon /> </div>
                <div className="presentation-details">
                    <div className="presentation-name">New quiz</div>
                    <div className="project-details"># My presentation</div>
                </div>
                <div className="seperating-line"></div>
                <div className="settings-icon-container"> <SettingsIcon /> </div>
            </div>
            <div className="middle-section">
                <div className="create-tab tab">Create</div>
                <div className="results-tab tab">Results</div>
            </div>
            <div className="right-section">
                <div className="preview-icon-container"> <PreviewIcon /> </div>
                <button className="share-presentation-button">Share</button>
                <button className="present-presentation-button">Present</button>
            </div>
        </div>
    )
}

export default CreatePresentationHeader;