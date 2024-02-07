# Team Members

-   Russ
-   Jenn
-   Ramesh
-   Luna

# Journals

### Jan 16, 2024

Today, I worked on:

-   Fixed the Vite issues and made the contents on Vite show up as expected - Driver

Our team worked on configuring PostgreSQL and Vite in the project today. I handled writing the .env file and configuring Vite to display the contents on the web. I was unable to push it to the main branch, which consumed a significant amount of time until we decided to revisit it tomorrow. However, we eventually realized that the issue stemmed from the fact that the .env file is in the .gitignore, indicating that it should not be uploaded to GitLab, and the changes inside it are untracked. I wasn't aware of this before, and I'm very glad to have learned something new.

### Jan 17, 2024

Today, I worked on:

-   Helping the team debug and facilitating smooth and respectful conversations - Facilitator

Today, our team decided to code in groups of four, with one driver, two navigators, and one facilitator each day. We focused on setting up pgAdmin, testing its functionality, and integrating a PostgreSQL extension in Visual Studio Code (VSC) to streamline our work. Additionally, we worked on implementing authentication functionality, completing most of the code, but we encountered some errors that we plan to address tomorrow.

I was able to assist the team in identifying an error when there was a failed connection with pgAdmin. I helped pinpoint that the hostname is not 'localhost' but 'postgres.' I also contributed to team decisions on creating more opportunities for everyone to join the conversation. Throughout the authentication process, I helped debug and searched for information to support the team when needed.

One thing I learned today is that formatting issues can also lead to problems with merge requests and pipeline failures

### Jan 18, 2024

Today, I worked on:

-   Helping the team debug and shared thoughts about building get() and create() methods for AccountsQueries - Navigator

Our team worked on creating a migration for our accounts table. We successfully finished the get() and create() methods for AccountsQueries. As a result, our current project can now create users, store their data in the database, and return a JSON response with both user info and a Token. We also tested login and logout functionalities, identifying issues related to error handling that we plan to address tomorrow.

I contributed to the team by assisting in building the get() and create() methods. Specifically, I helped the team understand the data that the create() function needs to return to make the create_account() method in the router work. Additionally, I provided support by explaining concepts that I knew related to FastAPI and SQL, and I assisted in debugging.

A-ha moments: so many a-ha moments for today!

-   I learned that 'SELECT \* FROM table WHERE condition' is just a one-line code, contrary to my previous belief that it was a block of code with different statements
-   When using 'git pull' without specifying a branch name, it pulls everything from all remote branches to my local computer
-   After migrating the database, I discovered the need to delete the volume and recreate it to ensure proper functionality
-   I realized that psycopg.OperationalError can be resolved simply by re-running the Docker container

### Jan 19, 2024

Today, I worked on:

-   Writing code for throwing an DuplicatedAccountError when duplicated account is created and Wrote five project related migration- Driver

Our team initially tackled the issue where, upon duplicating the account, the status code was 500 instead of 400, indicating an unexpected server side mistake. To address this, we modified it to throw a DuplicatedAccountError, successfully resolving the issue. However, we also discovered that if the user's information violates SQL constraints, such as disallowing duplicated email addresses, it does not throw an appropriate error. Despite spending around an hour attempting to solve this problem, we were unsuccessful, and we decided to move on to making migrations.

As a driver, I coded the part that throws a duplicated account error when the user attempts to sign up with a duplicated username inside the AccountQueries. In addition to that, the majority of the code I wrote involves creating project-related migrations. This includes defining the field data types, building relationships between tables, and testing it using the PostgreSQL extension on VSCode to ensure that all tables are successfully created in the database.

A-ha moments:

-   I learned that the token is stored in the browser, along with cookies
-   When making changes to the existing migration, it is necessary to delete the volume and then recreate it to ensure proper functionality
-   Adding new migrations does not require deleting the volume; only rebuilding the docker container is needed

### Jan 22, 2024

Today, I worked on:

-   Helping the team debug and create the routes for rorschach_img and rorschach_test API endpoints- Navigator

Features that our team build for today:

