<h2>Description</h2>

This is the Droplet frontend repo. Droplet is a single-page app that helps people send loving text messages to their families and friends based on their local weather.

<h2>Technology</h2>

Express
Node.js
Mongo DB
Mongoose
Passport
bcrypt
Body-Parser
Cookie-Parser
CORS
Morgan
Yahoo weather API
Twilio API
UUID

<h2>Database Structure</h2>
User:
  id (PK), email, password
Profile:
  id (PK), user_id(FK), img, address, email, phone, first_name, last_name
Message:
  id(PK), friend_id(FK), weather
Friend:
  id(PK), first_name, last_name, img, address, email, phone

<a href="https://fierce-refuge-1354.herokuapp.com">Deployed back-end</a>
<br>
<a href="https://github.com/kuramameng/droplet-frontend">Frontend repo</a>
