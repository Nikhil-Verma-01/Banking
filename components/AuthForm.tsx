'use client';

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomInput from './CustomInput';
import { authFormSchema } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { constants } from 'buffer';
import SignIn from '@/app/(auth)/sign-in/page';
import { useRouter } from 'next/navigation';
import { getLoggedInUser, signIn, signUp } from '@/lib/actions/user.actions';
import PlaidLink from './PlaidLink';
import { PasswordHash } from 'node-appwrite';

export const formSchema = z.object({
    email: z.string().email(),
})

const AuthForm = ({type}: {type: string}) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [isLoading, setisLoading] = useState(false);
   

    const formSchema = authFormSchema(type);

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password:""
    },
  })
 
    // 2. Define a submit handler.
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setisLoading(true);

        try {
            //Sign up with Appwrite & create plaid token
            const userData = {
                firstName: data.firstname!,
                lastName: data.lastname!,
                address1: data.address1!,
                city: data.city!,
                state: data.state!,
                postalCode: data.postalCode!,
                dateOfBirth: data.dateOfBirth!,
                ssn: data.ssn!,
                email: data.email,
                password: data.password,
            }

            if(type === 'sign-up'){
                const newUser = await signUp(userData);
                setUser(newUser);
            }

            if(type === 'sign-in'){
                const response = await signIn({
                    email: data.email,
                    password: data.password,
                })

                if(response) router.push('/');
            }
        } catch (error) {
           console.log(error); 
        }finally{
            setisLoading(false);
        }
      
        
    }

  return (
    <section className='auth-form'>
        <header className='flex flex-col gap-5 md:gap-8'>
            <Link href="/" className='mb-12 cursor-pointer flex items-center gap--1 px-4'>
                <Image src="/icons/logo.svg"
                    width={34}
                    height={34}
                    alt='Horizon logo'
                />
                <h1 className='text-26 font-ibm-plex-serif font-bold text-black-1'>Horizon</h1>
            </Link>

            <div className='flex flex-col gap-1 md:gap-3'>
                <h1 className='text-24 lg:text-36 font-semibod text-gray-900'>
                    {user
                     ? 'Link Account'
                     : type === 'sign-in'
                        ? 'Sign In'
                        : 'Sign-Up'
                    }
                    <p className='text-16 font-normal text-gray-600'>
                        {user
                            ? 'Link your account to get started'
                            : 'Please enter your details'
                        }
                    </p>
                </h1>
            </div>
        </header>
        {/* {user ? ( */}
            <div className='flex flex-col gap-4'>
                <PlaidLink user={user} variant='primary'/>
            </div>
            {/* ) : ( */}
            <>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        {type === 'sign-up' && (
                            <>
                                <div className='flex gap-4'>
                                    <CustomInput control={form.control} name='firstname'
                                    placeholder='Enter your First Name' label='First Name'/>

                                    <CustomInput control={form.control} name='lastname'
                                    placeholder='Enter your Last Name' label='Last Name'/>
                                </div>

                                <CustomInput control={form.control} name='address1'
                                placeholder='Enter your specific Address' label='Adress'/>

                                <CustomInput control={form.control} name='city'
                                placeholder='Enter your City' label='City'/>
                                
                                <div className='flex gap-4'>
                                    <CustomInput control={form.control} name='state'
                                    placeholder='ex: UP' label='State'/>

                                    <CustomInput control={form.control} name='postalCode'
                                    placeholder='ex: 11010' label='Postal Code'/>
                                </div>
                                
                                <div className='flex gap-4'>
                                    <CustomInput control={form.control} name='dateOfBirth'
                                    placeholder='yyyy-mm-dd' label='Date of Birth'/>

                                    <CustomInput control={form.control} name='ssn'
                                    placeholder='ex: 1234' label='SSN'/>
                                </div>
                                
                            </>
                        )} 
                        <CustomInput
                        name='email' label='Email' placeholder="Enter your email address" control={form.control}
                        />

                        <CustomInput
                        name='password' label='Password ' placeholder="Enter your email address" control={form.control}
                        />

                        <div className='flex flex-col gap-4'>
                            <Button type="submit" disabled={isLoading} className='form-btn'>
                                {isLoading ? (
                                    <>
                                        <Loader2 size={20} className='animate-spin'/> &nbsp;
                                        Loading...
                                    </>
                                ) : type === 'sign-in'
                                ? 'Sign In' : 'Sign Up'
                                }
                            </Button>
                        </div>
                        
                    </form>
                </Form>

                <footer className='flex justify-center gap-1'>
                    <p className='text-14 font-normal text-gray-600'>
                        {type === 'sign-in'
                        ? "Don't have an account"
                        : "Aldready have an account"}
                    </p>
                    <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className='form-link'>
                        {type === 'sign-in' ? 'Sign up' : 'Sign in'}
                    </Link>
                </footer>
            </>
            {/* )
        } */}
    </section>
  )
}

export default AuthForm