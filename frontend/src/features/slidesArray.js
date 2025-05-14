
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

let counter = 0;
const slidesArraySlice = createSlice({
    name: 'slidesArray',
    initialState: [],
    reducers: {
        initializeState: (state, action) => state = action.payload.slides,
        incrementVote: (state, action) => handleIncrementVote(state, action),
        addSlide: (state) => {
            state.push({
                id: new Date().toDateString() + counter++,
                slide: {
                    questionType: "Multiple choice",
                },
        
                question: {
                    label: "",
                },
        
                multipleChoice: {
                    visualizationType: {
                        type: "Bars",
                        showPercenrage: false,
                    },
        
                    options: [
                        {
                            optionId: 1,
                            optionName: "option1",
                            optionPhoto: null,
                            optionVote: 0,
                        },
        
                        {
                            optionId: 2,
                            optionName: "option2",
                            optionPhoto: null,
                            optionVote: 0,
                        }
                    ],
        
                    chooseCorectAnswers: false,
                    selectMultipleAnswers: false,
                    totalVote: 0,
                }
            })
        }
    }
})

export const { addSlide, initializeState, incrementVote } = slidesArraySlice.actions;  
export default slidesArraySlice.reducer;