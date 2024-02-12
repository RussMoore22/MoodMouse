<a id="readme-top"></a>

# Welcome to MoodMouse! 🐭
[![LinkedIn][linkedin-shield]][linkedin-jenn]
[![LinkedIn][linkedin-shield]][linkedin-russ]
[![LinkedIn][linkedin-shield]][linkedin-luna]
[![LinkedIn][linkedin-shield]][linkedin-ramesh]

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#built-with">Built with</a></li>
    <li><a href="#design">Design</a></li>
    <li><a href="#team-members">Team Members</a></li>
  </ol>
</details>


<div align="center">
    <img src="ghi/images/MoodMouse Logo.png" alt="Logo" width="150" height="150">
</div>


**MoodMouse** encapsulates our mission of empowering users to prioritize mental health, providing a comprehensive toolkit for self-care and self-discovery. Through journaling, mood tracking, daily Rorschach tests, and emotional state surveys, users embark on a transformative journey towards holistic well-being. Dive into the depths of your subconscious with captivating Rorschach tests, fostering introspection and understanding of unique perceptions. Your privacy is paramount, with MoodMouse's stringent measures safeguarding your data and ensuring peace of mind. Take proactive steps towards mental wellness, cultivating mindfulness, self-awareness, and personal growth with MoodMouse as your steadfast companion. Begin your path to a healthier, happier you today.


### Built with

* [![React][React.js]][React-url]
* [![Vite][Vite.js]][Vite-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]
* [![PostgreSQL][PostgreSQL.com]][PostgreSQL-url]
* [![FastAPI][FastAPI.com]][FastAPI-url]


## Intended Market

Designed for individuals seeking to prioritize their mental well-being as it offers a comprehensive solution for self-care and self-discovery. Ideal for young adults, students, professionals, therapy clients, and wellness enthusiasts, MoodMouse empowers users to manage stress, enhance emotional resilience, and promote overall mental wellness.

## Design
- [API design](docs/apis.md)
- [Data Models](docs/data-model.md)
- [GHI](docs/ghi.md)
- [Integrations](docs/integrations.md)


## Getting started

### Project Initialization

```
1. Fork and clone the repository down to your local machine
2. 'cd' into the new project directory
3. Create a .env file in the top level of the project and store a
   random signing key:
   SIGNING_KEY_ENV_VAR=<put-random-signing-key-here>
4. in the ghi directory create a .env file and store
   the path to the api host:
   VITE_API_HOST=http://<host-name-here>:8000
5. Run docker volume create postgres-data
6. Run docker volume create pg-admin
7. Run docker-compose build
8. Run docker-compose up
9. access project using http://localhost:5173
```


## Helpful Extensions to have

-   Prettier: <https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode>
-   Black Formatter: <https://marketplace.visualstudio.com/items?itemName=ms-python.black-formatter>
-   PostgreSQL: https://marketplace.visualstudio.com/items?itemName=ckolkman.vscode-postgres




## Team Members

- Jennifer Perera
- Russ Moore
- Luna Sun
- Ramesh Beharry



<p align="right"><a href="#readme-top">Back to top</a></p>


[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-jenn]: https://www.linkedin.com/in/jenn1ferperera/
[linkedin-russ]: https://www.linkedin.com/in/russell-c-moore/
[linkedin-luna]: https://www.linkedin.com/in/luna-sun-19952322b/
[linkedin-ramesh]: https://www.linkedin.com/in/ramesh-beharry-95619823a



[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://react.dev/learn
[Vite.js]: https://img.shields.io/badge/Vite.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=800080
[Vite-url]: https://vitejs.dev/guide/why.html
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com/docs/5.3/getting-started/introduction/
[PostgreSQL.com]:https://img.shields.io/badge/PostgreSQL-35495E?style=for-the-badge&color=lightblue
[PostgreSQL-url]: https://www.postgresql.org/docs/current/intro-whatis.html
[FastAPI.com]: https://img.shields.io/badge/FASTAPI-35495E?style=for-the-badge&color=lightgreen
[FastAPI-url]: https://fastapi.tiangolo.com/features/
