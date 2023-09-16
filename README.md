# Getting Started with Create React App and Redux

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

<h1>Job Search Engine</h1>

Screen Shots of Project--
![Screenshot (36)](https://github.com/sk230144/Job_Search/assets/95127073/11677506-1213-4d54-9bb0-45bb75e8767a)
![Screenshot (35)](https://github.com/sk230144/Job_Search/assets/95127073/431369ba-ccba-4260-8edb-c237f57fcacc)
[Screenshot (38)](https://github.com/sk230144/Job_Search/assets/95127073/d4699fd8-73c9-486a-b5e3-22070ba77439)

<h1>Description</h1>
Use react router for routing 
1. Use redux for state management </br>
2. UI and functionality : </br>
○ Add login/signup to your portal with minimal but relevant login details </br>
○ Use localstorage/sessionstorage to maintain the session for a logged in user </br>
○ Create a landing page with a single input asking the user what programming language they’re looking for a job in. </br>
○ Once the user chooses a language, make a request to the Github public API searching for jobs that require developers who know said language. </br>
○ Show the user a list of jobs with an option to view them in detail. </br>
○ Once the user selects a job posting, make another request to the API to fetch that particular job. </br>
○ Add another page to view that particular job and provide an option to apply. </br>
○ Upon clicking apply, show the user a form asking them for the following: </br>
■ Name </br>
■ Email </br>
■ Cover Letter Note </br>

<h1>Installation</h1>

npx create-react-app Job-Engine @react-redux-toolkit </br>
npm start </br>
Used Data-Json server --  The Data-JSON API Server is a simple and lightweight tool that allows you to create a RESTful API using JSON files as your data source. This project provides an easy way to prototype APIs or serve static JSON data over HTTP. </br>
json-server --watch data.json --port 8080 </br>

Acknowledgments
We'd like to acknowledge the following open-source projects and APIs that contributed to this project:

GitHub Jobs API </br>
Node.js </br>
React </br>
Redux </br>
React-Router-Dom </br>

<h1>Features</h1>
The Job Search Engine offers the following features:

<h2>Search</h2>: Quickly search for job listings based on keywords, job titles, or locations.
 <h2>Filter</h2> : Use filters to refine your search results by criteria such as location, job type, and date posted.
 <h2>Job Details</h2> : View detailed information about each job listing, including the job description and application instructions.
 <h2>Save Searches</h2> : Save your favorite searches for easy access in the future.
<h2>Responsive Design</h2>: Enjoy a seamless experience on both desktop and mobile devices.

<h1>Usage</h1>
To use the Job Search Engine:

Open your web browser and navigate to http://localhost:3000 and fetch api with <a> json-server --watch data.json --port 8080  </a>

Use the search bar to enter keywords, job titles, or locations relevant to your job search.

Explore the search results, and use filters to narrow down your job listings.

Click on a job listing to view more details, including the job description and how to apply.
