import { useState } from "react";
import { useDispatch } from "react-redux";
import { addSlidesArray } from "../features/slidesArray";

function useAddSlide() {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const addSlide = async () => {
        try {
            setLoading(true);
            const slide = {
                slide: {questionType: 'Multiple choice'},
                multipleChoice: {
                    options: [{optionName: 'option 1'}, {optionName: 'option 2'}]
                }
            }

            const response = await fetch('/api/slides/slide/add', {
                method: 'PATCH',
                body: JSON.stringify(slide),
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
            })

            const result = await response.json();
            if(result.error) {
                console.log(result.error);
                setLoading(false);
                return;
            }

            dispatch(addSlidesArray({slide: result.newSlide}));
            setLoading(false);
        } catch(err) {
            console.log("An error occured, Try again later");
            setLoading(false);
        }
        
    }

    return [loading, addSlide];
}

export default useAddSlide;