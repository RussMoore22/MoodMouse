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
* I learned that 'SELECT * FROM table WHERE condition' is just a one-line code, contrary to my previous belief that it was a block of code with different statements
* When using 'git pull' without specifying a branch name, it pulls everything from all remote branches to my local computer
* After migrating the database, I discovered the need to delete the volume and recreate it to ensure proper functionality
* I realized that psycopg.OperationalError can be resolved simply by re-running the Docker container

### Jan 19, 2024

Today, I worked on:

-   Writing code for throwing an DuplicatedAccountError when duplicated account is created and Wrote five project related migration- Driver

Our team initially tackled the issue where, upon duplicating the account, the status code was 500 instead of 400, indicating an unexpected server side mistake. To address this, we modified it to throw a DuplicatedAccountError, successfully resolving the issue. However, we also discovered that if the user's information violates SQL constraints, such as disallowing duplicated email addresses, it does not throw an appropriate error. Despite spending around an hour attempting to solve this problem, we were unsuccessful, and we decided to move on to making migrations.

As a driver, I coded the part that throws a duplicated account error when the user attempts to sign up with a duplicated username inside the AccountQueries. In addition to that, the majority of the code I wrote involves creating project-related migrations. This includes defining the field data types, building relationships between tables, and testing it using the PostgreSQL extension on VSCode to ensure that all tables are successfully created in the database.

A-ha moments:
* I learned that the token is stored in the browser, along with cookies
* When making changes to the existing migration, it is necessary to delete the volume and then recreate it to ensure proper functionality
* Adding new migrations does not require deleting the volume; only rebuilding the docker container is needed
