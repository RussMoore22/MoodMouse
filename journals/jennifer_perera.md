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

During this time, we discovered how flexible FastAPI really is. We noticed that there
wasn’t a difference between the info and information parameters of the create_account 
function in the accounts.py file. We also learned that host name when creating.

I started taking notes during the team's stand-ups to make sure that we are documenting what our responsabilities are for the day and after we get off class, I prepare the next day's stand up document to show what we did the previous day, what we have to do today and any remarks the team members make to make sure everybody's concerns are being heard. I thought this process would help the stand-ups be quicker and more structured while also ensuring that everyone's thoughts and concerns are being addressed as a team. I asked wether everyone was okay with this idea and the team seemed to appreciate this approach. I want to make sure that as a team lead, I give my absolute best to them, and I help guide and ease this group project process.

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
on that username. Although now it seems like that was a small discovery, this felt like a huge step
forward in the direction of more knowledge and it made us all ecstatic. 

Another moment of realization was when the instructor provided a valuable hint regarding an error 
encountered in Docker, specifically related to the SIGNING key not being properly assigned. The 
insight emphasized the necessity of having more than just one key. We opted to 
create an additional .env file outside the API directory. This ensured proper 
identification of the SIGNING key and resolved the issue.

## January 19, 2024

Today I worked on:

* Attempting to fix duplicate error.
* Creating migrations for Questions, Surveys, rorschach_imgs, rorschach_tests, and check_ins. 
* Working out merge requests questions and concerns. 
* Updating Excalidraw wireframe and backend design to reflect accurate variable naming in migrations. 

As one of the navigators for today, I helped direct the driver with researching the PostgreSQL 
documentation for Foreign Key formatting. We discovered that we could implement a foreign key 
for each item that we had created before calling the foreign key. We needed to specify the 
referenced columns by id in the questions table for each foreign key. I also helped with updating 
our Excalidraw documentation to reflect the changes we were making to the variable names. We had to
abandon the duplicate issue due to being stuck on it for a long time and wanting to move on to 
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
* Updating the rorschach_test portion in the returns of updated.
* Helping Luna update the rorschach_test portion in the returns of create.

Today Luna and I worked together to create the PUT and DELETE endpoints for the check-in feature. We referenced the update and delete function from Curtis' code and found it very helpful.

Today I learned so much about GitLab. As I encountered a merge conflict at the end of the day, we had to do some research on what command to use to show all the branches and we required the help of the SEIRS because we were afraid of messing up the testing branch. After the SEIRS came over and instructed us on what commands to use, we were able to commit and push all the changes successfully.  


## January 25, 2024

Today I worked on:

* Creating the Authentication for the check-in.
* Creating the get_one function on the check_in feature. 
* Creating the check_in error authentication get_one function on the check_in feature.

Ramesh and I were stuck working on the get_one function for the check-in feature for most of our pair programming time. We spent most of our time researching and trying to figure out how to move forward from not being able to create a check-in. With that roadblock, we learned that we needed to wipe Ramesh's database since we had new migrations and then after creating new data, the error went away. As we tested were creating the get_one function, we seem to be getting more comfortable with SQL and the SQL Explorer from VSC. I feel more comfortable using SQL in the backend than I did when we started the project. Tomorrow Ramesh and I plan to finish the get_one query function and route, test it in Swagger, and work on adding the authentication. After all of that is done, we will merge that working feature into testing.


## January 26, 2024

Today I worked on:

* Troubleshooting errors for . 
* Completing the get_one function for the check in feature.
* Creating SQL queries, wrote print statements to check code. 

Today Ramesh and I finished working on creating the get_one feature for the check-in feature and we were hitting so many road blocks along the way. At first, we thought it would be just simple integers for the rorschach image and the survey when returning the Check_inOutDetails but as we continued on, we realized it was more complicated than that. We were following the example of the get_all_mine and update function and similar to that, we needed to assign rorschachTest and SurveyOut to the rorschach and survey variables in the return and make sure to assign it correctly. This process helped us understand where things where coming from and where things would go.


## January 29, 2024

Today I worked on:

