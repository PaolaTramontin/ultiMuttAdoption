
var db = require('./models')
const user = require('./models/user')
const pet = require('./models/pet')





//FIND ALL FAV PETS  ...this is my "toy"
//  db.pet.findAll()
//     .then(pets=>{
//         console.log(pets);
//     });


//FIND ALL USERS    ..this is my "pet"
// db.user.findAll()
//     .then(users=>{
//         console.log(users);
//     });



//this shows me all users ass. with a pet
db.pet.findByPk(5)
.then(foundPet=>{
    foundPet.getUsers()
    .then(foundUsers=>{
        console.log(`${foundUsers.length} user(s) love the ${foundPet.PetName}`)
    })
})
.catch(err=>{
    console.log(err)
})



//THIS ADDS A PET TO A USER

// db.user.findOrCreate({
//     where:{
//         name:'meatball'
//     }
// })
// .then(([user,created])=>{
//     //secod, lets get a reference to a toy
//     db.pet.findOrCreate({
//         where: {PetName:'Verdi'}
//     })
//     .then(([pet,created])=>{
//         //finally associate the toy with the pet
//         user.addPet(pet)
//         .then(createdRelation=>{
//             console.log("createdRelation:", createdRelation)
//             console.log(`${pet.PetName} added to ${user.name}`)
//         })
//     })
// })



