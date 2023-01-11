import axios from "axios";

const postData = (route, payload) => {
    axios({
        url: `http://localhost:8080/api/${route}`,
        method: "POST",
        data: payload,
    })
        .then(() => {
            console.log("Datas envoyées au serveur");
            // resetUserInputs();
        })
        .catch(() => {
            console.log("Erreur serveur");
        });
};

export default postData;
