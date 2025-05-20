import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSocketContext } from "../../context/SocketContext";
import './ParticipatePage.css';

function ParticipatePage() {

    const [ slide, setSlide ] = useState(null);
    const [ selected, setSelected ] = useState(null);
    const {participationId} = useParams();
    const {socket} = useSocketContext();

    useEffect(() => {
        async function fetchOptions() {
            const response = await fetch(`http://localhost:3000/options/${participationId}`);
            const result = await response.json();
            setSlide(result);
        }

        if (participationId) fetchOptions();
    }, [participationId])

    useEffect(() => {
        if(socket) {
            socket.emit("join_room", participationId);
            socket.on('changed_optionName', handleOptionName);
            socket.on('changed_questionLabel', handleQuestionLabel);
            socket.on('added_newOption', handleAddNewOption);

            return () => {
                socket.off('changed_optionName', handleOptionName);
                socket.off('changed_questionLabel', handleQuestionLabel);
                socket.off('added_newOption', handleAddNewOption);
                socket.emit('leave_room', participationId);
            }
        }
    }, [socket, slide])

    function handleAddNewOption(newOption) {
        const options = [...slide.options, newOption];
        setSlide({...slide, options});
    }

    function handleQuestionLabel(questionText) {
        setSlide({...slide, question: questionText});
    }

    function handleOptionName(optionId, optionName) {   
        const options = slide?.options.map((option) => {
            if(option._id !== optionId) return option;

            return {...option, optionName};
        })

        setSlide({...slide, options});
    }
    
    function handleCheckboxChange(e) {
        if (selected !== e.target.value) {
            setSelected(e.target.value);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if(!selected) return;

        const response = await fetch("http://localhost:3000/option/increment", {
            method: "PATCH",
            body: JSON.stringify({participationId, optionId: selected}),
            headers: {
                "Content-Type": "application/json",
            }
        })
        console.log("SUBMITTED", await response.json());
    }

    if(!slide) return;

    return (
        <div className="participate-page-container">
            <h2>{slide?.question}</h2>
            <form onSubmit={handleSubmit}>
                { optionGenerator(slide?.options, selected, handleCheckboxChange) }
                <button type="submit" className="submit-btn">Submit</button>
            </form>
        </div>
    )
}

export default ParticipatePage;

function optionGenerator(options, selected, handleCheckboxChange) {
    const generatedOptions = options?.map((option) => {
        return (
            <div key={option._id} >
                <input type="checkbox" name="option" value={option._id} id={option._id}
                    checked={selected === option._id} onChange={handleCheckboxChange} />
                <label htmlFor={option._id} >{option.optionName}</label>
            </div>
        )
    })

    return generatedOptions;
}