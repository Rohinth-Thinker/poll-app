
import "./LoginPage.css";

function LoginPage() {
    
    return (
        <div className="sign-page">
            <div className="sign-page-main-container">
                <div className="logo-container"></div>
                <div className="sign-container">
                <span className='span-center text-create-free-account'>Log in to your account</span>
                    <span className='span-center text-using-email'>or using email</span>
                    <form>
                        <div className='input-container'>
                            <label className='input-label'>Email</label>
                            <input className='input-field' />
                            <span className='input-error'>Error is a error</span>
                        </div>

                        <div className='input-container'>
                            <label className='input-label'>Your password</label>
                            <input className='input-field' />
                        </div>

                        <button className='signup-btn'>Log in</button>
                        <button className="forget-password-btn">Forget password?</button>
                    </form>
                </div>

                <span className='text-aldready-have-an-account'>New to App?</span>
                <a href='#' className='text-login'>Sign up now</a>
            </div>
        </div>
    )
}

export default LoginPage;