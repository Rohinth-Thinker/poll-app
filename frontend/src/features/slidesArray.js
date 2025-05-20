
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

function handleUpdateOption(state, action) {
    const {selectedSlideId, optionId, optionName} = action.payload;
    const slides = state.map((slide) => {
        if(slide._id !== selectedSlideId) return slide;

        const updatedOptions = slide.multipleChoice.options.map((option) => {
            if(option._id !== optionId) return option;

            return {...option, optionName};
        })

        return {
            ...slide,
            multipleChoice: {
                ...slide.multipleChoice,
                options: updatedOptions,
            }
        }
    })

    return slides;
}

function handleAddOption(state, action) {
    const {selectedSlideId, newOption} = action.payload;
    const slides = state.map((slide) => {
        if(slide._id !== selectedSlideId) return slide;

        return {
            ...slide,
            multipleChoice: {
                ...slide.multipleChoice,
                options: [...slide.multipleChoice.options, newOption]
            }
        };
    })

    return slides;
}

function handleUpdateQuestion(state, action) {
    const {selectedSlideId, questionText} = action.payload;
    const slides = state.map((slide) => {
        if(slide._id !== selectedSlideId) return slide;

        return {
            ...slide,
            question: {
                label: questionText,
            }
        }
    })

    return slides;
}

const slidesArraySlice = createSlice({
    name: 'slidesArray',
    initialState: [],
    reducers: {
        initializeState: (state, action) => state = action.payload.slides,
        incrementVote: (state, action) => handleIncrementVote(state, action),
        addSlidesArray: (state, action) => { state.push(action.payload.slide) },
        updateQuestion: (state, action) => handleUpdateQuestion(state, action),
        updateOption: (state, action) => handleUpdateOption(state, action),
        addOptionInSlidesArray: (state, action) => handleAddOption(state, action),
    }
})

export const { 
    addSlidesArray, initializeState, incrementVote, updateOption, addOptionInSlidesArray,
    updateQuestion,
} = slidesArraySlice.actions;  
export default slidesArraySlice.reducer;