# shrt

This project is a simple web application for short url creation througth a RESTful API.
The documentation of the api is here: https://documenter.getpostman.com/view/4981940/RWTeVMhd
In order to install the application follow this steps:

- Clone the project
- npm install
- npm test (all test should pass)
- node app.js 
- Go to http://127.0.0.1:3000

If you want to use a custom hostname for the application edit the `config.js` file,for now  the application uses `sqlite` database but Sequelize is flexible, so if you want to use `mysql` just update the `config.js` file to connect to your own database.
