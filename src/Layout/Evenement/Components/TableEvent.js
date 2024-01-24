import React, { useState, useEffect } from 'react';
import { Table } from 'flowbite-react';
import { Button, Label, Modal, TextInput, Select, FileInput } from 'flowbite-react';
import Titre from '../../../DefaultLayout/Titre/Titre';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import MDEditor from "@uiw/react-md-editor";
import axios from 'axios';
import ReactMarkdown from 'react-markdown'
import MenuItem from '@mui/material/MenuItem';
import SelectM from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';


function TableEvent(props) {
    const [openModal, setOpenModal] = useState(false);
    const [openMediaModal, setOpenMediaModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [openSeeModal, setOpenSeeModal] = useState(false);
    const [types, setTypes] = useState([]);
    const [medias, setMedias] = useState([]);
    const [mediaTitle, setMediaTitle] = useState('');
    const [events, setEvents] = useState([]);
    const [eventMedia, setEventMedia] = useState(0);
    const [themes, setThemes] = useState([]);
    const [langues, setLangues] = useState([]);
    const [orgs, setOrgs] = useState([]);
    const [org, setOrg] = useState(0);
    const [titre, setTitre] = useState('');
    const [adresse, setAdresse] = useState('');
    const [sousTitre, setSousTitre] = useState('');
    const [typeEvent, setTypeEvent] = useState(0);
    const [typeEventLibelle, setTypeEventLibelle] = useState('');
    const [themeEvent, setThemeEvent] = useState(0);
    const [themeEventLibelle, setThemeEventLibelle] = useState('');
    const [langue, setLangue] = useState(0);
    const [langueLibelle, setLangueLibelle] = useState('');
    const [pg, setPg] = useState('');
    const [lieu, setLieu] = useState('');
    const [lien, setLien] = useState('');
    const [desc, setDesc] = useState('');
    const [imgPath, setImgPath] = useState([]);
    const [dateNow, setDateNow] = useState(Date);
    const [dateFin, setDateFin] = useState(Date);
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageSelect, setImageSelect] = useState(null);
    const [eventId, setEventId] = useState(0);
    const [actualiteId, setActualiteId] = useState(0);
    const [eventDeleted, setEventDeleted] = useState([]);
    const [actualiteIdDeleted, setActualiteIdDeleted] = useState(0);
    const [secteurs, setSecteurs] = useState([]);
    const [secteur, setSecteur] = useState([]);

    const urlstandart = process.env.REACT_APP_URL_STANDART

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

    const handleCloseEditModal = () => {
        setOpenEditModal(false)
        setPg('')
        setLangue(0)
        setLieu('')
        setLien('')
        setThemeEvent(0)
        setTypeEvent(0)
        setTitre('')
        setSousTitre('')
        setDesc('')
        setAdresse('')
        setDateNow('')
        setDateFin('')
        setSelectedFile(null)
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
    
    const handleEdit = (id, action) => {
        const intid = parseInt(id, 10)
        const eventChoose = events.filter((el) => el.id === intid)
        if(action == "delete")
        {
            const newurl = process.env.REACT_APP_URL_STANDART + `/evenements/${intid}`
            if (window.confirm("Voulez-vous vraiment supprimer cet enregistrement d'évènement ? Cet action est irréverssible") == true) {
                axios.delete(newurl, { withCredentials: true })
                    .then(response => {
                        let monid = eventChoose.map((ed) => {
                            return ed.actualite.id
                        })
                        alert(monid)
                        const newurl = process.env.REACT_APP_URL_STANDART + `/actualities/${monid}`
                        axios.delete(newurl)
                            .then(res => {
                                alert('Evenement supprimer')
                                window.location.reload()
                            })
                            .catch(err => {
                                alert('Erreur lors de la suppression')
                            })
                    })
                    .catch(err => {
                        alert('Erreur lors de la suppression de le spécialité')
                    })
            }
        }else{
            eventChoose.map((ev) => {
                let imginfo = ev.actualite.image
                let tabimg = []
                tabimg = imginfo.split(',')
                imginfo = tabimg[0]
                imginfo = imginfo.replace(/\\/g, "/")
                setImgPath(imginfo)
                setEventId(ev.id)
                setPg(ev.cout)
                setLangue(ev.langueId)
                setLangueLibelle(ev.langue.libelleLangue)
                setLieu(ev.lieu)
                setAdresse(ev.adresse)
                let organisation = orgs.filter((og)=>og.id == ev.organisation.id)
                setOrgs(organisation)
                setLien(ev.linkToForm)
                setThemeEvent(ev.themeEvenementId)
                setThemeEventLibelle(ev.themeEvenement.theme)
                setTypeEvent(ev.typeEvenementId)
                setTypeEventLibelle(ev.typeEvenement.libelleType)
                setTitre(ev.actualite.title)
                setSousTitre(ev.actualite.subTitle)
                setDesc(ev.actualite.description)
                const dn = new Date(ev.startDate)
                setDateNow(dn.toISOString().split('T')[0])
                const df = new Date(ev.endDate)
                setDateFin(df.toISOString().split('T')[0])
                setActualiteId(ev.actualite.id)
                let tab = []
                tab = ev.secteurs.map((el) => el.libelleSecteur)
                setSecteur(tab)
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

    const FormMedia = (e) => {
        e.preventDefault();
        console.log(eventMedia)
        console.log(medias)
        const formData = new FormData();
        formData.append('title', mediaTitle)
        for (let i = 0; i < medias.length; i++) {
            const file = medias[i];
            formData.append(`ressources`, file);
        }
        // formData.append('ressources', medias)
        const actuevent = events.filter((ev)=>ev.id == eventMedia)
        const actuid = actuevent[0].actualiteId
        console.log(actuid)
        formData.append('actualiteId', actuid)
        const newurl = process.env.REACT_APP_URL_STANDART + "/catalogues"
        if (window.confirm("Voulez-vous vraiment effectuer l'enregistrement de ce catalogue ?") == true){
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
    
    const FormEdit = (e) => {
        e.preventDefault();
        if (window.confirm("Voulez-vous vraiment éffectuer cette modification cet enregistrement d'évènement ?") == true){
            const formData = new FormData();
            if(titre.trim() != "")
            {
                formData.append('title', titre)
            }
            if(sousTitre.trim() != "")
            {
                formData.append('subTitle', sousTitre)
            }
            
            formData.append('etiquette', 'EVENEMENT')
            if(desc != "")
            {
                formData.append('description', desc)
            }
            
            if(selectedFile){
                formData.append('image', selectedFile);
            }
            const newurl = process.env.REACT_APP_URL_STANDART + `/actualities/${actualiteId}`
            axios.put(newurl, formData, { withCredentials: true })
                .then(response => {
                    //alert('Thème enregistrer')
                    //alert("Après enreg Actualite")
                    //console.log(response.data.data)
                    setActualiteId(0)
                    let tab = []
                    secteur.map((el) => {
                        let sectChoose = []
                        sectChoose = secteurs.find((s) => s.libelleSecteur == el)
                        tab.push({ "id": sectChoose.id })
                        console.log(tab)
                    })
                    const newurl = process.env.REACT_APP_URL_STANDART + `/evenements/${eventId}`
                    console.log({ adresse: adresse, lieu: lieu, linkToForm: lien, cout: pg, startDate: dateNow, endDate: dateFin, langueId: parseInt(langue, 10), typeEvenementId: parseInt(typeEvent, 10), themeEvenementId: parseInt(themeEvent, 10), actualiteId: response.data.data.id })
                    axios.put(newurl, { organisateurId: parseInt(org,10), adresse: adresse, lieu: lieu, linkToForm: lien, cout: pg, startDate: dateNow, endDate: dateFin, langueId: parseInt(langue, 10), typeEvenementId: parseInt(typeEvent, 10), themeEvenementId: parseInt(themeEvent, 10), actualiteId: response.data.data.id, secteurs: JSON.stringify(tab) }, { withCredentials: true })
                        .then(response => {
                            alert("Evenement modifié")
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
    const Form = (e) => {
        e.preventDefault();
        if (window.confirm("Voulez-vous vraiment éffectuer cet enregistrement d'évènement ?") == true){
            const formData = new FormData();
            formData.append('title', titre)
            formData.append('subTitle', sousTitre)
            formData.append('etiquette', 'EVENEMENT')
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
                    const newurl = process.env.REACT_APP_URL_STANDART + "/evenements"
                    console.log({ organisateurId: parseInt(org,10), adresse: adresse, lieu: lieu, linkToForm: lien, cout: pg, startDate: dateNow, endDate: dateFin, langueId: parseInt(langue, 10), typeEvenementId: parseInt(typeEvent, 10), themeEvenementId: parseInt(themeEvent, 10), actualiteId: response.data.data.id })
                    axios.post(newurl, { organisateurId: parseInt(org,10), adresse: adresse, lieu: lieu, linkToForm: lien, cout: pg, startDate: dateNow, endDate: dateFin, langueId: parseInt(langue, 10), typeEvenementId: parseInt(typeEvent, 10), themeEvenementId: parseInt(themeEvent, 10), actualiteId: response.data.data.id, secteurs: JSON.stringify(tabsect) }, { withCredentials: true })
                        .then(response => {
                            alert("Evenement enregistrer")
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
    useEffect(() => {
        const newurl = process.env.REACT_APP_URL_STANDART + "/evenements"
        axios.get(newurl, { withCredentials: true })
            .then(response => {
                console.log(response.data.data)
                setEvents(response.data.data)
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
        const newurltype = process.env.REACT_APP_URL_STANDART + "/typeEvenements"
        axios.get(newurltype, { withCredentials: true })
            .then(response => {
                setTypes(response.data.data)
            })
            .catch(err => {
                alert('Erreur lors de la récupération des informations')
            })
        const newurltheme = process.env.REACT_APP_URL_STANDART + "/themeEvenements"
        axios.get(newurltheme, { withCredentials: true })
            .then(response => {
                setThemes(response.data.data)
            })
            .catch(err => {
                alert('Erreur lors de la récupération des informations')
            })
        const newurllangue = process.env.REACT_APP_URL_STANDART + "/langues"
        axios.get(newurllangue, { withCredentials: true })
            .then(response => {
                setLangues(response.data.data)
            })
            .catch(err => {
                alert('Erreur lors de la récupération des informations')
            })
        const newurlorg = process.env.REACT_APP_URL_STANDART + "/organisations"
        axios.get(newurlorg, { withCredentials: true })
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
                <Titre titre="Liste des évènements" />
                <div className='pb-4'>
                    <div className='inline-flex gap-2'>
                        <Button color='' className="bg-amber-600 hover:bg-amber-700 text-white" onClick={() => setOpenModal(true)}>Ajouter un évènement</Button>
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
                                            <Label htmlFor="ev" value="Evènement" />
                                        </div>
                                        <Select onChange={(e) => setEventMedia(e.target.value)} value={eventMedia} id="ev" required>
                                            <option value={0} disabled selected>Sélectionner un évènement</option>
                                            {events.length > 0 ?
                                                events.map((event, index) => {
                                                    return (
                                                        <option key={index} value={event.id}>{event.actualite.title}</option>
                                                    )
                                                }) :
                                                ("Aucun évènement n'est enregistré")}
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
                                            <Label htmlFor="formFile" value="Album de l'évènement" />
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
                    {/* Ce modal est pour crée des évènements */}
                    <Modal show={openModal} size="5xl" popup onClose={() => setOpenModal(false)}>
                        <Modal.Header />
                        <Modal.Body>
                            <form onSubmit={Form}>
                                <div className="space-y-6">
                                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Remplissez les champs et validez pour créer un évènement</h3>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="image" value="Insérer une image de l'évènement" />
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
                                                <Label htmlFor="titre" value="Titre de l'évènement" />
                                            </div>
                                            <TextInput onChange={(e) => setTitre(e.target.value)} value={titre} id="titre" required />
                                        </div>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="soustitre" value="Sous titre de l'évènement" />
                                            </div>
                                            <TextInput onChange={(e) => setSousTitre(e.target.value)} value={sousTitre} id="soustitre" type="text" required />
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-2 gap-2'>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="typeevent" value="Type de l'évènement" />
                                            </div>
                                            <Select onChange={(e) => setTypeEvent(e.target.value)} value={typeEvent} id="typeevent" required>
                                                <option value={0} disabled>Sélectionner un type d'évènement</option>
                                                {types.length > 0 ?
                                                    types.map((type, index) => {
                                                        return (
                                                            <option key={index} value={type.id}>{type.libelleType}</option>
                                                        )
                                                    }) :
                                                    ("Aucun type n'est enregistré")}
                                            </Select>
                                        </div>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="themeevent" value="Thème de l'évènement" />
                                            </div>
                                            <Select onChange={(e) => setThemeEvent(e.target.value)} value={themeEvent} id="themeevent" required>
                                                <option value={0} disabled>Sélectionner un thème d'évènement</option>
                                                {themes.length > 0 ?
                                                    themes.map((theme, index) => {
                                                        return (
                                                            <option key={index} value={theme.id}>{theme.theme}</option>
                                                        )
                                                    }) :
                                                    ("Aucun theme n'est enregistré")}
                                            </Select>
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-2 gap-2'>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="org" value="Organisateur" />
                                            </div>
                                            <Select onChange={(e) => setOrg(e.target.value)} value={org} id="org" required>
                                                <option value={0} disabled selected>Sélectionner une organisation</option>
                                                {orgs.length > 0 ?
                                                    orgs.map((org, index) => {
                                                        return (
                                                            <option key={index} value={org.id}>{org.name}</option>
                                                        )
                                                    }) :
                                                    ("Aucune organisation n'est enregistré")}
                                            </Select>
                                        </div>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="adresse" value="Adresse de l'évènement" />
                                            </div>
                                            <TextInput onChange={(e) => setAdresse(e.target.value)} value={adresse} id="adresse" type="text" required />
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-2 gap-2'>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="langue" value="Langue" />
                                            </div>
                                            <Select onChange={(e) => setLangue(e.target.value)} value={langue} id="langue" required>
                                                <option value={0} disabled>Sélectionner une langue</option>
                                                {langues.length > 0 ?
                                                    langues.map((langue, index) => {
                                                        return (
                                                            <option key={index} value={langue.id}>{langue.libelleLangue}</option>
                                                        )
                                                    }) :
                                                    ("Aucune langue n'est enregistré")}
                                            </Select>
                                        </div>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="payant_gratuit" value="Payant/Gratuit" />
                                            </div>
                                            <Select onChange={(e) => setPg(e.target.value)} value={pg} id="payant_gratuit" required>
                                                <option value='' disabled>Sélectionner une PAYANT ou GRATUIT</option>
                                                <option value='PAYANT'>PAYANT</option>
                                                <option value='GRATUIT'>GRATUIT</option>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className='pb-2'>
                                        <div className="mb-2 block">
                                            <Label htmlFor="description" value="Description de l'évènement" />
                                        </div>
                                        <MDEditor onChange={setDesc} value={desc} data-color-mode="light" />
                                    </div>
                                    <div className='grid grid-cols-2 gap-2'>
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
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="lieu" value="Lieu de l'évènement" />
                                            </div>
                                            <TextInput onChange={(e) => setLieu(e.target.value)} value={lieu} id="lieu" required />
                                        </div>
                                    </div>
                                    
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="lien" value="Lien d'inscription à l'évènement" />
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
                                                <Label htmlFor="datefin" value="Date de fin de l'évènement" />
                                            </div>
                                            <TextInput onChange={(e) => handleEndDate(e)} value={dateFin} id="datefin" type='date' required />
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <Button type='submit'>Ajouter</Button>
                                    </div>
                                </div>
                            </form>
                        </Modal.Body>
                    </Modal>
                    {/* Ce modal est pour éditer des évènements */}
                    <Modal show={openEditModal} size="5xl" popup onClose={() => handleCloseEditModal()}>
                        <Modal.Header />
                        <Modal.Body>
                            <form onSubmit={FormEdit}>
                                <div className="space-y-6">
                                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Editer un évènement</h3>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="image" value="Insérer une image de l'évènement" />
                                        </div>
                                        <FileInput onChange={handleFileChange} id="image" />
                                    </div>
                                    {selectedFile ? (
                                        <div>
                                            <img src={imageSelect} alt="Image sélectionnée" style={{ maxWidth: '20%', marginTop: '10px' }} />
                                        </div>
                                    ) : ("")}
                                    <div className='grid grid-cols-2 gap-2'>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="titre" value="Titre de l'évènement" />
                                            </div>
                                            <TextInput onChange={(e) => setTitre(e.target.value)} value={titre} id="titre" />
                                        </div>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="soustitre" value="Sous titre de l'évènement" />
                                            </div>
                                            <TextInput onChange={(e) => setSousTitre(e.target.value)} value={sousTitre} id="soustitre" type="text" />
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-2 gap-2'>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="typeevent" value="Type de l'évènement" />
                                            </div>
                                            <Select onChange={(e) => setTypeEvent(e.target.value)} value={typeEvent} id="typeevent">
                                                <option value={0} disabled>Sélectionner un type d'évènement</option>
                                                {types.length > 0 ?
                                                    types.map((type, index) => {
                                                        return (
                                                            <option key={index} value={type.id}>{type.libelleType}</option>
                                                        )
                                                    }) :
                                                    ("Aucun type n'est enregistré")}
                                            </Select>
                                        </div>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="themeevent" value="Thème de l'évènement" />
                                            </div>
                                            <Select onChange={(e) => setThemeEvent(e.target.value)} value={themeEvent} id="themeevent">
                                                <option value={0} disabled>Sélectionner un thème d'évènement</option>
                                                {themes.length > 0 ?
                                                    themes.map((theme, index) => {
                                                        return (
                                                            <option key={index} value={theme.id}>{theme.theme}</option>
                                                        )
                                                    }) :
                                                    ("Aucun theme n'est enregistré")}
                                            </Select>
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-2 gap-2'>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="org" value="Organisateur" />
                                            </div>
                                            <Select onChange={(e) => setOrg(e.target.value)} value={org} id="org" required>
                                                <option value={0} disabled selected>Sélectionner une organisation</option>
                                                {orgs.length > 0 ?
                                                    orgs.map((org, index) => {
                                                        return (
                                                            <option key={index} value={org.id}>{org.name}</option>
                                                        )
                                                    }) :
                                                    ("Aucune organisation n'est enregistré")}
                                            </Select>
                                        </div>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="adresse" value="Adresse de l'évènement" />
                                            </div>
                                            <TextInput onChange={(e) => setAdresse(e.target.value)} value={adresse} id="adresse" type="text" required />
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-2 gap-2'>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="langue" value="Langue" />
                                            </div>
                                            <Select onChange={(e) => setLangue(e.target.value)} value={langue} id="langue">
                                                <option value={0} disabled>Sélectionner une langue</option>
                                                {langues.length > 0 ?
                                                    langues.map((langue, index) => {
                                                        return (
                                                            <option key={index} value={langue.id}>{langue.libelleLangue}</option>
                                                        )
                                                    }) :
                                                    ("Aucune langue n'est enregistré")}
                                            </Select>
                                        </div>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="payant_gratuit" value="Payant/Gratuit" />
                                            </div>
                                            <Select onChange={(e) => setPg(e.target.value)} value={pg} id="payant_gratuit">
                                                <option value='' disabled>Sélectionner une PAYANT ou GRATUIT</option>
                                                <option value="PAYANT">PAYANT</option>
                                                <option value="GRATUIT">GRATUIT</option>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className='pb-2'>
                                        <div className="mb-2 block">
                                            <Label htmlFor="description" value="Description de l'évènement" />
                                        </div>
                                        <MDEditor onChange={setDesc} value={desc} data-color-mode="light" />
                                    </div>
                                    <div className='grid grid-cols-2 gap-2'>
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
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="lieu" value="Lieu de l'évènement" />
                                            </div>
                                            <TextInput onChange={(e) => setLieu(e.target.value)} value={lieu} id="lieu" required />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="lien" value="Lien d'inscription à l'évènement" />
                                        </div>
                                        <TextInput onChange={(e) => setLien(e.target.value)} value={lien} id="lien" />
                                    </div>
                                    <div className='grid grid-cols-2 gap-2'>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="datenow" value="Date de publication" />
                                            </div>
                                            <TextInput onChange={(e) => setDateNow(e.target.value)} value={dateNow} id="datenow" type='date' />
                                        </div>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="datefin" value="Date de fin de l'évènement" />
                                            </div>
                                            <TextInput onChange={(e) => setDateFin(e.target.value)} value={dateFin} id="datefin" type='date' />
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <Button type='submit'>Modifier</Button>
                                    </div>
                                </div>
                            </form>
                        </Modal.Body>
                    </Modal>
                    {/* Ce modal est pour voir des évènements */}
                    <Modal show={openSeeModal} size="5xl" popup onClose={() => setOpenSeeModal(false)}>
                        <Modal.Header />
                        <Modal.Body>
                            <div className="space-y-6">
                                <h3 className="text-xl font-medium text-gray-900 dark:text-white">Détails sur l'évènement :</h3>
                                
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="image" value="Image de l'évènement" />
                                    </div>
                                    <img crossorigin="anonymous" src={`${urlstandart}/${imgPath}`} alt="Votre texte alternatif" />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="titre" value="Titre de l'évènement" />
                                    </div>
                                    {titre}
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="soustitre" value="Sous titre de l'évènement" />
                                    </div>
                                    {sousTitre}
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="typeevent" value="Type de l'évènement" />
                                    </div>
                                    {typeEventLibelle}
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="themeevent" value="Thème de l'évènement" />
                                    </div>
                                    {themeEventLibelle}
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="langue" value="Langue" />
                                    </div>
                                    {langueLibelle}
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="payant_gratuit" value="Payant/Gratuit" />
                                    </div>
                                    {pg}
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="description" value="Description de l'évènement" />
                                    </div>
                                    <div className="prose prose-xl text-justify w-full mt-5 max-w-none">
                                        <ReactMarkdown className='w-full max-w-none'>
                                            {desc}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="lieu" value="Lieu de l'évènement" />
                                    </div>
                                    {lieu}
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="lieu" value="Lien d'inscription à l'évènement" />
                                    </div>
                                    {lien}
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="datenow" value="Date de publication" />
                                    </div>
                                    {dateNow}
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="datefin" value="Date de fin de l'évènement" />
                                    </div>
                                    {dateFin}
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
                            <Table.HeadCell className='bg-green-950 text-white'>Sous-Titre</Table.HeadCell>
                            <Table.HeadCell className='bg-green-950 text-white w-20'>
                                <span>Actions</span>
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {events.length > 0 ? 
                                events.map((ev, index) => {
                                    let imginfo = ev.actualite.image
                                    let tabimg = []
                                    tabimg = imginfo.split(',')
                                    imginfo = tabimg[0]
                                    imginfo = imginfo.replace(/\\/g, "/")
                                    return (
                                        <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                {ev.id}
                                            </Table.Cell>
                                            <Table.Cell><img crossorigin="anonymous" width="50" height="50" src={`${urlstandart}/${imginfo}`} alt="Image" /></Table.Cell>
                                            <Table.Cell>{ev.actualite.title}</Table.Cell>
                                            <Table.Cell>{ev.actualite.subTitle}</Table.Cell>
                                            <Table.Cell>
                                                <div className='flex flex-row'>
                                                    <Button color='' className="bg-amber-600 hover:bg-amber-700 text-white" onClick={() => handleEdit(ev.id, "edit")}><EditIcon /></Button>&nbsp;&nbsp;&nbsp;
                                                    <Button color='' className="bg-red-600 hover:bg-red-700 text-white" onClick={() => handleEdit(ev.id, "delete")}><DeleteForeverIcon /></Button>&nbsp;&nbsp;&nbsp;
                                                    <Button color='' className="bg-amber-600 hover:bg-amber-700 text-white" onClick={() => handleEdit(ev.id, "visible")}><VisibilityIcon /></Button>
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    )
                                }) : 
                            ("Aucun évènement n'est enregistrer pour le moment")}
                        </Table.Body>
                    </Table>
                </div>
            </div>
        </>
    );
}

export default TableEvent;