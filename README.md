# FreakyFinder

Freaky Finder is simplified social platform that resembles mostly Twitter with its current functionality. Latest "production build" of the application is running in [Fly.io server](https://freakyfinder.fly.dev/). Software was created for the [Full Stack Web Development Project](https://studies.helsinki.fi/courses/cur/otm-67e986ac-78ad-4e2b-aef7-e01cc7f4ec3c/CSM141093/Full_Stack_Web_Development_Project) -course hosted by University of Helsinki. Work time accounting can be found from the root of the repository. ([Työaikakirjanpito](https://github.com/willmana/FreakyFinder/blob/master/timesheet.md))

## Core functionalities
Application implements each CRUD-functionality in some way. In Freaky Finder the user is able to:
* Register into the application
* Log into application
* Log out from the application
* Write and publish a post
* Write comments on posts, created by anyone
* Follow other users
* Be followed by other users
* View other user profiles and check listings of followers
* Search for users
* Get user recommendations by application
* Update own user info
* Delete own user

## Technical info

This application uses React + Node.js stack. It is connected to MongoDB document-oriented database and is hosted in free Fly.io server. 

To maintain some information in the frontend-side, the application utilizes redux with addition of redux-saga to help with action executions and redux store itself is written with [Ducks-pattern](https://github.com/erikras/ducks-modular-redux).

Routing is done with react-router. Application first used useHistory() hook to direct users to different URLs but this was later changed to useNavigate() after react-router v6 update.

Application has localization support in Finnish and English, and can easily adapt more languages. This has been implemented with messageformat and messageformat-cli packages. Translations are maintained in .properties -files found in frontend/src/texts folder. Messageformat-cli provides a script that generates common .json -file from these .properties -files and messageformat allows the application to import these texts into its components.

Styling for the application is done from scratch utilizing sass -css extension without the help of any "ready made" components (e.g. react-bootstrap). Application supports browser width all the way from widescreen to around 700px, leaving out mobile device support.

Backend uses centralized express-jwt -implementation to handle JWT based authentication for API calls. JWT token is stored in browsers localStorage.