1. Added a new column to the rorschach_tests table.
2. Built models for the Rorschach_img, Rorschach_tests, and Survey tables.
3. Constructed a GET request for the Rorschach_img API endpoint to retrieve Rorschach images from the database and return them as a list. Each image includes its ID and URL.
4. Developed a POST request for the Rorschach_test API endpoint to create a new Rorschach test with responses from the users.
5. Created a POST request for the Survey API endpoint to generate a new survey with answers users made for each question

As a navigator, I assisted the driver in building API endpoints for rorschach_img and rorschach_test, which included debugging and providing guidance on constructing routers and queries using objects. I specifically aided in a part where we needed to specify List[] to list ModelOut and contributed to discussions on how our endpoints should be structured. Additionally, I helped write notes for the day, documenting all the features we built and everything we learned.

A-ha moments:

-   To add a new field to an existing model, instead of directly modifying the corresponding migration file, we can create a new migration and apply the SQL query 'ALTER TABLE table_name ADD COLUMN column_name data_type' to add a new column
-   Similar to Django, where we store a foreign key object in the model, in FastAPI, when we define class models that contain a foreign key object, we can set ModelOut as a data type to specify which property inside the model will contain the foreign key object (e.g., img: RorschachImgOut)
-   Be cautious with commas in SQL queries; misplacing a comma can result in an internal server error
-   db cursor in psycopg is iterable like db.fetchall()
-   for inserting multiple values we can use “Insert Into table_name (column1) values (value1), (value1), (value1)”

We discussed and optimized various aspects of the application

1. We decided not to add a delete method for Rorschach_test and survey.
2. We opted not to implement get_one for Rorschach_test and survey because we can use join operations to achieve that.
3. For time optimization, we decided to create post requests for all models first and then build put requests for each one.
4. We chose to eliminate API endpoints for mental questions because questions are always stored in the database, and these are not the things that can be manipulated by users.

### Jan 23, 2024

Today, I worked on:

-   Building the put method for surveys api endpoint and also help my partner to build the put method to rorschach tests api endpoint - Navigator and Driver

Features that our team build for today:

1. We created Rorshach_tests PUT
2. We also created Surveys PUT
   /api/surveys/{survey_id}
   /api/rorschach_tests/{rorschach_id}

Today, our team decided to split into two groups to work on different endpoints for our backend. Ramesh and I were assigned the tasks of building the PUT methods for updating both Rorschach tests and surveys. We worked seamlessly, creating routers and queries to handle the PUT requests and generate responses. We also addressed issues related to yesterday's code, where we couldn't create a foreign key object and store that object in the property of the ModelOut class.

What I worked on was updating the survey's data and returning a response that includes the survey_id and all questions associated with that survey. I also collaborated with Ramesh on fixing issues with foreign key objects. Together, we created another method (get_one()) in the Queries class, which we used to create a new object based on the provided ID, serving as the foreign key object. This method is exclusively for creating foreign key objects and is not associated with the router since it doesn't serve as an API endpoint.

A-Ha moments:

-   Learned that if the remote repository in GitLab shows updated changes but the local repository doesn't seem to catch those changes even after pulling changes from the remote, the possible reason might be local. We had this issue today, and to solve it, we found that we basically just needed to restart VSCode.

### Jan 24, 2024

Today, I worked on:

-   Building the delete method for the check-in API endpoint and also helped my partner, Jenn, to build the put method for the check-in API endpoint - Navigator and Driver.

Features that our team build for today:

-   We built Delete endpoint for Checkin
-   We built Put endpoint for Checkin
-   We also built a function that can handle the foreign key object for checkin

Today, I am paired with Jenn, and we are working on building the delete and put functionality for our check-in model. Our team decided that Jenn and I would work on the check-in related files, while Russ and Ramesh would work on error handling for all the endpoints that we have built for other files, to reduce the likelihood of merge conflicts.

What I worked on is building the delete endpoint for check-in, and I finished it very quickly. Then, I worked on building the function to create a Rorschach test foreign key object by using SQL joins to return a Rorschach test object, and used this object to create the check-in object. I also helped my teammate, Jenn, in building the put endpoint for check-in. I assisted her in figuring out what needs to be updated and what does not, discussing and ensuring what the request body would look like.

