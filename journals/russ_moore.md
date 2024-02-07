# Journal Entries of Russ Moore

## January 16, 2024

Goals:
1. Configured the docker compose
2. Got the FastAPI app to start running
3. connected the project db to the PostGreSQL VS Code extension


Working on code with the team for the first day had a few challenges, but we worked on them together. I feel that the team is getting more comfortable working collaboratively after the week before working on excalidraw. There were a few Git related issues we had, and a few team-members had to recreate their local git repository and start anew. I want to get better at working through git problems so that I can be a better resource to my team. The team has been good about checking everyone's progress, but there was a bit of disconnection during the session: One team member starting working independently while the others struggled through an issue because they thought it would be more productive. I brought it up immediately when the merge request was being made with code only one teammember worked on was being added. The team all handled it very well and I felt confident it made us all more aware of our communication moving forward.

Aha-moment: when creating the docker-compose, I realized that indentation is crucial. fixing a formatting issue turned out to cause a huge headache and result in a git restore.

## January 17, 2024
Started the FastAPI accounts feature.

Goals:
1. configure the .env file
2. set up the Pg-Admin within docker-compose
3. PostgreSQL VSCode Extension Set-up
4. Auth models and router
5. migration for the accounts table
6. query request for posting an account into the db
We were able to get to finish goals 1-4, which was great progress.

Aha-moment: we played around with the pydantic arguments for the post-route for create_account and saw the response within Swagger. removing the pydantic argument got rid of the example input-JSON.

I was writing the code with Ramesh and Jenn as navigators and Luna as the facilitator. The team was able to get through developing a create_accounts route. I was able to show the team how to set up the postgreSQL extension within VSCode. The team had a small hiccup with git merging pipeline issues. we decided we will put all code into a linter before the commit that gets merged into testing/main to avoid this issue in the future.


## January 18, 2024
Finished the FastAPI accounts feature.

Goals:

1. Make Migrations for accounts models
2. develop the get request for accountsQueries
3. develop the create request for accountsQueries
4. testing in swagger -
    1.  accounts are created,
    2. duplicate accounts are rejected
    3. log-in token is created and can be deleted

We accomplished these goals and set some strech goals that we were not able to get to but will do tomorrow.

Knowing these goals would be difficult to accomplish, I decided to try and code them on my own in a private branch and was able

to get it all to work before getting with the group. Because this is a learning environment, I made sure not to give

all the information away to my group and allow them to figure it out while I guided ( I was the navigator/facilitator for the group that day)

I allowed the driver to design the migrations the way the decided without too much influence, and she came up with a great idea: using a smaller data-type in the sql database for certain columns so that we are allocating less space.

Aha-moment: the sql entry made using Psycopg pool connection allows for to arguments - one for sql code in a string and the other for variables assigned to the “%s”, which the .execute method allows for.

We had an issue when loading our docker containers - psycopg connection failed. the docker container for Fast-api needs to be manually run everytime we run docker compose up. we would like to figure out how to resolve this issue.

We renamed user model to accounts in our design to be consistent with the gwtdown library.

I will write a ticket to catch duplicate values before they cause a 500 error.


## January 19, 2024
Worked on migrations for the project related tables

Goals:

1. work on ticket for account auth - to catch duplicate account values before they cause a 500 error.
2. build migrations for the project related tables
3. start building routes for creating the lower level tables (like questions and rorschach_imgs)

we were not able to finish the ticket for the account auth together, but we were able to do all of the migrations. we did not get to routes.

Aha-Moment - the migrations that are written should be done in order of tables that don’t depend on any other tables THEN tables that depend on tables created in previous migrations.

We had a conversation about how we should write the migrations SQL code concerning foreign keys. we looked through the docs and found multiple ways to do it. we decided to use the format that made the most sense for our table, which holds a lot of foriegn keys that instantiates the columns and THEN defines which of them are foreign keys.

We had to abandon the duplicate account issue for now, as our first attempt was not sucessful and the team wanted to move on. I am planning on looking into this on my own.

Aha-moment the volumes in docker must be deleted and rebuilt whenever a migration is changed. however, a change to tables in the database can be made without changing a migration but instead creating a new migration that uses the the “ALTER TABLE” keyword.

we added an “updated_date” to our check-in model in case the user makes a change. we may want to display that data.

## January 22, 2024
Worked on the routers for rorschach and survey endpoints.

Goals

1. Built models for the **Rorschach_img**, **Rorschach_tests**, and **Survey** tables.
2. Constructed a GET request for the **Rorschach_img** API endpoint to retrieve Rorschach images from the database and return them as a list. Each image includes its ID and URL.
3. Developed a POST request for the **Rorschach_test** API endpoint to create a new Rorschach test with responses from the users.
4. Created a POST request for the **Survey** API endpoint to generate a new survey with answers users made for each question

Ramesh was the driver and the rest of the team navigated. This seemed inefficient today, since there was a lot of work to get done that could be worked on in parallel. I brought up to the team that I’d like to try separating into two groups starting tomorrow and they agreed.

A-ha moments:

