import { useState } from "react";
import validateInputs from "../utils/validateInputs";

function useAuth(process) {

    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    const resetError = () => {
        setError(null);
    }

    const authenticate = async (inputs) => {

        try {
            setLoading(true);
            const validate = validateInputs(inputs);
            if(!validate.status) {
                setError(validate.error)
                setLoading(false);
                return {status: false};
            }

            const response = await fetch(`http://localhost:3000/api/auth/${process}`, {
                method: 'POST',
                body: JSON.stringify(inputs),
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            })
            const parsedResponse = await response.json();
            setLoading(false);

            if(!response.ok) {
                if(parsedResponse.error) {
                    console.log(parsedResponse.error);
                    return {status: false};
                } else {
                    console.log(parsedResponse);
                    setError(parsedResponse);
                    return {status: false};
                }
            }

            return {status: true, userId: parsedResponse.userId};
        } catch(err) {
            console.log('An error occured, Try again later...');
            return {status: false};
        }
    }

    return [loading, authenticate, error, resetError];
}

export default useAuth;