A-Ha moments:

-   I learned that when building the foreign key object, using JOINs to build a more complex foreign key object would be more beneficial in terms of performance. What I used to do was create a function to connect to the database and then get the object without using JOIN, and in case I need information from two tables, I would create two functions to call each table, get the data I want, and then create the foreign key object. However, this way seems inefficient because it means that every time I want to create a complex object, I may need to connect to the database multiple times. If I use JOINs, I may only need to connect to the database once so that all the information I want can be extracted. This may not affect the application when it's small, but it would seem to have more potential performance issues if the application grows large. I really appreciate having learned this from Russ, and I never thought about this before. I am glad I have learned something new today.

### Jan 25, 2024

Today, I worked on:

-   Completed the issues account_data_authentication and removed the duplicated functions - Navigator and Driver.

Features that our team build for today:

-   Completed the issue account_data_authentication
-   Removed the duplicated functions
-   Removed redundant Error classes
-   Made migrations to store some data needed for the application

Today, I am paired with Russ, and since the other team is working on the last endpoint, we decided to fix some remaining issues on the issue board. Russ drove the process of making migrations to store the data needed for the application, removed redundant Error classes, and fixed most of the Pydantic issues that we hadn't addressed in our application.

I worked on adding an authentication router for getting a token and outputting the user object with the user's information. I also drove the effort to ensure that all endpoints can only be accessed by the logged-in user. Additionally, I made some modifications to the existing endpoint functions to include the account_data. Afterward, I removed the functions I had written earlier, which were different from Russ's but functioned the same. We discussed which approach was better, and with Russ's help, I realized that mine might cause potential performance issues as the application grows larger. Therefore, I decided to keep the one Russ made, as it is more efficient, and removed the one I had created to avoid having two functions doing the same thing.

A-Ha moments:

-   I learnd that git pull combines two things: one is git fetch and the other is git merge.

### Jan 26, 2024

Today, I worked on:

-   Completed the unit testing- Navigator and Driver.

Features that our team build for today:

-   Completed the GET one API endpoint for check-in
-   Completed two unit tests for both PUT and POST endpoints for check-in

Today, I am paired with Russ, and the other team is working on the GET one API endpoint for check-in. We completed two unit tests for check-in. Russ made a POST unit test, and I made a PUT unit test. Later on, we helped the other team figure out and fix the potential error for the GET one check-in endpoint.

Since there is a social hack hour, we haven't done many things today. What I did is write the unit test for the PUT endpoint for check-in. I created different fake foreign key objects and fake JSON responses to test if the endpoint works as expected. I made sure that the authentication and queries are overridden to make the unit test completely isolated. Finally, I cleaned up the overrides to prevent potential errors that may happen in other unit tests.

A-Ha moments:

-   I learned that python -m pytest should be run in the Docker container, not in the terminal
-   I learned that in unit tests, the fake request body should be in dictionary format rather than in an object or JSON
-   I learned that using \*args to create a function can allow the function to be called with an unlimited number of parameters passed in

### Jan 29, 2024

Today, I worked on:

-   Fixed errors in frontend authentication getToken and helped my partner in building unit test 003 - Navigator and Driver.

Features that our team build for today:

-   Completed getToken using Redux
-   Created unit test 003 to test the get_all endpoint
-   Finished error handling for check-ins

Today, I was paired with Jenn, but we initially worked on creating getToken using Redux as a group of four. We encountered several issues while configuring Redux, which were ultimately resolved with help from the team. Especially, Russ fixed an issue where Vite continued showing an error message related to "react-redux". It turned out to be an issue with our baseURL and also index.html. We changed the name of index.jsx to main.jsx but forgot to update "<script type="module" src="/src/main.jsx"></script>" to link to main.jsx.

During the Redux session, I drove for the part where we tried to debug react-redux for about 1.5 hours. I attempted to fix the bug in the group but couldn't figure it out. However, with continued testing and attempts, we eventually resolved it, and I learned a lot from that experience! While pairing with Jenn, my main contribution was helping her build unit test 003 whenever she needed clarification on certain aspects. We haven't finished everything and plan to complete it tomorrow.

