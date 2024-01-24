import React, { useState, useEffect } from 'react';
import { Table } from 'flowbite-react';
import { Button, Label, Modal, TextInput } from 'flowbite-react';
import Titre from '../../../DefaultLayout/Titre/Titre';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

function TableSpecialite(props) {
    const [openModal, setOpenModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [code, setCode] = useState('');
    const [libelle, setLibelle] = useState('');
    const [specialites, setSpecialites] = useState('');
    const [specialiteId, setSpecialiteId] = useState('');

    const handleCloseEditModal = () => {
        setOpenEditModal(false)
        setCode('')
        setLibelle('')
    }

    const handleEdit = (id) => {
        const intid = parseInt(id, 10)
        alert(intid)
        setSpecialiteId(intid)
        const newurl = process.env.REACT_APP_URL_STANDART + `/specialites/${intid}`
        axios.get(newurl, { withCredentials: true })
            .then(response => {
                alert('Spécialité récupérer')
                setOpenEditModal(true)
                console.log(response.data.data)

                setCode(response.data.data.codeSpecialite)
                setLibelle(response.data.data.libelleSpecialite)

            })
            .catch(err => {
                alert('Erreur lors de la récupération du thème d\'évènement')
            })

    }

    const handleDelete = (id) => {
        const intid = parseInt(id, 10)
        alert(intid)
        const newurl = process.env.REACT_APP_URL_STANDART + `/specialites/${intid}`
        if (window.confirm("Voulez-vous vraiment supprimer cet enregistrement de spécialité ? Cet action est irréverssible") == true) {
            axios.delete(newurl, { withCredentials: true })
                .then(response => {
                    alert('Spécialité supprimer')
                    window.location.reload()
                })
                .catch(err => {
                    alert('Erreur lors de la suppression de le spécialité')
                })
        }

    }

    const Form = (e) => {
        e.preventDefault();
        console.log(code + ' ' + libelle)
        const newurl = process.env.REACT_APP_URL_STANDART + "/specialites"
        axios.post(newurl, { codeSpecialite: code, libelleSpecialite: libelle }, { withCredentials: true })
            .then(data => {
                setCode('')
                setLibelle('')
                alert('Spécialité enregistrer')
                window.location.reload()
            })
            .catch(err => {
                alert('Vérifiez vos informations')
            })
        
    }
    const FormEdit = (e) => {
        e.preventDefault();
        // console.log({ question: question, answer: reponse, faqId: parseInt(faq, 10) })
        const newurl = process.env.REACT_APP_URL_STANDART + `/specialites/${specialiteId}`
        axios.put(newurl, { codeSpecialite: code, libelleSpecialite: libelle }, { withCredentials: true })
            .then(data => {
                setCode('')
                setLibelle('')
                alert('Spécialité modifié')
                window.location.reload()
            })
            .catch(err => {
                alert('Vérifiez vos informations')
            })

    }
    useEffect(() => {
        const newurl = process.env.REACT_APP_URL_STANDART + "/specialites"
        axios.get(newurl, { withCredentials: true })
            .then(response => {
                console.log(response.data.data)
                setSpecialites(response.data.data)
            })
            .catch(err => {
                alert('Erreur lors de la récupération des informations')
            })
    }, [])
    return (
        <>
            <div className="p-4 sm:ml-64">
                <Titre titre="Liste des spécialités" />
                <div className='pb-4'>
                    <Button color='' className='bg-amber-600 hover:bg-amber-700 text-white' onClick={() => setOpenModal(true)}>Ajouter une spécialité</Button>
                    {/* Ce modal est pour enregistrer une information */}
                    <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)}>
                        <Modal.Header />
                        <Modal.Body>
                            <form onSubmit={Form}>
                                <div className="space-y-6">
                                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Remplissez les champs et validez pour créer une spécialité</h3>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="code" value="Code de la spécialité" />
                                        </div>
                                        <TextInput onChange={(e) => setCode(e.target.value)} value={code} id="code" required />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="libelle" value="Libellé de la spécialité" />
                                        </div>
                                        <TextInput onChange={(e) => setLibelle(e.target.value)} value={libelle} id="libelle" type="text" required />
                                    </div>
                                    <div className="w-full">
                                        <Button type='submit'>Ajouter</Button>
                                    </div>
                                </div>
                            </form>
                        </Modal.Body>
                    </Modal>
                    {/* Ce modal est pour éditer une information */}
                    <Modal show={openEditModal} size="md" popup onClose={() => handleCloseEditModal()}>
                        <Modal.Header />
                        <Modal.Body>
                            <form onSubmit={FormEdit}>
                                <div className="space-y-6">
                                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Modifier une spécialité</h3>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="code" value="Code de la spécialité" />
                                        </div>
                                        <TextInput onChange={(e) => setCode(e.target.value)} value={code} id="code" required />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="libelle" value="Libellé de la spécialité" />
                                        </div>
                                        <TextInput onChange={(e) => setLibelle(e.target.value)} value={libelle} id="libelle" type="text" required />
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
                            <Table.HeadCell className='bg-green-950 text-white'>Code</Table.HeadCell>
                            <Table.HeadCell className='bg-green-950 text-white'>Libellé</Table.HeadCell>
                            <Table.HeadCell className='bg-green-950 text-white w-20'>
                                <span>Actions</span>
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {specialites.length > 0 ?
                                specialites.map((sp, index) => (

                                    <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            {sp.id}
                                        </Table.Cell>
                                        <Table.Cell>{sp.codeSpecialite}</Table.Cell>
                                        <Table.Cell>{sp.libelleSpecialite}</Table.Cell>
                                        <Table.Cell>
                                            <div className='flex flex-row'>
                                                <Button color='' className="bg-amber-600 hover:bg-amber-700 text-white" onClick={() => handleEdit(sp.id)}><EditIcon /></Button>&nbsp;&nbsp;&nbsp;
                                                <Button color='' className="bg-red-600 hover:bg-red-700 text-white" onClick={() => handleDelete(sp.id)}><DeleteForeverIcon /></Button>
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                )) :
                                ("Aucune spécialité pour le moment n'est enregistré")}
                        </Table.Body>
                    </Table>
                </div>
            </div>
        </>
    );
}

export default TableSpecialite;