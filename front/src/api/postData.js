const postData = async (route, payload) => {
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

export default postData;
