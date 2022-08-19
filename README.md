# ASE-220---Podcast-Website
Podscholar is a web application for uploading and viewing uploaded podcasts. It was built as a group project in class based on the requests given by a client for our university. This project contributed to the refining and buildling of [PodScholar](https://www.podscholars.com).  Podscholar is built using JavaScript/NodeJS, Express, MongoDB, HTML, and CSS (Bootstrap).

Features
- Search Bar
- Upload/Edit/Read/Delete podcast information based on logged in user
![image](https://user-images.githubusercontent.com/89708788/185663104-9df9b3fc-7723-44c9-9b24-16e056ded744.png)
- Dashboard for user to manage their information
![image](https://user-images.githubusercontent.com/89708788/185662626-be302b31-44df-4f30-8ebe-10188812108a.png)
- Support for tags & pre-defined disciplines/categories per podcast
![image](https://user-images.githubusercontent.com/89708788/185662692-ccf7b7e2-5f05-4c8b-958f-b80a4225eb7c.png)
- Tags/Disciplines pages allows the user to find podcasts based on respective tag or discipline
![image](https://user-images.githubusercontent.com/89708788/185662779-4147f72c-3e8d-4412-ac60-a4359791512f.png)

Currently unimplemented features/improvements to make
- Authentication (Currently logged user is hardcoded as a variable)
- Upload files/videos
- Signout page
- Like/Bookmark buttons only update after a page refresh

Known Bugs
- Preview Transcript link bugged on lower cards
- Search not working when sorting by 2018,2019,2020, or 2021
- When loading into dashboard, "Your Podcasts" pane is not automatically selected
- When Editing a podcast, the disciplines are not all auto-filled
- Subscribed button does not update subscription information
