import React, { useState, useEffect } from 'react';
import { Table } from 'flowbite-react';
import { Button, Label, Modal, TextInput, Select, FileInput } from 'flowbite-react';
import ReactMarkdown from 'react-markdown'
import Titre from '../../../DefaultLayout/Titre/Titre';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import MDEditor from "@uiw/react-md-editor";
import axios from 'axios'
import { RecrutementsListe } from '../../../NoSQL';

function TableRecrutement(props) {
    const [openModal, setOpenModal] = useState(false);
    const [openSeeModal, setOpenSeeModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [poste, setPoste] = useState('');
    const [status, setStatus] = useState('OUVERT');
    const [subTitle, setSubTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [type, setType] = useState('');
    const [special, setSpecial] = useState([]);
    const [region, setRegion] = useState('');
    const [lieu, setLieu] = useState('');
    const [mail, setMail] = useState('');
    const [descSal, setDescSal] = useState('');
    const [specialites, setSpecials] = useState([]);
    const [recrutements, setRecruts] = useState([]);
    const [recrutementId, setRecrutId] = useState(0);
    const [dateNow, setDateNow] = useState(Date);
    const [dateFin, setDateFin] = useState(Date);
    const [selectedFile, setSelectedFile] = useState(null);

    const handleEndDate = (e) => {
        setDateFin(e.target.value)

        if (dateNow > e.target.value) {
            alert("La date de fin doit être supérieur à la date de début...")
            setDateFin('')
        }
    }

    const handleCloseEditModal = () => {
        setOpenEditModal(false)
        setSubTitle('')
        setSpecial(0)
        setLieu('')
        setDesc('')
        setType('')
        setRegion('')
        setMail('')
        setDescSal('')
        setPoste('')
        setStatus('OUVERT')
        setDateNow('')
        setDateFin('')
        setSelectedFile(null)
    }

    const handleEdit = (id, action) => {
        const intid = parseInt(id, 10)
        const recrutementChoose = RecrutementsListe.filter((el) => el.id === intid)
        if (action == "delete") {
            const newurl = process.env.REACT_APP_URL_STANDART + `/recrutements/${intid}`
            if (window.confirm("Voulez-vous vraiment supprimer cet enregistrement de recrutement ? Cet action est irréverssible") == true) {
                axios.delete(newurl, { withCredentials: true })
                    .then(response => {
                        alert('Recrutement supprimer')
                        window.location.reload()
                    })
                    .catch(err => {
                        alert('Erreur lors de la suppression du recrutement')
                    })
            }
        } else {
            recrutementChoose.map((rc) => {
                setPoste(rc.titre)
                setSubTitle(rc.subTitle)
                setDesc(rc.description)
                setType(rc.typeemploi)
                setSpecial(rc.specialite)
                setRegion(rc.region)
                setLieu(rc.lieu)
                setDescSal(rc.descsal)
                // setMail(rc.receiverMail)
                setRecrutId(rc.id)
                setStatus(rc.status)
                // const dndeb = new Date(rc.startDate)
                setDateNow(rc.datedeb)
                // const dnfin = new Date(rc.endDate)
                setDateFin(rc.datefin)
            })
            if (action == "edit") {
                setOpenEditModal(true)
            } else {
                setOpenSeeModal(true)
            }

        }

    }

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const FormEdit = (e) => {
        e.preventDefault();
        console.log(poste + ' ' + desc + ' ' + type + ' ' + special + ' ' + region + ' ' + ' ' + lieu + ' ' + dateNow + ' ' + dateFin)
        const formData = new FormData();
        if (window.confirm("Voulez-vous vraiment éffectuer cet enregistrement du recrutement ?") == true) {
            
            if (poste) {
                formData.append('poste', poste)
            }
            if (subTitle) {
                formData.append('subTitle', subTitle)
            }
            if (type) {
                formData.append('typeEmploi', type)
            }
            if (region) {
                formData.append('region', region)
            }
            if (lieu) {
                formData.append('lieu', lieu)
            }
            if (dateNow) {
                formData.append('startDate', dateNow)
            }
            if (dateFin) {
                formData.append('endDate', dateFin)
            }
            if (desc) {
                formData.append('description', desc)
            }
            if(selectedFile)
            {
                formData.append('document', selectedFile);
            }
            console.log(special)
            if (special) {
                formData.append('specialiteId', special)
            }
            if (descSal) {
                formData.append('salaire', descSal)
            }
            if (mail) {
                formData.append('receiverMail', mail)
            }
            
            const newurl = process.env.REACT_APP_URL_STANDART + `/recrutements/${recrutementId}`
            axios.put(newurl, formData, { withCredentials: true })
                .then(response => {
                    alert("Recrutement modifier")
                    window.location.reload()
                })
                .catch(err => {
                    alert('Vérifiez vos informations')
                })
        }

    }

    const Form = (e) => {
        e.preventDefault();
        console.log(poste + ' ' + desc + ' ' + type + ' ' + special + ' ' + region + ' ' + ' ' + lieu + ' ' + dateNow + ' ' + dateFin)
        const formData = new FormData();
        if (window.confirm("Voulez-vous vraiment éffectuer cet enregistrement du recrutement ?") == true) {
            
            RecrutementsListe.push({
                id: 1,
                titre: poste,
                subTitle: subTitle,
                organisation: "ADPME",
                dateOuverture: dateNow,
                dateFermetture: dateFin,
                document: "",
                description: desc,
                typeemploi: type,
                specialite: "",
                lieu: lieu,
                region: region,
                descsal: descSal,
                datedeb: dateNow,
                datefin: dateFin,
                lien: "../Communiques/Avis de recrutement ADPME Pers. Compl._22 12 2023.pdf"
            })
            alert("Recrutement enregistrer.")
            setOpenModal(false)
        }
        
    }

    return (
        <>
            <div className="p-4 sm:ml-64">
                <Titre titre="Liste des offres d'emplois" />
                <div className='pb-4'>
                    <Button color='' className='bg-amber-600 hover:bg-amber-700 text-white' onClick={() => setOpenModal(true)}>Ajouter une offre d'emploi</Button>
                    {/* Ce modal est pour crée un offre d'emploi */}
                    <Modal show={openModal} size="5xl" popup onClose={() => setOpenModal(false)}>
                        <Modal.Header />
                        <Modal.Body>
                            <div className="space-y-6">
                                <h3 className="text-xl font-medium text-gray-900 dark:text-white">Remplissez les champs et validez pour créer une offre d'emploi</h3>
                                <form onSubmit={Form}>
                                    <div className='grid grid-cols-2 gap-2'>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="poste" value="Titre du Poste" />
                                            </div>
                                            <TextInput onChange={(e) => setPoste(e.target.value)} value={poste} id="poste" required />
                                        </div>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="subtitle" value="Sous titre du Poste" />
                                            </div>
                                            <TextInput onChange={(e) => setSubTitle(e.target.value)} value={subTitle} id="subtitle" required />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="description" value="Description du poste" />
                                        </div>
                                        <MDEditor onChange={setDesc} value={desc} data-color-mode="light" />
                                    </div>
                                    <div className='grid grid-cols-2 gap-2'>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="status" value="Statut" />
                                            </div>
                                            <Select onChange={(e) => setStatus(e.target.value)} value={status} id="status" required>
                                                <option value='OUVERT'>Ouvert</option>
                                                <option value='BIENTOT_TERMINE'>Bientôt terminé</option>
                                                <option value='TERMINE'>Terminé</option>
                                            </Select>
                                        </div>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="salaire" value="Description du salaire" />
                                            </div>
                                            <TextInput onChange={(e) => setDescSal(e.target.value)} value={descSal} id="salaire" required />
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-2 gap-2'>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="typeemploi" value="Type de l'emploi" />
                                            </div>
                                            <Select onChange={(e) => setType(e.target.value)} value={type} id="typeemploi" required>
                                                <option value='' disabled>Sélectionner un type d'emploi</option>
                                                <option value='CDD'>CDD</option>
                                                <option value='CDI'>CDI</option>
                                            </Select>
                                        </div>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="specialite" value="Spécialité" />
                                            </div>
                                            <Select onChange={(e) => setSpecial(e.target.value)} value={special} id="specialite" required>
                                                <option selected>Sélectionner une spécialité</option>
                                                {specialites.length > 0 ?
                                                    specialites.map((sp, index) => {
                                                        return (
                                                            <option key={index} value={sp.id}>{sp.libelleSpecialite}</option>
                                                        )
                                                    }) :
                                                    ("Aucune spécialitée n'est enregistrée")}
                                            </Select>
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-2 gap-2'>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="lieu" value="Lieu" />
                                            </div>
                                            <TextInput onChange={(e) => setLieu(e.target.value)} value={lieu} id="lieu" type="text" required />
                                        </div>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="region" value="Région" />
                                            </div>
                                            <TextInput onChange={(e) => setRegion(e.target.value)} value={region} id="region" type="text" required />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="mail" value="Adresse mail de réception" />
                                        </div>
                                        <TextInput onChange={(e) => setMail(e.target.value)} value={mail} id="mail" type="text" required />
                                    </div>
                                    <div className='grid grid-cols-2 gap-2'>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="datenow" value="Date de publication" />
                                            </div>
                                            <TextInput onChange={(e) => setDateNow(e.target.value)} value={dateNow} id="datenow" type='date' required />
                                        </div>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="datefin" value="Date limite de soumission" />
                                            </div>
                                            <TextInput onChange={(e) => handleEndDate(e)} value={dateFin} id="datefin" type='date' required />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="image" value="Insérer une pièce jointe" />
                                        </div>
                                        <FileInput onChange={handleFileChange} id="image" required />
                                    </div>
                                    <div className="w-full pt-3">
                                        <Button type='submit'>Ajouter</Button>
                                    </div>
                                </form>
                            </div>
                        </Modal.Body>
                    </Modal>
                    {/* Ce modal est pour éditer un offre d'emploi */}
                    <Modal show={openEditModal} size="5xl" popup onClose={() => handleCloseEditModal()}>
                        <Modal.Header />
                        <Modal.Body>
                            <div className="space-y-6">
                                <h3 className="text-xl font-medium text-gray-900 dark:text-white">Editer une offre d'emploi</h3>
                                <form onSubmit={FormEdit}>
                                    <div className='grid grid-cols-2 gap-2'>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="poste" value="Poste" />
                                            </div>
                                            <TextInput onChange={(e) => setPoste(e.target.value)} value={poste} id="poste" required />
                                        </div>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="poste" value="Poste" />
                                            </div>
                                            <TextInput onChange={(e) => setSubTitle(e.target.value)} value={subTitle} id="poste" required />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="description" value="Description du poste" />
                                        </div>
                                        <MDEditor onChange={setDesc} value={desc} data-color-mode="light" />
                                    </div>
                                    <div className='grid grid-cols-2 gap-2'>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="status" value="Statut" />
                                            </div>
                                            <Select onChange={(e) => setStatus(e.target.value)} value={status} id="status" required>
                                                <option value='OUVERT'>Ouvert</option>
                                                <option value='BIENTOT_TERMINE'>Bientôt terminé</option>
                                                <option value='TERMINE'>Terminé</option>
                                            </Select>
                                        </div>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="salaire" value="Description du salaire" />
                                            </div>
                                            <TextInput onChange={(e) => setDescSal(e.target.value)} value={descSal} id="salaire" required />
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-2 gap-2'>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="typeemploi" value="Type de l'emploi" />
                                            </div>
                                            <Select onChange={(e) => setType(e.target.value)} value={type} id="typeemploi" required>
                                                <option value='CDD'>CDD</option>
                                                <option value='CDI'>CDI</option>
                                            </Select>
                                        </div>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="specialite" value="Spécialité" />
                                            </div>
                                            <Select onChange={(e) => setSpecial(e.target.value)} value={special} id="specialite" required>
                                                <option selected>Sélectionner une spécialité</option>
                                                {specialites.length > 0 ?
                                                    specialites.map((sp, index) => {
                                                        return (
                                                            <option key={index} value={sp.id}>{sp.libelleSpecialite}</option>
                                                        )
                                                    }) :
                                                    ("Aucune spécialité n'est enregistrée")}
                                            </Select>
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-2 gap-2'>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="lieu" value="Lieu" />
                                            </div>
                                            <TextInput onChange={(e) => setLieu(e.target.value)} value={lieu} id="lieu" type="text" required />
                                        </div>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="region" value="Région" />
                                            </div>
                                            <TextInput onChange={(e) => setRegion(e.target.value)} value={region} id="region" type="text" required />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="mail" value="Adresse mail de réception" />
                                        </div>
                                        <TextInput onChange={(e) => setMail(e.target.value)} value={mail} id="mail" type="text" required />
                                    </div>
                                    <div className='grid grid-cols-2 gap-2'>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="datenow" value="Date de publication" />
                                            </div>
                                            <TextInput onChange={(e) => setDateNow(e.target.value)} value={dateNow} id="datenow" type='date' required />
                                        </div>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="datefin" value="Date limite de soumission" />
                                            </div>
                                            <TextInput onChange={(e) => handleEndDate(e)} value={dateFin} id="datefin" type='date' required />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="image" value="Insérer une pièce jointe" />
                                        </div>
                                        <FileInput onChange={handleFileChange} id="image"/>
                                    </div>
                                    <div className="w-full pt-3">
                                        <Button type='submit'>Modifier</Button>
                                    </div>
                                </form>
                            </div>
                        </Modal.Body>
                    </Modal>
                    {/* Ce modal est pour voir un offre d'emploi */}
                    <Modal show={openSeeModal} size="5xl" popup onClose={() => setOpenSeeModal(false)}>
                        <Modal.Header />
                        <Modal.Body>
                            <div className="space-y-6">
                                <h3 className="text-xl font-medium text-gray-900 dark:text-white">Détails sur l'offre d'emploi :</h3>
                                <div className='grid grid-cols-2 gap-2'>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="poste" value="Titre du Poste" />
                                        </div>
                                        {poste}
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="soust" value="Sous titre du poste" />
                                        </div>
                                        {subTitle}
                                    </div>
                                </div>
                                
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="description" value="Description du poste" />
                                    </div>
                                    <div className="prose prose-xl text-justify w-full mt-5 max-w-none">
                                        <ReactMarkdown className='w-full max-w-none'>
                                            {desc}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 gap-2'>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="typeemploi" value="Type de l'emploi" />
                                        </div>
                                        {type}
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="specialite" value="Spécialité" />
                                        </div>
                                        SPECIALITE
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 gap-2'>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="lieu" value="Lieu" />
                                        </div>
                                        {lieu}
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="region" value="Région" />
                                        </div>
                                        {region}
                                    </div>
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="descriptionSalaire" value="Description du salaire" />
                                    </div>
                                    {descSal}
                                </div>
                                <div className='grid grid-cols-2 gap-2'>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="datenow" value="Date de publication" />
                                        </div>
                                        {dateNow}
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="datefin" value="Date limite de soumission" />
                                        </div>
                                        {dateFin}
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                </div>
                <div className="overflow-x-auto">
                    <Table striped>
                        <Table.Head>
                            <Table.HeadCell className='bg-green-950 text-white'>#</Table.HeadCell>
                            <Table.HeadCell className='bg-green-950 text-white'>Poste</Table.HeadCell>
                            <Table.HeadCell className='bg-green-950 text-white'>Type d'emploi</Table.HeadCell>
                            <Table.HeadCell className='bg-green-950 text-white'>Description du salaire</Table.HeadCell>
                            <Table.HeadCell className='bg-green-950 text-white w-20'>
                                <span>Actions</span>
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {RecrutementsListe.length > 0 ?
                                RecrutementsListe.map((re, index) => {
                                    return (
                                        <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                {re.id}
                                            </Table.Cell>
                                            <Table.Cell>{re.titre}</Table.Cell>
                                            <Table.Cell>{re.typeemploi}</Table.Cell>
                                            <Table.Cell>{re.descsal}</Table.Cell>
                                            <Table.Cell>
                                                <div className='flex flex-row'>
                                                    <Button color='' className="bg-amber-600 hover:bg-amber-700 text-white" onClick={() => handleEdit(re.id, "edit")}><EditIcon /></Button>&nbsp;&nbsp;&nbsp;
                                                    <Button color='' className="bg-red-600 hover:bg-red-700 text-white" onClick={() => handleEdit(re.id, "delete")}><DeleteForeverIcon /></Button>&nbsp;&nbsp;&nbsp;
                                                    <Button color='' className="bg-amber-600 hover:bg-amber-700 text-white" onClick={() => handleEdit(re.id, "visible")}><VisibilityIcon /></Button>
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    )
                                }) :
                                ("Aucune recrutement n'est enregistrer pour le moment")}
                        </Table.Body>
                    </Table>
                </div>
            </div>
        </>
    );
}

export default TableRecrutement;