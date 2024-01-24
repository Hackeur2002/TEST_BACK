import React, { useEffect, useState } from 'react';
import { Table } from 'flowbite-react';
import { Button, Select, Label, Modal, TextInput } from 'flowbite-react';
import Titre from '../../../DefaultLayout/Titre/Titre';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios'

function TableSousSecteurs(props) {
    const [openModal, setOpenModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [code, setCode] = useState('');
    const [libelle, setLibelle] = useState('');
    const [sousSecteur, setSousSecteur] = useState(0);
    const [listSecteurs, setSecteurs] = useState([]);
    const [sousSecs, setSousSecteurs] = useState([]);
    const [unqrid, setUnqrId] = useState(0);
    const handleCloseEditModal = () => {
        setOpenEditModal(false)
        setCode('')
        setLibelle('')
        setSousSecteur('')
    }
    const handleEdit = (id) =>{
        const intid = parseInt(id,10)
        alert(intid)
        setUnqrId(intid)
        const newurl = process.env.REACT_APP_URL_STANDART + `/sousSecteurs/${intid}`
        axios.get(newurl, { withCredentials: true })
            .then(response => {
                setOpenEditModal(true)
                console.log(response.data.data)
                
                setCode(response.data.data.code)
                setLibelle(response.data.data.answer)
                setSousSecteur(response.data.data.secteurId)
                
            })
            .catch(err => {
                alert('Erreur lors de la récupération du sous secteur')
            })
        
    }
    const handleDelete = (id) => {
        const intid = parseInt(id, 10)
        alert(intid)
        const newurl = process.env.REACT_APP_URL_STANDART + `/sousSecteurs/${intid}`
        if (window.confirm("Voulez-vous vraiment supprimer cet enregistrement de sous-secteurs ? Cet action est irréverssible") == true) {
            axios.delete(newurl, { withCredentials: true })
                .then(response => {
                    alert('Sous secteurs supprimer')
                    window.location.reload()
                })
                .catch(err => {
                    alert('Erreur lors de la récupération de la Sous secteurs')
                })
        }

    }
    const Form = (e) => {
        e.preventDefault();
        console.log({ code: code, libelle: libelle, secteurId: parseInt(sousSecteur,10) })
        const newurl = process.env.REACT_APP_URL_STANDART + "/sousSecteurs"
        axios.post(newurl, { code: code, libelle: libelle, secteurId:parseInt(sousSecteur,10) }, { withCredentials: true })
            .then(data => {
                setCode('')
                setLibelle('')
                setSousSecteur('')
                alert('Sous secteurs enregistrer')
                window.location.reload()
            })
            .catch(err => {
                alert('Vérifiez vos informations')
            })
        
    }
    const FormEdit = (e) => {
        e.preventDefault();
        console.log({ code: code, libelle: libelle, secteurId: parseInt(sousSecteur, 10) })
        const newurl = process.env.REACT_APP_URL_STANDART + `/sousSecteurs/${unqrid}`
        axios.put(newurl, { code: code, libelle: libelle, secteurId: parseInt(sousSecteur, 10) }, { withCredentials: true })
            .then(data => {
                setCode('')
                setLibelle('')
                setSousSecteur('')
                alert('Sous secteurs Modifié')
                window.location.reload()
            })
            .catch(err => {
                alert('Vérifiez vos informations')
            })

    }
    useEffect(() => {
        const newurlsousSecteurs = process.env.REACT_APP_URL_STANDART + "/sousSecteurs"
        axios.get(newurlsousSecteurs, { withCredentials: true })
            .then(response => {
                console.log(response.data.data)
                setSousSecteurs(response.data.data)
            })
            .catch(err => {
                alert('Erreur lors de la récupération des informations de sous secteurs')
            })
        
        const newurlfaq = process.env.REACT_APP_URL_STANDART + "/secteurs"
        axios.get(newurlfaq, { withCredentials: true })
            .then(response => {
                console.log(response.data.data)
                setSecteurs(response.data.data)
            })
            .catch(err => {
                alert('Erreur lors de la récupération des informations de secteurs')
            })
    }, [])
    return (
        <>
            <div className="p-4 sm:ml-64">
                <Titre titre="Liste des Sous secteurs" />
                <div className='pb-4'>
                    <Button color='' className='bg-amber-600 hover:bg-amber-700 text-white' onClick={() => setOpenModal(true)}>Ajouter un sous secteur</Button>
                    {/* Ce modal est pour enregistrer une code-repponse */}
                    <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)}>
                        <Modal.Header />
                        <Modal.Body>
                            <form onSubmit={Form}>
                                <div className="space-y-6">
                                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Remplissez les champs et validez pour créer un sous secteur</h3>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="code" value="Code" />
                                        </div>
                                        <TextInput onChange={(e) => setCode(e.target.value)} value={code} id="code" type="text" required />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="libelle" value="Libellé" />
                                        </div>
                                        <TextInput onChange={(e) => setLibelle(e.target.value)} value={libelle} id="libelle" type="text" required />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="faq" value="Sous secteur" />
                                        </div>
                                        <Select onChange={(e) => setSousSecteur(e.target.value)} value={sousSecteur} id="faq" required>
                                            <option selected disabled>Sélectionner un secteur</option>
                                            {listSecteurs.length > 0 ?
                                                listSecteurs.map((ssecteur, index) => {
                                                    return (
                                                        <option key={index} value={ssecteur.id}>{ssecteur.libelleSecteur}</option>
                                                    )
                                                }) :
                                                ("Aucun secteur n'est enregistré")}
                                        </Select>
                                    </div>
                                    <div className="w-full">
                                        <Button type='submit'>Ajouter</Button>
                                    </div>
                                </div>
                            </form>
                        </Modal.Body>
                    </Modal>
                    {/* Ce modal est pour éditer une code-repponse */}
                    <Modal show={openEditModal} size="md" popup onClose={() => handleCloseEditModal()}>
                        <Modal.Header />
                        <Modal.Body>
                            <form onSubmit={FormEdit}>
                                <div className="space-y-6">
                                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Modifier le Sous secteurs</h3>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="code" value="Code" />
                                        </div>
                                        <TextInput onChange={(e) => setCode(e.target.value)} value={code} id="code" type="text" required />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="libelle" value="Libellé" />
                                        </div>
                                        <TextInput onChange={(e) => setLibelle(e.target.value)} value={libelle} id="libelle" type="text" required />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="faq" value="Sous secteur" />
                                        </div>
                                        <Select onChange={(e) => setSousSecteur(e.target.value)} value={sousSecteur} id="faq" required>
                                            <option>Sélectionner un secteur</option>
                                            {listSecteurs.length > 0 ?
                                                listSecteurs.map((ssecteur, index) => {
                                                    return (
                                                        <option selected key={index} value={ssecteur.id}>{ssecteur.codeSecteur}</option>
                                                    )
                                                }) :
                                                ("Aucun secteur n'est enregistré")}
                                        </Select>
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
                            {/* <Table.HeadCell className='bg-green-950 text-white'>Secteurs</Table.HeadCell> */}
                            <Table.HeadCell className='bg-green-950 text-white w-20'>
                                <span>Actions</span>
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {sousSecs.length > 0 ? 
                            sousSecs.map((qr, index)=>{
                                {/* let secteurname = listSecteurs.filter((ls) => ls.id == qr.secteurId)
                                let nomsec = secteurname[0]
                                console.log(nomsec) */}
                                return (
                                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            {qr.id}
                                        </Table.Cell>
                                        <Table.Cell>{qr.code}</Table.Cell>
                                        <Table.Cell>{qr.libelle}</Table.Cell>
                                        {/* <Table.Cell></Table.Cell> */}
                                        <Table.Cell>
                                            <div className='flex flex-row'>
                                                <Button color='' className="bg-amber-600 hover:bg-amber-700 text-white" onClick={() => handleEdit(qr.id)}><EditIcon /></Button>&nbsp;&nbsp;&nbsp;
                                                <Button color='' className="bg-red-600 hover:bg-red-700 text-white" onClick={() => handleDelete(qr.id)}><DeleteForeverIcon /></Button>
                                            </div>
                                        </Table.Cell>
                                    </Table.Row>
                                )
                            })
                            : 
                            ("Aucune sous secteurs pour le moment")}
                        </Table.Body>
                    </Table>
                </div>
            </div>
        </>
    );
}

export default TableSousSecteurs;