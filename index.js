require('dotenv').config();

const express = require('express'),
	mongoose = require('mongoose'),
	flash = require('connect-flash'),
	passport = require('passport'),
	localStrategy = require('passport-local'),
	session = require('express-session'),
	methodOverride = require('method-override'),
	path = require('path');
const app = express();
//require('dotenv').config();



 
 const DB_USERNAME = process.env.DB_USERNAME,
DB_USERPASS = process.env.DB_USERPASS;
//const URI = `mongodb+srv://${DB_USERNAME}:${DB_USERPASS}@cluster0.vn54qi7.mongodb.net/?retryWrites=true&w=majority'`;
// mongoose 
// .connect(URI)

mongoose
	.connect('mongodb+srv://hrisikesh:saikia@cluster0.vn54qi7.mongodb.net/?retryWrites=true&w=majority'
	)
	
		
	.then(() => {
		console.log('db working');
	})
	.catch((err) => {
		console.log('error');
	});
	// ! SESSION SETUP
	
	app.use(
		session({
			secret: 'secret session',
			resave: true,
			saveUninitialized: true,
			cookie: {
				httpOnly: true,
				// secure: true,
				expires: Date.now() + 1000 * 60 * 60 * 24,
				maxAge: 1000 * 60 * 60 * 24
			}
		})
	);

	// ! PASSPORT SETUP
const User = require('./models/user');
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());









//! server setup and middlewares using npm modules
app.use(flash());
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	res.locals.success = req.flash('success');
	res.locals.error = req.flash('error');
	next();
});

const authRoutes = require('./routes/auth'),
	hotelRoutes = require('./routes/hotels'),
	userRoutes = require('./routes/users');
reviewRoutes = require('./routes/reviews');
app.use(authRoutes);
app.use(hotelRoutes);
app.use(userRoutes);
app.use(reviewRoutes);





// let hotelRoutes=require('./routes/hotels');
// app.use(hotelRoutes);
const PORT=process.env.PORT;
app.listen(PORT, ()=>{
    console.log('server is running');
})