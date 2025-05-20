import { useState } from "react";
import { useDispatch } from "react-redux";
import { addOptionInSlidesArray } from "../features/slidesArray";

function useAddOption() {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const addOption = async (selectedSlideId, optionNumber, participationId) => {
        try {
            setLoading(true);
            const response = await fetch('http://localhost:3000/api/slides/slide/option/add', {
                method: 'PATCH',
                body: JSON.stringify({selectedSlideId, optionName: `option ${optionNumber}`, participationId}),
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
            })

            const result = await response.json();
            if(result.error) {
                console.log(result.error);
                setLoading(false)
                return;
            }

            dispatch(addOptionInSlidesArray({selectedSlideId, newOption: result}));
            setLoading(false)
        } catch(err) {
            console.log("An error occured, Try again later...");
            setLoading(false);
        }
    }


    return [loading, addOption];
}

export default useAddOption;