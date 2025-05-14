import { useState } from "react";
import { AddImageButtonIcon, BarsVisualizationIcon, CommentsOptionIcon, DonutVisualizationIcon, DotsVisualizationIcon, EditOptionIcon, InteractivityOptionIcon, PieVisualizationIcon, QuestionMarkIcon, TemplatesOptionIcon, ThemesOptionIcon, WrongIcon } from "../../../../icons/Icon";

import './OptionsContainer.css';
// classname : BCP - both-container-properties, SOC - single-option-container,

function OptionsContainer({ selectedContainer, selectedSlide }) {

    return (
        <div className="options-container">
            <div className="sub-container">
                <OptionPropertiesContainer selectedContainer={selectedContainer} selectedSlide={selectedSlide} />

                <div className="selection-option-container">
                    <div className="top-container BCP">
                        <div className="edit-option-container SOC selected"> 
                            <EditOptionIcon />
                            <span>Edit</span>
                        </div>
                        <div className="comments-option-container SOC">
                            <CommentsOptionIcon />
                            <span>Comments</span>
                        </div>
                    </div>
                    <div className="bottom-container BCP">
                        <div className="interactivity-option-container SOC">
                            <InteractivityOptionIcon />
                            <span>Interactivity</span>
                        </div>
                        <div className="themes-option-container SOC">
                            <ThemesOptionIcon />
                            <span>Themes</span>
                        </div>
                        <div className="templates-option-container SOC">
                            <TemplatesOptionIcon />
                            <span>Templates</span>
                        </div>

                    </div>

                    <div className="help-container">
                        <div className="question-mark-icon-container">
                            <QuestionMarkIcon />
                        </div>
                    </div>
                    

                </div>
            </div>
            
            
        </div>
    )
}

function OptionPropertiesContainer({selectedContainer, selectedSlide}) {
    if(selectedContainer === "slide-container") {
        return (
            <div className="option-properties-container">
                <div className="option-prop-header-container">
                    <span className="header-text">Slide</span>
                    <WrongIcon />
                </div>
                <div className="sections">
                    <div className="section">
                        <span className="label">Question type</span>
                        <div className="select-question-types">Multiple Choice</div>
                    </div>

                    <div className="divider"></div>

                    <div className="section">
                        <span className="label">Image</span>
                        <span className="description">We support png</span>
                        <div className="upload-image-container">Multiple Choice</div>
                    </div>

                    <div className="divider"></div>

                    <div className="section">
                        <span className="label">Background</span>
                        <div className="add-background-container gap-even">
                            <div className="select-background-color">
                                <span>Background color</span>
                                <input className="color-picker" type="color" />
                            </div>
                            <div className="select-background-image">
                                <span>Background image</span>
                                <button>+ Add</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
    else if(selectedContainer === "visualization-container") {
        const visualizationType = selectedSlide.multipleChoice.visualizationType.type;
        const options = selectedSlide.multipleChoice.options;
        
        return (
            <div className="option-properties-container">
                <div className="option-prop-header-container">
                    <span className="header-text">Multiple choice</span>
                    <WrongIcon />
                </div>
                <div className="sections">
                    <div className="section">
                        <span className="label">Visualization type</span>
                        <div className="visualization-types">
                            <div className={`v-type ${visualizationType === "Bars" && "add-border"}`}><BarsVisualizationIcon /></div>
                            <div className={`v-type ${visualizationType === "Donut" && "add-border"}`}><DonutVisualizationIcon /></div>
                            <div className={`v-type ${visualizationType === "Pie" && "add-border"}`}><PieVisualizationIcon /></div>
                            <div className={`v-type ${visualizationType === "Dots" && "add-border"}`}><DotsVisualizationIcon /></div>
                        </div>
                        <div className="add-background-container gap-even">
                            <div className="select-background-image">   
                                <span>Show responses as percentage</span>
                                <button>+ Add</button>
                            </div>
                        </div>
                    </div>

                    <div className="divider"></div>

                    <div className="section">
                        <span className="label">Options</span>
                        { optionGenerator(options) }

                        <button className="add-answer-option-button">+ Add option</button>
                        
                        <div className="add-background-container gap-even">
                            <div className="select-background-image">   
                                <span>choose correct answers</span>
                                <button>+ Add</button>
                            </div>
                        </div>

                        <div className="add-background-container gap-even">
                            <div className="select-background-image">   
                                <span>Select multiple options</span>
                                <button>+ Add</button>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        )
    }
}

function optionGenerator(options) {
    const generatedOptions = options.map((option) => <AnswerOption key={option._id} option={option} />);
    return generatedOptions;
}

function AnswerOption({ option }) {

    const [ input, setInput ] = useState(option.optionName);

    function handleChange(e) {
        setInput(e.target.value)
    }

    return (
        <div className="answer-option">
            <input className="input-answer-option" value={input} onChange={handleChange} />
            <button><AddImageButtonIcon /></button>
            <button><WrongIcon /></button>
        </div>
    )
}

export default OptionsContainer;