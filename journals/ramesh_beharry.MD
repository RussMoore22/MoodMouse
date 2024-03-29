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


## 1/23/24 Journal

What I worked on directly: Today, we worked on creating the PUT request endpoint by creating the update query function for Rorschach_Test query model and added a router for the Rorschach_test router.

What we worked on together: Today we worked in teams. I worked with Luna today and Luna created the PUT request endpoint for the survey query model and create the route for it. She additionally fixed the return statement for the Rorschach Test. She

Blockers: My blockers are related to git. I had trouble pulling changes and merging updated changes to my local branch. We spent 2 hours but it appears all I needed to do was restart my VSCode for the migrated changed to appear.

An AHA moment: Luna explained how the info attribute we created in the router is connected when we return it in our Query. Info is an attribute for the function we put in there and can access the methods and attributes we create inside that function. I used this in my return statement when I wanted to return an updated image id number and updated response.


## 1/24/24
* AHA moment: type command shows our object local path, useful for when we need to troubleshoot.
* For our RorschachTestQueries, we added error handling on our create method that displays an error if a request is made to an image id that does not exist.
* For our Account model, we added error handling that would show one message if a POST request is made with a username that already exists
* For our Account model, we added error handling that would show one message if a POST request is made with an email that already exists
* We updated our Rorschach test route to include Error handling.
* In our survey router create function, we added Error handling by including if-else conditional statements: 400=unsuccessful, 200=successful.

## 1/25/24

* I started drafting the get_one function for the check-in query model
* I also started drafting the get_one router for the check-in.
* API endpoint testing: We realized I wiped my database at some point, so I did not have any test data; therefore, I couldn’t create a check-in model––so I can eventually get a check-in instance––and I also needed to create the instances of all the foreign keys, so I can successfully create a check-in, such as Rorschach image, Rorschach test, and survey instances.  During this process, we hit a roadblock because I couldn’t successfully create a check-in instance. We believed it might be something in my SQL database that is causing the error. During earlier testing, we created SQL query functions that had errors, so our object_ids started at 11 from the first record. To avoid confusion, and to make testing simpler, I wiped the data on my database, but I kept the migrations related to database structure, so I didn’t need to recreate the whole database columns. After restarting, it was easy to create all objects through Fast API Swagger.
* This process also involved some other troubleshooting. We put print statements in our create check-in model, went into our fast API container console to check for errors. We saw 500 errors, which then became “less wrong” with some 422 validation errors, (which is why we wiped the database to reset the ids to get the objects easier), and re-ran our code until it was completed.
* For tomorrow, Jenn and I set a goal to finish the get_one query function and route, test it in Swagger, and after that, we will work on adding the authentication. After all of that is done, we will merge that working feature into testing.


## 1/26/24

## Issues
* Fix create query function to add functionality so that an account where
* fix error handling for error handling,

A logged in user should be able to access the check -ins, through check-in IDs, that are associated with their account, defined by the account number.
# Journal

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
    * ****Ran our first SQL query!****
  * we considered what constraints our SQL parameters should have:
    * i.e. Character restrictions on username and password, whether fields should not allow a Null answer
      * how many characters should a hashed password be? 255?
    * should a datatype be unique (other than unique ID) , I.e. username, email?

### Testing our FastAPI routes in Swagger
* Tested our  GET and POST route  for our Token (for Authentication) functions in FastAPI Swagger app.

## Front end related work:
* We noticed our front end page is not rendering since we changed the .env
  * ****We fixed it!**** :
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

* ****We successfully logged in as an Authenticated User (tested in Swagger)!****
* ****We successfully created a user!****

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


## 1/23/24 Journal

What I worked on directly: Today, we worked on creating the PUT request endpoint by creating the update query function for Rorschach_Test query model and added a router for the Rorschach_test router.

What we worked on together: Today we worked in teams. I worked with Luna today and Luna created the PUT request endpoint for the survey query model and create the route for it. She additionally fixed the return statement for the Rorschach Test. She

Blockers: My blockers are related to git. I had trouble pulling changes and merging updated changes to my local branch. We spent 2 hours but it appears all I needed to do was restart my VSCode for the migrated changed to appear.

An AHA moment: Luna explained how the info attribute we created in the router is connected when we return it in our Query. Info is an attribute for the function we put in there and can access the methods and attributes we create inside that function. I used this in my return statement when I wanted to return an updated image id number and updated response.


## 1/24/24
* AHA moment: type command shows our object local path, useful for when we need to troubleshoot.
* For our RorschachTestQueries, we added error handling on our create method that displays an error if a request is made to an image id that does not exist.
* For our Account model, we added error handling that would show one message if a POST request is made with a username that already exists
* For our Account model, we added error handling that would show one message if a POST request is made with an email that already exists
* We updated our Rorschach test route to include Error handling.
* In our survey router create function, we added Error handling by including if-else conditional statements: 400=unsuccessful, 200=successful.

## 1/25/24

