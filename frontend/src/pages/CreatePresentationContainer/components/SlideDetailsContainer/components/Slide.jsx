import { useEffect } from 'react';
import { NavLink, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { PlayIcon, ThreeDotOptionIcon } from '../../../../../icons/Icon';

function Slide({ id, slideNumber, handleSlideSwitch }) {

    const query = new URLSearchParams(window.location.search);
    const slideId = query.get("slide");

    return (
        <div className={`slide ${(slideId === id) && 'active'}`} >
            <div className="slide-options">
                <PlayIcon />
                <span>{ slideNumber }</span>
                <ThreeDotOptionIcon />
            </div>
            <div className="slide-container"  onClick={() => handleSlideSwitch(id)} ></div>
        </div>
    )
}

export default Slide;