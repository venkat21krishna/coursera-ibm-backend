const axios = require('axios');


async function getAllBooks (){

    try {
        const response = await axios.get('http://localhost:3000/book');
        // const data = await response.json();
        console.log(response.data);
    } catch (error) {
        console.log(error.message);
    }
}

getAllBooks();