
import { createSlice } from "@reduxjs/toolkit";

function handleIncrementVote(state, action) {
    const { participationId, optionId } = action.payload;
    const slides = state.map((slide) => {
        if(slide.participationId !== participationId) return slide;

        const updatedOptions = slide.multipleChoice.options.map((option) => {
            if(option._id !== optionId) return option;

            return { ...option, optionVote: option.optionVote + 1 }
        })

        return {
            ...slide,
            multipleChoice : {
                ...slide.multipleChoice,
                totalVote: slide.multipleChoice.totalVote + 1,
                options: updatedOptions,
            }
        }
    })

    return slides;
}

// function handleUpdateOption(state, action) {
//     console.log(action.payload);
// }

const slidesArraySlice = createSlice({
    name: 'slidesArray',
    initialState: [],
    reducers: {
        initializeState: (state, action) => state = action.payload.slides,
        incrementVote: (state, action) => handleIncrementVote(state, action),
        addSlidesArray: (state, action) => { state.push(action.payload.slide) },
        // updateOption: (state, action) => handleUpdateOption(state, action),
    }
})

export const { addSlidesArray, initializeState, incrementVote } = slidesArraySlice.actions;  
export default slidesArraySlice.reducer;