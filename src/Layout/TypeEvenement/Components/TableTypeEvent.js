import React, { useState, useEffect } from 'react';
import { Table } from 'flowbite-react';
import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';
import Titre from '../../../DefaultLayout/Titre/Titre';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

function TableTypeEvent(props) {
    const [openModal, setOpenModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [typeCode, setTypeCode] = useState('');
    const [typeLibelle, setTypeLibelle] = useState('');
    const [types, setTypes] = useState('');
    const [typesId, setTypesId] = useState('');
    const handleCloseEditModal = () => {
        setOpenEditModal(false)
        setTypeCode('')
        setTypeLibelle('')
    }
    const handleEdit = (id) => {
        const intid = parseInt(id, 10)
        alert(intid)
        setTypesId(intid)
        const newurl = process.env.REACT_APP_URL_STANDART + `/typeEvenements/${intid}`
        axios.get(newurl, { withCredentials: true })
            .then(response => {
                alert('Thème récupérer')
                setOpenEditModal(true)
                console.log(response.data.data)

                setTypeCode(response.data.data.codeType)
                setTypeLibelle(response.data.data.libelleType)

            })
            .catch(err => {
                alert('Erreur lors de la récupération du thème d\'évènement')
            })

    }
    const handleDelete = (id) => {
        const intid = parseInt(id, 10)
        alert(intid)
        const newurl = process.env.REACT_APP_URL_STANDART + `/typeEvenements/${intid}`
        if (window.confirm("Voulez-vous vraiment supprimer cet enregistrement de type ? Cet action est irréverssible") == true) {
            axios.delete(newurl, { withCredentials: true })
                .then(response => {
                    alert('Thème supprimer')
                    window.location.reload()
                })
                .catch(err => {
                    alert('Erreur lors de la suppression du thème')
                })
        }

    }
    const FormEdit = (e) => {
        e.preventDefault();
        // console.log({ question: question, answer: reponse, faqId: parseInt(faq, 10) })
        const newurl = process.env.REACT_APP_URL_STANDART + `/typeEvenements/${typesId}`
        axios.put(newurl, { codeType: typeCode, libelleType: typeLibelle }, { withCredentials: true })
            .then(data => {
                setTypeCode('')
                setTypeLibelle('')
                alert('Thème modifié')
                window.location.reload()
            })
            .catch(err => {
                alert('Vérifiez vos informations')
            })

    }
    const Form = (e) => {
        e.preventDefault();
        //console.log(code + ' ' + libelle)

        const newurl = process.env.REACT_APP_URL_STANDART + "/typeEvenements"
        axios.post(newurl, { codeType: typeCode, libelleType: typeLibelle }, { withCredentials: true })
            .then(data => {
                setTypeCode('')
                setTypeLibelle('')
                alert('Thème enregistrer')
                window.location.reload()
            })
            .catch(err => {
                alert('Vérifiez vos informations')
            })
    }
    useEffect(() => {
        const newurl = process.env.REACT_APP_URL_STANDART + "/typeEvenements"
        axios.get(newurl, { withCredentials: true })
            .then(response => {
                console.log(response.data.data)
                setTypes(response.data.data)
            })
            .catch(err => {
                alert('Erreur lors de la récupération des informations')
            })
    }, [])
    return (
        <>
            <div className="p-4 sm:ml-64">
                <Titre titre="Liste des thème d'évènements" />
                <div className='pb-4'>
                    <Button color='' className='bg-amber-600 hover:bg-amber-700 text-white' onClick={() => setOpenModal(true)}>Ajouter un thème d'évènement</Button>
                    {/* Ce modal est pour crée les types d'évènements */}
                    <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)}>
                        <Modal.Header />
                        <Modal.Body>
                            <form onSubmit={Form}>
                                <div className="space-y-6">
                                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Remplissez les champs et validez pour créer un type d'évènement</h3>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="code" value="Code type d'évènement" />
                                        </div>
                                        <TextInput onChange={(e) => setTypeCode(e.target.value)} value={typeCode} id="code" required />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="libelle" value="Libellé type d'évènement" />
                                        </div>
                                        <TextInput onChange={(e) => setTypeLibelle(e.target.value)} value={typeLibelle} id="libelle" required />
                                    </div>
                                    <div className="w-full">
                                        <Button type='submit'>Ajouter</Button>
                                    </div>
                                </div>
                            </form>
                        </Modal.Body>
                    </Modal>
                    {/* Ce modal est pour éditer les types d'évènements */}
                    <Modal show={openEditModal} size="md" popup onClose={() => handleCloseEditModal()}>
                        <Modal.Header />
                        <Modal.Body>
                            <form onSubmit={FormEdit}>
                                <div className="space-y-6">
                                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Modifier un type d'évènement</h3>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="code" value="Code type d'évènement" />
                                        </div>
                                        <TextInput onChange={(e) => setTypeCode(e.target.value)} value={typeCode} id="code" required />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="libelle" value="Libellé type d'évènement" />
                                        </div>
                                        <TextInput onChange={(e) => setTypeLibelle(e.target.value)} value={typeLibelle} id="libelle" required />
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
                            <Table.HeadCell className='bg-green-950 text-white'>Libelle</Table.HeadCell>
                            <Table.HeadCell className='bg-green-950 text-white w-20'>
                                <span>Actions</span>
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {types.length > 0 ?
                                types.map((ty, index) => (

                                    <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            {ty.id}
                                        </Table.Cell>
                                        <Table.Cell>{ty.codeType}</Table.Cell>
                                        <Table.Cell>{ty.libelleType}</Table.Cell>
                                        <Table.Cell>
                                            <div className='flex flex-row'>
                                                <Button color='' className="bg-amber-600 hover:bg-amber-700 text-white" onClick={() => handleEdit(ty.id)}><EditIcon /></Button>&nbsp;&nbsp;&nbsp;
                                                <Button color='' className="bg-red-600 hover:bg-red-700 text-white" onClick={() => handleDelete(ty.id)}><DeleteForeverIcon /></Button>
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                )) :
                                ("Aucun type pour le moment n'est enregistré")}
                        </Table.Body>
                    </Table>
                </div>
            </div>
        </>
    );
}

export default TableTypeEvent;