import React from 'react';

function Titre(props) {
    return (
        <>
            <div className='py-10'>
                <span className='text-3xl text-gray-700 font-bold'>{props.titre}</span>
            </div>
        </>
    );
}

export default Titre;