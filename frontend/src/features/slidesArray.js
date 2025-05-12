
import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { slides } from "../details/slideDetails";

// const exampleSlide = {
//     id: "6803d894a86a338aebbcc52a",
//     slide: {
//         questionType: "Multiple choice",
//     },

//     question: {
//         label: "which language you prefer??",
//     },

//     multipleChoice: {
//         visualizationType: {
//             type: "Bars",
//             showPercenrage: false,
//         },

//         options: [
//             {
//                 optionId: 1,
//                 optionName: "Java",
//                 optionPhoto: null,
//                 optionVote: 1,
//             },

//             {
//                 optionId: 2,
//                 optionName: "Python",
//                 optionPhoto: null,
//                 optionVote: 1,
//             }
//         ],

//         chooseCorectAnswers: false,
//         selectMultipleAnswers: false,
//         totalVote: 2,
//     }
// }

// function hello() {
//     useEffect(() => {
//         async function getAllSlides() {
//             const response = await fetch('http://localhost:3000/slides/all');
//             const slides = await response.json();
//             console.log(slides);
//             // dispatch(initializeState({ slides }));
//         }
//         let ignore = false;
//         getAllSlides();

//         return () => ignore = true;
//     }, [])
// }

async function fetchSlides() {
    const response = await fetch('http://localhost:3000/slides/all');
    const slides = await response.json();
    return slides;
}

function handleIncrementVote(state, action) {
    const { participationId, optionId } = action.payload;
    const slides = state.map((slide) => {
        if(slide.participationId !== participationId) return slide;

        const updatedOptions = slide.multipleChoice.options.map((option) => {
            if(option._id !== optionId) return option;

            return { ...option, optionVote: option.optionVote + 1 }
        })

        console.log("UU", updatedOptions);

        return {
            ...slide,
            multipleChoice : {
                ...slide.multipleChoice,
                totalVote: slide.multipleChoice.totalVote + 1,
                options: updatedOptions,
            }
        }
    })

    console.log("Working", slides);

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