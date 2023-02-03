export const fetchData = async (url) => {
    try {
        // Récupérer le contenu de l'API
        const response = await fetch(url);
        // Récupérer la réponse dans .json
        const data = await response.json();
        // Renvoyer le produit
        return data;
    } catch (err) {
        console.log("Aucune data n'a pu être récupérée");
        return null;
    }
};

export const postData = async (route, payload) => {
    try {
        const response = await fetch(route, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ payload }),
        });
        console.log("Datas envoyées au serveur");
        const data = await response.json();
        return data.token;
    } catch (err) {
        console.log("Les datas n'ont pas pu être envoyées au serveur");
        return null;
    }
};
