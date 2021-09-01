const { User } = require('./models');

// CREATE, READ, UPDATE, DELETE/DESTROY

// CREATE
async function makeUser(firstName, lastName, age, email) {
    try {
        const newUser = await User.create({ firstName, lastName, age, email });
        console.log(newUser.toJSON());
    } catch (err) {
        console.log(err);
    }
} 

// makeUser('Bradley', 'Ripple', 39, 'bradripple@gmail.com');

async function findOrCreateUser(firstName, lastName, age, email) {
    try {
        const [user, created] = await User.findOrCreate({
            where: { firstName, lastName },
            defaults: { age, email }
        });

        console.log('USER:', user.toJSON()); // object
        console.log('WAS CREATED:', created); // true, false

    } catch (error) {
        console.log(error);
    }
}

// findOrCreateUser('Rome', 'Bell', 33, 'romebell@ga.com');
// findOrCreateUser('Bradley', 'Ripple', 39, 'bradripple@gmail.com');

// SELECT *
// FROM "Users"
// WHERE name = 'Bradley Ripple';
// Only grabs the first one

// READ
async function fetchUserByName(firstName, lastName) {
    try {
        const foundUser = await User.findOne({
            where: { firstName, lastName }
        });
        console.log(foundUser.toJSON());
    } catch (err) {
        console.log(err);
    }
} 
// fetchUserByName('Bradley', 'Ripple');

async function fetchAllUsers() {
    try {
        const allUsers = await User.findAll({}); // array
        // console.log(allUsers);
        const parsedUsers = allUsers.map(u => u.toJSON());
        console.log(parsedUsers);
    } catch (err) {
        console.log(err);
    }
} 
// fetchAllUsers();

// UPDATE
async function updateUser(firstName, lastName, email, age) {
    try {
        const numberOfRowsUpdate = await User.update({ email, age}, {
            where: { firstName, lastName }
        });
        console.log(numberOfRowsUpdate);
    } catch (err) {
        console.log(err)
    }
}

// updateUser('Bradley', 'Ripple', 'bripple@gmail.com', 26);

async function deletUser(email) {
    try {
        let deleteUserData = await User.destroy({
            where: { email }
        });
        console.log(deleteUserData)
    } catch (error) {
        console.log(error);
    }
};

// deletUser('bradripple@gmail.com');

// firstName -> string
// lastName -> string
// age -> integer
// email -> string
// createdAt -> new Data().toISOString() 
// updatedAt -> new Data().toISOString()
// const faker = require('faker');

// const seedArray = [] // you need an array

// for (let i = 0; i < 1000; i++) {
//     // create new object
//   const newObj = {
//     firstName: faker.name.firstName(),
//     lastName: faker.name.lastName(),
//     age: 30,
//     email: faker.internet.email(),
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//   }
//   seedArray.push(newObj);
// }
// console.log(seedArray);