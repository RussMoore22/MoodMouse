# Journal Entries of Russ Moore

## January 16, 2024

Goals:
1. Configured the Docker Compose.
2. Got the FastAPI app to start running.
3. Connected the project database to the PostGreSQL VS Code extension.

Working on code with the team for the first day had a few challenges, but we worked on them together. I feel that the team is getting more comfortable working collaboratively after the week before working on Excalidraw. There were a few Git-related issues we had, and a few team members had to recreate their local Git repository and start anew. I want to get better at working through Git problems so that I can be a better resource to my team. The team has been good about checking everyone's progress, but there was a bit of disconnection during the session: One team member started working independently while the others struggled through an issue because they thought it would be more productive. I brought it up immediately when the merge request was being made with code that only one team member worked on. The team all handled it very well, and I felt confident it made us all more aware of our communication moving forward.

Aha-moment: When creating the Docker Compose, I realized that indentation is crucial. Fixing a formatting issue turned out to cause a huge headache and resulted in a Git restore.

## January 17, 2024
Started the FastAPI accounts feature.

Goals:
1. Configure the .env file.
2. Set up the Pg-Admin within Docker Compose.
3. PostgreSQL VSCode Extension Set-up.
4. Auth models and router.
5. Migration for the accounts table.
6. Query request for posting an account into the database.

We were able to finish goals 1-4, which was great progress.

Aha-moment: We played around with the Pydantic arguments for the post-route for create_account and saw the response within Swagger. Removing the Pydantic argument got rid of the example input JSON.

I was writing the code with Ramesh and Jenn as navigators and Luna as the facilitator. The team was able to get through developing a create_accounts route. I was able to show the team how to set up the PostgreSQL extension within VSCode. The team had a small hiccup with Git merging pipeline issues. We decided we will put all code into a linter before the commit that gets merged into testing/main to avoid this issue in the future.

## January 18, 2024
Finished the FastAPI accounts feature.

Goals:

1. Make Migrations for accounts models.
2. Develop the get request for accountsQueries.
3. Develop the create request for accountsQueries.
4. Testing in Swagger:
    1. Accounts are created.
    2. Duplicate accounts are rejected.
    3. Log-in token is created and can be deleted.

We accomplished these goals and set some stretch goals that we were not able to get to but will do tomorrow.

Knowing these goals would be difficult to accomplish, I decided to try and code them on my own in a private branch and was able to get it all to work before getting with the group. Because this is a learning environment, I made sure not to give all the information away to my group and allow them to figure it out while I guided (I was the navigator/facilitator for the group that day).

I allowed the driver to design the migrations the way they decided without too much influence, and they came up with a great idea: using a smaller data type in the SQL database for certain columns so that we are allocating less space.

Aha-moment: The SQL entry made using Psycopg pool connection allows for two arguments - one for SQL code in a string and the other for variables assigned to the "%s", which the .execute method allows for.

We had an issue when loading our Docker containers - psycopg connection failed. The Docker container for FastAPI needs to be manually run every time we run Docker Compose up. We would like to figure out how to resolve this issue.

We renamed the user model to accounts in our design to be consistent with the gwtdown library.

I will write a ticket to catch duplicate values before they cause a 500 error.

## January 19, 2024
Worked on migrations for the project-related tables.

Goals:

1. Work on ticket for account auth - to catch duplicate account values before they cause a 500 error.
2. Build migrations for the project-related tables.
3. Start building routes for creating the lower-level tables (like questions and rorschach_imgs).

We were not able to finish the ticket for the account auth together, but we were able to do all of the migrations. We did not get to routes.

Aha-Moment: The migrations that are written should be done in order of tables that don’t depend on any other tables THEN tables that depend on tables created in previous migrations.

We had a conversation about how we should write the migrations SQL code concerning foreign keys. We looked through the docs and found multiple ways to do it. We decided to use the format that made the most sense for our table, which holds a lot of foreign keys that instantiate the columns and THEN defines which of them are foreign keys.

We had to abandon the duplicate account issue for now, as our first attempt was not successful and the team wanted to move on. I am planning on looking into this on my own.

Aha-moment: The volumes in Docker must be deleted and rebuilt whenever a migration is changed. However, a change to tables in the database can be made without changing a migration but instead creating a new migration that uses the "ALTER TABLE" keyword.

We added an "updated_date" to our check-in model in case the user makes a change. We may want to display that data.

