# Twilio Viewer (twilioviewer)
## Simple PWA to view sent messages from twilio 

Twilio Viewer is a simple PWA built with Ionic Angular to retrieve sent messages from the Twilio account.

**Demo:** [https://twilioviewer.web.app](https://twilioviewer.web.app)


## Local development server

```
git clone https://github.com/codebynaveen/twilioviewer.git
npm install
ionic serve
```
## Deploy to firebase hosting

```
npm install -g firebase-tools
firebase login
firebase init
```

The CLI prompts:

"Which Firebase CLI features do you want to set up for this folder?" Choose "Hosting: Configure and deploy Firebase Hosting sites."

"Select a default Firebase project for this directory:" Choose the project you created on the Firebase website.

"What do you want to use as your public directory?" Enter "www".

Note: Answering these next two questions will ensure that routing, hard reload, and deep linking work in the app:

Configure as a single-page app (rewrite all urls to /index.html)?" Enter "Yes".

"File www/index.html already exists. Overwrite?" Enter "No".

```
ionic build --prod
firebase deploy
```
