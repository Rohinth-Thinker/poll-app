
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './CreateMainContainer.css';

function CreateMainContainer({ selectedContainer, changeSelectedContainer, selectedSlide }) {

    const [question, options, totalVote] = [selectedSlide.question, selectedSlide.multipleChoice.options, selectedSlide.multipleChoice.totalVote];
    const [ input, setInput ] = useState(question.label);

    
    useEffect(() => {
        setInput(question.label);
        changeSelectedContainer("slide-container");
    }, [question])

    function handleInputChange(e) {
        setInput(e.target.value);
    }

    function handleSelectedContainer(e) {
        let containerName = e.target.getAttribute('data-container-name');
        console.log(containerName);

        if(selectedContainer === containerName) return;
        if(selectedContainer === "slide-container" && containerName === null) return;
        if(containerName === null) containerName = "slide-container";
        
       changeSelectedContainer(containerName);
    }

    function handleOutputContainerClick(e) {
        e.stopPropagation();
        e.target = e.currentTarget;
        handleSelectedContainer(e);
    }

    return (
        <div className="create-main-container" onClick={handleSelectedContainer} >
            <div className={`main-container ${selectedContainer === "slide-container" ? "add-container-active-border" : "add-container-hover-border"}`} data-container-name="slide-container" >
                <input className='input-ask-question' placeholder='Ask your question here...' value={input} onChange={handleInputChange} data-container-name="input-container" />
                <div onClick={handleOutputContainerClick} className={`show-output-container ${selectedContainer === "visualization-container" ? "add-container-active-border" : "add-container-hover-border"}`} data-container-name="visualization-container">
                    <div className="options-container">
                        { optionBarContainers(options, totalVote) }
                    </div>
                </div>
            </div>
        </div>
    )
}

function optionBarContainers(options, totalVote) {
    // console.log(options);
    const optionBars = options.map((option) => <ShowOptionBar totalVote={totalVote} option={option} key={option._id} /> );
    return optionBars;
}

function ShowOptionBar({ option, totalVote }) {

    const voteCount = option.optionVote;

    let voteHeight = "2px";
    if(voteCount) {
        voteHeight = `${(voteCount / totalVote) * 100}%`;
    }

    return (
        <div className="option">
            <div className="option-bar-container">
                <span className="option-vote-count">{ voteCount }</span>
                <div style={{ height: voteHeight }} className="option-bar"></div>
            </div>
            <span className="option-name">{option.optionName}</span>
        </div>
    )
}

export default CreateMainContainer;