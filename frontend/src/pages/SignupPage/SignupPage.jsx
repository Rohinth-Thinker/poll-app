
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import ErrorSpanTag from '../../components/ErrorSpanTag';
import { useAuthContext } from '../../context/AuthContext';
import useAuth from '../../hooks/useAuth';
import './SignupPage.css';

function SignupPage() {

    const [ input, setInput ] = useState({ username:'', email: '', password: '' });
    const [loading, authenticate, error, resetError] = useAuth('signup');
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


    return (
        <div className='sign-page'>
            <div className="sign-page-main-container">
                <div className="logo-container"></div>
                <div className="sign-container">
                    <span className='span-center text-create-free-account'>Create a free account</span>
                    <span className='span-center text-using-email'>or using email</span>
                    <form onSubmit={handleSubmit}>
                        <div className='input-container'>
                            <label className='input-label'>First and last name</label>
                            <input className='input-field' value={input.username} onChange={(e) => handleInputChange({username: e.target.value})} />
                            {error?.occuredAt === 'username' && <ErrorSpanTag msg={error.msg} />}
                        </div>

                        <div className='input-container'>
                            <label className='input-label'>Email</label>
                            <input className='input-field' type="email" value={input.email} onChange={(e) => handleInputChange({email: e.target.value})} />
                            {error?.occuredAt === 'email' && <ErrorSpanTag msg={error.msg} />}
                        </div>

                        <div className='input-container'>
                            <label className='input-label'>Choose a password</label>
                            <input className='input-field' type="password" value={input.password} onChange={(e) => handleInputChange({password: e.target.value})} />
                            {error?.occuredAt === 'password' && <ErrorSpanTag msg={error.msg} />}
                        </div>

                        <button className={`signup-btn ${loading && 'disable'}`} disabled={loading}>Sign up</button>
                    </form>
                </div>

                <span className='text-accept-terms'>By signing up you accept our terms of use and policies</span>
                <span className='text-aldready-have-an-account'>Aldready have an account?</span>
                <NavLink to='/app/login' className='text-login'>Log in</NavLink>
            </div>
        </div>
    )
}

export default SignupPage;