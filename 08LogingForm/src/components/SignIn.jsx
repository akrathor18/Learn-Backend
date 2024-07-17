import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";

export function SignIn() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitSuccessful, },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await fetch('http://localhost:3000/sign-in', {
                method: 'POST', // Use POST method
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data), // Send the data as JSON
            });
    
            const resp = await response.text(); // Call .text() as a function
            console.log(data, resp);
        } catch (error) {
            console.error('Error during the fetch:', error);
        }
    };

    return (
        <section>
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
                    <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
                        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Sign in</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Don&apos;t have an account?{' '}
                            <Link
                                to={'/'}
                                title=""
                                className="font-semibold text-black transition-all duration-200 hover:underline"
                            >
                                Create a free account
                            </Link>
                        </p>
                        <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="" className="text-base font-medium text-gray-900">
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
                                        />
                                        {errors.Email && (
                                            <span className="text-red-500 text-sm">
                                                {errors.Email.message}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="" className="text-base font-medium text-gray-900">
                                            {' '}
                                            Password{' '}
                                        </label>
                                        <a
                                            href="#"
                                            title=""
                                            className="text-sm font-semibold text-black hover:underline"
                                        >
                                            {' '}
                                            Forgot password?{' '}
                                        </a>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            {...register('Password', {
                                                required: "This field is Required *",
                                                minLength: { value: 8, message: "Password must be 8 characters long" },
                                            })}
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="password"
                                            placeholder="Password"
                                        />
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
                                        Get started <ArrowRight className="ml-2" size={16} />
                                    </button>
                                </div>
                                
                                {
                                    isSubmitSuccessful&&(
                                        <span className={`text-green-600 font-bold`}>Login successfully</span>
                                    )
                                }
                            </div>
                        </form>
                    </div>
                </div>
                <div className="h-full w-full">
                    <img
                        className="mx-auto h-full w-full rounded-md object-cover"
                        src="https://images.unsplash.com/photo-1630673245362-f69d2b93880e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                        alt=""
                    />
                </div>
            </div>
        </section>
    );
}
