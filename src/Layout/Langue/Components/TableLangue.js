import React, { useState } from 'react';
import { Table } from 'flowbite-react';
import { Button, Label, Modal, TextInput } from 'flowbite-react';
import Titre from '../../../DefaultLayout/Titre/Titre';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { useEffect } from 'react';

function TableLangue(props) {
    const [openModal, setOpenModal] = useState(false);
    const [code, setCode] = useState('');
    const [libelle, setLibelle] = useState('');
    const [langues, setLangues] = useState('');
    const [openEditModal, setOpenEditModal] = useState(false);
    const [langueId, setLangueId] = useState(0);

    const handleCloseEditModal = () =>{
        setOpenEditModal(false)
        setLibelle('')
        setCode('')
    }
    const handleEdit = (id) => {
        const intid = parseInt(id, 10)
        alert(intid)
        setLangueId(intid)
        const newurl = process.env.REACT_APP_URL_STANDART + `/langues/${intid}`
        axios.get(newurl, { withCredentials: true })
            .then(response => {
                alert('Langue récupérer')
                setOpenEditModal(true)
                console.log(response.data.data)

                setLibelle(response.data.data.libelleLangue)
                setCode(response.data.data.codeLangue)

            })
            .catch(err => {
                alert('Erreur lors de la récupération de la Langue')
            })

    }
    const handleDelete = (id) => {
        const intid = parseInt(id, 10)
        alert(intid)
        const newurl = process.env.REACT_APP_URL_STANDART + `/langues/${intid}`
        if(window.confirm("Voulez-vous vraiment supprimer cet enregistrement de langue ? Cet action est irréverssible") == true){
            axios.delete(newurl, { withCredentials: true })
                .then(response => {
                    alert('Langue supprimer')
                    window.location.reload()
                })
                .catch(err => {
                    alert('Erreur lors de la récupération de la Langue')
                })
        }

    }
    const FormEdit = (e) => {
        e.preventDefault();
        // console.log({ question: question, answer: reponse, faqId: parseInt(faq, 10) })
        const newurl = process.env.REACT_APP_URL_STANDART + `/langues/${langueId}`
        axios.put(newurl, { codeLangue: code, libelleLangue: libelle }, { withCredentials: true })
            .then(data => {
                setCode('')
                setLibelle('')
                alert('Langue modifié')
                window.location.reload()
            })
            .catch(err => {
                alert('Vérifiez vos informations')
            })

    }
    const Form = (e) => {
        e.preventDefault();
        console.log(code+' '+libelle)
        const newurl = process.env.REACT_APP_URL_STANDART + "/langues"
        axios.post(newurl, { codeLangue: code, libelleLangue: libelle }, { withCredentials: true })
            .then(data => {
                setCode('')
                setLibelle('')
                alert('Langue enregistrer')
                window.location.reload()
            })
            .catch(err => {
                alert('Vérifiez vos informations')
            })
        
    }
    useEffect(() => {
        const newurl = process.env.REACT_APP_URL_STANDART + "/langues"
        axios.get(newurl, { withCredentials: true })
            .then(response => {
                console.log(response.data.data)
                setLangues(response.data.data)
            })
            .catch(err => {
                alert('Erreur lors de la récupération des informations')
            })
    }, [])
    return (
        <>
            <div className="p-4 sm:ml-64">
                <Titre titre="Liste des langues" />
                <div className='pb-4'>
                    <Button color='' className='bg-amber-600 hover:bg-amber-700 text-white' onClick={() => setOpenModal(true)}>Ajouter une langue</Button>
                    {/* Ce modal est pour crée une langue */}
                    <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)}>
                        <Modal.Header />
                        <Modal.Body>
                            <form onSubmit={Form}>
                                <div className="space-y-6">
                                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Remplissez les champs et validez pour créer une langue</h3>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="code" value="Code de la langue" />
                                        </div>
                                        <TextInput 
                                            id="code" 
                                            placeholder="FR" 
                                            required
                                            onChange={(e) => setCode(e.target.value)}
                                            value={code}
                                        />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="libelle" value="Libellé de la langue" />
                                        </div>
                                        <TextInput 
                                            id="libelle" 
                                            placeholder="Français" 
                                            type="text" 
                                            required
                                            onChange={(e) => setLibelle(e.target.value)}
                                            value={libelle}
                                        />
                                    </div>
                                    <div className="w-full">
                                        <Button type='submit'>Ajouter</Button>
                                    </div>
                                </div>
                            </form>
                        </Modal.Body>
                    </Modal>
                    {/* Ce modal est pour éditer une langue */}
                    <Modal show={openEditModal} size="md" popup onClose={() => handleCloseEditModal()}>
                        <Modal.Header />
                        <Modal.Body>
                            <form onSubmit={FormEdit}>
                                <div className="space-y-6">
                                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Editer une langue</h3>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="code" value="Code de la langue" />
                                        </div>
                                        <TextInput 
                                            id="code" 
                                            placeholder="FR" 
                                            required
                                            onChange={(e) => setCode(e.target.value)}
                                            value={code}
                                        />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="libelle" value="Libellé de la langue" />
                                        </div>
                                        <TextInput 
                                            id="libelle" 
                                            placeholder="Français" 
                                            type="text" 
                                            required
                                            onChange={(e) => setLibelle(e.target.value)}
                                            value={libelle}
                                        />
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
                            <Table.HeadCell className='bg-green-950 text-white w-10'>
                                <span>Actions</span>
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {langues.length > 0 ? 
                            langues.map((langue, index)=>(
                                <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {langue.id}
                                    </Table.Cell>
                                    <Table.Cell>{langue.codeLangue}</Table.Cell>
                                    <Table.Cell>{langue.libelleLangue}</Table.Cell>
                                    <Table.Cell>
                                        <div className='flex flex-row'>
                                            <Button color='' className="bg-amber-600 hover:bg-amber-700 text-white" onClick={() => handleEdit(langue.id)}><EditIcon /></Button>&nbsp;&nbsp;&nbsp;
                                            <Button color='' className="bg-red-600 hover:bg-red-700 text-white" onClick={() => handleDelete(langue.id)}><DeleteForeverIcon /></Button>
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            ))
                            : 
                            ("Aucune langue enregistrer pour le moment")
                            }
                        </Table.Body>
                    </Table>
                </div>
            </div>
        </>
    );
}

export default TableLangue;