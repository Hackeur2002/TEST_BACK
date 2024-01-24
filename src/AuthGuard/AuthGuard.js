import React from 'react';
import { Navigate } from 'react-router-dom';
import { ServiceUtilisateur } from '../ServiceUtilisateur/ServiceUtilisateur';

function AuthGuard({children}) {
    if (!ServiceUtilisateur.isLogged()) {
        return <Navigate to="/" />
    }
    return children
}

export default AuthGuard;