import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './logoadpme_a.png'
import { ServiceUtilisateur } from '../../ServiceUtilisateur/ServiceUtilisateur';
import axios from 'axios'

function Login(props) {
    const [mail, setMail] = useState('')
    const [mdp, setMdp] = useState('')
    const nav = useNavigate()
    const Form = (e) => {
        e.preventDefault();
        if (mail && mdp) {
            if(mail == "adpmebackofficetest@test.com" && mdp =="testb@ck0ffice")
            {
                ServiceUtilisateur.SaveUserMail(mail)
                ServiceUtilisateur.SaveUserPass(mdp)
                alert("Bienvenue " + mail)
                nav("/admin")
            }
            
        }else{
            return alert("Tous les champs sont requis !")
        }
    }
    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-row items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-96 h-26 mr-2" src={logo} alt="logo"/>
                    </a>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Connectez-vous
                            </h1>
                            <form onSubmit={Form} className="space-y-4 md:space-y-6">
                                <div>
                                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                    <input 
                                        onChange={(e) => setMail(e.target.value)}
                                        value={mail} 
                                        type="email" 
                                        name="email" 
                                        id="email" 
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        placeholder="name@company.com" 
                                        required=""
                                    />
                                </div>
                                <div className='pb-10'>
                                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                    <input 
                                        onChange={(e) => setMdp(e.target.value)}
                                        value={mdp} 
                                        type="password" 
                                        name="password" 
                                        id="password" 
                                        placeholder="••••••••" 
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                        required=""
                                    />
                                </div>
                                <a>
                                    <button type="submit" className="w-full bg-amber-500 text-white hover:bg-amber-400 border-b-4 border-amber-700 hover:border-amber-500 rounded-l-lg rounded-tr-lg p-3 transition hover:bg-opacity-90 font-medium text-sm px-5 py-2.5 text-center">Se connecter</button>
                                </a>
                                
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Login;