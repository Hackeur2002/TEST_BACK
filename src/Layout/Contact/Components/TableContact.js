import React, { useState } from 'react';
import { Table } from 'flowbite-react';
import { Button, Label, Modal } from 'flowbite-react';
import Titre from '../../../DefaultLayout/Titre/Titre';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

function TableContact(props) {
    const [openSeeModal, setOpenSeeModal] = useState(false);
    return (
        <>
            <div className="p-4 sm:ml-64">
                {/* Ce modal est pour voir un contact */}
                <Modal show={openSeeModal} size="5xl" popup onClose={() => setOpenSeeModal(false)}>
                    <Modal.Header />
                    <Modal.Body>
                        <div className="space-y-6">
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Détails sur le contact de :</h3>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="mail" value="Adresse mail" />
                                </div>
                                MAIL
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="tel" value="Télephone" />
                                </div>
                                Téléphone
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="message" value="Message" />
                                </div>
                                Message
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
                <Titre titre="Liste des contacts" />
                <div className="overflow-x-auto">
                    <Table striped>
                        <Table.Head>
                            <Table.HeadCell className='bg-green-950 text-white'>#</Table.HeadCell>
                            <Table.HeadCell className='bg-green-950 text-white'>Nom</Table.HeadCell>
                            <Table.HeadCell className='bg-green-950 text-white'>Mail</Table.HeadCell>
                            <Table.HeadCell className='bg-green-950 text-white w-10'>
                                <span>Actions</span>
                            </Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    1
                                </Table.Cell>
                                <Table.Cell>Un nom</Table.Cell>
                                <Table.Cell>Un mail</Table.Cell>
                                <Table.Cell>
                                    <div className='flex flex-row'>
                                        <Button color='' className="bg-amber-600 hover:bg-amber-700 text-white"><EditIcon /></Button>&nbsp;&nbsp;&nbsp;
                                        <Button color='' className="bg-red-600 hover:bg-red-700 text-white"><DeleteForeverIcon /></Button>&nbsp;&nbsp;&nbsp;
                                        <Button color='' className="bg-amber-600 hover:bg-amber-700 text-white" onClick={() => setOpenSeeModal(true)}><VisibilityIcon /></Button>
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </div>
            </div>
        </>
    );
}

export default TableContact;