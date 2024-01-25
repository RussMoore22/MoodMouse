# Journal Entries of Jennifer Perera 

## January 16, 2024

Today, I worked on:

* Create pgAdmin web app to ease interactions with PostgreSQL servers. 
* Tested Issue and Merge Request Creation on GitLab 

While working on creating pgAdmin, I learned a lot more about volumes in Docker and how to they work.
This also helped me get some more practice on creating branches in GitLab. 

Today was the first day we coded together as a team and with that came some miscommunication challenges. 
In an attempt to expedite progress, I worked independently to contribute something to the team, but this only hindered teamwork 
collaboration in the process.This taught me the importance of proactive communication. Moving forward, I'll ensure that all team members 
are well-informed and aligned before any individual steps are taken in any particular direction.

## January 17, 2024

Today, I worked on:

* Creating daily Stand-up tracker and team Driver, Navigator and Facilitator assignments. 
* Modifying the pgAdmin web page and tested its functionality.
* Engineering the Authentication Setup.
* Integrating the POstgreSQL extension in VSC to ease the workflow with the database.

As one of the Navigators today, I helped the Driver with

During this time, we discovered how flexible FastAPI really is. We noticed that there
wasn’t a difference between the info and information parameters of the create_account 
function in the accounts.py file. We also learned that host name when creating.


## January 18, 2024

Today, I worked on:

* Added another .env file and when we ran our docker compose build and up, 
the fastapi container worked and I didn’t need to restart it manually.
* Deleted sample migration and created accounts table in migrations.py. 
* Created get method for account queries.
* Created the "create" method for account queries.
* Tested database functionality in fastapi by creating a user, logging in and logging out. 

As the driver for today, it was my responsible to write the code and create the merge requests
while my teammates focused on note-taking, research, and providing guidance. We made remarkable
progress on our to-do/goal items for the day by following Curtis and Riley's examples of the 
lectures on how to implement migrations and their connections to the queries, routers and models. 
All these concepts are still so new to us but as we move forward, I'm sure that this will become 
more and more clear .

One of the many ah-ha moments I had today was when we were working on one 
of the parameters of the get/create function and we realized that
the user data that we were getting or creating in the queries was based 
on that username. Athough now it seems like that was a small dicovery, this felt like a huge step
forward in the direction of more knowledge and it made us all ecstatic. 

Another moment of realization was when the instructor provided a valuable hint regarding an error 
encountered in Docker, specifically related to the SIGNING key not being properly assigned. The 
insight emphasized the necessity of having more than just one key. We opted to 
create an additional .env file outside the API directory. This ensured proper 
identification of the SIGNING key and resolved the issue.

## January 19, 2024

Today I worked on:

* Attempting to fix duplicate error.
* Creating migrations for Questions, Surveys, rorshach_imgs, rorshach_tests, and check_ins. 
* Working out merge requests questions and concerns. 
* Updating Excalidraw wireframe and backend design to reflect accurate variable naming in migrations. 

As one of the  navigators for today, I helped direct the driver with researching the PostgreSQL 
documentation for Foreign Key formatting. We discovered that we could implement a foreign key 
for each item that we had created before calling the foreign key. We needed to specify the 
referenced columns by id in the questions table for each foreign key. I also helped with updating 
our excalidraw documentation to reflect the changes we were making to the variable names. We had to
abandon the duplcate issue due to being stuck on it for a long time and wanting to move on to 
something more productive. 

Today I learned that migrations written should be done in order of tables that don’t 
depend on any other tables THEN tables that depend on tables created in previous migrations. Also
to connect a foreign key to another table, we had to reference 
each item independently. In our survey, we were trying to reference the questions and we had to 
make separate foreign keys for each question to reference the id for each question. I also learned
that the volumes in Docker had to be deleted and rebuilt whenever a migration is changed.



## January 22, 2024

Today I worked on:

* Tested putting rorshach image into postgresql database without a create routeor query.
* Creating rorshach_img  get_all api endpoint to get all the img paths. 
* Creating Rorshach_test api endpoint. 


As the facilitator for today, I helped doing research for my team on topics such as why we use DROP 
TABLE in PostgreSQL, We just fixed an issue with the SQL we had write to get all the Rorshach imgs. I 
also helped my team with error handling and researching. We found that there were multiple typos that 
were preventing us from getting all the rorshach tests.

We decided to not do the get_one api endpoint for the rorshach image because it woulndt affect us right 
now and we are planning to come back to it as an issue on gitlab.


Today I learned that that there cant be any commas before the FROM statement in the query. We started 
troubleshooting by adding a try and except statements to our get_all code. We decided to add the
Exception statement to catch the error in our Docker console. This way we were able to identify the 
error easily and remove the extra commma from our query. 


## January 23, 2024

Today I worked on:

* Building Check_inIn and Check_inOut models for the Check-in feature.
* Building .
* Constructing a GET request for the Rorschach_img API endpoint to retrieve Rorschach images from the 
database and return them as a list. Each image includes its ID and URL.
* Developing a POST request for the Rorschach_test API endpoint to create a new Rorschach test with responses from the users.
* Creating a POST request for the Survey API endpoint to generate a new survey with answers users made for each question. 


Today we took a different approach to how we were going to knock out some if these features. We 
decided to get into different teams and with this approach, we were able to complete the PUT requests 
for the rorschach_tests and the Surveys along with the GET and POST request for the check-in feature. 
In team A, we 


We decided to not pursue the get_one api endpoint for the rorschach image because it would take unnecessary time and it 
wasn't going to affect us during that moment so we are planning to come back to it as an issue on gitlab.


Today I learned how the info attribute we created in the router is connected when we return it in our Query. Info is an attribute 
for the function we put in there and can access the methods and attributes we create inside that function. I used this in my return 
statement when I wanted to return an updated image id number and updated response.


## January 24, 2024

Today I worked on:

* Created the PUT router and query endpoint for check-in.
* Helping Luna create the DELETE router adn query endpoint for the check-in and get_one_rorschach function to use on the create function.
* Updating the roschach_test portion in the returns of updated.
* Helping Luna update the roschach_test portion in the returns of create.


Today Luna and I worked together to create the PUT and DELETE endpoints for the check-in feature. We referenced the update and delete function from Curtis' code and found it very helpful. 


Today I learned so much about GitLab. As I encountered a merge conflict at the end of the day, we had to do some research on what command to use to show all the branches and we recurired the help of the SEIRS because we were afraid of messing up the testing branch. After the SEIRS came over and instructed us on what commands to use, we were able to commit and push all the changes successfully.  


## January 25, 2024

Today I worked on:

* Created the Authentication for the check-in.
* Constructing a GET request for the Rorschach_img API endpoint to retrieve Rorschach images from the 
database and return them as a list. Each image includes its ID and URL.
* Developing a POST request for the Rorschach_test API endpoint to create a new Rorschach test with responses from the users.
* Creating a POST request for the Survey API endpoint to generate a new survey with answers users made for each question. 


Today we 


We decided to not pursue the get_one api endpoint for the rorschach image because it would take unnecessary time and it 
wasn't going to affect us during that moment so we are planning to come back to it as an issue on gitlab.


Today I learned how the info attribute we created in the router is connected when we return it in our Query. Info is an attribute 
for the function we put in there and can access the methods and attributes we create inside that function. I used this in my return 
statement when I wanted to return an updated image id number and updated response.
