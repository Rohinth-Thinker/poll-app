
const mongoose = require("mongoose");

const slidesArraySchema = mongoose.Schema({
    slide: {
        questionType: String,
    },

    question: {
        label: String,
    },

    participationId: {
        type: String,
        unique: true,
    },

    multipleChoice: {
        visualizationType: {
            vType: String,
            showPercentage: Boolean,
        },

        options: [
            {
                optionName: String,
                optionPhoto: {
                    type: String,
                    default: null,
                },
                optionVote: {
                    type: Number,
                    default: 0,
                }
            }
        ],

        chooseCorrectAnswers: {
            type: Boolean,
            default: false,
        },

        selectMultipleAnswers: {
            type: Boolean,
            default: false,
        },

        totalVote: {
            type: Number,
            default: 0,
        }
    }
})

module.exports = mongoose.model('slidesArray', slidesArraySchema, 'slidesArray');