import React, { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import SocialLogin from '../../components/SocialLogin/SocialLogin';


const SignUp = () => {
    const axiosPublic = useAxiosPublic();
    //react hook form
    const { register, handleSubmit, reset, watch, formState: { errors }, } = useForm();

    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const onSubmit = (data) => {
        console.log(data)

        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user
                console.log(loggedUser);
                //update profile
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        // console.log('User Profile into updated');
                        // create user entry in the databse
                        const userInfo = {
                            name: data.name,
                            email: data.email
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                console.log('user added to the database')
                                if (res.data.insertedId) {
                                    reset();
                                    Swal.fire({
                                        position: "top-end",
                                        icon: "success",
                                        title: "User Created Successfully",
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    //signup er por login korte pathiye dibo icha
                                    navigate('/')
                                }
                            })

                    })
                    .catch((error) => {
                        console.log(error);
                    })
            })
            .catch(errors => {
                console.log(errors)
            })

    }



    return (
        <>
            <Helmet>
                <title>Bistro Boss | Sign Up</title>
            </Helmet>
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Sign up now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                            quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <fieldset className="fieldset">
                                <label className="fieldset-label">Name</label>
                                <input type="text" {...register("name", { required: true })} name='name' className="input" placeholder="Name" />
                                {errors.name && <span className='text-red-600'>Name is required</span>}

                                <label className="fieldset-label">Photo URL</label>
                                <input type="text" {...register("photoURL", { required: true })} className="input" placeholder="Photo URL" />
                                {errors.photoURL && <span className='text-red-600'>Photo URL is required</span>}

                                <label className="fieldset-label">Email</label>
                                <input type="email" {...register("email", { required: true })} name='email' className="input" placeholder="Email" />
                                {errors.email && <span className='text-red-600'>Email is required</span>}

                                <label className="fieldset-label">Password</label>
                                <input type="password" {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/

                                })} name='password' className="input" placeholder="Password" />
                                {errors.password?.type === "required" && (
                                    <p className='text-red-600'>Password is required</p>
                                )}
                                {errors.password?.type === "minLength" && (
                                    <p className='text-red-600'>Password must be 6 characters</p>
                                )}
                                {errors.password?.type === "maxLength" && (
                                    <p className='text-red-600'>Password must be less than 20 characters</p>
                                )}
                                {errors.password?.type === "pattern" && (
                                    <p className='text-red-600'>Password must have one Uppercase one lower case, one number and one spatical character</p>
                                )}

                                <div><a className="link link-hover">Forgot password?</a></div>
                                <input type="submit" className="btn btn-neutral mt-4" value="SIGN UP" />

                            </fieldset>
                        </form>
                        <p className='text-center'><small>Already have an account <Link to="/login">Login</Link></small></p>
                        <SocialLogin></SocialLogin>

                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;