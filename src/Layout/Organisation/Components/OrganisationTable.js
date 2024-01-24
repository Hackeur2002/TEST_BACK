import React, { useState, useEffect } from 'react';
import { Table } from 'flowbite-react';
import { Button, Label, Modal, TextInput, FileInput } from 'flowbite-react';
import ReactMarkdown from 'react-markdown'
import Titre from '../../../DefaultLayout/Titre/Titre';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import MDEditor from "@uiw/react-md-editor";
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import axios from 'axios'
import { Tab } from '@mui/material';

const urlstandart = process.env.REACT_APP_URL_STANDART


function OrganisationTable(props) {
    const [openModal, setOpenModal] = useState(false);
    const [openSeeModal, setOpenSeeModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [desc, setDesc] = useState('');
    const [nom, setNom] = useState('');
    const [website, setWebsite] = useState('');
    const [ville, setVille] = useState('');
    const [phone, setPhone] = useState('');
    const [mail, setMail] = useState('');
    const [loc, setLoc] = useState('');
    const [secteur, setSecteur] = useState([]);
    const [secteurs, setSecteurs] = useState([]);
    const [orgs, setOrgs] = useState([]);
    const [orgsId, setOrgsId] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageSelect, setImageSelect] = useState(null);
    const [imgPath, setImgPath] = useState([]);
    const [dateNow, setDateNow] = useState(Date);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setSecteur(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

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


    const handleEdit = (id, action) => {
        const intid = parseInt(id, 10)
        const orgaChoose = orgs.filter((el) => el.id === intid)
        if (action == "delete") {
            const newurl = process.env.REACT_APP_URL_STANDART + `/organisations/${intid}`
            if (window.confirm("Voulez-vous vraiment supprimer cet enregistrement d'organisation ? Cet action est irréverssible") == true) {
                axios.delete(newurl, { withCredentials: true })
                    .then(response => {
                        alert('Organisation supprimer')
                        window.location.reload()
                    })
                    .catch(err => {
                        alert('Erreur lors de la suppression de le spécialité')
                    })
            }
        } else {
            orgaChoose.map((oc) => {
                let imginfo = oc.logo
                let tabimg = []
                tabimg = imginfo.split(',')
                imginfo = tabimg[0]
                imginfo = imginfo.replace(/\\/g, "/")
                setImgPath(imginfo)
                setNom(oc.name)
                setWebsite(oc.website)
                setVille(oc.ville)
                setLoc(oc.localisation)
                setMail(oc.email)
                setDesc(oc.description)
                setPhone(oc.phone)
                let tab = []
                tab = oc.secteurs.map((el) => el.libelleSecteur)
                setSecteur(tab)
                setOrgsId(oc.id)
                const dn = new Date(oc.createdAt)
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
        if (window.confirm("Voulez-vous vraiment éffectuer cette modification cet enregistrement de l'organisation ?") == true) {
            let tab = []
            secteur.map((el) => {
                let sectChoose = []
                sectChoose = secteurs.find((s) => s.libelleSecteur == el)
                tab.push({ "id": sectChoose.id })
                console.log(tab)
            })
            const formData = new FormData();
            if(nom.trim() != "")
            {
                formData.append('name', nom)
            }
            if(website.trim() != "")
            {
                formData.append('website', website)
            }
            if(ville.trim() != "")
            {
                formData.append('ville', ville)
            }
            if(desc != "")
            {
                formData.append('description', desc)
            }
            if(loc.trim() != "")
            {
                formData.append('localisation', loc)
            }
            if(mail.trim() != "")
            {
                formData.append('email', mail)
            }
            if(phone.trim() != "")
            {
                formData.append('phone', phone)
            }
            if(loc.trim() != "")
            {
                formData.append('maplink', loc)
            }
            
            if(selectedFile){
                formData.append('logo', selectedFile);
            }
            formData.append('secteurs', JSON.stringify(tab));
            console.log(secteur + ' ' + nom + ' ' + website + ' ' + ville + ' ' + phone + ' ' + mail + ' ' + loc)
            const newurl = process.env.REACT_APP_URL_STANDART + `/organisations/${orgsId}`
            axios.put(newurl, formData, { withCredentials: true })
                .then(response => {
                    alert("Organisation modifié")
                    window.location.reload()
                })
                .catch(err => {
                    alert('Vérifiez vos informations')
                })
        }

    }


    const Form = (e) => {
        e.preventDefault();
        if (window.confirm("Voulez-vous vraiment éffectuer cet enregistrement de l'organisation ?") == true) {
            let tab = []
            secteur.map((el)=>{
                let sectChoose = []
                sectChoose = secteurs.find((s) => s.libelleSecteur == el)
                tab.push({"id":sectChoose.id})
                console.log(tab)
            })
            const formData = new FormData();
            formData.append('name', nom)
            formData.append('website', website)
            formData.append('ville', ville)
            formData.append('description', desc)
            formData.append('localisation', loc)
            formData.append('email', mail)
            formData.append('phone', phone)
            formData.append('maplink', loc)
            formData.append('logo', selectedFile);
            formData.append('secteurs', JSON.stringify(tab));
            console.log(secteur + ' ' + nom + ' ' + website + ' ' + ville + ' ' + phone + ' ' + mail + ' ' + loc)
            const newurl = process.env.REACT_APP_URL_STANDART + "/organisations"
            axios.post(newurl, formData, { withCredentials: true })
                .then(response => {
                    alert("Organisation enregistrer")
                    window.location.reload()
                })
                .catch(err => {
                    alert('Vérifiez vos informations')
                })
        }
    }
    useEffect(() => {
        const newurl = process.env.REACT_APP_URL_STANDART + "/organisations"
        axios.get(newurl, { withCredentials: true })
            .then(response => {
                console.log(response.data.data)
                setOrgs(response.data.data)
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
    }, [])
    return (
        <>
            <div className="p-4 sm:ml-64">
                <Titre titre="Liste des organisations" />
                <div className='pb-4'>
                    <Button color='' className='bg-amber-600 hover:bg-amber-700 text-white' onClick={() => setOpenModal(true)}>Ajouter une organisation</Button>
                    {/* Ce modal est pour crée une organisation */}
                    <Modal show={openModal} size="5xl" popup onClose={() => setOpenModal(false)}>
                        <Modal.Header />
                        <Modal.Body>
                            <div className="space-y-6">
                                <h3 className="text-xl font-medium text-gray-900 dark:text-white">Remplissez les champs et validez pour créer une organisation</h3>
                                <form onSubmit={Form}>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="logo" value="Logo de l'organisation" />
                                        </div>
                                        <FileInput onChange={handleFileChange} id="logo" required />
                                    </div>
                                    {selectedFile ? (
                                        <div>
                                            <img src={imageSelect} alt="Image sélectionnée" style={{ maxWidth: '20%', marginTop: '10px' }} />
                                        </div>
                                    ) : ("")}
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="nom" value="Nom de l'organisation" />
                                        </div>
                                        <TextInput onChange={(e) => setNom(e.target.value)} value={nom} id="nom" type="text" required />
                                    </div>
                                    <div className='pb-2'>
                                        <div className="mb-2 block">
                                            <Label htmlFor="description" value="Description de l'organisation" />
                                        </div>
                                        <MDEditor onChange={setDesc} value={desc} data-color-mode="light" />
                                    </div>
                                    <div className='grid grid-cols-2 gap-2'>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="site" value="Lien du site web de l'organisation" />
                                            </div>
                                            <TextInput onChange={(e) => setWebsite(e.target.value)} value={website} id="site" type="text" required />
                                        </div>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="ville" value="Ville de l'organisation" />
                                            </div>
                                            <TextInput onChange={(e) => setVille(e.target.value)} value={ville} id="ville" type="text" required />
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-2 gap-2'>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="phone" value="Téléphone de l'organisation" />
                                            </div>
                                            <TextInput onChange={(e) => setPhone(e.target.value)} value={phone} id="phone" type="text" required />
                                        </div>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="email" value="Email de l'organisation" />
                                            </div>
                                            <TextInput onChange={(e) => setMail(e.target.value)} value={mail} id="email" type="email" required />
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-2 gap-2'>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="localisation" value="Localisation" />
                                            </div>
                                            <TextInput onChange={(e) => setLoc(e.target.value)} value={loc} id="localisation" type="text" required />
                                        </div>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="secteur" value="Secteur" />
                                            </div>
                                            <FormControl className='w-full'>
                                                <Select
                                                    style={{height:'41px'}}
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
                                                    
                                                </Select>
                                            </FormControl>
                                        </div>
                                    </div>
                                    <div className="w-full pt-2">
                                        <Button type='submit'>Ajouter</Button>
                                    </div>
                                </form>
                            </div>
                        </Modal.Body>
                    </Modal>
                    {/* Ce modal est pour éditer une organisation */}
                    <Modal show={openEditModal} size="5xl" popup onClose={() => setOpenEditModal(false)}>
                        <Modal.Header />
                        <Modal.Body>
                            <div className="space-y-6">
                                <h3 className="text-xl font-medium text-gray-900 dark:text-white">Remplissez les champs et validez pour créer une organisation</h3>
                                <form onSubmit={FormEdit}>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="logo" value="Logo de l'organisation" />
                                        </div>
                                        <FileInput onChange={handleFileChange} id="logo" />
                                    </div>
                                    {selectedFile ? (
                                        <div>
                                            <img src={imageSelect} alt="Image sélectionnée" style={{ maxWidth: '20%', marginTop: '10px' }} />
                                        </div>
                                    ) : ("")}
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="nom" value="Nom de l'organisation" />
                                        </div>
                                        <TextInput onChange={(e) => setNom(e.target.value)} value={nom} id="nom" type="text" required />
                                    </div>
                                    <div className='pb-2'>
                                        <div className="mb-2 block">
                                            <Label htmlFor="description" value="Description de l'organisation" />
                                        </div>
                                        <MDEditor onChange={setDesc} value={desc} data-color-mode="light" />
                                    </div>
                                    <div className='grid grid-cols-2 gap-2'>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="site" value="Lien du site web de l'organisation" />
                                            </div>
                                            <TextInput onChange={(e) => setWebsite(e.target.value)} value={website} id="site" type="text" required />
                                        </div>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="ville" value="Ville de l'organisation" />
                                            </div>
                                            <TextInput onChange={(e) => setVille(e.target.value)} value={ville} id="ville" type="text" required />
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-2 gap-2'>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="phone" value="Téléphone de l'organisation" />
                                            </div>
                                            <TextInput onChange={(e) => setPhone(e.target.value)} value={phone} id="phone" type="text" required />
                                        </div>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="email" value="Email de l'organisation" />
                                            </div>
                                            <TextInput onChange={(e) => setMail(e.target.value)} value={mail} id="email" type="email" required />
                                        </div>
                                    </div>
                                    <div className='grid grid-cols-2 gap-2'>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="localisation" value="Localisation" />
                                            </div>
                                            <TextInput onChange={(e) => setLoc(e.target.value)} value={loc} id="localisation" type="text" required />
                                        </div>
                                        <div>
                                            <div className="mb-2 block">
                                                <Label htmlFor="secteur" value="Secteur" />
                                            </div>
                                            <FormControl className='w-full'>
                                                <Select
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

                                                </Select>
                                            </FormControl>
                                        </div>
                                    </div>
                                    <div className="w-full pt-2">
                                        <Button type='submit'>Modifier</Button>
                                    </div>
                                </form>
                            </div>
                        </Modal.Body>
                    </Modal>
                    {/* Ce modal est pour voir une organisation */}
                    <Modal show={openSeeModal} size="5xl" popup onClose={() => setOpenSeeModal(false)}>
                        <Modal.Header />
                        <Modal.Body>
                            <div className="space-y-6">
                                <h3 className="text-xl font-medium text-gray-900 dark:text-white">Détails sur l'organisation :</h3>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="logo" value="Logo de l'organisation" />
                                    </div>
                                    <img crossorigin="anonymous" src={`${urlstandart}/${imgPath}`} alt="Votre texte alternatif" />
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="nom" value="Nom de l'organisation" />
                                    </div>
                                    {nom}
                                </div>
                                <div>
                                    <div className="mb-2 block">
                                        <Label htmlFor="description" value="Description de l'organisation" />
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
                                            <Label htmlFor="site" value="Lien du site web de l'organisation" />
                                        </div>
                                        {website}
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="ville" value="Ville de l'organisation" />
                                        </div>
                                        {ville}
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 gap-2'>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="phone" value="Téléphone de l'organisation" />
                                        </div>
                                        {phone}
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="email" value="Email de l'organisation" />
                                        </div>
                                        {mail}
                                    </div>
                                </div>
                                <div className='grid grid-cols-2 gap-2'>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="localisation" value="Localisation" />
                                        </div>
                                        {loc}
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="datecreation" value="Date de création" />
                                        </div>
                                        {dateNow}
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
                            <Table.HeadCell className='bg-green-950 text-white'>Logo</Table.HeadCell>
                            <Table.HeadCell className='bg-green-950 text-white'>Nom</Table.HeadCell>
                            <Table.HeadCell className='bg-green-950 text-white'>Email</Table.HeadCell>
                            <Table.HeadCell className='bg-green-950 text-white'>Phone</Table.HeadCell>
                            <Table.HeadCell className='bg-green-950 text-white w-20'>
                                <span>Actions</span>
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {orgs.length > 0 ?
                                orgs.map((og, index) => {
                                    let imginfo = og.logo
                                    let tabimg = []
                                    tabimg = imginfo.split(',')
                                    imginfo = tabimg[0]
                                    imginfo = imginfo.replace(/\\/g, "/")
                                    return (
                                        <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                                {og.id}
                                            </Table.Cell>
                                            <Table.Cell><img crossorigin="anonymous" width="50" height="50" src={`${urlstandart}/${imginfo}`} alt="Image" /></Table.Cell>
                                            <Table.Cell>{og.name}</Table.Cell>
                                            <Table.Cell>{og.email}</Table.Cell>
                                            <Table.Cell>{og.phone}</Table.Cell>
                                            <Table.Cell>
                                                <div className='flex flex-row'>
                                                    <Button color='' className="bg-amber-600 hover:bg-amber-700 text-white" onClick={() => handleEdit(og.id, "edit")}><EditIcon /></Button>&nbsp;&nbsp;&nbsp;
                                                    <Button color='' className="bg-red-600 hover:bg-red-700 text-white" onClick={() => handleEdit(og.id, "delete")}><DeleteForeverIcon /></Button>&nbsp;&nbsp;&nbsp;
                                                    <Button color='' className="bg-amber-600 hover:bg-amber-700 text-white" onClick={() => handleEdit(og.id, "visible")}><VisibilityIcon /></Button>
                                                </div>
                                            </Table.Cell>
                                        </Table.Row>
                                    )
                                }) :
                                ("Aucune organisation n'est enregistrée pour le moment")}
                        </Table.Body>
                    </Table>
                </div>
            </div>
        </>
    );
}

export default OrganisationTable;