A-Ha moments:

-   I learned that for Redux, if we've checked everything and are sure that the code is correct but there still seems to be an error, one way to solve it is by trying to rebuild the Docker container because sometimes it might not be recognized if some environmental variables or dependencies have changed.

### Jan 30, 2024

Today, I worked on:

-   Completed the login page for the frontend authentication - Navigator and Driver.

Features that our team build for today:

-   Completed login page
-   Completed signup page
-   Completed logout page
-   Created a new router to store all our routers there

Today, our team engaged in mob programming, switching off every hour. We successfully completed the login, signup, and logout pages for our frontend authentication. Additionally, we created a new router to manage all of our child routers.

My contributions for today included creating a login page based on the recording and assisting other team members with debugging when needed. I designed a new login form page, established new states to store usernames and passwords, and passed this data into our API function in the apiSlice. The data was stored in an info object, from which I created a formData. This formData was then sent to the endpoint to log in the user, resulting in a successful operation. I also made several discoveries while other team members were driving.

A-Ha moments:

-   I learned that when sending a request body in the apiSlice, the data needs to be in dictionary format, not as an instance from the FormData object
-   I learned that to use child routers, we need to add <Outlet /> in our App.jsx as a parent router.

### Jan 31, 2024

Today, I worked on:

-   Built part of the createCheckinForm and helped my teammates debug - Navigator and Driver.

Features that our team build for today:

-   Completed the majority of createCheckinForm, including displaying Rorschach images and questions when the user first loads the page and creating the form that allows the user to submit the form, which then sends the data to the POST endpoint to create the corresponding object

Today, our team is working on creating the createCheckinForm to collect the required data from the user and send it to the POST endpoint to create the object and return the JSON response for future use. Since we are using apiSlice to handle all API calls, we first created the queries in the apiSlice, including a mutation to create a survey object, a mutation to create a Rorschach test, and a mutation to finally create a checkin with survey and Rorschach test objects as foreign key objects. We also created two get queries for displaying the Rorschach images and survey questions for users to look at and answer. We have successfully created the survey and Rorschach test objects using custom hooks and action functions from the custom hooks. However, we were unable to get the checkin created using the same method. We have tried to debug for over one and a half hours but still could not fix it, and we finally decided to take a break and continue debugging tomorrow.

My contribution, with the help of the group, for today was to call the custom hook created in apiSlice to display the survey questions. I checked the data to display it after it was successfully loaded, and I also helped with debugging. Previously, we encountered a problem that we were unable to display the Rorschach images when the user first loaded the page. We built a button that was used to generate different images after the user clicked the button, but we wanted to also display a random image when the user first loaded the page. I tried to use the useEffect() to display the image and also set the dependency of the useEffect() to be Rorschach images data that we received from the custom get hook to ensure that the initial image will only be loaded once and will only be re-rendered when we have changes in our Rorschach images tables in the database.

A-Ha moments:

-   I learned that although the date format is displayed like a string on the backend, it is actually a date object rather than just a string and might not be accepted if we simply pass that date as a string to the backend to create the data.
-   I felt that everything about Redux is starting to click, and I finally can get more sense of why Redux is complicated in configurations but will be very powerful and easy to use in displaying data and manipulating data.

### Feb 1, 2024

-   fixed the issues related to checkin object creation and helped teammates debug - Navigator and Driver.

Features that our team build for today:

1.  We fixed the issue related to creating the survey object on the frontend, ensuring that the 'info' parameter in apiSlice can successfully capture the data from the frontend form and send it to the endpoint as a request body.
2.  We addressed the issue related to creating the Rorschach tests object on the frontend, ensuring that the 'info' parameter in apiSlice can successfully capture the data from the frontend form and send it to the endpoint as a request body.
3.  We resolved the issue related to creating the check-in object by using useEffect() to create the object only when the foreign key objects are successfully created.
4.  We have completed the basic functionality for our Create Check-in Form page.
5.  We modified the backend queries to exclude the date and updated_date from our request body; it is now automatically created whenever the user creates or updates the data