1.    To add a new field to an existing model, instead of directly modifying the corresponding migration file, we can create a new migration and apply the SQL query 'ALTER TABLE table_name ADD COLUMN column_name data_type' to add a new column.

2.    Similar to Django, where we store a foreign key object in the model, in FastAPI, when we define class models that contain a foreign key object, we can set `ModelOut` as a data type to specify which property inside the model will contain the foreign key object (e.g., img: `RorschachImgOut`).

3.    Be cautious with commas in SQL queries; misplacing a comma can result in an internal server error

4.    db.execute() makes db (psycopg object) an iterable object like db.fetchall(). We used list comprehension in a get_all/list api endpoint, iterating through each element of db.

5.    for inserting multiple values we can use “Insert Into table_name (column1) values (value1), (value1), (value1)”

We discussed and optimized various aspects of the project:

1.    We decided not to add a delete method for **Rorschach_test** and **survey**.

2.    We opted not to implement **get_one** for **Rorschach_test** and **survey** because we can use join operations to achieve that.

3.    For time optimization, we decided to create post requests for all models first and then build put requests for each one.

4.    We chose to eliminate API endpoints for mental questions because questions are always stored in the database, and these are not the things that can be manipulated by users.

## January 23, 2024

Goals:

1. code the create checkin API endpoint
2. code the get_all/get_mine for check-ins

Worked on the routers and queries for check-in model. I drove while Jenn navigated. While working, a few SEIRs were also helping me with a question I had about big O notation. because of that, I was a little distracted from the work but still managed to accomplish my goal of building the create check-in. I felt really good about getting the project to this point and felt like I was able to teach the navigator about what I was doing while I did it. It is difficult to explain while coding, but I enjoy practicing.

Aha-moment: It is very handy to write SQL queries in the PostgreSQL VSCode extension and testing it before writing into the query method. This allows more experimenting with the SQL before having to test it in Swagger.

Jenn asked me to stay on a little past class to help her with coding the “get_mine” for check-ins and IU . I obliged and I was able to help her code the get_all/get_mine for check-ins. we decided to do one giant SQL query to get all check-ins using table joins to get all data associated with each check-in. It somehow worked with ZERO issues on the first attempt. It was pretty amazing to watch.

## January 24, 2024

Goals:
1. Error handling for all routes (excluding check-ins)
2. create a get_by_email method for accountQueries
3. close other issues on GitLab.

first two goals were accomplished. Ramesh Drove while I navigated. I felt a bit burnt out from the day before and all the new material we had learned that day (sorting algorthms).

Aha-moment: when debugging an issue (conditional isinstance to catch returned Error models for a route was true as expected), a print statement using the type function on the return revealed that the type was an Error class of a different module. the correction was to import the Error class of the correct module. there was more than one, which caused the problem. I wrote an issue to remove the Error class definition.

## January 25, 2024

Goals:

the team brought up a few concerns:
1. Jenn mentioned that the group is not spreading around GitLab merges enough and there is a concern that those who have few merge requests will receive a bad grade. I Spoke up about how it is more about the commits than the merge requests but that we can seek clarification on grading from the instructors.
2. I brought up my concern about the team not using a project management tool- This has been a long standing issue of mine: I had told the group I was worried we were not following the rubric early in the project when I noticed that Jenn was writing our goals for each day into Microsoft Word. I didn't feel like my concerns were being heard at the time since the team could not decide on a project management software to use instead of Word. I started writing as many issues into GitLab as I could as a way of tracking work. Now that an instructor has worded that a project management tracker is part of grading, we have finally agreed to all start writing issues into the issues board and making that part of our daily stand-up. I was really glad we were finally taking action on this concern.
3. Jenn brought up a concern that I am being used as a resource too much when it comes to git related issues and that it is not allowing others in the team to learn git on their own. She wants each member of the team to try and figure out the issue for themselves first and then go to a SEIR since they have better experience with teaching than I do. I agreed to hold myself back and allow the team to go through issues that arise without getting too involved. I expressed my concern that the main branch must be protected but I want them to explore git and get more experience. Ramesh brought up the idea of creating a seperate "practice" branch or even a seperate project to get more familiar.
4. When reviewing a merge request from Luna and Jenn, I noticed that some code that I wrote had been changed. I was suprised to see this, as it was not in scope of the tasks Luna and Jenn were supposed to work on the day before. I brought up the change and explained why I had originally designed it the way I did and how the refactor that was made was less efficient. Additionally, I was not aware when going over the goals on the day they did this that my code would be changed. I brought this up to the team and we started to list out issues to write in. It went very well and I felt like we were starting to get organized.

Aha Moment: Merge conflicts can be solved in GitLab in an intermediary branch, then tested, then merged to main. Doing merges this way will mean all conflicts are handled in the testing branch.



## January 26, 2024

Goals:
1. Work on issues for error handling in the back-end
2. Work on Unit testing for create check-in
3. Work on Unit testing for edit checkin
4. remove redundant functions

All goals were complete. I worked with Luna today and had a really excellent experience. I felt like we were comlimenting eachother very well, and were able to be very productive and learn a lot together. Unit testing was very tricky, but we were able to figure out unit tests for both edit check-in and create check-in.

