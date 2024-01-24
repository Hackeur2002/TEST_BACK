import React, { useEffect, useState } from 'react';
import { Table } from 'flowbite-react';
import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';
import Titre from '../../../DefaultLayout/Titre/Titre';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

function TableFaq(props) {
    const [openModal, setOpenModal] = useState(false);
    const [theme, setTheme] = useState('');
    const [faqs, setFaqs] = useState('');
    const [openEditModal, setOpenEditModal] = useState(false);
    const [faqId, setFaqId] = useState(0);
    const handleCloseEditModal = () => {
        setOpenEditModal(false)
        setTheme('')
    }
    const handleEdit = (id) => {
        const intid = parseInt(id, 10)
        alert(intid)
        setFaqId(intid)
        const newurl = process.env.REACT_APP_URL_STANDART + `/faqs/${intid}`
        axios.get(newurl, { withCredentials: true })
            .then(response => {
                setOpenEditModal(true)
                console.log(response.data.data)

                setTheme(response.data.data.theme)

            })
            .catch(err => {
                alert('Erreur lors de la récupération de la faq')
            })

    }
    const handleDelete = (id) => {
        const intid = parseInt(id, 10)
        alert(intid)
        const newurl = process.env.REACT_APP_URL_STANDART + `/faqs/${intid}`
        if(window.confirm("Voulez-vous vraiment supprimer cet enregistrement de langue ? Cet action est irréverssible") == true){
            axios.delete(newurl, { withCredentials: true })
                .then(response => {
                    alert('Faq supprimer')
                    window.location.reload()
                })
                .catch(err => {
                    alert('Erreur lors de la suppression du faq')
                })
        }

    }
    const FormEdit = (e) => {
        e.preventDefault();
        // console.log({ question: question, answer: reponse, faqId: parseInt(faq, 10) })
        const newurl = process.env.REACT_APP_URL_STANDART + `/faqs/${faqId}`
        axios.put(newurl, { theme: theme }, { withCredentials: true })
            .then(data => {
                setTheme('')
                alert('Faq modifié')
                window.location.reload()
            })
            .catch(err => {
                alert('Vérifiez vos informations')
            })

    }
    const Form = (e) => {
        e.preventDefault();
        const newurl = process.env.REACT_APP_URL_STANDART + "/faqs"
        axios.post(newurl, { theme: theme }, { withCredentials: true })
            .then(data => {
                setTheme('')
                alert('FAQ enregistrer')
                window.location.reload()
            })
            .catch(err => {
                alert('Vérifiez vos informations')
            })
    }
    useEffect(() => {
        const newurl = process.env.REACT_APP_URL_STANDART + "/faqs"
        axios.get(newurl, { withCredentials: true })
            .then(response => {
                console.log(response.data.data)
                setFaqs(response.data.data)
            })
            .catch(err => {
                alert('Erreur lors de la récupération des informations')
            })
    }, [])
    return (
        <>
            <div className="p-4 sm:ml-64">
                <Titre titre="Liste des FAQs" />
                <div className='pb-4'>
                    <Button color='' className='bg-amber-600 hover:bg-amber-700 text-white' onClick={() => setOpenModal(true)}>Ajouter une faq</Button>
                    {/* Ce modal est pour enregistré une faq */}
                    <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)}>
                        <Modal.Header />
                        <Modal.Body>
                            <form onSubmit={Form}>
                                <div className="space-y-6">
                                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Remplissez les champs et validez pour créer une faq</h3>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="libelle" value="Thème" />
                                        </div>
                                        <TextInput onChange={(e) => setTheme(e.target.value)} value={theme} id="libelle" type="text" required />
                                    </div>
                                    <div className="w-full">
                                        <Button type='submit'>Ajouter</Button>
                                    </div>
                                </div>
                            </form>
                        </Modal.Body>
                    </Modal>
                    {/* Ce modal est pour éditer une faq */}
                    <Modal show={openEditModal} size="md" popup onClose={() => handleCloseEditModal()}>
                        <Modal.Header />
                        <Modal.Body>
                            <form onSubmit={FormEdit}>
                                <div className="space-y-6">
                                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Modifier une Faq</h3>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="libelle" value="Thème" />
                                        </div>
                                        <TextInput onChange={(e) => setTheme(e.target.value)} value={theme} id="libelle" type="text" required />
                                    </div>
                                    <div className="w-full">
                                        <Button type='submit'>Modifier</Button>
                                    </div>
                                </div>
                            </form>
                        </Modal.Body>
                    </Modal>
                </div>
                <div className="overflow-x-auto">
                    <Table striped>
                        <Table.Head>
                            <Table.HeadCell className='bg-green-950 text-white'>#</Table.HeadCell>
                            <Table.HeadCell className='bg-green-950 text-white'>Thème</Table.HeadCell>
                            <Table.HeadCell className='bg-green-950 text-white w-10'>
                                <span>Actions</span>
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {faqs.length > 0 ? 
                            faqs.map((faq, index)=>(

                                <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {faq.id}
                                    </Table.Cell>
                                    <Table.Cell>{faq.theme}</Table.Cell>
                                    <Table.Cell>
                                        <div className='flex flex-row'>
                                            <Button color='' className="bg-amber-600 hover:bg-amber-700 text-white" onClick={() => handleEdit(faq.id)}><EditIcon /></Button>&nbsp;&nbsp;&nbsp;
                                            <Button color='' className="bg-red-600 hover:bg-red-700 text-white" onClick={() => handleDelete(faq.id)}><DeleteForeverIcon /></Button>
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            )) : 
                            ("Aucune Faq pour le moment n'est enregistré")}
                        </Table.Body>
                    </Table>
                </div>
            </div>
        </>
    );
}

export default TableFaq;