# GoWhere

This is a ReactJs & NestJS assignment.<br />
<br />
Tech stack used :<br />
Frontend - ReactJS<br />
Backend - NestJS, PostgresSQL<br />
<br />
Application code structure:<br />
gowhere/src/models => custom axios get/post functions<br />
controller : handle how application's endpoints respond to client requests, business logic & other adhoc tasks<br />
service : database queries<br />
<br />
.env can be found at the root of server folder.<br />
If unable to link up, do change the values to fit.<br />
<br />

## Frontend

### `cd gowhere`

### `npm start`

## Backend

### `cd server`

### `npm run start:dev`

<br />
Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.<br />
You will also see any lint errors in the console.<br />
<br />
Runs backend server to allow react frontend to function and facilitate connection to SQL on PORT 4001<br />
DB schema (history table) can be found in misc folder.<br />

#### Content that was left out deliberately

<br />
Was not able to find a open source geocoder that reverses the lat/long into accurate street names
<br />
Will be happy to run through my intended logic to handle this during interview
