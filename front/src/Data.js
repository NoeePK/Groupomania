export const fetchProfiles = async () => {
    try {
        // Récupérer le contenu de l'API
        const response = await fetch(`http://localhost:3000/api/profiles`);
        // Récupérer la réponse dans .json
        const data = await response.json();
        // Renvoyer le produit
        return data;
    } catch (err) {
        console.log("Erreur");
        return null;
    }
};

export const fetchPublications = async () => {
    try {
        // Récupérer le contenu de l'API
        const response = await fetch(`http://localhost:3000/api/publications`);
        // Récupérer la réponse dans .json
        const data = await response.json();
        // Renvoyer le produit
        return data;
    } catch (err) {
        console.log("Erreur");
        return null;
    }
};