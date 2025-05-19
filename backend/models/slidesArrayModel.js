
const mongoose = require("mongoose");

const slidesArraySchema = mongoose.Schema({
    slide: {
        questionType: {
            type: String,
            required: true,
        }
    },

    question: {
        label: {
            type: String,
            default: '',
        }
    },

    participationId: {
        type: String,
        unique: true,
        required: true,
    },

    multipleChoice: {
        visualizationType: {
            vType: {
                type: String,
                default: '',
            },
            
            showPercentage: {
                type: String,
                default: false,
            },
        },

        options: [
            {
                optionName: {
                    type: String,
                    default: '',
                },
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