* I started drafting the get_one function for the check-in query model
* I also started drafting the get_one router for the check-in.
* API endpoint testing: We realized I wiped my database at some point, so I did not have any test data; therefore, I couldn’t create a check-in model––so I can eventually get a check-in instance––and I also needed to create the instances of all the foreign keys, so I can successfully create a check-in, such as Rorschach image, Rorschach test, and survey instances.  During this process, we hit a roadblock because I couldn’t successfully create a check-in instance. We believed it might be something in my SQL database that is causing the error. During earlier testing, we created SQL query functions that had errors, so our object_ids started at 11 from the first record. To avoid confusion, and to make testing simpler, I wiped the data on my database, but I kept the migrations related to database structure, so I didn’t need to recreate the whole database columns. After restarting, it was easy to create all objects through Fast API Swagger.
* This process also involved some other troubleshooting. We put print statements in our create check-in model, went into our fast API container console to check for errors. We saw 500 errors, which then became “less wrong” with some 422 validation errors, (which is why we wiped the database to reset the ids to get the objects easier), and re-ran our code until it was completed.
* For tomorrow, Jenn and I set a goal to finish the get_one query function and route, test it in Swagger, and after that, we will work on adding the authentication. After all of that is done, we will merge that working feature into testing.


## 1/26/24


An “AHA” moment: Printing out objects is super helpful. This was particularly helpful in our SQL query functions. We use some of the “get_one” examples we have in our other models, such as a get_one_rorschach_test and get_one_survey_object, but the get_one for the checkin model had more data in the object, which are all of the fields we have in our database, so we needed to be careful how we constructed the return statement. When we printed out the SQL query, we saw it came out in some tuple object, which we were then able to easily access through list notation: tuple_item[index].

## Issues


A logged in user should be able to access the check -ins, through check-in IDs, that are associated with their account, defined by the account number. Jenn and I worked together again to fix some of our check_in_get one query. We fixed our return statenent.



## 1/29/24

* What I worked on specifically: I finished up our check-in get_one function for our check in query function for GET requests. I added some error handling logic to check to see if an account id corresponds to all the check-ins for that account only.

* What we worked on collectively: We created a store.js file and imported cors middleware

* an AHA moment today was: I learned more specific stuff about how the double splat feature works. I was returning the objects in a very cumbersome way, such as account_data[1], account_data[2], but I could have returned it as (**account_data). I have done this numerous times in our django project, but I feel like I have a better understanding of what it is doing specifically for my query.




## 1/30/24

## Issues worked on
### Front end
* Sign up page
  * added form fields to our SignUpMutation function.
  * added form fields in our Nav.js by importing our useSignUpMutation function.
* log-in page
  * getting the logged in token by creating the getToken endpoint in our moodmouseApi function in apiSlice.jsx.
  * troubleshoot
* logout page
  * created the logged out builder mutation function “logout”
* Created nav.js page
  * Added return HTML template with
    * included basic css.
    * button
    * imported our builder query and mutuation functions.
* created router function with elements and children using the createBrowserRouter function in our main.js.
  * added “/login” to children
  * added “/signup” to children
* Fixed our Root template.

### What I worked on specifically:
* the logout page: I created a logout component in our endpoint API slice function, and then imported that component in Nav.js and deconstructed it so it would work in our JSX HTML button feature. Clicking the logged out button deletes the account token from the user, which is what logs them out.

## My AHA moment

* We realized our sign up function was not working because in our return statement, we were passing in a formData object. We kept getting a 422 validation error in our console, so we knew our function was not getting the required type. We were able to console.log the fields in our signup form, so we knew at least those were getting passed through. We found out that the type needed to be a dictionary, so we adjusted our
body in our return statement to accept a dictionary. This resolved the problem. I am still unsure why our object was acceptable in our login function but not our signup function, so this is an area for future exploration.



## 1/31
We worked on our check in model. When I was driving today, I got a lot of help from my team. I was working on creating the CreateCheckIn.jsx file today. This served as more review of the functions of useEffect and useState for me. I knew in general how we first set  useState to a blank state with an empty string, and then we want to capture the change in that state to do other actions, such as filtering. Writing the useState and useEffect functions was review that helped me get reacquainted with JSX after a period of time just focusing on the database  and back end work.

An “AHA” moment: Getting a refresher on how useEffect and anonymous functions are working to get an update state using the state of the previous one. Use effect is using the anonymous function to record “side effects” when there is refreshes to the DOM. This is being used to fetch data, which is what we have commonly used it for, but we can also do other things with it.


## 2/1

What I did:

What we did together: We worked together to finish the checkin page. Luna and Russ guided Jenn and I through creating the create checkin page in the front end.

An “AHA” moment: I had plenty of VSCode issues today. I thought my issue was something inside git. We got SIERs to help us through the issues, but Russ had an idea that it might actually be a VSCode issue not refreshing properly as I am making changes. I re-ran git commands at the start but those did not make the changes I expected.
Along the way, I got more experience learning about the difference between git rebase, merge and fast-forward.

