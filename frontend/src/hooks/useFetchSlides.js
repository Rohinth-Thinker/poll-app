import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAuthContext } from "../context/AuthContext";
import { initializeState } from "../features/slidesArray";


function useFetchSlides() {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const {authUser} = useAuthContext();

    useEffect(() => {
        async function fetchSlides() {
            try {
                setLoading(true);
                const response = await fetch(`/api/slides/fetch`, {credentials: 'include'});
                const slides = await response.json();
                dispatch(initializeState({slides}));
                setLoading(false)
            } catch(err) {
                console.log('An error occured, Try again later...');
                setLoading(false);
            }
        }

        if(authUser) fetchSlides();
    }, [authUser])

    return [loading];
}

export default useFetchSlides;