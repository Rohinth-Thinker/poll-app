
import { useState } from "react";
import { NavLink } from "react-router-dom";
import ErrorSpanTag from "../../components/ErrorSpanTag";
import { useAuthContext } from "../../context/AuthContext";
import useAuth from "../../hooks/useAuth";
import "./LoginPage.css";

function LoginPage() {
    const [ input, setInput ] = useState({ email: '', password: '' });
    const [loading, authenticate, error, resetError] = useAuth('login');
    const {setAuthUser} = useAuthContext();

    function handleInputChange(obj) {
        if(error) {
            resetError();
        }
        setInput({...input, ...obj});
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const response = await authenticate(input);
        if(!response.status) return;
        localStorage.setItem('userId', JSON.stringify({userId: response.userId}));
        setAuthUser({userId: response.userId});
    }

    function handleForgotPassword(e) {
        e.preventDefault();
        console.log("FORGOT PASSWORD IS NOT AVAILABLE YET...");
    }

    return (
        <div className="sign-page">
            <div className="sign-page-main-container">
                <div className="logo-container"></div>
                <div className="sign-container">
                <span className='span-center text-create-free-account'>Log in to your account</span>
                    <span className='span-center text-using-email'>or using email</span>
                    <form onSubmit={handleSubmit}>
                        <div className='input-container'>
                            <label className='input-label'>Email</label>
                            <input type="email" className='input-field' value={input.email} onChange={(e) => handleInputChange({email: e.target.value})} />
                            {error?.occuredAt === 'email' && <ErrorSpanTag msg={error.msg} />}
                        </div>

                        <div className='input-container'>
                            <label className='input-label'>Your password</label>
                            <input type="password" className='input-field' value={input.password} onChange={(e) => handleInputChange({password: e.target.value})} />
                            {error?.occuredAt === 'password' && <ErrorSpanTag msg={error.msg} />}
                        </div>

                        <button type="submit" className={`signup-btn ${loading && 'disable'}`} disabled={loading}>Log in</button>
                        <button className="forget-password-btn" onClick={handleForgotPassword}>Forget password?</button>
                    </form>
                </div>

                <span className='text-aldready-have-an-account'>New to App?</span>
                <NavLink to='/app/signup' className='text-login'>Sign up now</NavLink>
            </div>
        </div>
    )
}

export default LoginPage;