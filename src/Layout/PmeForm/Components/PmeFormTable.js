import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
// import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { FileInput, Label, Modal, TextInput, Select, Button } from 'flowbite-react';
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import MenuItem from '@mui/material/MenuItem';
import SelectM from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import axios from 'axios'

const steps = [
    {
        label: 'Informations du dirigeant',
        description: '',
    },
    {
        label: 'Informations de l\'entreprise',
        description:
            'An ad group contains one or more ads which target a shared set of keywords.',
    },
    {
        label: 'Potentiel commercial et stratégie de croissance',
        description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
    },
];

const data = [
    {
        label: "Enregistrer son entreprise",
        value: "entreprise",
        desc: `It really matters and then like it really doesn't matter.
      What matters is the people who are sparked by it. And the people 
      who are like offended by it, it doesn't matter.`,
    },
    {
        label: "Rechercher son entreprise",
        value: "recherche",
        desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
    },
];

export default function PmeFormTable() {
    const currentDate = new Date();
    const [activeTab, setActiveTab] = React.useState("entreprise");
    const [activeStep, setActiveStep] = useState(0);
    const [fullName, setFullName] = useState('')
    const [old, setOld] = useState(new Date())
    const [genre, setGenre] = useState('')
    const [mail, setMail] = useState('')
    const [tel, setTel] = useState('')
    const [fonction, setFonction] = useState('')
    const [part, setPart] = useState(0)
    const [sigle, setSigle] = useState('')
    const [raisonSociale, setRaisonSociale] = useState('')
    const [secteur, setSecteur] = useState(0)
    const [sSecteur, setSSecteur] = useState([])
    const [sousSecteur, setSousSecteur] = useState(0)
    const [numeroRCCM, setNumeroRCCM] = useState('')
    const [villageOuQuartier, setVillageOuQuartier] = useState(0)
    const [arrondissement, setArrondissement] = useState(0)
    const [commune, setCommune] = useState(0)
    const [dept, setDept] = useState(0)
    const [dateCreation, setDateCreation] = useState(new Date())
    const [adresse, setAdresse] = useState('')
    const [telEntreprise, setTelEntreprise] = useState('')
    const [mailEntreprise, setMailEntreprise] = useState('')
    const [bp, setBp] = useState('')
    const [statutJuridique, setStatutJuridique] = useState(0)
    const [capitaleSocial, setCapitalSocial] = useState(0)
    const [currentYear, setCurrentYear] = useState(0);
    const [firstYear, setFirstYear] = useState(currentDate.getFullYear() - 1);
    const [firstYearCA, setFirstYearCA] = useState(0);
    const [firstYearEmployer, setFirstYearEmployer] = useState(0);
    const [secondYear, setSecondYear] = useState(currentDate.getFullYear() - 2);
    const [secondYearCA, setSecondYearCA] = useState(0);
    const [secondYearEmployer, setSecondYearEmployer] = useState(0);
    const [value, setValue] = React.useState('1');
    const [communes, setCommunes] = useState([]);
    const [communesChoose, setCommunesChoose] = useState([]);
    const [arrondissements, setArrondissements] = useState([]);
    const [arrondissementsChoose, setArrondissementsChoose] = useState([]);
    const [depts, setDepts] = useState([]);
    const [vils, setVils] = useState([]);
    const [secteurs, setSecteurs] = useState([]);
    const [sousSecteurs, setSousSecteurs] = useState([]);
    const [sousSecteursChoose, setSousSecteursChoose] = useState([]);
    const [vilsChoose, setVilsChoose] = useState([]);
    const [projets, setProjets] = useState([]);
    const [statusJs, setStatutJs] = useState([]);
    const [projet, setProjet] = useState([]);
    const [searchComapnyName, setSearchCompanyName] = useState('');
    const [companySearched, setCompanySearched] = useState([]);
    const [companySearchedId, setCompanySearchedId] = useState(0);

    const handleRadioChange = (event) => {
        setGenre(event.target.value);
    };

    const deptChoose = (e) => {
        setDept(e.target.value)
        setCommunesChoose(communes.filter((com) => com.departementId == e.target.value))
        console.log("departementid :" + e.target.value)
        console.log(communesChoose)
    }

    const comChoose = (e) => {
        setCommune(e.target.value)
        setArrondissementsChoose(arrondissements.filter((com) => com.communeId == e.target.value))
        console.log("communeid :" + e.target.value)
        console.log(arrondissementsChoose)
    }

    const arrChoose = (e) => {
        setArrondissement(e.target.value)
        setVilsChoose(vils.filter((com) => com.arrondissementId == e.target.value))
        console.log("Arrondissementid :" + e.target.value)
        console.log(vilsChoose)
    }

    const sectChoose = (e) => {
        setSecteur(e.target.value)
        setSousSecteursChoose(sousSecteurs.filter((com) => com.secteurId == e.target.value))
        console.log("secteurId :" + e.target.value)
        console.log(vilsChoose)
    }

    const handleChangeSSecteur = (event) => {
        const {
            target: { value },
        } = event;
        setSSecteur(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleChangeProjet = (event) => {
        const {
            target: { value },
        } = event;
        setProjet(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const handleNext = () => {
        setActiveStep((prevActiveStep) => {
            console.log(prevActiveStep)
            return prevActiveStep + 1
        });
    };
    const handleSubmit = () => {
        let tab = []
        sSecteur.map((el) => {
            let sectChoose = []
            sectChoose = sousSecteursChoose.find((s) => s.libelle == el)
            tab.push({ "id": sectChoose.id })
        })
        let tabp = []
        projet.map((el) => {
            let sectChoose = []
            console.log(el)
            sectChoose = projets.find((s) => s.actualite.title == el)
            // sectChoose = projets.find((s) => s.libelle == el)
            tabp.push({ "appelAProjetId": sectChoose.id, "decision": true })
            console.log(tabp)
        })
        console.log(
            fullName + "\n " +
            old + "\n " +
            genre + "\n " +
            mail + "\n " +
            tel + "\n " +
            fonction + "\n " +
            part + "\n " +
            sigle + "\n " +
            raisonSociale + "\n " +
            secteur + "\n " +
            sousSecteur + "\n " +
            numeroRCCM + "\n " +
            villageOuQuartier + "\n " +
            arrondissement + "\n " +
            commune + "\n " +
            dept + "\n " +
            dateCreation + "\n " +
            adresse + "\n " +
            telEntreprise + "\n " +
            mailEntreprise + "\n " +
            bp + "\n " +
            statutJuridique + "\n " +
            capitaleSocial + "\n " +
            firstYear + "\n " +
            firstYearCA + "\n " +
            firstYearEmployer + "\n " +
            secondYear + "\n " +
            secondYearCA + "\n " +
            secondYearEmployer + "\n " +
            tab
        )
        if (window.confirm("Voulez-vous vraiment éffectuer cet enregistrement ?") == true) {
            const newurl = process.env.REACT_APP_URL_STANDART + "/pmes"
            axios.post(newurl, {
                "sigle": sigle,
                "raisonSociale": raisonSociale,
                "rccm": numeroRCCM,
                "adresse": adresse,
                "phone": telEntreprise,
                "email": mailEntreprise,
                "capitalSocial": capitaleSocial,
                "statusJuridiqueId": statutJuridique,
                "villagesOuQuartiersDevilleId": villageOuQuartier,
                "website": "website.rvr",
                "boitePostale": bp,
                "Exercice": [
                    {
                        "ca": parseInt(firstYearCA, 10),
                        "nbreEmp": parseInt(firstYearEmployer, 10),
                        "annee": firstYear
                    },
                    {
                        "ca": parseInt(secondYearCA, 10),
                        "nbreEmp": parseInt(secondYearEmployer, 10),
                        "annee": secondYear
                    }
                ],
                "CreateurDirigeant": [
                    {
                        "firstname": fullName,
                        "lastname": fullName,
                        "gender": genre,
                        "phone": tel,
                        "birthday": old,
                        "email": mail,
                        "poste": fonction,
                        "part": parseInt(part, 10)
                    }
                ],
                "ParticipeAppelAProjet": tabp,
                "sousSecteurs": tab
            }, { withCredentials: true })
                .then(response => {
                    alert('Votre entreprise a été enregistrée.')
                    window.location.reload()
                })
                .catch(err => {
                    alert('Erreur lors de la suppression du recrutement')
                })
        }
    };

    const SearchCompany = async (e) => {
        e.preventDefault();
        setFullName('')
        setOld('')
        setMail('')
        setTel('')
        setFonction(0)
        setPart(0)
        const newurlsearch = process.env.REACT_APP_URL_STANDART + `/pmes/${searchComapnyName}`
        await axios.get(newurlsearch, { withCredentials: true })
            .then(response => {
                //alert('Recrutement supprimer')
                setCompanySearched(response.data.data);
                const tab = response.data.data[0]
                setCompanySearchedId(tab.id)
            })
            .catch(err => {
                alert('Aucune entreprise n\'a été trouvée. Assurez vous d\'avoir bien renseigné le nom ou la raison sociale')
            })
    }

    const EditForm = (e) => {
        e.preventDefault();
        const newurlsearch = process.env.REACT_APP_URL_STANDART + `/pmes/${companySearchedId}`
        axios.put(newurlsearch, {
            "CreateurDirigeant": [
                {
                    "firstname": fullName,
                    "lastname": fullName,
                    "gender": genre,
                    "phone": tel,
                    "birthday": old,
                    "email": mail,
                    "poste": fonction,
                    "part": parseInt(part, 10)
                }
            ],
        }, { withCredentials: true })
            .then(response => {
                alert('Vous avez été enregistré')
                window.location.reload()
            })
            .catch(err => {
                alert('Erreur lors de la soumission du formulaire')
            })
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };
    useEffect(() => {
        const getCurrentYear = () => {
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            setCurrentYear(year);
        };

        getCurrentYear();
        const newurlcom = process.env.REACT_APP_URL_STANDART + "/communes"
        axios.get(newurlcom, {}, { withCredentials: true })
            .then(response => {
                //alert('Recrutement supprimer')
                setCommunes(response.data.data)
            })
            .catch(err => {
                alert('Erreur lors de la suppression des communes')
            })
        const newurlarr = process.env.REACT_APP_URL_STANDART + "/arrondissements"
        axios.get(newurlarr, {}, { withCredentials: true })
            .then(response => {
                //alert('Recrutement supprimer')
                setArrondissements(response.data.data)
            })
            .catch(err => {
                alert('Erreur lors de la suppression des arrondissements')
            })
        const newurldept = process.env.REACT_APP_URL_STANDART + "/departements"
        axios.get(newurldept, {}, { withCredentials: true })
            .then(response => {
                //alert('Recrutement supprimer')
                setDepts(response.data.data)
            })
            .catch(err => {
                alert('Erreur lors de la suppression du départements')
            })
        const newurlvils = process.env.REACT_APP_URL_STANDART + "/villagesOuQuartiersDeVilles"
        axios.get(newurlvils, {}, { withCredentials: true })
            .then(response => {
                //alert('Recrutement supprimer')
                setVils(response.data.data)
            })
            .catch(err => {
                alert('Erreur lors de la suppression du villages ou quartiers')
            })
        const newurlsects = process.env.REACT_APP_URL_STANDART + "/secteurs"
        axios.get(newurlsects, {}, { withCredentials: true })
            .then(response => {
                //alert('Recrutement supprimer')
                setSecteurs(response.data.data)
            })
            .catch(err => {
                alert('Erreur lors de la suppression du secteurs')
            })
        const newurlssects = process.env.REACT_APP_URL_STANDART + "/sousSecteurs"
        axios.get(newurlssects, {}, { withCredentials: true })
            .then(response => {
                //alert('Recrutement supprimer')
                setSousSecteurs(response.data.data)
            })
            .catch(err => {
                alert('Erreur lors de la suppression du secteurs')
            })
        const newurlpro = process.env.REACT_APP_URL_STANDART + "/appelAProjets"
        axios.get(newurlpro, {}, { withCredentials: true })
            .then(response => {
                //alert('Recrutement supprimer')
                setProjets(response.data.data)
            })
            .catch(err => {
                alert('Erreur lors de la suppression du secteurs')
            })
        const newurlstat = process.env.REACT_APP_URL_STANDART + "/statutJuridiques"
        axios.get(newurlstat, {}, { withCredentials: true })
            .then(response => {
                //alert('Recrutement supprimer')
                setStatutJs(response.data.data)
            })
            .catch(err => {
                alert('Erreur lors de la suppression du statut juridique')
            })
    }, []);

    return (
        <div>
            <Tabs value={activeTab}>
                <TabsHeader
                    className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
                    indicatorProps={{
                        className:
                            "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                    }}
                >
                    {data.map(({ label, value }) => (
                        <Tab
                            key={value}
                            value={value}
                            onClick={() => setActiveTab(value)}
                            className={activeTab === value ? "text-gray-900" : ""}
                        >
                            {label}
                        </Tab>
                    ))}
                </TabsHeader>
                <TabsBody>
                    {data.map(({ value, desc }) => (
                        <TabPanel key={value} value={value}>
                            {value == 'entreprise' ? (
                                <Box sx={{ maxWidth: 900 }}>
                                    <Stepper activeStep={activeStep} orientation="vertical">
                                        {steps.map((step, index) => (
                                            <Step key={step.label}>
                                                <StepLabel
                                                    optional={
                                                        index === 2 ? (
                                                            <Typography variant="caption">Dernière étape</Typography>
                                                        ) : null
                                                    }
                                                >
                                                    {step.label}
                                                </StepLabel>
                                                <StepContent>
                                                    <Typography>
                                                        {step.label == 'Informations du dirigeant' ? (
                                                            <div className="space-y-6">
                                                                <br />
                                                                <div>
                                                                    <div className="mb-2 block">
                                                                        <Label htmlFor="nom" value={<span className='font-bold'>Nom(s) et prénoms(s) <span className='text-red-500'>*</span></span>} />
                                                                    </div>
                                                                    <TextInput onChange={(e) => setFullName(e.target.value)} value={fullName} id="nom" placeholder='Ex: John Doe' type="text" required />
                                                                </div>
                                                                <div>
                                                                    <div className="mb-2 block">
                                                                        <Label htmlFor="datenais" value={<span className='font-bold'>Date de naissance <span className='text-red-500'>*</span></span>} />
                                                                    </div>
                                                                    <TextInput onChange={(e) => setOld(e.target.value)} value={old} id="datenais" type="date" required />
                                                                </div>
                                                                <div>
                                                                    <FormControl>
                                                                        <FormLabel><span className='font-bold'>Genre</span></FormLabel>
                                                                        <RadioGroup
                                                                            aria-labelledby="demo-radio-buttons-group-label"
                                                                            defaultValue="female"
                                                                            name="radio-buttons-group"
                                                                            value={genre}
                                                                            onChange={handleRadioChange}
                                                                        >
                                                                            <FormControlLabel value="HOMME" control={<Radio />} label="Femme" />
                                                                            <FormControlLabel value="FEMME" control={<Radio />} label="Homme" />
                                                                        </RadioGroup>
                                                                    </FormControl>
                                                                </div>
                                                                <div>
                                                                    <div className="mb-2 block">
                                                                        <Label htmlFor="mail" value={<span className='font-bold'>Adresse email <span className='text-red-500'>*</span></span>} />
                                                                    </div>
                                                                    <TextInput onChange={(e) => setMail(e.target.value)} value={mail} id="mail" placeholder='Ex: johndoe@gmail.com' type="text" required />
                                                                </div>
                                                                <div>
                                                                    <div className="mb-2 block">
                                                                        <Label htmlFor="phone" value={<span className='font-bold'>Numéro de télephone mobile <span className='text-red-500'>*</span></span>} />
                                                                    </div>
                                                                    <TextInput onChange={(e) => setTel(e.target.value)} value={tel} id="phone" placeholder='Ex:0022960XXXXXX' type="text" required />
                                                                </div>
                                                                <div>
                                                                    <div className="mb-2 block">
                                                                        <Label htmlFor="fonction" value={<span className='font-bold'>Fonction dans l'entreprise <span className='text-red-500'>*</span></span>} />
                                                                    </div>
                                                                    <Select onChange={(e) => setFonction(e.target.value)} value={fonction} id="fonction" required>
                                                                        <option value={0}>Sélectionner votre fonction dans l'entreprise</option>
                                                                        <option value={1}>Associé</option>
                                                                        <option value={2}>Propriétaire</option>
                                                                        <option value={3}>Actionnaire</option>
                                                                        <option value={4}>Gestionnaire</option>
                                                                        <option value={5}>Collaborateur</option>
                                                                    </Select>
                                                                </div>
                                                                <div>
                                                                    <div className="mb-2 block">
                                                                        <Label htmlFor="part" value={<span className='font-bold'>Quel est votre pourcentage des parts sociales que vous détenez ? <span className='text-red-500'>*</span></span>} />
                                                                    </div>
                                                                    <TextInput onChange={(e) => setPart(e.target.value)} value={part} id="part" placeholder='Ex:100' type="number" required />
                                                                </div>
                                                            </div>
                                                        ) : step.label == 'Informations de l\'entreprise' ? (
                                                            <div className="space-y-6">
                                                                <br />
                                                                <div>
                                                                    <div className="mb-2 block">
                                                                        <Label htmlFor="sigle" value={<span className='font-bold'>Sigle de l'entreprise <span className='text-red-500'>*</span></span>} />
                                                                    </div>
                                                                    <TextInput onChange={(e) => setSigle(e.target.value)} value={sigle} id="sigle" placeholder='Ex: ADPME' type="text" required />
                                                                </div>
                                                                <div>
                                                                    <div className="mb-2 block">
                                                                        <Label htmlFor="rason_sociale" value={<span className='font-bold'>Raison sociale <span className='text-red-500'>*</span></span>} />
                                                                    </div>
                                                                    <TextInput onChange={(e) => setRaisonSociale(e.target.value)} value={raisonSociale} id="rason_sociale" placeholder='Ex: Agence de Developpement des Petites et Moyennes Entreprises' type="text" required />
                                                                </div>
                                                                <div>
                                                                    <div className="mb-2 block">
                                                                        <Label htmlFor="capital_social" value={<span className='font-bold'>Capital social (en FCFA) <span className='text-red-500'>*</span></span>} />
                                                                    </div>
                                                                    <TextInput onChange={(e) => setCapitalSocial(e.target.value)} value={capitaleSocial} id="capital_social" placeholder='Ex: 50000000' type="number" required />
                                                                </div>
                                                                <div>
                                                                    <div className="mb-2 block">
                                                                        <Label htmlFor="date_creation" value={<span className='font-bold'>Date de création de l'entreprise <span className='text-red-500'>*</span></span>} />
                                                                    </div>
                                                                    <TextInput onChange={(e) => setDateCreation(e.target.value)} value={dateCreation} id="date_creation" type="date" required />
                                                                </div>

                                                                <div>
                                                                    <div className="mb-2 block">
                                                                        <Label htmlFor="tel" value={<span className='font-bold'>Télephone de l'entreprise <span className='text-red-500'>*</span></span>} />
                                                                    </div>
                                                                    <TextInput onChange={(e) => setTelEntreprise(e.target.value)} value={telEntreprise} id="tel" placeholder='Ex: 0022945XXXXXX' type="text" required />
                                                                </div>
                                                                <div>
                                                                    <div className="mb-2 block">
                                                                        <Label htmlFor="mail" value={<span className='font-bold'>Adresse mail de l'entreprise <span className='text-red-500'>*</span></span>} />
                                                                    </div>
                                                                    <TextInput onChange={(e) => setMailEntreprise(e.target.value)} value={mailEntreprise} id="mail" placeholder='Ex: adpme@gmail.com' type="mail" required />
                                                                </div>
                                                                <div>
                                                                    <div className="mb-2 block">
                                                                        <Label htmlFor="dept" value={<span className='font-bold'>Département <span className='text-red-500'>*</span></span>} />
                                                                    </div>
                                                                    <Select onChange={deptChoose} value={dept} id="dept" required>
                                                                        <option disabed selected>Sélectionner un département</option>
                                                                        {depts.length > 0 ?
                                                                            depts.map((sp, index) => {
                                                                                return (
                                                                                    <option key={index} value={sp.id}>{sp.libelle}</option>
                                                                                )
                                                                            }) :
                                                                            ("Aucun départements")}
                                                                    </Select>
                                                                </div>
                                                                {dept != 0 ? (
                                                                    <>
                                                                        <div>
                                                                            <div className="mb-2 block">
                                                                                <Label htmlFor="com" value={<span className='font-bold'>Commune <span className='text-red-500'>*</span></span>} />
                                                                            </div>
                                                                            <Select onChange={comChoose} value={commune} id="com" required>
                                                                                <option disabed selected>Sélectionner une commune</option>
                                                                                {communesChoose.length > 0 ?
                                                                                    communesChoose.map((sp, index) => {
                                                                                        return (
                                                                                            <option key={index} value={sp.id}>{sp.libelle}</option>
                                                                                        )
                                                                                    }) :
                                                                                    ("Aucune commune")}
                                                                            </Select>
                                                                        </div>
                                                                        {commune != 0 ? (
                                                                            <>
                                                                                <div>
                                                                                    <div className="mb-2 block">
                                                                                        <Label htmlFor="arrondissement" value={<span className='font-bold'>Arrondissement <span className='text-red-500'>*</span></span>} />
                                                                                    </div>
                                                                                    <Select onChange={arrChoose} value={arrondissement} id="arrondissement" required>
                                                                                        <option disabed selected>Sélectionner un arrondissement</option>
                                                                                        {arrondissementsChoose.length > 0 ?
                                                                                            arrondissementsChoose.map((sp, index) => {
                                                                                                return (
                                                                                                    <option key={index} value={sp.id}>{sp.libelle}</option>
                                                                                                )
                                                                                            }) :
                                                                                            ("Aucun arrondissement")}
                                                                                    </Select>
                                                                                </div>
                                                                                {arrondissement != 0 ? (
                                                                                    <div>
                                                                                        <div className="mb-2 block">
                                                                                            <Label htmlFor="quartier" value={<span className='font-bold'>Village ou quartier de ville <span className='text-red-500'>*</span></span>} />
                                                                                        </div>
                                                                                        <Select onChange={(e) => setVillageOuQuartier(e.target.value)} value={villageOuQuartier} id="quartier" required>
                                                                                            <option disabed selected>Sélectionner votre village ou votre quartier</option>
                                                                                            {vilsChoose.length > 0 ?
                                                                                                vilsChoose.map((sp, index) => {
                                                                                                    return (
                                                                                                        <option key={index} value={sp.id}>{sp.libelle}</option>
                                                                                                    )
                                                                                                }) :
                                                                                                ("Aucun Village ou quartier")}
                                                                                        </Select>
                                                                                    </div>
                                                                                ) : ("")}
                                                                            </>
                                                                        ) : ("")}
                                                                    </>
                                                                ) : ("")}
                                                                <div>
                                                                    <div className="mb-2 block">
                                                                        <Label htmlFor="adresse" value={<span className='font-bold'>Adresse physique de l'entreprise (Carré, Lot, ect...) <span className='text-red-500'>*</span></span>} />
                                                                    </div>
                                                                    <TextInput onChange={(e) => setAdresse(e.target.value)} value={adresse} id="adresse" placeholder='Ex: c/20XX Lot X' type="text" required />
                                                                </div>
                                                                <div>
                                                                    <div className="mb-2 block">
                                                                        <Label htmlFor="secteur" value={<span className='font-bold'>Secteur <span className='text-red-500'>*</span></span>} />
                                                                    </div>
                                                                    <Select onChange={sectChoose} value={secteur} id="secteur" required>
                                                                        <option value={0} disabed selected>Sélectionner le secteur de votre entreprise</option>
                                                                        {secteurs.length > 0 ?
                                                                            secteurs.map((sp, index) => {
                                                                                return (
                                                                                    <option key={index} value={sp.id}>{sp.libelleSecteur}</option>
                                                                                )
                                                                            }) :
                                                                            ("Aucun Secteur ou quartier")}
                                                                    </Select>
                                                                </div>
                                                                {secteur != 0 ? (
                                                                    <div>
                                                                        <div className="mb-2 block">
                                                                            <Label htmlFor="sous_secteur" value={<span className='font-bold'>Sous-secteur (Vous pouvez faire plusieurs sélection)<span className='text-red-500'>*</span></span>} />
                                                                        </div>
                                                                        <FormControl className='w-full'>
                                                                            <SelectM
                                                                                style={{ height: '41px' }}
                                                                                labelId="demo-multiple-checkbox-label"
                                                                                id="demo-multiple-checkbox"
                                                                                multiple
                                                                                value={sSecteur}
                                                                                onChange={handleChangeSSecteur}
                                                                                renderValue={(selected) => selected.join(', ')}
                                                                            >
                                                                                {sousSecteursChoose.map((sec, index) => (
                                                                                    <MenuItem
                                                                                        key={index}
                                                                                        value={sec.libelle}
                                                                                    >
                                                                                        {sec.libelle}
                                                                                    </MenuItem>
                                                                                ))}

                                                                            </SelectM>
                                                                        </FormControl>
                                                                    </div>
                                                                ) : ("")}
                                                                <div>
                                                                    <div className="mb-2 block">
                                                                        <Label htmlFor="rccm" value={<span className='font-bold'>N° RCCM <span className='text-red-500'>*</span></span>} />
                                                                    </div>
                                                                    <TextInput onChange={(e) => setNumeroRCCM(e.target.value)} value={numeroRCCM} id="rccm" placeholder='Ex: RCCM RB/COT/XX B XXXXX' type="text" required />
                                                                </div>
                                                                <div>
                                                                    <div className="mb-2 block">
                                                                        <Label htmlFor="bp" value={<span className='font-bold'>Boîte postale <span className='text-red-500'>*</span></span>} />
                                                                    </div>
                                                                    <TextInput onChange={(e) => setBp(e.target.value)} value={bp} id="bp" placeholder='Ex: BP XXXXX' type="text" required />
                                                                </div>
                                                                <div>
                                                                    <div className="mb-2 block">
                                                                        <Label htmlFor="statut_juridique" value={<span className='font-bold'>Statut juridique <span className='text-red-500'>*</span></span>} />
                                                                    </div>
                                                                    <Select onChange={(e) => setStatutJuridique(e.target.value)} value={statutJuridique} id="statut_juridique" required>
                                                                        <option value={0} disabed selected>Sélectionner le statut juridique de votre entreprise</option>
                                                                        {statusJs.length > 0 ?
                                                                            statusJs.map((sp, index) => {
                                                                                return (
                                                                                    <option key={index} value={sp.id}>{sp.libelle}</option>
                                                                                )
                                                                            }) :
                                                                            ("Aucun Statut juridique")}
                                                                    </Select>
                                                                </div>
                                                            </div>
                                                        ) : (
                                                            <>
                                                                <span>Quel est le montant de votre chiffre annuel moyen au cours des deux dernières années et le nombre d'employé que vous avez ? (en FCFA)</span>
                                                                <fieldset className="border border-solid border-gray-300 p-3">
                                                                    <legend><div><span className='font-bold'>{currentYear - 2}</span></div></legend>
                                                                    <div className='mt-2'>
                                                                        <div className="mb-2 block">
                                                                            <Label htmlFor="yearn-2" value={<span className='font-bold'>Indiquer le chiffre d'affaire <span className='text-red-500'>*</span></span>} />
                                                                        </div>
                                                                        <TextInput onChange={(e) => setFirstYearCA(e.target.value)} value={firstYearCA} id="yearn-2" placeholder='Ex: 520XXXXXX' type="number" required />
                                                                    </div>
                                                                    <div className='mt-4'>
                                                                        <div className="mb-2 block">
                                                                            <Label htmlFor="nbemployer-2" value={<span className='font-bold'>Indiquer le nombre d'employé <span className='text-red-500'>*</span></span>} />
                                                                        </div>
                                                                        <TextInput onChange={(e) => setFirstYearEmployer(e.target.value)} value={firstYearEmployer} id="nbemployer-2" placeholder='Ex: 10' type="number" required />
                                                                    </div>
                                                                </fieldset>
                                                                <br />
                                                                <fieldset className="border border-solid border-gray-300 p-3">
                                                                    <legend><div><span className='font-bold'>{currentYear - 1}</span></div></legend>
                                                                    <div className='mt-2'>
                                                                        <div className="mb-2 block">
                                                                            <Label htmlFor="yearn-1" value={<span className='font-bold'>Indiquer le chiffre d'affaire <span className='text-red-500'>*</span></span>} />
                                                                        </div>
                                                                        <TextInput onChange={(e) => setSecondYearCA(e.target.value)} value={secondYearCA} id="yearn-1" placeholder='Ex: 520XXXXXX' type="number" required />
                                                                    </div>
                                                                    <div className='mt-4'>
                                                                        <div className="mb-2 block">
                                                                            <Label htmlFor="nbemployer-1" value={<span className='font-bold'>Indiquer le nombre d'employé <span className='text-red-500'>*</span></span>} />
                                                                        </div>
                                                                        <TextInput onChange={(e) => setSecondYearEmployer(e.target.value)} value={secondYearEmployer} id="nbemployer-1" placeholder='Ex: 10' type="number" required />
                                                                    </div>
                                                                </fieldset>
                                                                <br />
                                                                <div>
                                                                    <div className="mb-2 block">
                                                                        <Label htmlFor="projet" value={<span className='font-bold'>Quels sont les projets dont vous avez déjà bénéficiez ? (Vous pouvez faire plusieurs sélection)<span className='text-red-500'>*</span></span>} />
                                                                    </div>
                                                                    <FormControl className='w-full'>
                                                                        <SelectM
                                                                            style={{ height: '41px' }}
                                                                            labelId="demo-multiple-checkbox-label"
                                                                            id="demo-multiple-checkbox"
                                                                            multiple
                                                                            value={projet}
                                                                            onChange={handleChangeProjet}
                                                                            renderValue={(selected) => selected.join(', ')}
                                                                        >
                                                                            {projets.map((sec, index) => (
                                                                                <MenuItem
                                                                                    key={index}
                                                                                    value={sec.actualite.title}
                                                                                >
                                                                                    {sec.actualite.title}
                                                                                </MenuItem>
                                                                            ))}
                                                                        </SelectM>
                                                                    </FormControl>
                                                                </div>
                                                            </>
                                                        )}
                                                    </Typography>
                                                    <Box sx={{ mb: 2, mt: 4 }}>
                                                        <div className='inline-flex gap-2'>
                                                            <Button
                                                                onClick={index === steps.length - 1 ? handleSubmit : handleNext}
                                                                color=""
                                                                className='rounded-l-lg rounded-tr-lg inline-flex items-center text-sm font-medium text-center text-white bg-amber-700 rounded-lg hover:bg-amber-800'

                                                            >
                                                                {index === steps.length - 1 ? 'Terminé' : 'Continuer'}
                                                            </Button>
                                                            <Button
                                                                disabled={index === 0}
                                                                onClick={handleBack}
                                                                color=""
                                                                className='rounded-l-lg rounded-tr-lg inline-flex items-center text-sm font-medium text-center text-white bg-amber-700 rounded-lg hover:bg-amber-800'

                                                            >
                                                                Retour
                                                            </Button>
                                                        </div>
                                                    </Box>
                                                </StepContent>
                                            </Step>
                                        ))}
                                    </Stepper>
                                    {activeStep === steps.length && (
                                        <Paper square elevation={0} sx={{ p: 3 }}>
                                            <Typography>Tous les étapes sont completer - Vous avez finis</Typography>
                                            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                                                Réinitialiser
                                            </Button>
                                        </Paper>
                                    )}
                                </Box>
                            ) : (
                                <>
                                    <form onSubmit={SearchCompany}>
                                        <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                                </svg>
                                            </div>
                                            <input onChange={(e) => setSearchCompanyName(e.target.value)} value={searchComapnyName} type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Recherchez votre entreprise" required />
                                            <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-amber-700 hover:bg-amber-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Rechercher</button>
                                        </div>

                                    </form>
                                    {companySearched.length > 0 ? (
                                        <>
                                            {companySearched.map((cs) => (
                                                <>
                                                    <div className='mt-5'>
                                                        <span className='text-3sm font-bold'>Sigle de la compagnie : </span><span>{cs.sigle}</span>
                                                    </div>
                                                    <div>
                                                        <span className='text-3sm font-bold'>Raison sociale de la compagnie : </span><span>{cs.raisonSociale}</span>
                                                    </div>
                                                </>
                                            ))}
                                            <form onSubmit={EditForm}>
                                                <div className='mt-5'>
                                                    <div className="mb-2 block">
                                                        <Label htmlFor="nom" value={<span className='font-bold'>Nom(s) et prénoms(s) <span className='text-red-500'>*</span></span>} />
                                                    </div>
                                                    <TextInput onChange={(e) => setFullName(e.target.value)} value={fullName} id="nom" placeholder='Ex: John Doe' type="text" required />
                                                </div>
                                                <div>
                                                    <div className="mb-2 block">
                                                        <Label htmlFor="datenais" value={<span className='font-bold'>Date de naissance <span className='text-red-500'>*</span></span>} />
                                                    </div>
                                                    <TextInput onChange={(e) => setOld(e.target.value)} value={old} id="datenais" type="date" required />
                                                </div>
                                                <div>
                                                    <FormControl>
                                                        <FormLabel><span className='font-bold'>Genre</span></FormLabel>
                                                        <RadioGroup
                                                            aria-labelledby="demo-radio-buttons-group-label"
                                                            defaultValue="female"
                                                            name="radio-buttons-group"
                                                            value={genre}
                                                            onChange={handleRadioChange}
                                                        >
                                                            <FormControlLabel value="HOMME" control={<Radio />} label="Femme" />
                                                            <FormControlLabel value="FEMME" control={<Radio />} label="Homme" />
                                                        </RadioGroup>
                                                    </FormControl>
                                                </div>
                                                <div>
                                                    <div className="mb-2 block">
                                                        <Label htmlFor="mail" value={<span className='font-bold'>Adresse email <span className='text-red-500'>*</span></span>} />
                                                    </div>
                                                    <TextInput onChange={(e) => setMail(e.target.value)} value={mail} id="mail" placeholder='Ex: johndoe@gmail.com' type="text" required />
                                                </div>
                                                <div>
                                                    <div className="mb-2 block">
                                                        <Label htmlFor="phone" value={<span className='font-bold'>Numéro de télephone mobile <span className='text-red-500'>*</span></span>} />
                                                    </div>
                                                    <TextInput onChange={(e) => setTel(e.target.value)} value={tel} id="phone" placeholder='Ex:0022960XXXXXX' type="text" required />
                                                </div>
                                                <div>
                                                    <div className="mb-2 block">
                                                        <Label htmlFor="fonction" value={<span className='font-bold'>Fonction dans l'entreprise <span className='text-red-500'>*</span></span>} />
                                                    </div>
                                                    <Select onChange={(e) => setFonction(e.target.value)} value={fonction} id="fonction" required>
                                                        <option value={0}>Sélectionner votre fonction dans l'entreprise</option>
                                                        <option value={1}>Associé</option>
                                                        <option value={2}>Propriétaire</option>
                                                        <option value={3}>Actionnaire</option>
                                                        <option value={4}>Gestionnaire</option>
                                                        <option value={5}>Collaborateur</option>
                                                    </Select>
                                                </div>
                                                <div>
                                                    <div className="mb-2 block">
                                                        <Label htmlFor="part" value={<span className='font-bold'>Quel est votre pourcentage des parts sociales que vous détenez ? <span className='text-red-500'>*</span></span>} />
                                                    </div>
                                                    <TextInput onChange={(e) => setPart(e.target.value)} value={part} id="part" placeholder='Ex:100' type="number" required />
                                                </div>
                                                <br />
                                                <Button
                                                    color=""
                                                    type='submit'
                                                    className='rounded-l-lg rounded-tr-lg inline-flex items-center text-sm font-medium text-center text-white bg-amber-700 rounded-lg hover:bg-amber-800'
                                                >
                                                    S'enregistrer
                                                </Button>
                                            </form>
                                        </>
                                    ) : ("")}
                                </>
                            )}
                        </TabPanel>
                    ))}
                </TabsBody>
            </Tabs>


        </div>
    );
}//detpt, commune, arrondissement, village ou quartiers et adresse(carré et autre), ajouter capital sociale(étape deux), nbre employer (étape 3), donner la possibilité d'enregistrer les associées selon si l'entreprise existe