## January 22, 2024
Worked on the routers for rorschach and survey endpoints.

Goals:

1. Built models for the **Rorschach_img**, **Rorschach_tests**, and **Survey** tables.
2. Constructed a GET request for the **Rorschach_img** API endpoint to retrieve Rorschach images from the database and return them as a list. Each image includes its ID and URL.
3. Developed a POST request for the **Rorschach_test** API endpoint to create a new Rorschach test with responses from the users.
4. Created a POST request for the **Survey** API endpoint to generate a new survey with answers users made for each question.

Ramesh was the driver, and the rest of the team navigated. This seemed inefficient today since there was a lot of work to get done that could be worked on in parallel. I brought up to the team that I’d like to try separating into two groups starting tomorrow, and they agreed.

A-ha moments:

1. To add a new field to an existing model, instead of directly modifying the corresponding migration file, we can create a new migration and apply the SQL query 'ALTER TABLE table_name ADD COLUMN column_name data_type' to add a new column.
2. Similar to Django, where we store a foreign key object in the model, in FastAPI, when we define class models that contain a foreign key object, we can set `ModelOut` as a data type to specify which property inside the model will contain the foreign key object (e.g., img: `RorschachImgOut`).
3. Be cautious with commas in SQL queries; misplacing a comma can result in an internal server error.
4. `db.execute()` makes `db` (psycopg object) an iterable object like `db.fetchall()`. We used list comprehension in a get_all/list API endpoint, iterating through each element of `db`.
5. For inserting multiple values, we can use "Insert Into table_name (column1) values (value1), (value1), (value1)".

We discussed and optimized various aspects of the project:

1. We decided not to add a delete method for **Rorschach_test** and **survey**.
2. We opted not to implement **get_one** for **Rorschach_test** and **survey** because we can use join operations to achieve that.
3. For time optimization, we decided to create post requests for all models first and then build put requests for each one.
4. We chose to eliminate API endpoints for mental questions because questions are always stored in the database, and these are not the things that can be manipulated by users.

## January 23, 2024

Goals:

1. Code the create check-in API endpoint.
2. Code the get_all/get_mine for check-ins.

Worked on the routers and queries for the check-in model. I drove while Jenn navigated. While working, a few SEIRs were also helping me with a question I had about big O notation. Because of that, I was a little distracted from the work but still managed to accomplish my goal of building the create check-in. I felt really good about getting the project to this point and felt like I was able to teach the navigator about what I was doing while I did it. It is difficult to explain while coding, but I enjoy practicing.

Aha-moment: It is very handy to write SQL queries in the PostgreSQL VSCode extension and test it before writing it into the query method. This allows more experimenting with the SQL before having to test it in Swagger.

Jenn asked me to stay on a little past class to help her with coding the "get_mine" for check-ins and IU. I obliged, and I was able to help her code the get_all/get_mine for check-ins. We decided to do one giant SQL query to get all check-ins using table joins to get all data associated with each check-in. It somehow worked with ZERO issues on the first attempt. It was pretty amazing to watch.

## January 24, 2024

Goals:
1. Work on migrations for the project-related tables.
2. Work on ticket for account auth - to catch duplicate account values before they cause a 500 error.
3. Get date from within SQL query.

We finished all of our goals for the day, as I was able to look into the issues we were having the night before. I was able to allow my teammates to drive while I gently guided them. I didn't want them to miss out on the learning opportunity of solving the useState for themselves, so I tried my best not to interject much. I was periodically asking questions of those not participating as much and tried to keep engagement high. Once we got the schema corrected, everyone rebuilt their volumes at the same time for time efficiency.

Aha-Moment: VS Code sometimes will not refresh to the files that currently exist in its directory. Check using another text application such as Nano. This will ensure that it is not a Git issue.

## January 25, 2024

Goals:
1. Work on the front-end (at least get it started).
2. Accomplish a get token.
3. Create a log-in.

Got up to the "accomplish a get token" in Vite. We had a lot of struggles, but we all worked together and put our brains together to get through it. Although we did not get to create a log-in page, we still had a great deal of learning on how React-Redux works.

Aha-moment: The VITE_HOST_URL .env file must be saved in the ghi folder, or else it cannot be found by Vite. This caused a lot of issues, and fortunately, a message popped up to show us that "src/.env" was changed when it should have said "ghi".

## January 26, 2024

Goals:
1. Create Login.
2. Create Log-out.
3. Create sign-up.

