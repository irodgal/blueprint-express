'use strict'

const axios = require('axios').default;

// Want to use async/await? Add the `async` keyword to your outer function/method.
async function getPeople() {
    try {
      const response = await axios.get('http://localhost:3000/people');
      console.log('Response getPeople()');
      console.log('Response status: ' + response.status);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
}

async function postPeople() {
    try {
      const response = await axios.post('http://localhost:3000/people', {
        firstName: 'Fred',
        lastName: 'Flintstone'
      });
      console.log('Response postPeople()');
      console.log('Response status: ' + response.status);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
}


const main = () => {
    getPeople();

    postPeople();
};

main();