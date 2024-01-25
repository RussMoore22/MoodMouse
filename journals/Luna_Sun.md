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
