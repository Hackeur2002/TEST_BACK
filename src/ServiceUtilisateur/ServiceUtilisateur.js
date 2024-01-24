//Setters
let SaveUserMail = (mail) => {
    localStorage.setItem("UserMail",mail)
}
let SaveUserPass = (pass) => {
    localStorage.setItem("UserPass",pass)
}

//Getters
let GetUserMail = () => {
    return localStorage.getItem("UserMail")
}
let GetUserPass = () => {
    return localStorage.getItem("UserPass")
}

//Controler si l'utilisateur est connecter
let isLogged = () => {
    let mail = GetUserMail()
    return !!mail
}
//  Déconnecter l'utilisateur
let logout = () => {
    localStorage.removeItem('UserMail')
    localStorage.removeItem('UserPass')
}

export const ServiceUtilisateur = {
    SaveUserMail,
    SaveUserPass,
    GetUserMail,
    GetUserPass,
    isLogged,
    logout
}