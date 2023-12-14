
const getResponse = async (location) => {
    const options = {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
        params: {
            q: `${location}`,
            days: 2,
            aqi: "yes",
            lang: "fr"
        },
        headers: {
            'X-RapidAPI-Key': "7653558c72msh4744c32ce35a248p148572jsn1385e9bed9b2",
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };
    try {
        const response = await axios.request(options);
        //console.log(options);
        return response.data
    } catch (error) {
        console.error(error);
    }
}

const getAstro = async (location) => {

    const options = {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/astronomy.json',
        params: { q: `${location}` },
        headers: {
            'X-RapidAPI-Key': "7653558c72msh4744c32ce35a248p148572jsn1385e9bed9b2",
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        //console.log(response.data);
        return response.data
    } catch (error) {
        console.error(error);
    }

}



export { getResponse, getAstro }