Finished the goals for the day, since I was able to look into the issues we were having the night before. I was able to allow my teammates to drive while I gently guided them. I didn't want them to miss out on the learning opportunity of solving the useState for themselves, so I tried my best not to interject much. I was periodically asking questions of those not participating as much and tried to keep engagement high. Once we got the schema corrected, everyone rebuilt their volumes at the same time for time efficiency.

Aha-Moment: formData is only set as the body value when it being used for log-in. When sign up post request is made, the body needs to be in the form of a dictionary since it is expecting JSON, unlike the log-in.

## January 31, 2024

Goals:
1. Finish the check-in page.
2. Fix unit testing code (since changes were made to models).
3. Add error handling to get_one endpoints.

We broke up into two groups to work on the goals for the day. I worked with Luna today and had a really excellent experience. I felt like we were complimenting each other very well and were able to be very productive and learn a lot together. Unit testing was very tricky, but we were able to figure out unit tests for both edit check-in and create check-in.

Aha-Moment: The unit test does not work from the terminal on our local computer but rather in the Docker container.

Had a 1 on 1 with Jenn to go over how we will ensure our communication is more effective. It was very productive, and I felt like we got on much better terms.


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


## February 06, 2024

Goals:
1. Create the edit one check-in page
2. Create the home page

Finished the edit page and had to slow down and get help from two of the group mates that were not absorbing the information. talking through the information is beneficial to everyone, so I didnt mind walking through the code slowly. When our team gets to a bug, we ask the navigators to participate in handling the resolution even when we already know what the issue is so that everyone is up to speed and learns from it. It is getting difficult to do this since the pressure of getting the project finished on time is growing. I can feel a bit of stress from some of the team and the priority for getting the project completed is starting to outway the priorty to learn.

Aha Moment: Using a console log after a setState will occur before the state is even set. it is more helpful to use a console log in a useEffect to catch when the state has actually changed to perform certain actions with the state to ensure it has been changed first. Also, if statements can go inside of the function for useEffect hooks.

## February 07, 2024

1. finish the calendar view
2. fix unit testing code (since changes were made to models)
3. add error handling to get_one endpoints

We broke up into two groups of two for pair programming today, which ended up allowing us to be much more productive. Luna and I worked on front end (calendar view) while our other two teamates worked on the backend (error handling for get_one error handling).

Luna and I made great progress on the calendar view. To ensure our success, we drew out a more detailed wireframe of that page and discussed what shape our data needed to take to get something that resembled a calendar. We started by getting all the checkins and filtering them for the given month. We added them to an array and filled in the days where no checkin was completed for that day with a dummy object. the dummy objects allowed a dummy card to be created in html and were were able to get a 7x6 grid of days that corresponded to the correct weekday.

Aha-moment: we created some dummy checkin data, and didnt realize why when we changed one, certain parameters of the others would change. it wasnt clear right away, but this dummy data was depending on the same surveys and made it seem like the edit endpoint was causing more than one to be changed.

## February 08, 2024

Goals:

1. fix unit testing
2. error handling for all backend routes
3. add pydantic typing to routers and queries
4. add login/signup errors on page
5. do not allow user to add multiple checkins per day
6. add delete-mode button
7. refresh calendar components on navigation
8. redirect to other pages when submitting forms or clicking certain buttons
9. clean the backend code

Luna and I pair programmed again today and accomplished all our goals for the day. We were really dedicated to finishing as much as possible one day in advanced. We asked for some help from Riley since the page that navigated from our create checkin to our list/calendar page was not rendering the newly created data to the list. We thought it might be a problem with a useEffect and that turned out to be the problem. We were having a difficult time with some useEffects but since our project uses so many of them, I feel like I have a much better grasp of their mechanics now. Debugging with Riley shed light on what kinds of thing I can look out for when something isn't as expected- we focused a lot on the network and the sequence of events that take place around the time the submit button is clicked and the api calls are made. It was very enlightening, and Luna and I quickly discovered the issue soon after he left us tyo our work.
Aha-Moment: when using useEffect hooks, pay attention to the dependencies and if their state is the state that should truly be depended on. Using a useEffect to get a reroute to occur after a succesful response is returned.

When we finally met with our other two team-mates, I couldn't have been more impressed with their progress. The styling they added looked really great and I was happy to see they were able to get so much done. I was a little worried that we would be behind, but once I saw what they had come up with, I felt a whole lot better about getting eveything done on time.


