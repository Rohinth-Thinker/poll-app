
import { useDispatch, useSelector } from 'react-redux';
import { addSlide } from '../../../../features/slidesArray';
import Slide from './components/Slide';
import './SlideDetailsContainer.css';

function SlideDetailsContainer({ handleSlideSwitch, loading }) {
    
    const slidesArray = useSelector((state) => state.slidesArray);
    const dispatch = useDispatch();

    function handleNewSlide() {
        dispatch(addSlide());
    }


    return (
        <div className='slide-details-container'>
            <div className="new-slide-container">
                <button className="new-slide-button" onClick={handleNewSlide} >+ New slide</button>
            </div>

            <div className="list-slide-container" >
                {loading && <span>LOADING...</span>}
                {!loading && slidesArray.length <= 0 && <span>No slides created yet</span>}
                { slidesGenerator(slidesArray, handleSlideSwitch) }
            </div>
        </div>
    )
}

function slidesGenerator(slides, handleSlideSwitch) {
    const result = slides.map((slide, index) => <Slide key={slide._id} id={slide._id} slideNumber={index+1} handleSlideSwitch={handleSlideSwitch} />)
    return result;
}

export default SlideDetailsContainer;