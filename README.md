git init.
Update "User details" in "git config" to be proper user.

Commit and push to github.

Now we have to add Heroku remotes to both Server and Client Apps.

Deployment:
Login to Heroku.Heroku is good for hosting server apps.
New > Create a new app >
lavanyachs-memories-app >create app 
Follow steps. Download Heroku installer.
go to cmd/node terminal and enter heroku -v
$cd to Server app.
$heroku login
$git init
$heroku git remote -a lavanyachs-memories-app

add .gitignore file from root of app.
enter, node_modules
we wont upload .env file but we have to instruct Heroku on values for KEYS in it. PORT will come by default on Heroku so not needed to give this.

Add Procfile in root of app.
Type, web:npm run start. This will enable Heroku to start app as soon as it is deployed. This is needed as some time we may not give npm start/yarn commit from code properly. So the command in this file will be picked and web says Heroku that this is web application.

$git add .
$git commit -m 'make it better'
$git push heroku master //it will start building immediatly

Go to Heroku, we should be able to see build log for the app. Open the app in new tab.
Add /posts to see all posts which is GET.

Now, we can stop local Server-app

Copy the server-app url and go to client app>api>index.js and update url with the copied value. And run the app in local and check, http:xxxx/posts should show newly added memory.

Deploying client : Netlify
Login
Sites -> Bottom of page - > Drag and drop/new application.

$npm run build // in client root in local

Open /build folder in File folder. Drag and drop this into Netlify, deploying starts. We can rename app.
We can close, client-app in local.
Click the url and app is deployed.