Aha-Moment - the unit test does not work from the terminal on our local computer, but rather in the docker container.

Had a 1 on 1 with Jenn to go over how we will ensure our communication is more effective. it was very productive and I felt like we got on much better terms.

## January 29, 2024

Goals:
1. Work on the front-end (at least get it started)
2. accomplish a get token
3. create a log-in

got up to the "accomplish a get token" in vite. We had a lot of struggles but we all worked together and put our brains together to get through it. although we did not get to create a log-in page, we still had a great deal of learning on how react-redux works.

Aha-moment: the VITE_HOST_URL .env file must be saved in ghi folder or else it cannot be found by Vite. this caused a lot of issues and fortunately a message popped up to show us that "src/.env" was changed when it should have said "ghi".

## January 30, 2024

Goals:

1. create Login
2. create Log-out
3. create sign-up

The team finished all our goals for the day working in mob programming. I like when we work on mob programming since I feel more a part of each piece of the code. We planned on breaking out into pairs in the afternoon but decided we were making good progress and should continue to finish the sign-up form.

We had hiccups along the way for each goal, but worked through them as a team. I sometimes feel that when we are in a group of four, it can make one or two teammates feel left out and they wont end up contributing as much as they would in pair programming.

for the create log-out and log-out, we didn’t have much difficulty, but were figuring little things out about react-redux. With Sign-up, we had an issue with the react-router: we forgot to put an Outlet tag into the root directory, App.

Aha moment: formData is only set as the body value when it being used for log-in. when sign up post request is made, the body needs to be in the form of a dictionary since it is expecting JSON unlike the log-in.

## January 31, 2024

Goals:
1. create checkin page

we were not able to finish the checkin page in a day, but We faced many challenges that were great learning opportunities: useEffect, state in general, capturing status of the requests from the redux mutation hooks, and correcting some schema in postgreSQL. Luna and I were making really great progress that we kept working on the code later than what our group planned. After the zoom room closed, we both continued to look into our issue without making any changes to the repository so that we didnt leave our other teammates behind. The issues we were having stemmed from a few mistakes in our schema relating to foreign keys. These issues did not present themselves in any of our backend testing done since the issue was only apparent when an id was referenced that did not exsist, and since we never had too much data in our database, we never ran into the issue. another problem was caused by a lack of understanding of how the useEffect worked. It should be used so that an event only occurs as many times as you need it to (usually once). we were putting state changes inside if statements which would run the rerender many times due to the conditional being true for many frames. After a few hours of relearning useEffect, I was able to get the check in to create. I felt great about being able to finish and started thinking of how I would teach the rest of the group without giving away the answers.

Aha-Moment: useEffect occurs when a change is made in one of the parameters passed into its array argument.


## February 01, 2024

Goals:
1. Finish the check-in page
2. Correct the schema issue
3. get date from within SQL query

We finished all of our goals for the day, since I was able to look into the issues we were having the night before. I was able to allow my teammates to drive while I gently guided them. I didn't want them to miss out on the learning opportunity of sdolving the useState for themselves, so I tried my best not to interject much. I was periodically asking questions of those not participating as much and tried to keep engagement high. Once we got the schema corrected, everyone rebuilt their volumes at the same time for time efficiency.

Aha-Moment: VS-Code sometimes will not refresh to the files that currectly exist in its directory. check using another text application such as nano. this will ensure that it is not a git issue.

## February 05, 2024

Goals:
1. Create the Checkin Calendar page
2. Create the details page

We finished the goals for the day and were on track for finishing the project. We have an issue with one teammember's VS Code. There are periods of time where a git commit will not update it even after a hard refresh. This has caused many issues. The group has decided to not make me reviewer for every merge request like they had been doing in the past. They beleive it will reflect poorly on their grades and so we made the decision to spread the work out evenly. however, this has made merging conflicts a larger issue in our group, since not everyone is comfortable with resolving them as they arise. We have decided as a group that the merge reviews will still be evenly distributed but that we will only make branches from the most up to date code to avoid merge conflicts.

Aha Moment: destructuring in javascript using curly brackets allows you to make an alias, which helps when you are doing a lot of destructuring of functions calls with similar outputs.


## February 05, 2024

Goals:
1. Create the edit one check-in page
2. Create the home page

Finished the edit page and had to slow down and get help from two of the group mates that were not absorbing the information. talking through the information is beneficial to everyone, so I didnt mind walking through the code slowly. When our team gets to a bug, we ask the navigators to participate in handling the resolution even when we already know what the issue is so that everyone is up to speed and learns from it. It is getting difficult to do this since the pressure of getting the project finished on time is growing. I can feel a bit of stress from some of the team and the priority for getting the project completed is starting to outway the priorty to learn.

Aha Moment: Using a console log after a setState will occur before the state is even set. it is more helpful to use a console log in a useEffect to catch when the state has actually changed to perform certain actions with the state to ensure it has been changed first. Also, if statements can go inside of the function for useEffect hooks.
