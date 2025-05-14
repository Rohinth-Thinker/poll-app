import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import './ParticipatePage.css';


// const options = [
//     {
//         _id: "1",
//         optionName: "Java",
//         optionPhoto: null,
//         optionVote: 1,
//     },

//     {
//         _id: "2",
//         optionName: "Python",
//         optionPhoto: null,
//         optionVote: 1,
//     }
// ]

function ParticipatePage() {

    const [ slide, setSlide ] = useState([]);
    const [ selected, setSelected ] = useState(null);
    const {participationId} = useParams();

    useEffect(() => {
        async function fetchOptions() {
            const response = await fetch(`http://localhost:3000/options/${participationId}`);
            const result = await response.json();
            setSlide(result);
        }

        if (participationId) fetchOptions();
    }, [participationId])
    
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

    return (
        <div className="participate-page-container">
            <h2>{slide.question}</h2>
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