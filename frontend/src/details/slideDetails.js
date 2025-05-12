
const slides = [
    {
        id: "example",
        slide: {
            questionType: "Multiple choice",
        },

        question: {
            label: "which language you prefer??",
        },

        multipleChoice: {
            visualizationType: {
                type: "Bars",
                showPercenrage: false,
            },

            options: [
                {
                    optionId: 1,
                    optionName: "Java",
                    optionPhoto: null,
                    optionVote: 1,
                },

                {
                    optionId: 2,
                    optionName: "Python",
                    optionPhoto: null,
                    optionVote: 1,
                }
            ],

            chooseCorectAnswers: false,
            selectMultipleAnswers: false,
            totalVote: 2,
        }
    },

    {
        id: "abc",
        slide: {
            questionType: "Multiple choice",
        },

        question: {
            label: "Which is important??",
        },

        multipleChoice: {
            visualizationType: {
                type: "Bars",
                showPercenrage: false,
            },

            options: [
                {
                    optionId: 1,
                    optionName: "Data structure",
                    optionPhoto: null,
                    optionVote: 1,
                },

                {
                    optionId: 2,
                    optionName: "Problem solving",
                    optionPhoto: null,
                    optionVote: 3,
                }
            ],

            chooseCorectAnswers: false,
            selectMultipleAnswers: false,
            totalVote: 4,
        }
    },

    {
        id: "xyz",
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
                    optionVote: 5,
                }
            ],

            chooseCorectAnswers: false,
            selectMultipleAnswers: false,
            totalVote: 5,
        }
    },

]

export { slides };