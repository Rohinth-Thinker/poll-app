import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import CreatePresentationHeader from "../../components/CreatePresentationHeader/CreatePresentationHeader";
import HeaderContainer from "../../components/HeaderContainer/HeaderContainer";
import { useSocketContext } from "../../context/SocketContext";
import { incrementVote } from "../../features/slidesArray";
import useFetchSlides from "../../hooks/useFetchSlides";
import CreateMainContainer from "./components/CreateMainContainer/CreateMainContainer";
import OptionsContainer from "./components/OptionsContainer/OptionsContainer";
import SlideDetailsContainer from "./components/SlideDetailsContainer/SlideDetailsContainer";

import './CreatePresentationContainer.css';

function CreatePresentationContainer() {

    const slidesArray = useSelector((state) => state.slidesArray);
    const dispatch = useDispatch();
    const [ selectedContainer, setSelectedContainer ] = useState("slide-container");
    const { socket } = useSocketContext();
    const [ searchParams, setSearchParams ] = useSearchParams();
    const slideId = searchParams.get("slide");
    const [loading] = useFetchSlides();
    
    useEffect(() => {
        if(socket) {
            socket.on("vote_incremented", (...arg) => {
                const [ participationId, optionId ] = [...arg];
                dispatch(incrementVote({ participationId, optionId }));
            })
        }
    }, [socket])

    function handleSlideSwitch(id) {
        if(slideId !== id) {
            setSearchParams({slide: id});
        }
    }

    console.log(slidesArray);

    const selectedSlide = slidesArray.find((slide) => slide._id === slideId );

    return (
        <div className="create-presentation-container">
            <HeaderContainer />
            <CreatePresentationHeader />

            <div className="edit-main-container">
                <SlideDetailsContainer handleSlideSwitch={handleSlideSwitch} loading={loading} />
                { selectedSlide ?
                    <>
                        <CreateMainContainer selectedSlide={selectedSlide} selectedContainer={selectedContainer} changeSelectedContainer={setSelectedContainer} />
                        <OptionsContainer selectedContainer={selectedContainer} selectedSlide={selectedSlide} />
                    </>
                        :
                    <div>welcome</div>
                }
            </div>
        </div>
    )
}

export default CreatePresentationContainer;