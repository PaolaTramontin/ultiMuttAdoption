
## The UltiMutt Adoption


Are you looking to expand your family? Do you need a new BFF? If so, the UltiMutt Adoption App. is for you. The UltiMutt Adoption is a database with over 100+ dogs that are available for adoption in the State of Massachusets.
Sign up to easily track your new bff and access their current location, contact information, short description and photo! 


<img width="1210" alt="project2LogIn" src="https://user-images.githubusercontent.com/69879822/98846834-83decb80-241d-11eb-83d7-307399a08b50.png">



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

###EXPRESS AUTH. BOILERPLATE

1. Create a note app
    git init
    run npm i   (this will install the dependencies)
2. .gitignore
    create a file called .gitignore 
    add: node_moules
3. install and set up express 
    npm i express  
    create a index.js file
    inside index.js write: const express require('express)
    const app = express()
4. stubbed and get AUTH/LOGIN, get auth/signup, post  auth/login, POST auth/signup
5. configured autho controller
6. set up ejs, express ejs layouts, verfifid that its working:
        npm i ejs  & npm i express-ejs-layouts
7. set up the signup and login forms, tested post routes