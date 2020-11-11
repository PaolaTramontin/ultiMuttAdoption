
var db = require('./models')
const user = require('./models/user')
const pet = require('./models/pet')





//FIND ALL FAV PETS  ...this is my "toy"
//  db.userpet.findAll()
//     .then(pets=>{
//         console.log(pets);
//     });


//FIND ALL USERS    ..this is my "pet"
// db.user.findAll()
//     .then(users=>{
//         console.log(users);
//     });




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



//remove a pet from favorites:

// db.pet.destroy({
//     where: {PetName:'Verdi'}
// })
// .then(numRowsDeleted=>{
//     console.log(numRowsDeleted)
// })


//this shows me all users ass. with a pet
// db.pet.findByPk(2)
// .then(foundPet=>{
//     foundPet.getUsers()
//     .then(foundUsers=>{
//         console.log(`${foundUsers.length} user(s) love the ${foundPet.PetName}`)
//     })
// })
// .catch(err=>{
//     console.log(err)
// })


//find how many fav pets an user has 
// db.user.findByPk(2)
// .then(foundUser=>{
//     foundUser.getPets()
//     .then(foundPets=>{
//         console.log(`${foundPets.length} pet(s) love the ${foundUser.name}`)
//     })
// })
// .catch(err=>{
//     console.log(err)
// })



//UPDATE AN EXISTING USER
// db.userpet.update({
//     comment: req.body.comment
// },
// {
//     where:{
//         petId:'Fatima'
//     }
// }).then(numRowsChanged=>{
//     console.log(numRowsChanged)
// })
//TEST BY DOING node index.js




// db.pet.findByPk(27)
// .then(foundPet=>{
//     foundPet.getComments()
//     .then(foundComments=>{
//         console.log(`${foundComments.length} comments  blonging to ${foundPet.PetName}`)
//     })
// })
// .catch(err=>{
//     console.log(err)
// })

// db.toy.findByPk(1)
// .then(foundToy=>{
//     foundToy.getPets()
//     .then(foundPets=>{
//         console.log(`${foundPets.length} pets(s) love the ${foundToy.color} ${foundToy.type}`)
//     })
// })
// .catch(err=>{
//     console.log(err)
// })