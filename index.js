const express = require('express');
const app = express();
const { body, validationResult } = require('express-validator');
const port = 8000

app.use(express.json());
app.use(logger); 


function logger(req, res, next){
    console.log(new Date(), req.method, req.path)
    next()
}

app.get("/user",(req, res) => {
    res.send("User is created")

})

app.post(
    '/user',
    // username must be an email
    body('first_name', "Enter atleast 3 characters").isLength({min: 3}),
    // password must be at least 5 chars long
    body("last_name", "Enter at least 3 characters ").isLength({min : 3}),
    body("email", "Enter a valid email").isEmail(),
    body("pincode", "Enter 6 digit pincode").isLength({min : 6, max: 6}),
    body("age", "age must between 1 and 99").isInt({gt:1 , lt: 100}),
    body("gender", "gender - male, female, other").isString({min :5}),
    body('password', "must be 5 length ").isLength({ min: 5 }),
    (req, res) => {
      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      else{
          res.json({ "user": "User is created" })
      }
  
    //   User.create({
    //     first_name: req.body.first_name,
    //     last_name: req.body.last_name,
    //     email: req.body.email,
    //     pincode: req.body.pincode, 
    //     age: req.body.age,
    //     gender: req.body.gender,
    //     password: req.body.password,
    //   }).then(user => res.json(user));
    },
  );

  app.listen(port, () => {
      console.log(`Server is up and running at ${port}`)
  })