What I particularly worked on today, with the assistance of my best team members, was fixing the issues related to check-in creation. Previously, we used if-statements to test whether the state of our foreign key objects was successfully created. If the objects were successfully created, we would then create our core and final check-in object. However, we discovered that if we updated the states of the survey and Rorschach tests within the if-statements and created the check-in object right after updating those states, we would likely encounter an error. This was because the state wasn't instantly updated, and we would miss data needed to create the check-in.

With help from Russ, we resolved this issue by using useEffect() instead of if-statements. useEffect() allows us to create our check-in object only when the survey and Rorschach objects are successfully created, meaning their states are successfully updated. Ultimately, we successfully created the check-in object! I wouldn't have been able to solve this issue without the help of my teammates. I am truly proud of our team and thankful for all the help from them!

A-Ha moments:

-   Hooks and custom hooks are not allowed to be used in conditional statements, loops, or nested functions. This restriction exists because hooks rely on the order of execution to maintain state between renders, and placing them inside conditional statements or loops can result in unexpected behavior.
-   It is allowed to have multiple useEffects in one functional component, and each will be executed independently of the others.

### Feb 5, 2024

-   completed part of basic functionality for the check-in calendar page and assisted with debugging - Navigator and Driver.

Features that our team build for today:

1. We completed the basic function for the check-in calendar page. This includes listing the date and mood score for the user, and implementing the ability to filter the user's check-ins by the selected date.
2. We also finished the basic function for the check-in detail page. This page displays the mood score, date, survey answers and questions, journals, and responses for Rorschach tests.

What I contributed to today, with the help of my team members, was building the basic functionality for the check-in calendar page. I integrated API calls into the apiSlice, retrieving all check-ins from the backend API endpoint. I utilized the JavaScript map function to display the retrieved data, and implemented routers and NavLink to facilitate navigation to the check-in calendar page. Although we didn't complete the feature to visually represent the check-in list as a calendar, as we anticipated it might take longer than expected, we decided to proceed with building the basic functionalities for other required pages and plan to revisit and complete the check-in calendar feature later.

A-Ha moments:

-   I learned that when handling dates in JavaScript, '0' represents January, and the setMonth() method can accept numbers greater than 11 (December) or less than 0. As the month number changes, JavaScript automatically adjusts the corresponding year as necessary. For instance, setMonth(12) would represent January of the next year, and setMonth(24) would be January of 2026. Similarly, setMonth(-12) would represent January of 2023. It's quite fascinating.
-   I also learned that dates can be compared directly in JavaScript. However, it's important to note that dates retrieved from the backend are in string format, so they need to be converted to Date objects before comparison with another date object.

### Feb 6, 2024
-  finished part of updating the information page for the check-in and also helped debug on the main page  - Navigator and Driver.

Features that our team build for today:
1. We completed the update functionality for the check-in page.
2. We began work on the main page and integrated inspirational quotes from a third-party API.

My focus today, with the assistance of my team members, was on further developing the update functionality for the check-in page. I utilized update functions provided by custom hooks created using Redux and apiSlice by my team member. I passed the necessary values into the functions to update the check-in as the request body for the PUT endpoint. Firstly, I updated the survey, followed by the rorschach_test. After updating these two, I utilized the editcheckin() from the custom hook to update the final check-in object. Additionally, I made modifications to some parts of the apiSlice to handle errors. Upon completing the update page, I implemented navigation functionality to allow users to edit their corresponding check-ins by clicking on the detail page.

A-Ha moments:
* I learned that encountering a "render too many hooks" error is often caused by an early if-statement in React.
* I discovered the importance of using React extensions to check the local status of state variables, as updating states or changing their values may cause delays and not immediately reflect in console.log() outputs.
* I also learned that using {data.author?.split(",")} is a concise way to check if the author exists and perform an action like splitting by a comma. Previously, I thought the only way to achieve this was by using {data.author ? data.author.split(",") : undefined}, which includes an "else" statement. However, {data.author?.split(",")} is clearer and more readable, especially when an else statement is unnecessary
