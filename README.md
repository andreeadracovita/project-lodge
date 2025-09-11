# Lodge - Accommodation Listing & Booking Web Application

## Features

- Signed up and unauthenticated users can browse and book listed accommodations.
- By signing up, the user can easily view their booked destinations and save places for future trips.
- Users can sign up to list a property they represent for short term accommodation. In doing so, they become **hosts**.
- Hosts can manage their properties: edit property details, photos, pricing, etc.
- Users can communicate with their hosts/guests through internal messaging system.
- Properties are reviewed by guests upon completion of their stay.

## Commitments

### Privacy

**Privacy** is very important for us so we prepared the web application to accommodate users who do not want to sign up. They can browse the destinations, make bookings, view their bookings using a confirmation code and PIN. Future improvements would be to allow the unauthenticated user to communicate via email.

### Security

**Security** of stored data and of the entire web application is prioritary. Measures to protect users' data and site integrity:
- Users' passwords are encrypted
- Photo names are encrypted for non-sequential storage
- Authenticated routes
- JWT for protected routes
- Authorizing edits: for property editing, user settings' update, the user's credentials need to match the resource's owner

## Web Application Structure

Our web application is built according to the following structure:
- Vite & React Front-end (current repo)
- [Node.js Back-end](https://github.com/andreeadracovita/project-lodge-db-rest-api)
- PostgreSQL database: Database diagram [here](#) ...to add...

## Running the Web Application

Pre-requisite: Node.js

`npm install`

`npm run dev`

## Additional APIs

- [Open Layer](https://openlayers.org/) to enhance the user's experience with map graphics.

## Development Planning

... Link to planning.md ...

## Design

[Link to design document](docs/Lodge-design.pdf)

## Improvements and Future Development

- Messaging in Web App
- Messaging via email
- Mobile improvements (most users use the mobile version when travelling)
- AI trip planner