* Researching Redux configurations with Vite and React.
* Starting to work on Unit testing for get_all_mine function with Luna.

Today I learned how important it is to understand where things are coming from. As a team, we worked on setting up redux for the front-end and during our mob programming time, we encountered many roadblocks along the way. One of those roadblocks was a Provider Error we were showing the localhost page and we couldn't figure out wether we needed to use reducers to set up redux, or what to do. We discovered that the reason we couldn't get our data to show up in the console was because in the index.html , we were rendering the main.js page instead of the index.js. When we followed Riley's example in lecture,we forgot that we needed to update index.html as well. 


## January 30, 2024

Today I worked on:

* Helping Ramesh create the Logout.jsx page.
* Helping Luna create the Login.jsx page.
* Changing the .env file from 127.0.0.1 to localhost.
* Helping Russ create the Sign-up.jsx page.
* Setting up the SignupForm.jsx and completing the apiSlice.jsx for signup mutation.

As a team, we worked together to create the logout, login and sign up page. The new concept of the front end is still very new to us but we are starting to carve the design and understanding how things work. One ah-ha moment for today was when we discovered that when we were creating the new account, we needed to store that data in a dictionary in the apiSlice.jsx . I would say today was a really productive day and during the time I was sharing my screen and driving, I was able to get a lot of good experience on redux and vite. 


## January 31, 2024

Today I worked on:

* Assisting Russ create the createCheckin, createSurvey and createRorschach endpoints in apiSlice.jsx .
* Helping Ramesh create the createCheckinForm.jsx and input all the code.
* Wrote code for the journey entry and part of the questions as well as fixed some typos and linting issues in the apiSlice,jsx and createCheckinPage.jsx .
* Helping Luna write code to troubleshoot generating the rorschach images and showing the questions of the main page. 
* Wrote issue for README.md

As a team, we worked together to create the endpoints for all the things we needed for the check in page. We are finding the CheckinForm to be very challenging due to having so many foreign keys and figuring out what ways we were going to write the questions for the survey because everyone had different ideas. Our questions were hard coded and we needed to show the answers after the questions so we spent some time working through that with Russ and Ramesh as the drivers.

I don't think I had an ah-ha moment today because I am still trying to understand everything that is happening with the check-in page but tomorrow, as a team, we will take another stab at completing the Check-in Form. Mob programming makes the learning process very difficult due to switching off every hour and not coding something through to the end as the driver. There are a lot of learning gaps that are still yet to be filled but for time sake, we have to keep moving forward.


## February 1, 2024

Today I worked on:

* Removing the code extra code in CreateCheckinForm that was not needed or functional and implementing the handleRorschachResponse state to the code along with the jsx for it.
* Assisted Luna with fixing the date and updated_date issues in the backend for sql to pull them automatically instead of them being hard coded.
* Helping Ramesh troubleshoot GitLab and VSC errors by doing research on how to troubleshoot and hard restart his local git repository.

As a group, we worked together to complete the CreateCheckinForm.jsx. Users should now have the ability to create a full check-in from the form. We made changes to the create check-in endpoint in the backend to fetch all the data and then distributed that data accordingly to whatever index it belonged to in the return statement. We also gain some valuable experience with GitLab by helping Ramesh troubleshoot some VSC and Gitlab pulling issues. Everyday seems to be challenging but as we continue pushing forward, we are learning more and more how to communicate and work together as a team. 

One ah-ha moment today was when the team was guiding me through a required fields missing error in the survey and rorschach test. Luna and Russ showed me where I could find the payload and how great of a tool the developer tools can be when it comes to error handling. Luna walked me through how the Form pulls from the apiSlice and how you can see in the dev tools that both of the fields we were getting errors from were just missing required fields. After that the error stopped being intimidating because I could see what it was. For the survey, the naming convention in the apiSlice was incorrect because we were calling the variables q1q and in the CreateCheckinForm we were calling the variables q1 so it was not understanding where q1 was.


## February 5, 2024

Today I worked on:

