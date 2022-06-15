# Welcome to the mistery app 🪄

Uuuuuh welcome welcome welcome, I see you passed the first test... not too bad 😏

Okay so: this repo is the base for your mistery app. ONE member of the team should fork and clone it, and then, start working. You will do pair programming: but that DOESN'T MEAN that only one of you has to do the all the work. All group members will be asked questions about the code, so you all better understand what's going on in the code presented.

⏳ *Hurry up, you don't have much time*! 

This boilerplate already has every npm package you need installed, you just need to run:

```bash
npm install
```

Once it's finished, to make sure everything is okay, run:

```bash
npm run dev
````

If it is... the challenge beggins.

![](https://memegenerator.net/img/instances/80695401/may-the-odds-be-ever-your-favor.jpg)

---

## Challenge 1 👣: users, users, users...

### Part 1

- Create a model for <code>User</code>. Users should have the following fields: name (string), age (number), email (string), hashedPassword (string).
- Users should be able to signup, login & logout, so you will have to create the routes and views that are necessary for it. When you create the file <code>routes/auth.js</code>, remember to import it on the the <code>app.js</code> file for it to work. 
- Remember to add links in the navbar of the app to these routes to access them easily.

### Part 2

- Create a new routes file called <code>routes/secret.js</code>. Remember to import it on the the <code>app.js</code> file for it to work. Create a **protected** route to *localhost:3000/secret*: **only logged in users should be able to see this route**. If a user tries to access this route without being authenticated, the route should redirect to the login page. 

You already have a middleware for this in the <code>middlewares</code> folder. Make sure that the auth route for the login is correct and is the same in your app. If it isn't, write the right route to the login page:

```js
module.exports = isLoggedIn = (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect('/auth/login');
  }
  next();
};
```

Remember that you can use the middleware this way:

```js
const isLoggedIn = require('../middlewares');

router.get('/secret', isLoggedIn, (req, res, next) => {
  ...
})
```

*Create a user for each member of your team*. When you are finished, come see us for validation to get the NEXT CLUE OF THE CHALLENGE.

