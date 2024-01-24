import React, { useState, useEffect } from 'react';
import { Table } from 'flowbite-react';
import { Button, Label, Modal, TextInput, Select, FileInput } from 'flowbite-react';
import ReactMarkdown from 'react-markdown'
import Titre from '../../../DefaultLayout/Titre/Titre';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import MDEditor from "@uiw/react-md-editor";
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import SelectM from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import axios from 'axios'

const urlstandart = process.env.REACT_APP_URL_STANDART

function TableProjet() {
    const [openModal, setOpenModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openSeeModal, setOpenSeeModal] = useState(false);
    const [openMediaModal, setOpenMediaModal] = useState(false);
    const [desc, setDesc] = useState('');
    const [titre, setTitre] = useState('');
    const [sousTitre, setSousTitre] = useState('');
    const [status, setStatus] = useState('OUVERT');
    const [secteur, setSecteur] = useState([]);
    const [medias, setMedias] = useState([]);
    const [mediaTitle, setMediaTitle] = useState('');
    const [soutien, setSoutien] = useState('');
    const [org, setOrg] = useState(0);
    const [lien, setLien] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedFile2, setSelectedFile2] = useState(null);
    const [dateNow, setDateNow] = useState(new Date().toISOString().split('T')[0]);
    const [dateFin, setDateFin] = useState(Date);
    const [projets, setProjets] = useState([]);
    const [projetsMedia, setProjetsMedia] = useState(0);
    const [projetId, setProjetId] = useState([]);
    const [secteurs, setSecteurs] = useState([]);
    const [orgs, setOrgs] = useState([]);
    const [imgPath, setImgPath] = useState([]);
    const [imageSelect, setImageSelect] = useState(null);
    const [actualiteId, setActualiteId] = useState(0);


    const handleEndDate = (e) => {
        setDateFin(e.target.value)

        if (dateNow > e.target.value) {
            alert("La date de fin doit être supérieur à la date de début...")
            setDateFin('')
        }
    }

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setSecteur(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleEdit = (id, action) => {
        const intid = parseInt(id, 10)
        const projectChoose = projets.filter((el) => el.id === intid)
        if (action == "delete") {
            const newurl = process.env.REACT_APP_URL_STANDART + `/appelAProjets/${intid}`
            if (window.confirm("Voulez-vous vraiment supprimer cet enregistrement de projet ? Cet action est irréverssible") == true) {
                axios.delete(newurl, { withCredentials: true })
                    .then(response => {
                        let monid = projectChoose.map((ed) => {
                            return ed.actualite.id
                        })
                        alert(monid)
                        const newurl = process.env.REACT_APP_URL_STANDART + `/actualities/${monid}`
                        axios.delete(newurl, { withCredentials: true })
                            .then(res => {
                                alert('Projet supprimer')
                                window.location.reload()
                            })
                            .catch(err => {
                                alert('Erreur lors de la suppression')
                            })
                    })
                    .catch(err => {
                        alert('Erreur lors de la suppression de lu projet')
                    })
            }
        } else {
            projectChoose.map((pr) => {
                let imginfo = pr.actualite.image
                let tabimg = []
                tabimg = imginfo.split(',')
                imginfo = tabimg[0]
                imginfo = imginfo.replace(/\\/g, "/")
                setImgPath(imginfo)
                setStatus(pr.status)
                setProjetId(pr.id)
                setSoutien(pr.typeSoutien)
                let tab = []
                tab = pr.secteurs.map((el) => el.libelleSecteur)
                setSecteur(tab)
                // let taborg = []
                // taborg = pr.organisation.map((el) => el.libelleSecteur)
                setOrg(pr.organisation.id)
                setSecteur(tab)
                setLien(pr.linkToForm)
                setTitre(pr.actualite.title)
                setSousTitre(pr.actualite.subTitle)
                setDesc(pr.actualite.description)
                const dn = new Date(pr.startDate)
                setDateNow(dn.toISOString().split('T')[0])
                const df = new Date(pr.endDate)
                setDateFin(df.toISOString().split('T')[0])
                setActualiteId(pr.actualite.id)
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

    const handleCloseEditModal = () => {
        setOpenEditModal(false)
        setStatus('')
        setSoutien('')
        setSecteur([])
        setLien('')
        setTitre('')
        setSousTitre('')
        setDesc('')
        setDateNow('')
        setDateFin('')
        setSelectedFile(null)
    }

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                // Mettre à jour l'état de l'image avec l'URL de l'image convertie en base64
                setImageSelect(reader.result);
            };

            reader.readAsDataURL(file);
        }
    };
    const handleFileChange2 = (event) => {
        setSelectedFile2(event.target.files[0]);
    };

    const FormEdit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (window.confirm("Voulez-vous vraiment éffectuer cet enregistrement de projet ?") == true) {
            formData.append('title', titre)
            formData.append('subTitle', sousTitre)
            formData.append('etiquette', 'APPEL_A_PROJET')
            formData.append('description', desc)
            if (selectedFile) {
                formData.append('image', selectedFile);
            }
            const newurl = process.env.REACT_APP_URL_STANDART + `/actualities/${actualiteId}`
            axios.put(newurl, formData, { withCredentials: true })
                .then(response => {
                    //alert('Thème enregistrer')
                    //alert("Après enreg Actualite")
                    //console.log(response.data.data)
                    let tab = []
                    secteur.map((el) => {
                        let sectChoose = []
                        sectChoose = secteurs.find((s) => s.libelleSecteur == el)
                        tab.push({ "id": sectChoose.id })
                        console.log(tab)
                    })

                    if (soutien) {
                        formData.append('typeSoutien', soutien)
                    }
                    if (status) {
                        formData.append('status', status)
                    }
                    if (lien) {
                        formData.append('linkToForm', lien)
                    }
                    if (dateNow) {
                        formData.append('startDate', dateNow)
                    }
                    if (org) {
                        formData.append('organisateurId', org)
                    }
                    if (dateFin) {
                        formData.append('endDate', dateFin)
                    }
                    if (secteur) {
                        formData.append('secteurs', JSON.stringify(tab))
                    }
                    if (selectedFile2) {
                        formData.append('ressource', selectedFile2);
                    }
                    const newurl = process.env.REACT_APP_URL_STANDART + `/appelAProjets/${projetId}`
                    console.log(titre + ' ' + sousTitre + ' ' + status + ' ' + secteur + ' ' + soutien + ' -->' + org + ' ' + dateNow + ' ' + dateFin)
                    axios.put(newurl, formData, { withCredentials: true })
                        .then(response => {
                            alert("Projet modifié")
                            console.log(response.data.data)
                            window.location.reload()
                        })
                        .catch(err => {
                            alert('Vérifiez vos informations')
                        })
                })
                .catch(err => {
                    alert('Vérifiez vos informations')
                })
        }
    }

    const handleFileChangeMedia = (event) => {
        // setSelectedFile(event.target.files[0]);
        console.log(event.target.files)
        setMedias(event.target.files)
        // if (file) {
        //     const reader = new FileReader();

        //     reader.onloadend = () => {
        //         // Mettre à jour l'état de l'image avec l'URL de l'image convertie en base64
        //         setImageSelect(reader.result);
        //     };

        //     reader.readAsDataURL(file);
        // }
    }

    const FormMedia = (e) => {
        e.preventDefault();
        console.log(projetsMedia)
        console.log(medias)
        const formData = new FormData();
        formData.append('title', mediaTitle)
        for (let i = 0; i < medias.length; i++) {
            const file = medias[i];
            formData.append(`ressources`, file);
        }
        // formData.append('ressources', medias)
        const actuprojet = projets.filter((ev) => ev.id == projetsMedia)
        const actuid = actuprojet[0].actualiteId
        console.log(actuid)
        formData.append('actualiteId', actuid)
        const newurl = process.env.REACT_APP_URL_STANDART + "/catalogues"
        if (window.confirm("Voulez-vous vraiment effectuer l'enregistrement de ce catalogue ?") == true) {
            axios.post(newurl, formData, { withCredentials: true })
                .then((res) => {
                    alert("Votre catalogue a été crée avec succès.")
                    window.location.reload()
                })
                .catch((err) => {
                    alert("Une erreur s'est produite lors de la création de votre catalogue.")
                })
        }
    }

    const Form = (e) => {
        e.preventDefault();
        if (window.confirm("Voulez-vous vraiment éffectuer cet enregistrement de projet ?") == true) {
            const formData = new FormData();
            formData.append('title', titre)
            formData.append('subTitle', sousTitre)
            formData.append('etiquette', 'APPEL_A_PROJET')
            formData.append('description', desc)
            formData.append('image', selectedFile);
            const newurl = process.env.REACT_APP_URL_STANDART + "/actualities"
            axios.post(newurl, formData, { withCredentials: true })
                .then(response => {
                    //alert('Thème enregistrer')
                    //alert("Après enreg Actualite")
                    //console.log(response.data.data)
                    let tabsect = []
                    secteur.map((el) => {
                        let sectChoose = []
                        sectChoose = secteurs.find((s) => s.libelleSecteur == el)
                        tabsect.push({ "id": sectChoose.id })
                        console.log(tabsect)
                    })
                    const formData = new FormData();
                    formData.append('actualiteId', response.data.data.id)
                    formData.append('status', status)
                    formData.append('linkToForm', lien)
                    formData.append('typeSoutien', soutien)
                    formData.append('startDate', dateNow)
                    formData.append('organisateurId', org)
                    formData.append('endDate', dateFin)
                    formData.append('secteurs', JSON.stringify(tabsect))
                    formData.append('ressource', selectedFile2);
                    console.log(formData)
                    const newurl = process.env.REACT_APP_URL_STANDART + "/appelAProjets"
                    console.log(status + ' ' + lien + ' ' + secteur + ' ' + soutien + ' ' + org + ' ' + dateNow + ' ' + dateFin)
                    axios.post(newurl, formData, { withCredentials: true })
                        .then(response => {
                            alert("Projet enregistrer")
                            window.location.reload()
                        })
                        .catch(err => {
                            alert('Vérifiez vos informations')
                        })
                })
                .catch(err => {
                    alert('Vérifiez vos informations')
                })
        }
    }
    // if(dateNow)
    useEffect(() => {
        const newurl = process.env.REACT_APP_URL_STANDART + "/appelAProjets"
        axios.get(newurl, { withCredentials: true })
            .then(response => {
                setProjets(response.data.data)
            })
            .catch(err => {
                alert('Erreur lors de la récupération des informations')
            })
        const newurlsecteur = process.env.REACT_APP_URL_STANDART + "/secteurs"
        axios.get(newurlsecteur, { withCredentials: true })
            .then(response => {
                setSecteurs(response.data.data)
            })
            .catch(err => {
                alert('Erreur lors de la récupération des informations')
            })
        const newurlorga = process.env.REACT_APP_URL_STANDART + "/organisations"
        axios.get(newurlorga, { withCredentials: true })
            .then(response => {
                setOrgs(response.data.data)
            })
            .catch(err => {
                alert('Erreur lors de la récupération des informations')
            })
    }, [])
    return (
        <>
            <div className="p-4 sm:ml-64">
                <Titre titre="Liste des projets" />
                <div className='pb-4'>
                    <div className='inline-flex gap-2'>
                        <Button color='' className='bg-amber-600 hover:bg-amber-700 text-white' onClick={() => setOpenModal(true)}>Ajouter un projet</Button>
                        <Button color='' className="bg-amber-600 hover:bg-amber-700 text-white" onClick={() => setOpenMediaModal(true)}>Ajouter un album</Button>
                    </div>
                    {/* Ce modal est pour ajouter des médias */}
                    <Modal show={openMediaModal} size="5xl" popup onClose={() => setOpenMediaModal(false)}>
                        <Modal.Header />
                        <Modal.Body>
                            <form onSubmit={FormMedia}>
                                <div className="space-y-6">
                                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Remplissez les champs et validez pour ajouter un album</h3>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="ev" value="Projet" />
                                        </div>
                                        <Select onChange={(e) => setProjetsMedia(e.target.value)} value={projetsMedia} id="ev" required>
                                            <option value={0} disabled selected>Sélectionner un projet</option>
                                            {projets.length > 0 ?
                                                projets.map((projet, index) => {
                                                    return (
                                                        <option key={index} value={projet.id}>{projet.actualite.title}</option>
                                                    )
                                                }) :
                                                ("Aucun projet n'est enregistré")}
                                        </Select>
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="titre" value="Titre du média" />
                                        </div>
                                        <TextInput onChange={(e) => setMediaTitle(e.target.value)} value={mediaTitle} id="titre" required />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="formFile" value="Album du projet" />
                                        </div>
                                        <input
                                            onChange={handleFileChangeMedia}
                                            className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                                            type="file"
                                            id="formFile"
                                            multiple
                                        />
                                    </div>
                                    <div className="w-full">
                                        <Button type='submit'>Ajouter</Button>
                                    </div>
                                </div>
                            </form>
                        </Modal.Body>
                    </Modal>
                    {/* Ce modal est pour crée un projet */}
                    <Modal show={openModal} size="5xl" popup onClose={() => setOpenModal(false)}>
                        <Modal.Header />
                        <Modal.Body>
                            <div className="space-y-6">
                                <h3 className="text-xl font-medium text-gray-900 dark:text-white">Remplissez les champs et validez pour créer un projet</h3>
                                <form onSubmit={Form}>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="image" value="Insérer une image du projet" />
                                        </div>
                                        <FileInput onChange={handleFileChange} id="image" required />
                                    </div>
                                    {selectedFile ? (
                                        <div>
                                            <img src={imageSelect} alt="Image sélectionnée" style={{ maxWidth: '20%', marginTop: '10px' }} />
                                        </div>
                                    ) : ("")}
                                    <div className='grid grid-cols-2 gap-2'>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="titre" value="Titre du projet" />
                                            </div>
                                            <TextInput onChange={(e) => setTitre(e.target.value)} value={titre} id="titre" required />
                                        </div>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="soustitre" value="Sous titre du projet" />
                                            </div>
                                            <TextInput onChange={(e) => setSousTitre(e.target.value)} value={sousTitre} id="soustitre" type="text" required />
                                        </div>
                                    </div>
                                    <div className='pb-2'>
                                        <div className="mb-2 block">
                                            <Label htmlFor="description" value="Description du projet" />
                                        </div>
                                        <MDEditor onChange={setDesc} value={desc} data-color-mode="light" />
                                    </div>
                                    <div className='grid grid-cols-2 gap-2'>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="status" value="Statut du projet" />
                                            </div>
                                            <Select onChange={(e) => setStatus(e.target.value)} value={status} id="status" required>
                                                <option value='OUVERT'>Ouvert</option>
                                                <option value='BIENTOT_TERMINE'>Bientôt terminé</option>
                                                <option value='TERMINE'>Terminé</option>
                                            </Select>
                                        </div>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="secteur" value="Secteur" />
                                            </div>
                                            <FormControl className='w-full'>
                                                <SelectM
                                                    style={{ height: '41px' }}
                                                    labelId="demo-multiple-checkbox-label"
                                                    id="demo-multiple-checkbox"
                                                    multiple
                                                    value={secteur}
                                                    onChange={handleChange}
                                                    renderValue={(selected) => selected.join(', ')}
                                                >
                                                    {secteurs.map((sec, index) => (
                                                        <MenuItem
                                                            key={index}
                                                            value={sec.libelleSecteur}
                                                        >
                                                            {sec.libelleSecteur}
                                                        </MenuItem>
                                                    ))}

                                                </SelectM>
                                            </FormControl>
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-2 gap-2'>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="soutien" value="Type de soutien" />
                                            </div>
                                            <Select onChange={(e) => setSoutien(e.target.value)} value={soutien} id="soutien" required>
                                                <option selected>Sélectionner un soutien</option>
                                                <option value='ACCOMPAGNEMENT'>Accompagnement</option>
                                                <option value='MIXTE'>Mixte</option>
                                                <option value='VISIBILITE'>Visibilité</option>
                                            </Select>
                                        </div>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="organisation" value="Organisation" />
                                            </div>
                                            <Select onChange={(e) => setOrg(e.target.value)} value={org} id="organisation" required>
                                                <option selected>Sélectionner une organisation</option>
                                                {orgs.length > 0 ?
                                                    orgs.map((og, index) => {
                                                        return (
                                                            <option key={index} value={og.id}>{og.name}</option>
                                                        )
                                                    }) :
                                                    ("Aucune organisation n'est enregistrée")}
                                            </Select>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="lien" value="Lien d'inscription du projet" />
                                        </div>
                                        <TextInput onChange={(e) => setLien(e.target.value)} value={lien} id="lien" />
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
                                                <Label htmlFor="datefin" value="Date de fin du projet" />
                                            </div>
                                            <TextInput onChange={(e) => handleEndDate(e)} value={dateFin} id="datefin" type='date' required />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="ressource" value="Insérer une pièce jointe" />
                                        </div>
                                        <FileInput onChange={handleFileChange2} id="ressource" />
                                    </div>
                                    <div className="w-full pt-3">
                                        <Button type='submit'>Ajouter</Button>
                                    </div>
                                </form>
                            </div>
                        </Modal.Body>
                    </Modal>
                    {/* Ce modal est pour éditer un projet */}
                    <Modal show={openEditModal} size="5xl" popup onClose={() => handleCloseEditModal()}>
                        <Modal.Header />
                        <Modal.Body>
                            <div className="space-y-6">
                                <h3 className="text-xl font-medium text-gray-900 dark:text-white">Editer un projet</h3>
                                <form onSubmit={FormEdit}>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="image" value="Insérer une image du projet" />
                                        </div>
                                        <FileInput onChange={handleFileChange} id="image" required />
                                    </div>
                                    <div className='grid grid-cols-2 gap-2'>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="titre" value="Titre du projet" />
                                            </div>
                                            <TextInput onChange={(e) => setTitre(e.target.value)} value={titre} id="titre" required />
                                        </div>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="soustitre" value="Sous titre du projet" />
                                            </div>
                                            <TextInput onChange={(e) => setSousTitre(e.target.value)} value={sousTitre} id="soustitre" type="text" required />
                                        </div>
                                    </div>
                                    <div className='pb-2'>
                                        <div className="mb-2 block">
                                            <Label htmlFor="description" value="Description du projet" />
                                        </div>
                                        <MDEditor onChange={setDesc} value={desc} data-color-mode="light" />
                                    </div>
                                    <div className='grid grid-cols-2 gap-2'>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="status" value="Statut du projet" />
                                            </div>
                                            <Select onChange={(e) => setStatus(e.target.value)} value={status} id="status" required>
                                                <option value='OUVERT'>Ouvert</option>
                                                <option value='BIENTOT_TERMINE'>Bientôt terminé</option>
                                                <option value='TERMINE'>Terminé</option>
                                            </Select>
                                        </div>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="secteur" value="Secteur" />
                                            </div>
                                            <FormControl className='w-full'>
                                                <SelectM
                                                    style={{ height: '41px' }}
                                                    labelId="demo-multiple-checkbox-label"
                                                    id="demo-multiple-checkbox"
                                                    multiple
                                                    value={secteur}
                                                    onChange={handleChange}
                                                    renderValue={(selected) => selected.join(', ')}
                                                >
                                                    {secteurs.map((sec, index) => (
                                                        <MenuItem
                                                            key={index}
                                                            value={sec.libelleSecteur}
                                                        >
                                                            {sec.libelleSecteur}
                                                        </MenuItem>
                                                    ))}

                                                </SelectM>
                                            </FormControl>
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-2 gap-2'>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="soutien" value="Type de soutien" />
                                            </div>
                                            <Select onChange={(e) => setSoutien(e.target.value)} value={soutien} id="soutien" required>
                                                <option selected>Sélectionner un soutien</option>
                                                <option value='ACCOMPAGNEMENT'>Accompagnement</option>
                                                <option value='MIXTE'>Mixte</option>
                                                <option value='VISIBILITE'>Visibilité</option>
                                            </Select>
                                        </div>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="organisation" value="Organisation" />
                                            </div>
                                            <Select onChange={(e) => setOrg(e.target.value)} value={org} id="organisation" required>
                                                <option selected>Sélectionner une organisation</option>
                                                {orgs.length > 0 ?
                                                    orgs.map((og, index) => {
                                                        return (
                                                            <option key={index} value={og.id}>{og.name}</option>
                                                        )
                                                    }) :
                                                    ("Aucune organisation n'est enregistrée")}
                                            </Select>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="lien" value="Lien d'inscription du projet" />
                                        </div>
                                        <TextInput onChange={(e) => setLien(e.target.value)} value={lien} id="lien" />
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
                                                <Label htmlFor="datefin" value="Date de fin du projet" />
                                            </div>
                                            <TextInput onChange={(e) => setDateFin(e.target.value)} value={dateFin} id="datefin" type='date' required />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="ressource" value="Insérer une pièce jointe" />
                                        </div>
                                        <FileInput onChange={handleFileChange2} id="ressource" />
                                    </div>
                                    <div className="w-full pt-3">
                                        <Button type='submit'>Modifier</Button>
                                    </div>
                                </form>
                            </div>
                        </Modal.Body>
                    </Modal>
                    {/* Ce modal est pour voir un projet */}
                    <Modal show={openSeeModal} size="5xl" popup onClose={() => setOpenSeeModal(false)}>
                        <Modal.Header />
                        <Modal.Body>
                            <div className="space-y-6">
                                <h3 className="text-xl font-medium text-gray-900 dark:text-white">Détails sur le projet :</h3>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="image" value="Image du projet" />
                                    </div>
                                    <img crossorigin="anonymous" src={`${urlstandart}/${imgPath}`} alt="Votre texte alternatif" />
                                </div>
                                <div className='grid grid-cols-2 gap-2'>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="titre" value="Titre du projet" />
                                        </div>
                                        {titre}
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="soustitre" value="Sous titre du projet" />
                                        </div>
                                        {sousTitre}
                                    </div>
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="description" value="Description du projet" />
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
                                            <Label htmlFor="status" value="Statut du projet" />
                                        </div>
                                        {status}
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="secteur" value="Secteur" />
                                        </div>
                                        {secteur}
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 gap-2'>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="soutien" value="Type de soutien" />
                                        </div>
                                        {soutien}
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="organisation" value="Organisation" />
                                        </div>
                                        {org.name}
                                    </div>
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
                                            <Label htmlFor="datefin" value="Date de fin du projet" />
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
                            <Table.HeadCell className='bg-green-950 text-white'>Image</Table.HeadCell>
                            <Table.HeadCell className='bg-green-950 text-white'>Titre</Table.HeadCell>
                            <Table.HeadCell className='bg-green-950 text-white'>Sous-titre</Table.HeadCell>
                            <Table.HeadCell className='bg-green-950 text-white'>Statut</Table.HeadCell>
                            <Table.HeadCell className='bg-green-950 text-white w-20'>
                                <span>Actions</span>
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {projets.length > 0 ?
                                projets.map((pr, index) => {
                                    let imginfo = pr.actualite.image
                                    let tabimg = []
                                    tabimg = imginfo.split(',')
                                    imginfo = tabimg[0]
                                    imginfo = imginfo.replace(/\\/g, "/")
                                    return (
                                        <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                {pr.id}
                                            </Table.Cell>
                                            <Table.Cell><img crossorigin="anonymous" width="50" height="50" src={`${urlstandart}/${imginfo}`} alt="Image" /></Table.Cell>
                                            <Table.Cell>{pr.actualite.title}</Table.Cell>
                                            <Table.Cell>{pr.actualite.subTitle}</Table.Cell>
                                            <Table.Cell>{pr.status}</Table.Cell>
                                            <Table.Cell>
                                                <div className='flex flex-row'>
                                                    <Button color='' className="bg-amber-600 hover:bg-amber-700 text-white" onClick={() => handleEdit(pr.id, "edit")}><EditIcon /></Button>&nbsp;&nbsp;&nbsp;
                                                    <Button color='' className="bg-red-600 hover:bg-red-700 text-white" onClick={() => handleEdit(pr.id, "delete")}><DeleteForeverIcon /></Button>&nbsp;&nbsp;&nbsp;
                                                    <Button color='' className="bg-amber-600 hover:bg-amber-700 text-white" onClick={() => handleEdit(pr.id, "visible")}><VisibilityIcon /></Button>
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    )
                                }) :
                                ("Aucun projet n'est enregistrer pour le moment")}
                        </Table.Body>
                    </Table>
                </div>
            </div>
        </>
    );
}

export default TableProjet;