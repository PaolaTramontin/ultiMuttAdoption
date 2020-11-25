
##  The UltiMutt Adoption

Link: https://ultimuttadoption.herokuapp.com/

* Test Email: usertest@gmail.com
* Password: thisisatest
** Now Mobile Friendly **




*Are you looking to expand your family? Do you need a new BFF? 
**If so, the UltiMutt Adoption App. is for you.** The UltiMutt Adoption is a database with over 100+ cats & dogs that are available for adoption near you!
Sign up to easily track your new bff and access their current location, contact information, short description and photo!* 


<img width="1130" alt="Screen Shot 2020-11-23 at 5 07 09 PM" src="https://user-images.githubusercontent.com/69879822/100021204-1cc2fe80-2daf-11eb-92d4-e1cfd96aab50.png">




### User Stories


* As a user, I want to create an account to access the database.
* As a user, I want to see all the available dogs in an organized way.
* As a user, I want to easily save and keep track of my favorited dogs.
* As a user, I want to be able to write a personal note on my favorite pet. 
* As a user, I want to see additional information on my favorite pets, such as contact, location and current status.


### Wire Frame:

<img width="689" alt="Screen Shot 2020-11-11 at 1 12 41 PM" src="https://user-images.githubusercontent.com/69879822/98848441-ba1d4a80-241f-11eb-9f6d-67e81be055aa.png">

Website Used: lucidapp.com

### ERD 

<img width="619" alt="Screen Shot 2020-11-11 at 2 24 18 PM" src="https://user-images.githubusercontent.com/69879822/98855240-ae368600-2429-11eb-8d56-5908b3b70c67.png">

Website Used: drawio-app.com


* User Model and Pet Model have a many to many relationship. A join table was created for association. UserPet model has userId (primary key), petId (primary key), it's own id (automatically generated) and a comment column.


### Technologies Used:

* Node/Express & Axios
* Passport/ Bcrypt for authentification and password hashing.
* Postgres
* Sequelize
* CSS, HTML & JavaScript


### Routes and Models


<img width="807" alt="crud" src="https://user-images.githubusercontent.com/69879822/99105425-832a6e80-25b0-11eb-89a4-c06e41ea63e3.png">



###Steps to Setting Up

1. Fork and Clone this Repo.
2. Run npm i   (this will install the dependencies)
3. Write this code in terminal to get a new token as they expire every hour:
    * curl -d "grant_type=client_credentials&client_id=ljMVuaBoRMvZ0LmccLZsdk07fqTSXNNMsTXoMUJI2BGJhn0JGb&client_secret=rDLvLhzH0Yl6qt8VXvj266OqsSyjPC44NZVlOALV" https://api.petfinder.com/v2/oauth2/token

    * The terminal will respond with a token. Copy the token and paste it inside the token variable in index.js, animal.js, cats.js and .env.
4. Run nodemon
5. Setup your database and models, see table below:

<img width="820" alt="Screen Shot 2020-11-13 at 1 45 18 PM" src="https://user-images.githubusercontent.com/69879822/99109351-b1ab4800-25b6-11eb-993b-6ded6bafd3e0.png">

6. Run the following code to migrate:
    * sequelize db:migrate

7. Create a .env file, this will keep your port and session_secret private.
  * SESSION_SECRET (you choose this)
  * PORT= (choose the local host port you want)     


  ### Sources


  API Info:

  https://www.petfinder.com/developers/api-docs 