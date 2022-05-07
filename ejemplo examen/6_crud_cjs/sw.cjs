'use strict';


const peopleSW = [
    {
        id: 1,
        name: 'Luke',
        lastname: 'Skywalker'
    },
    {
        id: 2,
        name: 'Leia',
        lastname: 'Organa'
    }
];

const getById = (id) => {
    console.log(id);
    let res = undefined;
    peopleSW.forEach(element => {
        
        console.log('en el foreach');
        console.log(element.id.toString());
        if (element.id.toString() === id) {
            console.log(element);
            res = element;
        }
    });

    return res;
}

module.exports = getById;