We ran cat createcheckin.jsx file in my terminal to see if git pull was pulling the changes in my computer. It was showing the changes, so that’s how we found out it was a IDE problem. Russ was helpful with troubleshooting this.

I also got a better understanding of how to access items. We had an issue where we couldn’t access some of the items in rorschach_test. We realized we were not using a ubiquitous language and were trying to reference the json data with keys that did not match the fields because we names those variables in our front end differently. This helped me understand what exactly is going inside info, response and requests.




 ## 2/5

What I did: Today the group started working on displaying the calendar page to show the list view of check-ins into a  calendar or calendar like grid. Luna and Russ mostly worked on this. I helped by doing research on some possible calendar templates. I went into Hack Reactor’s SIS page and looked at the page using my developer tools to see if there were any ideas. I noticed it was using vanilla Javascript, and while some show date, month and year functions might be useful, it seemed like we would have to find another template or solution. I also checked out the subscriber calendar in NYtimes website and my old college’s website. Both of those pages had an overwhelming amount of code, also in Javascript, which surprised me, since I thought those sites may have used react, and their variable names were unintelligible, so it was not really good use for inspiration or structure.

Luna, Russ and Jenn and helped me make the check-in detail page. This was more practice for me to understand JSX better. I remembered from lecture how Riley gave data and alias like data: checkin. I got more practice using anonymous functions to update state in order to create a total score for our mood score counter.

What we did together:  As a group, we worked on the Check in calendar page and the check in detail Page.

## 2/6

What I did:  for my unit test, I created a test for the get_one_check_in. I followed Dalonte’s video again to help me out with the code. Jenn and I wanted the video together, and Jenn started with her test first. She worked on get_all. We believed my get_one will be similar to get_all function.  We imported the necessary stuff and created our MockQuery function and used our Query function, and FastAPI Swagger, and models to help construct our return statement. We focused on the get_all test. Our tests failed a lot. Eventually Jenn got a breakthrough by playing around and fixing her assert statements.

What we did together: As a group we worked on creating the editcheckin page. When we started pair programming, Russ and Luna continued to work on this page while Jenna and I worked on completing our unit tests.



An “AHA” moment:
## 2/7

What I did:  Using the info we gained yesterday from Jenn driving, today I worked on my unit test. Jenn explained to me what the response.json looks like here and how the override functions use the MockQueries we created with the Mock data inside of them. My return was fairly simple since I am returning just one.

What we did together: We also worked on adding some error logic in our router. We used isinstance to check to see if the arguments being passed into our function is what the function is expecting, along with pydantic type hints. We created simple if , else statements returning 200 and 400 statements respectfully.

An “AHA” moment: When Jenn mapped out from the url in response is related to our router and how the MockQueries are being used from the override function.

## 2/8

Jenn and I did a lot of work to create a carousel for our front end. We chose using Slick React since it had a calendar component in it and seemed fairly straightforward to implement.  We did get a very simple carousel working; however, we had some trouble making the buttons appear since the buttons were white. As we tried to change the color, we went down rabbit holes of creating custom buttons. The custom buttons mostly worked but then their placements were  off. Eventually, the previous and next button merged together.

Jenn considered reverting to our original plan to work with bootstrap for the carousel.

We were very happy when we got the slider to work, but we kept getting errors in the console about some feature previous click not being recognized in the DOM, even though it seemed to be working fine. This brought us to the end of the day.

An “AHA” moment: I had an aha moment when we were playing around with the map function to map through a list of images and get them to display on the carousel. While I have implemented map functions before, the extra practice is also good.

We also got some experience with getting this function to work on 3rd party API, which we might implement fully as our stretch goal.

I felt I worked great with Jenn. She was able to help me when I was driving. We took turns driving and navigating, and had to do a lot of research to work out the quirks of React slider. Unfortunately their docs were not informative.

I also had an AHA moment when I was practicing writing the map function for 3rd party APIs. I could not get it to work for hours, only to realize I did not check if I put the url in properly. I have to remember to always check those simple things first to possibly speed up my troubleshooting. The practice also helped me solidy JSX concepts such as useEffect, useState, anonymous functions.

I also learned/remembered you can print out a console.log in an return html statement for a JSX component, so I was able to troubleshoot my map function as I was writing it to make sure it was getting rh data from the request okay.


## 2/9

Jenn and I continued to work on the carousel. As a group, we decided to revise our carousel since we were getting those weird DOM errors. Jenn suggested we go back to bootstrap, and I agreed. Bootstrap turned out to be easier to implement or at least took us less time to do than yesterday. But we still got some weird errors throughout the day. At some point, some adjustment we made to a container the carousel was in must have been conflict with the nav container, causing the nav bar to stop working. I’m still not entirely sure how a conflict in the container might affect the functionality of the nav bar itself, but after making a few tweaks to the carousel container, the nav bar started working again.

An “AHA” moment: We started playing around with different styles, and Jenn and I stumbled on some pretty cool themes that were free; however, after getting the download, we realize the file was way to big and would probably take us a long time to implement into our project. We do want to implement some of those themes into our project as stretch goals.
