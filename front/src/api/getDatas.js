import axios from "./axios";

const getDatas = async (url) => {
    try {
        const data = await axios.get(url, JSON.stringify({}), {
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });
        return data;
    } catch (error) {
        console.log("erreur lors de la récupération des datas");
    }
};

export default getDatas;
