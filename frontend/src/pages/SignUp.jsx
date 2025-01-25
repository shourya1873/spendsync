import React from 'react';
import Forms from "@/components/Forms.jsx";
import {Link, useNavigate} from "react-router";
import {post} from "@/lib/apiHelper.js";
import toast from 'react-hot-toast';
import {Helmet} from "react-helmet";

const SignUp = () => {
    const navigate = useNavigate();

    const FormFields = [
        {
            fieldName: 'name',
            label: 'Name',
            inputType: 'text',
            required: true,
            placeholder: 'Enter your Name',
        },
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
        }
    ];

    const onSubmit = async (values) => {
        try {
            const response = await post(`api/user/register`, values);
            if(response.status === 200){
                toast.success("Your Account is created successfully.");
                toast(' Please verify your email to login.', {
                    icon: '⚠️', // Warning icon
                    duration: 5000, // Display duration
                    style: {
                        borderRadius: '8px',
                        background: '#fef3c7', // Light yellow background
                        color: '#92400e', // Dark amber text
                        padding: '16px',
                        border: '1px solid #fbbf24', // Yellow border
                    },
                });
                navigate('/login');
            } else {
                toast.error("Sorry! Something went wrong, Please try again later.");
            }
        } catch (e) {
            toast.error("Sorry! Something went wrong, Please try again later.");
        }
    }

    return (
        <div className={'w-screen min-h-screen flex justify-center items-center bg-mintCream'}>
            <Helmet>
                <title>SpendSync - Login</title>
                <meta property="og:title" content="SpendSync - SignUp"/>
                <meta property="og:description" content="A page to sign up for accessing spendsync"/>
                <meta property="og:keywords" content="spendsync, sign-up"/>
            </Helmet>
            <div className={'max-w-[420px] w-full h-[705px] flex flex-col items-center justify-center px-10 bg-white rounded-[20px] gap-8'}>
                <div className={'text-center flex flex-col gap-2'}>
                    <h1 className={'font-bold text-3xl'}>Welcome Back</h1>
                    <p className={'text-[#666] text-[0.95rem]'}>Enter your details to create your account</p>
                </div>
                <Forms formFields={FormFields} submitButtonLabel={'Sign Up'} submitHandler={onSubmit} />
                <div>
                    Already a user? <Link to={'/login'} className={'font-bold'}>Login</Link>
                </div>
            </div>
        </div>
    );
};

export default SignUp;