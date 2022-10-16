<p align="center">
<img width="300" alt="GitDate_Readme" src="https://user-images.githubusercontent.com/104899687/195538342-8b0c2e42-605d-4e2b-ba89-e0251b183ada.png">
</p>
<div align="center">
<a href="#about-gitdate-" >About</a> | <a href="#demo-" >Demo</a> | <a href="#contact-%EF%B8%8F" >Contact</a>
</div>

<div align="center">
  <br />
  
[![Generic badge](https://img.shields.io/badge/version-dev-green.svg)](https://shields.io/) [![Generic badge](https://img.shields.io/badge/release-v1.0.0-blue.svg)](https://shields.io/) [![GitHub](https://badgen.net/badge/icon/github?icon=github&label)](https://github.com)
</div>

# GitDate

<a href="https://gitdate-ec8a6.web.app/" target="_blank">GitDate</a> is a dating, event website for digital nomads with Gitflow and GitHub interface.

<img src="https://user-images.githubusercontent.com/104899687/195480043-5e88af11-64e2-4d21-9a63-fd0bb35c51c0.png" width="400"> <img src="https://user-images.githubusercontent.com/104899687/195564437-567cbb41-c09d-471a-b689-b1a4e057b953.png" width="400">

## About GitDate 🖐

 <p align="center">👥 Find activities 👥

<p align="center"> 👀 Meet people 👀

 <p align="center"> 💜 Find love 💜
 
<p align="center">  💻 With computer and smartphone 💻 

<p align="center">  ✈ Without borders ✈

<p align="center">  ⚡ With GitHub styles ⚡

* Developed with **TypeScript**, **React**, **React Router v6**, **Redux** (User registration and login state management), and **Styled Components** for RWD layout, and **CSS animation**.
* Aligned **React Joyride** to provide guided tours for users to have a deeper understanding of the website.
* Adopted **Tiptap Editor** to create more customized and diverse user-generated content.
* Connected **Google Maps Platform (Places, Geocoding, Maps JavaScript API)** to provide a better user experience by auto-completing addresses, and rendering geocode locations into UI.
* Integrated **GitGraph.js** to visualize dynamic interaction among users by representing Gitflow feature. 
* Utilized **React Calendar** to manipulate and manage dates for activities created by users.
* Completed native user management system with **Firebase Authentication**.
* Designed data structure of chatroom and managed data with **Firebase Firestore Database**.

### Website structure

<p align="center">
<img width="600" alt="Flowchart Graph" src="https://user-images.githubusercontent.com/104899687/195541421-9a82cb92-e479-4d04-8f2c-aba380cd1a3b.png">
</p>

### Flow chart

```mermaid
graph TD
    A(GitDate) -->|New user?| B(Sign Up)
    A --> |Sign In|C{GitDate Features}
    B --> C{GitDate Features}
    C -->|Write profile| D[README]
    C --> E[Issue] -->|Create Issue| H(git push)
    E -->|Read Issue| J[Issue] -->|Send Pull Request| D
        C --> F[Branch] -->|Create Branch| G(git branch)
    F -->|Attend Branch| I(git checkout)
    D -->|Merge PR| K(Repo)
    D --> |Close PR| L(GitDate)
```

### Other cool features

* README.md - You can create your own README and share with others 🙌
* GitGraph - To show how active you are in GitDate! 💃
<img width="600" alt="Readme" src="https://user-images.githubusercontent.com/104899687/195785999-2d525b67-ddf4-4915-9021-742b41ac8a85.png">

* git cheatsheet - Don't be afraid if you are not an engineer 😉
<img width="600" alt="gitcheatsheet" src="https://user-images.githubusercontent.com/104899687/195786188-16caec95-5fa4-4474-a79d-7e2255b7f864.png">


### Development tools

* React
* TypeScript
* Redux
* Google Maps Platform
  - Places API
  - Geocoding API
  - Maps JavaScript API
* <a href="https://github.com/gilbarbara/react-joyride" target="_blank">React Joyride</a>
* <a href="https://github.com/wojtekmaj/react-calendar" target="_blank">React Calendar</a>
* <a href="https://github.com/nicoespeon/gitgraph.js/" target="_blank">GitGraph.js</a>
* <a href="https://github.com/ueberdosis/tiptap" target="_blank">Tiptap Editor</a>

![git](https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white)
![github](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)
![react](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![js](	https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![css](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![html5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![firebase](https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black)
![google](https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white)
![vscode](https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![eslint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)
![prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)
![trello](https://img.shields.io/badge/Trello-0052CC?style=for-the-badge&logo=trello&logoColor=white)
![mac](https://img.shields.io/badge/mac%20os-000000?style=for-the-badge&logo=apple&logoColor=white)
![chrome](https://img.shields.io/badge/Google_chrome-4285F4?style=for-the-badge&logo=Google-chrome&logoColor=white)
![safari](https://img.shields.io/badge/Safari-FF1B2D?style=for-the-badge&logo=Safari&logoColor=white)

## Demo 💖

1. Auto-start tours in GitDate, and `Docs` for tours in every page

![Screen Recording 2022-10-13 at 5 51 38 PM](https://user-images.githubusercontent.com/104899687/195567116-51e61081-f0de-495e-ad08-a81a3d86851b.gif)

2. After Sign in / Sign Up, you could write your own `README` and see/share your public README!

![Demo2](https://user-images.githubusercontent.com/104899687/195571005-b162713a-e39a-41a1-9b0a-e733e2111ca1.gif)

3. You can find different types of `Branches` (activities) by filters or dates, then checkout to this branch. Of course, you can initial new branch as well! 

![Demo3](https://user-images.githubusercontent.com/104899687/195573840-8ce184ac-4c79-46c0-b601-ceeae1ac45c4.gif)

4. You can find all the `Issues` (posts) created by users, and click to see the author's README. If you are interested in the author, don't hesitate to send a pull request!

![Demo4](https://user-images.githubusercontent.com/104899687/195574708-33f5d1d2-3e83-4b17-b241-ce93f1255578.gif)

5. When another user recieved a pull request, the notification will appear, user could decide to merge or close the PR. If PR merged, the `Repo` (chatrooms) will open, then both users can start chatting!

![Demo5](https://user-images.githubusercontent.com/104899687/195575529-67a832b6-4b7c-401e-8b85-38cfb2a0757d.gif)

6. Mobile version is available as well!

<img width="200" alt="DemoMobile" src="https://user-images.githubusercontent.com/104899687/195788948-311baeea-5cea-4874-a679-223750d65a0d.gif"> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <img width="200" alt="DemoMobile" src="https://user-images.githubusercontent.com/104899687/195789025-02d676f9-9cca-43cf-98d6-a91575bf5ba8.gif"> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <img width="200" alt="DemoMobile" src="https://user-images.githubusercontent.com/104899687/195789483-559fe0ca-557a-441c-9600-2dbb06f375e1.gif">

> Push on GitDate, Merge your soulmate!
>
> Happy coding and Happy dating! ✨✨✨

## Future Features 🔜

* Recommendation: You might also like...
* Search nearby branches!
* Terminal to control the website / VIM commands
* ...more to come

## Contact 🙋‍♀️

[![linkedin](https://user-images.githubusercontent.com/104899687/195479536-a8b8f85e-48c8-4a31-b4f6-9d98878736a8.png)](https://www.linkedin.com/in/pei-chin-chiang/) <a href="mailto:peichin.chiang@essec.edu" ><img src="https://user-images.githubusercontent.com/104899687/195586157-b3026db1-7eb0-4f56-955c-1df63bcc99a9.png" ></a>
