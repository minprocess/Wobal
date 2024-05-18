# Wobal

## Deployed App


## Description
For this project, we are required to create our first full application. Our team decided to create a social media site called Wobal for only your close friends and family. We needed to use MVC, server-side API, user authentication, and connect to a MySql 

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)
## Installation
Source code on GitHub
https://github.com/minprocess/Wobal

Fork this project to your own GitHub repository. Then clone the forked project to your local PC. 

There are several npm packages needed so you will need to install them. First, here are the packages
bcrypt, connect-session-sequelize, dotenv, eslint, express, express-handlebars express-session, mysql2, nodemon, sequelize, insomnia (testing routes)

In the a terminal inside VS Code run the following command to install the above dependencies
npm install

The MySQL database for Users, Posts and Comments for Wobal is stored on the same PC as the local project.

If you host Wobal in your own Heroku website you will need to run the following script to initialize a database in your Heroku database for Users, Posts and Comments
heroku run node seeds/seed.js

$ git checkout -b iss53 # Switch to a new branch "iss53"
$ vim index.html # Edit your website
$ git commit -a -m 'added a new footer [issue 53]' # Commit Done
$ git checkout main # Switch to branch 'main'
$ git merge iss53 # merge to main

### Demo
[<img src="https://img.youtube.com/vi/4sNmsmclpCo/hqdefault.jpg" width="90%" target="_blank">](https://www.youtube.com/watch?v=4sNmsmclpCo)

## Usage
https://wobal-2542.herokuapp.com/


![Login and sign up dialog boxes](assets/images/Wobal1.PNG)
![Dialog to create a post with text box for description and a link to a photo](assets/images/Wobal2.PNG)
![wobal3 pic](assets/images/Wobal3.PNG)
![wobal4 pic](assets/images/Wobal4.PNG)
![wobal5 pic](assets/images/Wobal5.PNG)

Testing routes (for developers)
Use insomnia

## License
Copyright (c) 2021 Alex Bradshaw, Michael DiSanto, Bill Pate

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Contributors 
Github Users
- [mdis928](https://github.com/mdis928)
- [alexbradshaw](https://github.com/alexbradshaw) 
- [minprocess](https://github.com/minprocess)

## Test
To perform a test, please make sure the dependencies are installed. Once you have them installed, you should be able to do "node server.js" in the terminal. Then go to your browsers and connect to local host. You should see your application. You can test the functionality and if something is wrong, play around with the code so you can get the functionality down right. If you want test the GET, POST, PUT, and DELETES routes, you can use insomnia 

## Questions
Please contact us via github mdis928, alexbradshaw, minprocess
