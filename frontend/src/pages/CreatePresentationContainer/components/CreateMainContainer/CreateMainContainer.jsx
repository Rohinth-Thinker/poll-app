
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { updateQuestion } from '../../../../features/slidesArray';
import './CreateMainContainer.css';

function CreateMainContainer({ selectedContainer, changeSelectedContainer, selectedSlide}) {

    const [question, options, totalVote] = [selectedSlide.question, selectedSlide.multipleChoice.options, selectedSlide.multipleChoice.totalVote];
    const dispatch = useDispatch();
    const debounceRef = useRef(null);
    const prevValueRef = useRef(question.label);


    async function handleInputChange(e) {
        try {
            clearTimeout(debounceRef.current);
            dispatch(updateQuestion({selectedSlideId: selectedSlide._id, questionText: e.target.value}))

            debounceRef.current = setTimeout(async () => {
                const response = await fetch('http://localhost:3000/api/slides/slide/question/handle/label', {
                    method: 'PATCH',
                    body: JSON.stringify({selectedSlideId: selectedSlide._id, questionText: e.target.value, participationId: selectedSlide.participationId}),
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: 'include',
                })

                const result = await response.json();
                if(!response.ok || !result.modifiedCount) {
                    dispatch(updateQuestion({selectedSlide: selectedSlide._id, questionText: prevValueRef.current}));
                    return;
                }

                prevValueRef.current = e.target.value;
            }, 500)
        } catch(err) {
            console.log('An error occured, Try again later...');
        }
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
                <input className='input-ask-question' placeholder='Ask your question here...' value={question.label} onChange={handleInputChange} data-container-name="input-container" />
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