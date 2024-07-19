import { React, useState } from 'react'
import { ArrowRight, EyeOff, Eye } from 'lucide-react'
import { Link,useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";

export function SignUp() {
    const navigate = useNavigate();
    const [formResp, setFormResp] = useState()
    const [showPass, setShowPass] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitSuccessful, },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await fetch('http://localhost:3000/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const resp = await response.json();
            setFormResp(resp)
            if (resp.status === 201) {
                setTimeout(() => {
                  navigate('/sign-in');
                }, 1500);
              }
        } catch (error) {
            console.error('Error during the fetch:', error);
        }
    };

    return (

        <section>
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                    <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Sign up</h2>
                        <p className="mt-2 text-base text-gray-600">
                            Already have an account?{' '}
                            <Link
                                to={"/sign-in"}
                                title=""
                                className="font-medium text-black transition-all duration-200 hover:underline"
                            >
                                Sign In
                            </Link>
                        </p>
                        <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="name" className="text-base font-medium text-gray-900">
                                        {' '}
                                        Full Name{' '}
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            {...register('fName', {
                                                required: "This field is Required *",
                                                minLength: { value: 5, message: "Name lenght atleast 4 charachter longe" },
                                                maxLength: { value: 30, message: "Name lenght atleast 30 charachter short" },
                                            })}
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="text"
                                            placeholder="Full Name"
                                            id="name"
                                        />
                                        {errors.fName && (
                                            <span className="text-red-500 text-sm">
                                                {errors.fName.message}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="email" className="text-base font-medium text-gray-900">
                                        {' '}
                                        Email address{' '}
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            {...register('Email', {
                                                required: "This field is Required *",
                                                minLength: { value: 8, message: "Invalid Email" },
                                            })}
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="email"
                                            placeholder="Email"
                                            id="email"
                                        />
                                        {errors.Email && (
                                            <span className="text-red-500 text-sm">
                                                {errors.Password.message}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="text-base font-medium text-gray-900">
                                            {' '}
                                            Password{' '}
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            {...register('Password', {
                                                required: "This field is Required *",
                                                minLength: { value: 8, message: "Password must be 8 characters long" },

                                            })}
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type={showPass?'text':"Password"}
                                            placeholder="Password"
                                            id="password"
                                        />
                                        <div  className="relative right-3 inline-block cursor-pointer"
                                        style={{left: "40%", top:"-30px"}}
                                        onClick={()=> setShowPass(!showPass)}
                                        >
                                            {showPass ? <EyeOff /> : <Eye />}
                                        </div>
                                        {errors.Password && (
                                            <span className="text-red-500 text-sm">
                                                {errors.Password.message}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <button
                                        disabled={isSubmitting}
                                        type="submit"
                                        className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                                    >
                                        Create Account <ArrowRight className="ml-2" size={16} />
                                    </button>

                                    {
                                        isSubmitSuccessful && (
                                            <span className={`${formResp.status == 409 ? 'text-red-500' : 'text-green-500'} font-bold`}>{formResp.msg}</span>
                                        )
                                    }
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
                <div className="h-full w-full">
                    <img
                        className="mx-auto h-full w-full rounded-md object-cover"
                        src="https://images.unsplash.com/photo-1559526324-4b87b5e36e44?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
                        alt=""
                    />
                </div>
            </div>
        </section>
    )
}
