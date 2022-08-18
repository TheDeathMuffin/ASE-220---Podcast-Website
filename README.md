# ASE-220---Podcast-Website
This is a website for uploading and viewing uploaded podcasts. It is built using JavaScript/NodeJS, Express, MongoDB, HTML, and CSS (Bootstrap).

Setup Instructions
1. Clone the Repo to a local directory
3. Open terminal window
4. Navigate to the repo in your local directory it was saved in
2. run the command "node main.js" in terminal to begin the local webserver
3. Close local webserver with Ctrl+c in the terminal

Features
- Upload/Edit/Read/Delete podcast information based on logged in user
- Dashboard for user to manage their information
- Search Bar
- Support for tags per podcast
- Support for pre-defined categories/disciplines per podcast
- Tags/Disciplines pages allows the user to find podcasts based on respective tag or discipline

Currently unimplemented features
- Authentication (Currently logged user is hardcoded as a variable)
- Upload files/videos
- Signout page

Known Bugs
- Preview Transcript only works on top card
- Search doesn't work when sorting by year published
- Like/Bookmark buttons only update after a page refresh
- When loading into dashboard, "Your Podcasts" pane is not automatically selected
- When Editing a podcast, the disciplines are not all auto-filled
- Subscribed button does not update subscription information
