import React, {useEffect, useState} from 'react';
import Forms from "@/components/Forms.jsx";
import {Link, useNavigate} from "react-router";
import {Helmet} from "react-helmet";
import {post} from "@/lib/apiHelper.js";
import toast from "react-hot-toast";
import useAuthStore from "@/stores/authStore.js";

const Login = () => {
    const navigate = useNavigate();

    const login = useAuthStore((state) => state.login);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated); // Access the correct state

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);


    const FormFields = [
        {
            fieldName: 'email',
            label: 'Email',
            inputType: 'email',
            required: true,
            placeholder: 'Enter your Email Address',
        },
        {
            fieldName: 'password',
            label: 'Password',
            inputType: 'password',
            required: true,
            placeholder: 'Enter your Password',
        },
    ];

    const onSubmit = async (values) => {
        try {
            const response = await post(`api/user/login`, values);
            if(response.status === 200){
                const data = await response.data;
                toast.success("Logged In successfully.");
                login(data.token);
                navigate('/dashboard');
            } else {
                toast.error("Sorry! Something went wrong, Please try again later.");
            }
        } catch (e) {
            console.log(e.message);
            toast.error("Sorry! Something went wrong, Please try again later.");
        }
    }

    return (
        <div className={'w-screen min-h-screen flex justify-center items-center bg-mintCream'}>
            <Helmet>
                <title>SpendSync - Login</title>
                <meta property="og:title" content="SpendSync - Login"/>
                <meta property="og:description" content="A page to login for accessing spendsync"/>
                <meta property="og:keywords" content="spendsync, login"/>
            </Helmet>
            <div
                className={'max-w-[420px] w-full h-[705px] flex flex-col items-center justify-center px-10 bg-white rounded-[20px] gap-8'}>
                <div className={'text-center flex flex-col gap-2'}>
                    <h1 className={'font-bold text-3xl'}>Welcome Back</h1>
                    <p className={'text-[#666] text-[0.95rem]'}>Enter your credentials to access your account</p>
                </div>
                <Forms formFields={FormFields} submitButtonLabel={'Sign In'} submitHandler={onSubmit} />
                <div>
                    Don't have an account? <Link to={'/sign-up'} className={'font-bold'}>Sign up</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;