import React, { useEffect, useState } from 'react';
import { Table } from 'flowbite-react';
import { Button, Select, Label, Modal, TextInput } from 'flowbite-react';
import Titre from '../../../DefaultLayout/Titre/Titre';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios'

function TableQuestionReponse(props) {
    const [openModal, setOpenModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [question, setQuestion] = useState('');
    const [reponse, setReponse] = useState('');
    const [faq, setFaq] = useState(0);
    const [listFaq, setListFaq] = useState([]);
    const [qrs, setQRs] = useState([]);
    const [unqrid, setUnqrId] = useState(0);
    const handleCloseEditModal = () => {
        setOpenEditModal(false)
        setQuestion('')
        setReponse('')
        setFaq('')
    }
    const handleEdit = (id) =>{
        const intid = parseInt(id,10)
        alert(intid)
        setUnqrId(intid)
        const newurl = process.env.REACT_APP_URL_STANDART + `/questions/${intid}`
        axios.get(newurl, { withCredentials: true })
            .then(response => {
                alert('Question-Réponse récupérer')
                setOpenEditModal(true)
                console.log(response.data.data)
                
                setQuestion(response.data.data.question)
                setReponse(response.data.data.answer)
                setFaq(response.data.data.faqId)
                
            })
            .catch(err => {
                alert('Erreur lors de la récupération de la question-réponse')
            })
        
    }
    const handleDelete = (id) => {
        const intid = parseInt(id, 10)
        alert(intid)
        const newurl = process.env.REACT_APP_URL_STANDART + `/questions/${intid}`
        if (window.confirm("Voulez-vous vraiment supprimer cet enregistrement de question-réponse ? Cet action est irréverssible") == true) {
            axios.delete(newurl, { withCredentials: true })
                .then(response => {
                    alert('Question-réponse supprimer')
                    window.location.reload()
                })
                .catch(err => {
                    alert('Erreur lors de la récupération de la Question-réponse')
                })
        }

    }
    const Form = (e) => {
        e.preventDefault();
        console.log({ question: question, answer: reponse, faqId: parseInt(faq,10) })
        const newurl = process.env.REACT_APP_URL_STANDART + "/questions"
        axios.post(newurl, { question: question, answer: reponse, faqId:parseInt(faq,10) }, { withCredentials: true })
            .then(data => {
                setQuestion('')
                setReponse('')
                setFaq('')
                alert('Question-Réponse enregistrer')
                window.location.reload()
            })
            .catch(err => {
                alert('Vérifiez vos informations')
            })
        
    }
    const FormEdit = (e) => {
        e.preventDefault();
        console.log({ question: question, answer: reponse, faqId: parseInt(faq, 10) })
        const newurl = process.env.REACT_APP_URL_STANDART + `/questions/${unqrid}`
        axios.put(newurl, { question: question, answer: reponse, faqId: parseInt(faq, 10) }, { withCredentials: true })
            .then(data => {
                setQuestion('')
                setReponse('')
                setFaq('')
                alert('Question-Réponse Modifié')
                window.location.reload()
            })
            .catch(err => {
                alert('Vérifiez vos informations')
            })

    }
    useEffect(() => {
        const newurlquestions = process.env.REACT_APP_URL_STANDART + "/questions"
        axios.get(newurlquestions, { withCredentials: true })
            .then(response => {
                console.log(response.data.data)
                setQRs(response.data.data)
            })
            .catch(err => {
                alert('Erreur lors de la récupération des informations de langues')
            })
        
        const newurlfaq = process.env.REACT_APP_URL_STANDART + "/faqs"
        axios.get(newurlfaq, { withCredentials: true })
            .then(response => {
                console.log(response.data.data)
                setListFaq(response.data.data)
            })
            .catch(err => {
                alert('Erreur lors de la récupération des informations de faqs')
            })
    }, [])
    return (
        <>
            <div className="p-4 sm:ml-64">
                <Titre titre="Liste des Qestions-Réponses" />
                <div className='pb-4'>
                    <Button color='' className='bg-amber-600 hover:bg-amber-700 text-white' onClick={() => setOpenModal(true)}>Ajouter une question-réponse</Button>
                    {/* Ce modal est pour enregistrer une question-repponse */}
                    <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)}>
                        <Modal.Header />
                        <Modal.Body>
                            <form onSubmit={Form}>
                                <div className="space-y-6">
                                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Remplissez les champs et validez pour créer une question-réponse</h3>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="question" value="Question" />
                                        </div>
                                        <TextInput onChange={(e) => setQuestion(e.target.value)} value={question} id="question" type="text" required />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="reponse" value="Réponse" />
                                        </div>
                                        <TextInput onChange={(e) => setReponse(e.target.value)} value={reponse} id="reponse" type="text" required />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="faq" value="FAQ" />
                                        </div>
                                        <Select onChange={(e) => setFaq(e.target.value)} value={faq} id="faq" required>
                                            <option selected disabled>Sélectionner une Faq</option>
                                            {listFaq.length > 0 ?
                                                listFaq.map((faq, index) => {
                                                    return (
                                                        <option key={index} value={faq.id}>{faq.theme}</option>
                                                    )
                                                }) :
                                                ("Aucun faq n'est enregistré")}
                                        </Select>
                                    </div>
                                    <div className="w-full">
                                        <Button type='submit'>Ajouter</Button>
                                    </div>
                                </div>
                            </form>
                        </Modal.Body>
                    </Modal>
                    {/* Ce modal est pour éditer une question-repponse */}
                    <Modal show={openEditModal} size="md" popup onClose={() => handleCloseEditModal()}>
                        <Modal.Header />
                        <Modal.Body>
                            <form onSubmit={FormEdit}>
                                <div className="space-y-6">
                                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">Modifier la question-réponse</h3>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="question" value="Question" />
                                        </div>
                                        <TextInput onChange={(e) => setQuestion(e.target.value)} value={question} id="question" type="text" required />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="reponse" value="Réponse" />
                                        </div>
                                        <TextInput onChange={(e) => setReponse(e.target.value)} value={reponse} id="reponse" type="text" required />
                                    </div>
                                    <div>
                                        <div className="mb-2 block">
                                            <Label htmlFor="faq" value="FAQ" />
                                        </div>
                                        <Select onChange={(e) => setFaq(e.target.value)} value={faq} id="faq" required>
                                            <option>Sélectionner une Faq</option>
                                            {listFaq.length > 0 ?
                                                listFaq.map((faq, index) => {
                                                    return (
                                                        <option selected key={index} value={faq.id}>{faq.theme}</option>
                                                    )
                                                }) :
                                                ("Aucun faq n'est enregistré")}
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
                            <Table.HeadCell className='bg-green-950 text-white'>Question</Table.HeadCell>
                            <Table.HeadCell className='bg-green-950 text-white'>Réponse</Table.HeadCell>
                            <Table.HeadCell className='bg-green-950 text-white'>FAQ</Table.HeadCell>
                            <Table.HeadCell className='bg-green-950 text-white w-20'>
                                <span>Actions</span>
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            {qrs.length > 0 ? 
                            qrs.map((qr, index)=>(
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                        {qr.id}
                                    </Table.Cell>
                                    <Table.Cell>{qr.question}</Table.Cell>
                                    <Table.Cell>{qr.answer}</Table.Cell>
                                    <Table.Cell>Une FAQ</Table.Cell>
                                    <Table.Cell>
                                        <div className='flex flex-row'>
                                            <Button color='' className="bg-amber-600 hover:bg-amber-700 text-white" onClick={() => handleEdit(qr.id)}><EditIcon /></Button>&nbsp;&nbsp;&nbsp;
                                            <Button color='' className="bg-red-600 hover:bg-red-700 text-white" onClick={() => handleDelete(qr.id)}><DeleteForeverIcon /></Button>
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            ))
                            : 
                            ("Aucune question-réponse pour le moment")}
                        </Table.Body>
                    </Table>
                </div>
            </div>
        </>
    );
}

export default TableQuestionReponse;