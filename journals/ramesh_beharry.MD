## 1/17/24

Today I worked on:

Today I helped our team facilitate fine-tuning our project management workflow, which included some standarization in our git workflow by specifying set times to push, assigning people to review merge requests, etc.

I was the navigator today. Our team helped today's driver, Russ, work on
our FastAPI functions for authentication. We created AccountIn and AccountOut, AccountToken, and account with cookies classes, and we started to create query functions.

I was the assigned note-taker today, so I recorded the key points of our workday.

We created an environment file .env and in that file, we created an
ENV variable for our hashed password.

We got our pgAdmin page working by putting in the corresponding info in our
dockerfile.dev on the webpage on localhost:8082.


## 1/18/24

Stuff I worked on today:

Stuff we all worked on today:

## Goal 1:  Make Migrations (completed!)
### SQL Database and Migration related Changes

* Made changes to SQL db migrations:
  * deleted sample migration in MoodMouse > Migration ? Or just at Moodmouse level?
  * made new 001_migration.py
    * created account variable with the following attributes and corresponding data type:
      * id: serial PK NN ,
      * first and
      * last name (both CHAR(50) ,NN)
      * username: text ,
      * email and
      * password (plaintext version?) (Both Char50 NN)
  * We started out by scaffolding/pseudo-coding/ writing doc-string
  * We considered naming conventions when choosing our variable names for the migration files.
  * continued to learn about and experiment with the db viewing tools to view our database.
    * in pgAdmin: examining directory structure in Object Explorer, and seeing if our columns are displaying correctly.
    * in VSCode extension: doing the same thing: trying to see if our db columns are displaying correctly.
    * **Ran our first SQL query!**
  * we considered what constraints our SQL parameters should have:
    * i.e. Character restrictions on username and password, whether fields should not allow a Null answer
      * how many characters should a hashed password be? 255?
    * should a datatype be unique (other than unique ID) , I.e. username, email?

### Testing our FastAPI routes in Swagger
* Tested our  GET and POST route  for our Token (for Authentication) functions in FastAPI Swagger app.

## Front end related work:
* We noticed our front end page is not rendering since we changed the .env
  * **We fixed it!** :
    * .env file in root directory has the sign in key
    * the VITE API Host variable is in the ghi/src/.env
## Goal 2: Make GET and POST reqs from our get and create acct functions
- [ ] Make a get query
- [ ] make a create query
* We are starting to build out our query functions.
* We started with a knowledge check for what a Query function does
* We created our AccountIn, AccountOut, AccoutWithOutHashedPassword, AccountForm, AccountToken functions in models.py
  * We created our functions by going line-by-line from code examples from Curtis and Riley. We checked our understanding of connection, cursor,
  and what the function will be outputting and in what type.
* we created get and create functions in our accounts.py
* We tested our FASTAPI create query function and route in Swagger.
  * Our output response in Swagger from our POST request appears to be working. We see our hashed token. We also see our hashed password in our
  SQL database.

* **We successfully logged in as an Authenticated User (tested in Swagger)!**
* **We successfully created a user!**

## Other work/tasks/issues/fixes

### Env related changes
* Considered changes to .env file to address a jwt-api permissions issue.
  * changed jwt version from 0.2.0 to 0.5.0
  * moved .env file to the project root directory
* We ended up copying the .env file back to the ghi/src/.env (there are now 2 .env files)
* Troubleshooted issues with our psychopg: operational error, connection refused shown in FastAPI container log. “Is server running on that host and accepting TCP/IP connection”. We can’t start up the FastAPI container without resolving this issue.

### Git Management
* Continuous refinement of git management workflow
  * Should we create a separate branch for journal entries?
  * Setting a daily set time to merge
  * Deciding when to push to main: when a feature is completed.
    * partial completion will be pushed to the “testing” branch
* #### Migrations made:
  * Made successful SQL query. In this case: our db is empty, but our db structure appears correct: expected columns are displaying in the db viewer at 1/18 on 3:17 p.m. EST
  * finished creating a working create CRUD function for account users by 6:10 p.m. EST.
* #### Git Pushes
  * We are pushing to the new migration branch we created today (name=migration-setup).
    * made a username and email unique in SQL
    * changed password column to hashed password.
      * ```git push origin migration-setup
        ```
    * added functions to models and accounts
      * ``` git push origin accounts
      ```
    * tested and approved working create function in accounts.py using our
    pydantic models, ex. AccountIn, AccountOut, AccountWithoutToken, AccountToken. Merge process started at 6:18 p.m. EST.
    ``` git push origin
    ```

My "AHA" Moment for the day:

My "AHA" moemnt for the day was when we went through our create SQL query function and went through the pool connection, cursor, and what the function returns, so I felt like I better understood what the function is doing, how it is communicating with the SQL database and what is being returned fron the function.


## 1/19/24

What I did specifically:

We made 5 migrations today. We set up the SQL tables for our app's check-in feature, survey,
rorsharch

We worked on trying to create a custom error when a user tries to create an account with an existing username or email. We didn't know why different error messages were showing and where they came from. For example, while the username error looked like what we expected and could spot the line of code where that was happening in our Querying function, we got different error messages for the emails, and we didn't know where that message was coming from. Additionally, we did some troubleshooting by throwing print statstments around different lines of code to see why one of our Exception statement was not returning the error we expected. We went into the console log of our fastapi container to see what showed up. We considered whether to use try, except, and raise commands in our functions. We thought about how to write code that handled multiple exceptions and which functions should handle errors.

AHA moment: when Jen pointed out that we should make the data tables for models that are not foreign keys to another models first, and then create the model with the foreign keys because they will then have the appropriate fields.

Russ found out that there is an ALTER TABLE command in Postgres SQL that creates a new migration instead of changing an existing migration, so there are some instances where deleting our SQL databases is not necessary.

Luna explained pydantic functions to me and the difference between error handling in the the quering function and what can be thought of as our FastAPI view function. Error handling can be brought up in both functions. Russ pointed out that we have more pydantic functions compared to Django models and view functions, but we have greater control on the design and these smaller or specific functions, such as a get_one function, ultimately allow our code to be more modular, since we can use those smaller query functions in more complicated ones.


## 1/22/24

What I did specifically:

Today I was the driver, and I worked on creating the pydantic model, query, and route for the create rorschach test model and for the pydantic model, query and route for the GET rorschach image model.

I added some data in our SQL database through query commands. We added data into our rorscharch image, rorschach test.

AHA moment:

My AHA moment was figuring out how the pool function worked. Specifically, how the data variable is capturing the data from the SQL command, given in a string. This variable helps us pull ids and other fields from objects.

1/23/24 Journal

What I worked on directly: Today, we worked on creating the PUT request endpoint by creating the update query function for Rorschach_Test query model and added a router for the Rorschach_test router.

What we worked on together: Today we worked in teams. I worked with Luna today and Luna created the PUT request endpoint for the survey query model and create the route for it. She additionally fixed the return statement for the Rorschach Test. She

Blockers: My blockers are related to git. I had trouble pulling changes and merging updated changes to my local branch. We spent 2 hours but it appears all I needed to do was restart my VSCode for the migrated changed to appear.

An AHA moment: Luna explained how the info attribute we created in the router is connected when we return it in our Query. Info is an attribute for the function we put in there and can access the methods and attributes we create inside that function. I used this in my return statement when I wanted to return an updated image id number and updated response.
