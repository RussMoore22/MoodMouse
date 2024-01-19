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

As one of the Navigators today, I helped the Driver with writing the code and 

During this time, we discovered how flexible FastAPI really is. We noticed that there
wasn’t a difference between the info and information parameters of the create_account 
function in the accounts.py file. We also learned that host name when creating.


## January 18, 2024

Today, I worked on:

* Added another .env file and when we ran our docker compose build and up, 
the FastAPI container worked and I didn’t need to restart it manually.
* Deleted sample migration and created accounts table in migrations.py. 
* Created get method for account queries.
* Created the "create" method for account queries.
* Tested database functionality in FastAPI by creating a user, logging in and logging out. 

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
