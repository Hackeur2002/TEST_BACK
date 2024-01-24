import React, { useState, useEffect } from 'react';
import { Table } from 'flowbite-react';
import { Button, FileInput, Label, Modal, TextInput } from 'flowbite-react';
import Titre from '../../../DefaultLayout/Titre/Titre';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

const urlstandart = process.env.REACT_APP_URL_STANDART

function TableGuide(props) {
    const [openModal, setOpenModal] = useState(false);
    const [titre, setTitre] = useState('');
    const [selectedFileIcone, setSelectedFileIcone] = useState(null);
    const [fileIcone, setFileIcone] = useState(null);
    const [selectedFileDoc, setSelectedFileDoc] = useState(null);
    const [fileDoc, setFileDoc] = useState(null);
    const [openSeeModal, setOpenSeeModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [guides, setGuides] = useState(false);
    const [icSelect, setIcSelect] = useState(false);
    const [imgPath, setImgPath] = useState([]);
    const [dateNow, setDateNow] = useState(Date);
    const [guideId, setGuideId] = useState(0);


    const handleCloseEditModal = () => {
        setOpenEditModal(false)
        setTitre('')
        setSelectedFileIcone(null)
        setSelectedFileDoc(null)
    }
    const handleFileChangeIcone = (event) => {
        setSelectedFileIcone(event.target.files[0]);
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                // Mettre à jour l'état de l'image avec l'URL de l'image convertie en base64
                setIcSelect(reader.result);
            };

            reader.readAsDataURL(file);
        }
    };
    const handleFileChangeDoc = (event) => {
        setSelectedFileDoc(event.target.files[0]);
    };
    const handleEdit = (id, action) => {
        const intid = parseInt(id, 10)
        const guideChoose = guides.filter((el) => el.id === intid)
        if (action == "delete") {
            const newurl = process.env.REACT_APP_URL_STANDART + `/guides/${intid}`
            if (window.confirm("Voulez-vous vraiment supprimer cet enregistrement de guide ? Cet action est irréverssible") == true) {
                axios.delete(newurl, { withCredentials: true })
                    .then(response => {
                        alert('Guide supprimer')
                        window.location.reload()
                    })
                    .catch(err => {
                        alert('Erreur lors de la suppression de le spécialité')
                    })
            }
        } else {
            guideChoose.map((ev) => {
                let imginfo = ev.icon
                let tabimg = []
                tabimg = imginfo.split(',')
                imginfo = tabimg[0]
                imginfo = imginfo.replace(/\\/g, "/")
                setImgPath(imginfo)
                setTitre(ev.title)
                setGuideId(ev.id)
                const dn = new Date(ev.createdAt)
                setDateNow(dn.toISOString().split('T')[0])
            })
            if (action == "edit") {
                setOpenEditModal(true)
            } else {
                setOpenSeeModal(true)
            }

        }

        // const newurl = process.env.REACT_APP_URL_STANDART + `/specialites/${intid}`
        // axios.get(newurl)
        //     .then(response => {
        //         alert('Spécialité récupérer')
        //         setOpenEditModal(true)
        //         console.log(response.data.data)

        //         setCode(response.data.data.codeSpecialite)
        //         setLibelle(response.data.data.libelleSpecialite)

        //     })
        //     .catch(err => {
        //         alert('Erreur lors de la récupération du thème d\'évènement')
        //     })

    }
    const FormEdit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (window.confirm("Voulez-vous vraiment éffectuer cette modification de ce guide ?") == true) {

            if(selectedFileIcone){
                formData.append('icon', selectedFileIcone)
            } 
            if(selectedFileDoc){
                formData.append('ressource', selectedFileDoc);
            }
            if(titre.trim() != "")
            {
                formData.append('title', titre);
            }
            formData.append('description', 'description');
            formData.append('content', 'content');
            const newurl = process.env.REACT_APP_URL_STANDART + `/guides/${guideId}`
            axios.put(newurl, formData, { withCredentials: true })
                .then(response => {
                    //alert('Thème enregistrer')
                    //alert("Après enreg Actualite")
                    //console.log(response.data.data)
                    alert("Guide modifier")
                    console.log(response.data.data)
                    window.location.reload()
                })
                .catch(err => {
                    alert('Vérifiez vos informations')
                })
        }

    }
    const Form = (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (window.confirm("Voulez-vous vraiment éffectuer cet enregistrement du guide ?") == true){
            
            formData.append('icon', selectedFileIcone);
            formData.append('ressource', selectedFileDoc);
            formData.append('title', titre);
            formData.append('description', 'description');
            formData.append('content', 'content');
            const newurl = process.env.REACT_APP_URL_STANDART + "/guides"
            axios.post(newurl, formData, { withCredentials: true })
                .then(data => {
                    alert('Guide enregistrer')
                    window.location.reload()
                })
                .catch(err => {
                    alert('Vérifiez vos informations')
                })
        }
    }
    useEffect(() => {
        const newurl = process.env.REACT_APP_URL_STANDART + "/guides"
        axios.get(newurl, { withCredentials: true })
            .then(response => {
                console.log(response.data.data)
                setGuides(response.data.data)
            })
            .catch(err => {
                alert('Erreur lors de la récupération des informations')
            })
    }, [])
    return (
        <>
            <div className="p-4 sm:ml-64">
                <Titre titre="Liste des Guides" />
                <div className='pb-4'>
                    <Button color='' className='bg-amber-600 hover:bg-amber-700 text-white' onClick={() => setOpenModal(true)}>Ajouter une guide</Button>
                    {/* Ce modal pour créer un guide */}
                    <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)}>
                        <Modal.Header />
                        <Modal.Body>
                            <form onSubmit={Form}>
                                <div className="space-y-6">
                                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Remplissez les champs et validez pour créer une guide</h3>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="imageic" value="Insérer une icone du guide" />
                                        </div>
                                        <FileInput onChange={handleFileChangeIcone} id="imageic" required />
                                    </div>
                                    {selectedFileIcone ? (
                                        <div>
                                            <img src={icSelect.toString()} alt="Image sélectionnée" style={{ maxWidth: '20%', marginTop: '10px' }} />
                                        </div>
                                    ) : ("")}
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="titre" value="Titre du guide" />
                                        </div>
                                        <TextInput onChange={(e) => setTitre(e.target.value)} value={titre} id="titre" type="text" required />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="imagedo" value="Insérer une pièce jointe" />
                                        </div>
                                        <FileInput onChange={handleFileChangeDoc} id="imagedo" required />
                                    </div>
                                    <div className="w-full">
                                        <Button type='submit'>Ajouter</Button>
                                    </div>
                                </div>
                            </form>
                        </Modal.Body>
                    </Modal>
                    {/* Ce modal pour éditer un guide */}
                    <Modal show={openEditModal} size="md" popup onClose={() => handleCloseEditModal()}>
                        <Modal.Header />
                        <Modal.Body>
                            <form onSubmit={FormEdit}>
                                <div className="space-y-6">
                                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Remplissez les champs et validez pour créer une guide</h3>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="imageic" value="Insérer une icone du guide" />
                                        </div>
                                        <FileInput onChange={handleFileChangeIcone} id="imageic" />
                                    </div>
                                    {selectedFileIcone ? (
                                        <div>
                                            <img src={icSelect} alt="Image sélectionnée" style={{ maxWidth: '20%', marginTop: '10px' }} />
                                        </div>
                                    ) : ("")}
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="titre" value="Titre du guide" />
                                        </div>
                                        <TextInput onChange={(e) => setTitre(e.target.value)} value={titre} id="titre" type="text" />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="imagedo" value="Insérer une pièce jointe" />
                                        </div>
                                        <FileInput onChange={handleFileChangeDoc} id="imagedo" />
                                    </div>
                                    <div className="w-full">
                                        <Button type='submit'>Modifier</Button>
                                    </div>
                                </div>
                            </form>
                        </Modal.Body>
                    </Modal>
                    {/* Ce modal pour voir un guide */}
                    <Modal show={openSeeModal} size="md" popup onClose={() => setOpenSeeModal(false)}>
                        <Modal.Header />
                        <Modal.Body>
                            <form>
                                <div className="space-y-6">
                                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Détails</h3>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="image" value="Icône du guide" />
                                        </div>
                                        <img crossorigin="anonymous" src={`${urlstandart}/${imgPath}`} alt="Votre texte alternatif" />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="titre" value="Titre du guide" />
                                        </div>
                                        {titre}
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="image" value="Insérer une pièce jointe" />
                                        </div>
                                        PIECE JOINTE
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
                            <Table.HeadCell className='bg-green-950 text-white'>Icone</Table.HeadCell>
                            <Table.HeadCell className='bg-green-950 text-white'>Titre</Table.HeadCell>
                            <Table.HeadCell className='bg-green-950 text-white w-20'>
                                <span>Actions</span>
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {guides.length > 0 ?
                                guides.map((gu, index) => {
                                    let imginfo = gu.icon
                                    let tabimg = []
                                    tabimg = imginfo.split(',')
                                    imginfo = tabimg[0]
                                    imginfo = imginfo.replace(/\\/g, "/")
                                    return (
                                        <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                {gu.id}
                                            </Table.Cell>
                                            <Table.Cell><img crossorigin="anonymous" width="50" height="50" src={`${urlstandart}/${imginfo}`} alt="Image" /></Table.Cell>
                                            <Table.Cell>{gu.title}</Table.Cell>
                                            <Table.Cell>
                                                <div className='flex flex-row'>
                                                    <Button color='' className="bg-amber-600 hover:bg-amber-700 text-white" onClick={() => handleEdit(gu.id, "edit")}><EditIcon /></Button>&nbsp;&nbsp;&nbsp;
                                                    <Button color='' className="bg-red-600 hover:bg-red-700 text-white" onClick={() => handleEdit(gu.id, "delete")}><DeleteForeverIcon /></Button>&nbsp;&nbsp;&nbsp;
                                                    <Button color='' className="bg-amber-600 hover:bg-amber-700 text-white" onClick={() => handleEdit(gu.id, "visible")}><VisibilityIcon /></Button>
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    )
                                }) :
                                ("Aucun guide n'est enregistrer pour le moment")}
                        </Table.Body>
                    </Table>
                </div>
            </div>
        </>
    );
}

export default TableGuide;