## February 09, 2024

goals:
1. add css to pages
2. console warnings
3. correction for timezone of user
4. create an error page that gets routed to
5. fix hardcoded localhost and use env variable instead
6. fix calendar delete button
7. same day checkin redirect
8. logout redirect
9. clean back-end code
10. clean front-end code
We worked down to the wire. Luna and I dealt with the many issues that arose when testing the website, while the rest of the team focused on fixing the issues with the navbar and carousel from the previous day. We scheduled multiple meetings, but it always seemed like we weren't quite ready. I was really excited to work on styling the webpage, but with all the issues for both groups, it felt like we never had the chance to get to it. Finally, we started working on CSS, but we only had about an hour to implement as many changes as possible. I also had an issue with cleaning the front-end code, but I didn't get a chance to finish it since everyone was still working on the code.

We were so tired that we started making mistakes in Git, which resulted in losing some of our code. When creating a merge request, we accidentally merged into the wrong branch and had to go through the code to ensure there were no errors. We did find a few errors and rushed to fix them.

The last day of working on the website was very stressful. Since the team hadn't integrated their work at the agreed-upon time in the morning, we had to integrate everything at the last minute. The other group had been pair programming for most of the day, fixing the same issue of clearing console log warnings from the carousel component they had added. When we met up at the agreed-upon time, we discovered that the carousel component they were working on was from another resource they had to resort to because they couldn't fix the original one. The new component didn't cause console logs, but their new code affected the navbar on each page. This issue wasn't brought to our attention until after it was already pushed into the branch, and we spent a good amount of time resolving the issue and saving their code into a separate branch for them to work on. I asked them if they knew that it was causing an issue before merging it, and they admitted that they knew it was causing a problem but merged it anyway since solving the console log issue took priority over the newly created navbar issue. At this point, my partner and I became quite worried but left the room to work on the error routing.

The error routing was giving us a hard time, but we managed to make it route us to another page if the user entered a detail page URL with a non-existent ID. We used a combination of useEffect and if statements to resolve the issue. Our other teammates came to our room and announced that after getting SEIRs involved, they were able to resolve their newly created navbar issue, but they didn't work on the branch we had asked them to. I was worried this might cause a merge issue, which added to the pressure I was feeling. Since our other teammates focused on that one issue, they weren't able to get to the styling issue we had assigned to them in the morning. We had asked if we could take the issue and work on it separately, but they refused and wanted us all to work together. I drove while Jenn and Ramesh navigated. The appearance of the website changed drastically, but we were working very quickly. I was careful not to change anything that I thought would break the website, and I periodically tested it to ensure it was working. I was trying my best to keep the attention of my teammates, but it felt like I was the only one really working on the CSS. The team all wanted to work on journaling and their portions of the readme instead of testing the code. I asked for a merge review, and when I finally got the review, we noticed that it had merged into the wrong branch. Then, when Luna was merging her code, we had to resolve a large conflict, which ended up causing a small typo.

I asked for someone besides Luna or me to test the branch so that we could solve the problem together, but nobody seemed to be pulling the changes. The clock was starting to run out, but I knew there was a simple answer caused by the merges. With very little time left, I tried to focus, but the rest of my team started to argue about whether we should revert back or solve the problem. I felt like the only one who was actually working on fixing the issue, and no matter what we chose to do, it would be my responsibility to do it. Then, SEIRs showed up in the room and started asking what the issue was and how they could help. I was confused why they were there and didn't think we needed assistance. I believed that explaining the issue and showing them our code would take longer than the debugging I was already doing. I was able to solve the issue and merge, but once again, nobody besides Luna and me were willing to test the branch. When time ran out, we had code that we were unsure about, and we spoke to the SEIRs about what we could do, but they said they needed to close the rooms. They said a few minutes past 8 to make sure we were calmed down and easing the tension. When they closed the rooms, I pushed what I could salvage to the main branch but noticed that I had still lost a few features, such as the time zone correction in the create and edit page. This caused an issue since the date is saved into the database as Zulu time. Luna and I talked over Slack after class to debrief and look at the final product some more. We noticed that the README main page doesn't properly link to the GHI page she created and that the startup instructions were incomplete. We recalled that in the final 10 minutes, Jenn had announced that she wouldn't be able to finish her own part of the README.

Aha-Moment: When navigating away from a form (choosing not to submit), the prevent default still needs to be called. Otherwise, the connection loss will produce console errors.
