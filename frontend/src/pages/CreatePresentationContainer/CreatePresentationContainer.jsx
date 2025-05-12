import { useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import CreatePresentationHeader from "../../components/CreatePresentationHeader/CreatePresentationHeader";
import HeaderContainer from "../../components/HeaderContainer/HeaderContainer";
import { useAuthContext } from "../../context/AuthContext";
import { useSocketContext } from "../../context/SocketContext";
import { slides } from "../../details/slideDetails";
import { incrementVote, initializeState } from "../../features/slidesArray";
import CreateMainContainer from "./components/CreateMainContainer/CreateMainContainer";
import OptionsContainer from "./components/OptionsContainer/OptionsContainer";
import SlideDetailsContainer from "./components/SlideDetailsContainer/SlideDetailsContainer";

import './CreatePresentationContainer.css';

function CreatePresentationContainer() {

    const slidesArray = useSelector((state) => state.slidesArray);
    const dispatch = useDispatch();
    const [ selectedContainer, setSelectedContainer ] = useState("slide-container");
    // const { slideId="example" } = useParams();
    const { socket } = useSocketContext();
    const [ searchParams, setSearchParams ] = useSearchParams();
    const slideId = searchParams.get("slide");
    const {authUser} = useAuthContext();
    
    useEffect(() => {
        if(socket) {
            socket.on("vote_incremented", (...arg) => {
                const [ participationId, optionId ] = [...arg];
                dispatch(incrementVote({ participationId, optionId }));
            })
        }
    }, [socket])

    useEffect(() => {
        async function fetchSlides() {
            const response = await fetch(`http://localhost:3000/slides/${authUser.userId}`);
            const slides = await response.json();
            dispatch(initializeState({slides}));
        }

        if(authUser) fetchSlides();
    }, [authUser])

    function handleSlideSwitch(id) {
        if(slideId !== id) {
            setSearchParams({slide: id});
        }
    }

    // useEffect(() => {
    //     async function getAllSlides() {
    //         const response = await fetch('http://localhost:3000/slides/all');
    //         const slides = await response.json();
    //         console.log(slides);
    //         dispatch(initializeState({ slides }));
    //     }
    //     let ignore = false;
    //     getAllSlides();

    //     return () => ignore = true;
    // }, [])

    console.log(slidesArray);
    // const s = slidesArray.find((slide) => slide.id === slideId );
    // console.log(slidesArray[0]._id === slideId);
    
    if (slidesArray.length <= 0) return;

    const selectedSlide = slidesArray.find((slide) => slide._id === slideId );

    return (
        <div className="create-presentation-container">
            <HeaderContainer />
            <CreatePresentationHeader />

            <div className="edit-main-container">
                <SlideDetailsContainer handleSlideSwitch={handleSlideSwitch} />
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