module.exports.signUpErrors = (err) => {
    let errors = {pseudo: "", email: "", pwd: ""}

    if(err.message.includes("pseudo")){
        errors.pseudo = "Pseudo incorrect"
    }

    if(err.message.includes("email")){
        errors.email = "Email incorrect"
    }

    if(err.message.includes("pwd")){
        errors.pwd = "Le mot de passe doit faire 6 caractères minimum"
    }

    if(err.code === 11000 && Object.keys(err.keyValue)[0].includes('pseudo')){
        errors.pseudo = "Pseudo déjà utilisé"
    }

    if(err.code === 11000 && Object.keys(err.keyValue)[0].includes('email')){
        errors.email = "Email déjà utilisé"
    }

    return errors
}

module.exports.signInErrors = (err) => {
    let errors = {email: "", pwd: ""}

    if(err = "Incorrect password"){
        errors.pwd = "Le mot de passe ne correspond pas"
    }

    if(err = "Incorrect email"){
        errors.email = "Email inconnu"
    }

    return errors
}

module.exports.addPatternErrors = (err) => {
    let errors = {title: "", picture:"", type: "", pdf: "", word: "", tags: ""}

    if(err.message.includes("title")){
        errors.title = "Titre incorrecte"
    }

    if(err.message.includes("picture")){
        errors.picture = "Chemin de l'image incorrect"
    }

    if(err.message.includes("tags")){
        errors.tags = "tag(s) incorrect(s)"
    }

    if(err.message.includes("type")){
        errors.type = "Type incorrecte"
    }

    if(err.message.includes("pdf")){
        errors.pdf = "PDF incorrecte"
    }

    if(err.message.includes("word")){
        errors.word = "Word incorrecte"
    }

    if(err.code === 11000 && Object.keys(err.keyValue)[0].includes('pdf')){
        errors.pdf = "PDF déjà utilisé"
    }

    if(err.code === 11000 && Object.keys(err.keyValue)[0].includes('word')){
        errors.word = "Word déjà utilisé"
    }

    return errors
}
