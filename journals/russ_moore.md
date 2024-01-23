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

'Aha moment': we played around with the pydantic arguments for the post-route for create_account and saw the response within Swagger. removing the pydantic argument got rid of the example input-JSON.

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

Ah-ha moment: the sql entry made using Psycopg pool connection allows for to arguments - one for sql code in a string and the other for variables assigned to the “%s”, which the .execute method allows for.

We had an issue when loading our docker containers - psycopg connection failed. the docker container for Fast-api needs to be manually run everytime we run docker compose up. we would like to figure out how to resolve this issue.

We renamed user model to accounts in our design to be consistent with the gwtdown library.

I will write a ticket to catch duplicate values before they cause a 500 error.


## January 18, 2024

01/19/2023 - Worked on migrations for the project related tables

Goals:

1. work on ticket for account auth - to catch duplicate account values before they cause a 500 error.
2. build migrations for the project related tables
3. start building routes for creating the lower level tables (like questions and rorschach_imgs)

we were not able to finish the ticket for the account auth together, but we were able to do all of the migrations. we did not get to routes.

Aha-Moment - the migrations that are written should be done in order of tables that don’t depend on any other tables THEN tables that depend on tables created in previous migrations.

We had a conversation about how we should write the migrations SQL code concerning foreign keys. we looked through the docs and found multiple ways to do it. we decided to use the format that made the most sense for our table, which holds a lot of foriegn keys that instantiates the columns and THEN defines which of them are foreign keys.

We had to abandon the duplicate account issue for now, as our first attempt was not sucessful and the team wanted to move on. I am planning on looking into this on my own.

Aha- the volumes in docker must be deleted and rebuilt whenever a migration is changed. however, a change to tables in the database can be made without changing a migration but instead creating a new migration that uses the the “ALTER TABLE” keyword.

we added an “updated_date” to our check-in model in case the user makes a change. we may want to display that data.