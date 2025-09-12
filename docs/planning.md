# Project-Lodge Planning Document
 
## Common

- Header Component
- Footer Component
- Page Routes

## Security

- Authenticated Routes
	- Account info protection
	- Hosting info protection

## Unauthenticated routes

- Home Page
	- Search bar functionality
	- Grid of properties
	- Filter 
	- Display 8 random properties for the following weekend
	- Show trending places and navigate to search results: first weekend

- Search Results Page
	- Grid of properties
	- Display map component
	- New design
	- Switch map between small and full-screen display
	- Search results based on availability
	- Filter results: price, rentalType, propertyType, features, experiences, distance

- Map Component
	- Map with pins based on results
	- Map interaction functionality - hover, click

- Stay Page
	- Show property details
	- Show availability in calendar
	- Wire db data to UI
	- Check-in check-out conditioned by overlaps
	- Booking form - small section
	- Book form, complete booking - full page
	- Query to add a booking

- Booking Page
	- Can access without auth, with pincode
	- This page is protected for your security
	- Confirmation number
	- PIN code

- Log in Sign up Page
	- Sign up form
	- Query to add a user
	- Log in form
	- Query to authenticate user
	- Log out

## User account

- Account Page

- Settings Page
	- UI sections
	- View info, modify info
	- Global settings
	- Delete account

- Wishlist
	- Display wishlisted properties
	- CRUD wishlist functionality

- Trips
	- Display current, upcoming, cancelled trips

- Reviews
	- DB reviews
	- Show reviews on stay page
	- Add a review if user had a booking at property
	- Update avg rating of a place when a new rating is posted
	- Update avg on delete, edit
	- Edit, delete review

## Hosting

- Add property Page
	- Form design
	- Address validation
	- Form errors
	- Query to add property
	- User geo location

- Hosting Dashboard Page

- Hosting List all properties
	- Grid with properties
	- Entry-point to edit property

- Hosting Edit property

- Hosting Calendar
	- Full screen calendar: year before, next year
	- Monthly
	- Select property for which to view calendar
	- Mark on calendar past/current/future bookings for the chosen property

## Mobile layout

## REST API

- Postgresql db design and implementation
- REST API with express, Node.js, Axios with dummy data
- Real db queries
- Security for user data
	- Passport local strategy
	- Send token: passport-jwt
	- Bcrypt & salting
	- Create new user
	- Log in
	- Sign out
- Front-end & back-end server interaction
- Geolocate API in back-end

## Documentation

- Project setup
- Implementation details
- External APIs
- Security measures
- Design document
- Database diagram
- API doc

## Bugs 🐛 
