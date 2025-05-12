
import { useState } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import './SignupPage.css';

function SignupPage() {

    const [ input, setInput ] = useState({ username:'', email: '', password: '' });
    const {setAuthUser} = useAuthContext();

    function handleInputChange(obj) {
        setInput({...input, ...obj});
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(input);
        localStorage.setItem('user', JSON.stringify({userId: "6821f47fcb50369f618ae7fd"}));
        setAuthUser({userId: '6821f47fcb50369f618ae7fd'});
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
                            <span className='input-error'>Error is a error</span>
                        </div>

                        <div className='input-container'>
                            <label className='input-label'>Email</label>
                            <input className='input-field' type="email" value={input.email} onChange={(e) => handleInputChange({email: e.target.value})} />
                        </div>

                        <div className='input-container'>
                            <label className='input-label'>Choose a password</label>
                            <input className='input-field' type="password" value={input.password} onChange={(e) => handleInputChange({password: e.target.value})} />
                        </div>

                        <button className='signup-btn'>Sign up</button>
                    </form>
                </div>

                <span className='text-accept-terms'>By signing up you accept our terms of use and policies</span>
                <span className='text-aldready-have-an-account'>Aldready have an account?</span>
                <a href='#' className='text-login'>Log in</a>
            </div>
        </div>
    )
}

export default SignupPage;