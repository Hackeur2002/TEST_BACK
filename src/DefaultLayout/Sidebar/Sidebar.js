import React from 'react';
import { Sidebar } from 'flowbite-react';
import {
    HiArrowSmRight,
    HiChartPie,
    HiInbox,
    HiOutlineMinusSm,
    HiOutlinePlusSm,
    HiShoppingBag,
    HiTable,
    HiUser,
} from 'react-icons/hi';
import { twMerge } from 'tailwind-merge';
import EventIcon from '@mui/icons-material/Event';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import CorporateFareIcon from '@mui/icons-material/CorporateFare';
import CampaignIcon from '@mui/icons-material/Campaign';
import TaskIcon from '@mui/icons-material/Task';
import DomainVerificationIcon from '@mui/icons-material/DomainVerification';
import GTranslateIcon from '@mui/icons-material/GTranslate';
import LogoutIcon from '@mui/icons-material/Logout';
import QuizIcon from '@mui/icons-material/Quiz';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import logo from './Images/logoadpme_a.png'
import { ServiceUtilisateur } from '../../ServiceUtilisateur/ServiceUtilisateur';
import axios from 'axios'

const urlstandart = process.env.REACT_APP_URL_STANDART

function SidebarDefault(props) {
    const deconnexion = (e) => {
        if(window.confirm("Voulez-vous vraiment vous déconnecter ?") == true)
        {
            const newurl = urlstandart + "/logout"
            axios.post(newurl, { withCredentials: true })
                .then(res => {
                    ServiceUtilisateur.logout()
                    window.location.reload()
                })
                .catch(err => {
                    console.log(err)
                    alert("Erreur lors de la déconnexion")
                })
        }
    }
    return (
        <>
            <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-100 dark:bg-gray-800">
                    <div className='pb-10'>
                        <img src={logo} />
                    </div>
                    <hr className='pb-3' />
                    <ul className="space-y-2 font-medium">
                        <li>
                            <a className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                                </svg>
                                <span className="ms-3 text-gray-400">Dashboard</span>
                            </a>
                        </li>
                        <li>
                            <Sidebar.Collapse
                                icon={EventIcon}
                                label={<span className='text-gray-400'>Lots Evenements</span>}
                                renderChevronIcon={(theme, open) => {
                                    const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm;

                                    return <IconComponent aria-hidden className={twMerge(theme.label.icon.open[open ? 'on' : 'off'])} />;
                                }}
                            >
                                <Sidebar.Item href="/admin/event"><span className='text-gray-400'>Evènements</span></Sidebar.Item>
                                <Sidebar.Item href="/admin/themeEvent"><span className='text-gray-400'>Thème d'évènements</span></Sidebar.Item>
                                <Sidebar.Item href="/admin/typeEvent"><span className='text-gray-400'>Type d'évènements</span></Sidebar.Item>
                            </Sidebar.Collapse>
                        </li>
                        <li>
                            <Sidebar.Collapse
                                icon={WorkOutlineIcon}
                                label={<span className='text-gray-400'>Lots Recrutements</span>}
                                renderChevronIcon={(theme, open) => {
                                    const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm;

                                    return <IconComponent aria-hidden className={twMerge(theme.label.icon.open[open ? 'on' : 'off'])} />;
                                }}
                            >
                                <Sidebar.Item href="/admin/recrutement"><span className='text-gray-400'>Offres d'emplois</span></Sidebar.Item>
                                <Sidebar.Item href="/admin/specialite"><span className='text-gray-400'>Spécialités</span></Sidebar.Item>
                                <Sidebar.Item href="/admin/candidature"><span className='text-gray-400'>Les Candidatures</span></Sidebar.Item>
                            </Sidebar.Collapse>
                        </li>
                        <li>
                            <a href="/admin/organisation" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <CorporateFareIcon className="text-gray-500" />
                                <span className="flex-1 ms-3 whitespace-nowrap text-gray-400">Organisations</span>
                                {/* <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span> */}
                            </a>
                        </li>
                        <li>
                            <a href="/admin/communique" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <CampaignIcon className="text-gray-500" />
                                <span className="flex-1 ms-3 whitespace-nowrap text-gray-400">Communiqués</span>
                                {/* <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span> */}
                            </a>
                        </li>
                        <li>
                            <a href="/admin/projet" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <TaskIcon className="text-gray-500" />
                                <span className="flex-1 ms-3 whitespace-nowrap text-gray-400">Projets</span>
                            </a>
                        </li>
                        <li>
                            <a href="/admin/secteur" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <DomainVerificationIcon className="text-gray-500" />
                                <span className="flex-1 ms-3 whitespace-nowrap text-gray-400">Secteurs</span>
                            </a>
                        </li>
                        <li>
                            <a href="/admin/sousSecteur" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <DomainVerificationIcon className="text-gray-500" />
                                <span className="flex-1 ms-3 whitespace-nowrap text-gray-400">Sous Secteurs</span>
                            </a>
                        </li>
                        {/* <li>
                            <a href="/admin/statutJuridique" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <DomainVerificationIcon className="text-gray-500" />
                                <span className="flex-1 ms-3 whitespace-nowrap text-gray-400">Statut Juridique</span>
                            </a>
                        </li> */}
                        <li>
                            <a href="/admin/langue" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <GTranslateIcon className="text-gray-500" />
                                <span className="flex-1 ms-3 whitespace-nowrap text-gray-400">Langues</span>
                            </a>
                        </li>
                        <li>
                            <a href="/admin/faq" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <QuizIcon className="text-gray-500" />
                                <span className="flex-1 ms-3 whitespace-nowrap text-gray-400">FAQs</span>
                            </a>
                        </li>
                        <li>
                            <a href="/admin/question_reponse" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <QuestionAnswerIcon className="text-gray-500" />
                                <span className="flex-1 ms-3 whitespace-nowrap text-gray-400">Questions/Réponses</span>
                            </a>
                        </li>
                        <li>
                            <a href="/admin/guide" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <MenuBookIcon className="text-gray-500" />
                                <span className="flex-1 ms-3 whitespace-nowrap text-gray-400">Guides</span>
                            </a>
                        </li>
                        <hr />
                        <li>
                            <a href="/admin/pmeform" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <MenuBookIcon className="text-gray-500" />
                                <span className="flex-1 ms-3 whitespace-nowrap text-gray-400">Formulaire des PME</span>
                            </a>
                        </li>
                        <hr />
                        <li>
                            <a href="#" onClick={deconnexion} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                <LogoutIcon className="text-gray-500" />
                                <span className="flex-1 ms-3 whitespace-nowrap text-gray-400">Déconnexion</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    );
}

export default SidebarDefault;