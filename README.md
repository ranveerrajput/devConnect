# devConnect
Backend for the devConnect application which is a tinder of the developers to connect with each other and collaborate.

#6
Create a free cluster on MOngoDB official website (Mongo Atlas)
Install mongoose libraray
-Connect your application to the databse "Connection-url"/devCircle
-Call the connectDB function and connect the databse before stsrting application  on 7777
- Create a userSchema and user Model
-Create POST /signup API to add data to database
-Push some documents using API calls from postman
-Error Handling using try, catch for the operstion where we are dealing with databse like get,put,post,patch,delete


#7
-JS object vs JSON (diff)
- Add express.json() middleware to your application
- Make your signup api dynamic to receive data from the end user
- User.findone() with duplicate email ids which object will returned? (HW)
- API - get user by email
- API - Feed API - GET/ feed - get all the users from the database
- API - get user by ID
- Create a delete user api
- Difference between PATCH and PUT
- API - update a user
- Explore the Mongoose Dicumentation for the Model methods
- What are the options in Model.findOneAndUpdate method, explore more about it
- API - update the user with email ID


#8
- Explore schematype options from the documentation
- Add require, unique, lowercase, min . minLength, trim
- Add a default value
- Create a custom validavalidate function for gender
- Improve the DB schema - Put all appropriate validations on each field in schema
- Add timestamp to the user schema
- Add API level validation on PATCH request and signUp post api
- Data Sanitizing : Add API validation for each field
- Install validator
- Explore validator library function and use validator function for password, email and url
- NEVER trust req.body ( Always put validations)

#9
- validate dat in signup api
- Install bcrypt package
- Create password hash using bcrypt.hash and save the user with encrypted password
- Create login api
- Compare passwords and throw error if email and password is invalid