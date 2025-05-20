
import { useState } from 'react';
import { BackIcon, PreviewIcon, SettingsIcon } from '../../icons/Icon';
import './CreatePresentationHeader.css';

function CreatePresentationHeader({participationId}) {
    const [isCopied, setIsCopied] = useState(false);
    async function handleShare() {
        console.log("COPYING...")
        await navigator.clipboard.writeText(`https://poll-app-jp9w.onrender.com/participate/${participationId}`);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);

    }
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
                <button className="share-presentation-button" onClick={handleShare} disabled={isCopied || !participationId}>
                    {isCopied ? 'copied': 'Share'}
                </button>
                <button className="present-presentation-button">Present</button>
            </div>
        </div>
    )
}

export default CreatePresentationHeader;