* Assisting Luna with starting and writing out the basic Check-In Calendar features.
* Adding score count total, increment and decrement features to the Check-In Calendar Page.
* Helping Russ with starting to create and writing out the basic features in the Check-In Details Page.
* Helping Ramesh troubleshoot GitLab and VSC errors, create volumes and database again and complete code for the Check-In Details Page.

As a group, we worked together to complete the Check-In Calendar Page. Our day consisted of writing the CheckinList.jsx function. We did lots of research on Date Constructors, how to combine the check-ins scores to show a total of the survey question answers and the happy level score. As we get close to completing the project, all the functions are suddenly making a lot more sense and I am enjoying mob programming with my team. The stress starts dialing down a bit. I feel the job-seeking stress sneaking up on me but I won't let it affect me right now. I still have 3 weeks but oh man, 3 WEEKS!! 

I had so many ah-ha moments today but the most memorable one was when Russ showed me that I could select text and wrap it all into parenthesis. That blew my mind. It felt like it was such an obvious thing but so efficient. It helped me save so much time from that time I started using it until I had to get off the screen. 


## February 6, 2024

Today I worked on:

* Starting to build the EditCheckinPage.jsx and adding routes to main.
* Assisting Russ, Ramesh and Luna as Navigator to complete the EditCheckinPage.jsx
* Completing the get_all_mine api endpoint. 

As a group, we worked on completing the EditCheckinPage.jsx so that users can have the ability to edit their check-ins. This took us most of the morning since we weren't sure how we were going to tackle this process but thanks to Russ' guidance and knowledge, we were able to complete it swiftly and learn a lot during the process. Later after break, we separated into pair programming teams so that Ramesh and I could complete the unit testing for the get_one and get_all_mine api endpoints while Luna and Russ worked on completing the MainPage.jsx . 

One ah-ha moment for today was when working on the unit test for the get_all_mine fastapi endpoint. I learned so much about asserts and creating mock data as well as whats coming from where during this process by having some hands on practice after the class was over.  I had to troubleshoot so much because I did not understand where things where coming from until I saw them break. I believe this is the best way to learn something, by fixing it when its broken and hopefully I get lots of practice doing that in my future job. Feeling comfortable with this subject makes me feel confident and excited to help Ramesh tomorrow as we tackle his get_one endpoint together!


## February 6, 2024

Today I worked on:

* Assisting Ramesh with creating his unit test for the get_one_check_in.
* Coding the error handling for the update_checkin function in the routers and queries. 
* Assigning README.md sections for each team member to be responsible for.
* Creating merge requests to merge unit testing branches to testing and then main. 

Today we decided to split into two teams and work on different sides of the application to close certain GitLab issues. Ramesh and I worked on the error handling in the backend for the update_checkin and the get_one_check_one while Russ and Luna worked on the frontend figuring out the calendar view. As we get closer and closer to the end of this project, I look back and reflect on certain interactions with another one of my team members and even though I did not take note of this interaction in my journal to main this project journal space professional, they did on theirs and this is incredibly disappointing as it was meant to be a confidential conversation and remain between us. When I discovered this, I was shocked but not surprised as it was to be expected. I'm only writing about this experience here now because I appreciate good and bad experiences during these stressful times and whether someone adds or takes from the stress, it is important to remain professional because the job still has to be done. I am aware that this is not a foreign concept in the workforce so reflecting on these group project experiences, I am grateful to have learned so much from the good and bad ones. 

Helping Ramesh build his unit test today really helped me solidify my unit testing knowledge. Walking him through understanding where the code comes from and why it should go where it goes was such an awesome experience for me and I'm glad he was able to grasp a better understanding of how unit tests work. When we finished his unit test, we took a crack at the update_checkin and get_one_check_in error handling issue and we found that to be a bit confusing. We did some research on how to implement FastAPI HTTPException errors and took turns coding out the solutions and after finally getting the get_one_check_in to work, we went to do the same for the update and we could not figure out how to bring the account's id to be verified so that users can only update check-ins that belong to them. We came back to the room for the our daily wrap-up and the rest of the team walked Ramesh and I through how to do that for the router and the queries method. It was really cool to walk through it and understand how to implement this correctly.
