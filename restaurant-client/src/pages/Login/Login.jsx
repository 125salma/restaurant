import { useContext, useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, replace, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import SocialLogin from '../../components/SocialLogin/SocialLogin';

const Login = () => {
    const [disabled, setDisabled] = useState(true);

    //signIn
    const { signIn } = useContext(AuthContext)
    const navigate = useNavigate();
    const location = useLocation();
    const from  = location?.state?.from?.pathname || "/";
    console.log('state in the location',location.state);


    // Captcha
    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleLogin = e => {

        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire({
                    title: "User Login Successfull",
                    showClass: {
                      popup: `
                        animate__animated
                        animate__fadeInUp
                        animate__faster
                      `
                    },
                    hideClass: {
                      popup: `
                        animate__animated
                        animate__fadeOutDown
                        animate__faster
                      `
                    }
                  });
            })
            navigate(from, {replace: true})
            .catch(error => {
                console.log(error.message)
            })
    }
//captcha
    const handleValidateCaptcha = (e) => {
        const user_captcha_value = e.target.value;
        console.log(user_captcha_value);

        if (validateCaptcha(user_captcha_value) == true) {
            setDisabled(false)
        }

        else {
            setDisabled(true)
        }
    }
    return (
        <>
            <Helmet>
                <title>Bistro Boss | Login</title>
            </Helmet>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center md:w-1/2 lg:text-left">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card bg-base-100 md:w-1/2  max-w-sm  shadow-2xl">
                        <form onSubmit={handleLogin} className="card-body">
                            <fieldset className="fieldset">
                                <label className="fieldset-label">Email</label>
                                <input type="email" name="email" className="input" placeholder="Email" />
                                <label className="fieldset-label">Password</label>
                                <input type="password" name="password" className="input" placeholder="Password" />
                                <div><a className="link link-hover">Forgot password?</a></div>
                                {/* captcha */}
                                <label className="fieldset-label">
                                    <LoadCanvasTemplate />
                                </label>
                                <input type="text" onBlur={handleValidateCaptcha} name="captcha" className="input" placeholder="type the captcha above" />
                                {/* <button className='btn btn-outline btn-xs mt-2'>Validate</button> */}
                                
                                {/* disabled={disabled} pore use korba upadoto thak  */}
                                <input disabled={false} className="btn btn-neutral mt-4" type="submit" value="Login" />
                            </fieldset>
                        </form>
                        <p className='text-center'><small>New Here? <Link to='/signup'>Create an account</Link></small></p>
                <SocialLogin></SocialLogin>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;