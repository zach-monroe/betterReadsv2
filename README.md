# Better Reads 2.0

## Summary:
Better Reads is a Full-Stack web application where users can:
- Show others their favorite reads.
- Keep their thoughts and memorable quotes in easy to edit notebooks.
- View other's thoughts about the books they have read.

Check it out [here](http://better-reads-bucket.s3-website.us-east-2.amazonaws.com/)

## Features:
- Home screen where you can view anyone's favorite reads and highlights.
- Create a unique profile where you can View, Edit, and Delete your reads.
- Add new reads.
- Create Edit and View highlights in a unique notebook attached to each of your reads.

## What I learned through this project:

#### User Authentication:
I rolled my own auth for this application and learned a lot about authentication in general.  
Passwords are encrypted before being stored on the database. 
Users are given a JWT token when they log-in for validation. 
User data is stored locally so they can stay logged in throughout the website, even if they close the tab.
There are private routes configured that require a user token to access.

#### React:
While I had learned about React leading up to this, I knew building a larger project would really solidify my knowledge. 
Working with a larger project, I learned alot about following signal-flow and insuring the data was being sent properly to each component.

#### Working with React components:
I learned alot about customizing react components to meet my needs by reading their documentation.

#### Animation:
I loved using framer-motion for this project. It proved to be easy-to-use and created professional animations with ease.  

#### TailwindCSS:
I felt much more confident using Tailwind with this application, and find that utility classes really simplify how I tackle the styling process.

#### Hosting:
Hosting a full-stack application for free on AWS was a great learning experience about moving from development to production.


## Build:

Front-End: React and TailwindCSS

Back-End: Express

Database: PostgreSQL

Hosting: AWS. EC2 for the API. RDS for the Database. SC3 for the front-end.


