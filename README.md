# module-registration-system
This is a simple system to conduct administration and enrollment purposes to support the learning management system.

## User Roles and Its Components
### Admin
#### Component Layout

      Index
      |     
      |__ App 
            |
            |__ Routes
                  |
                  |__ Home
                  |__ AdminLoginPage
                  |__ UsersManagementPage
                  |__ AllocateModulesPage
                  |__ ScheduleSettingsPage
                  |__ MountModulePage
                  |__ ApproveAppeals

### Student
#### Component Layout

        Index
        |     
        |__ App 
              |
              |__ Routes
                  |
                  |__ Home
                  |__ StudentLoginPage
                  |__ MyClassesPage
                  |__ SelectModulesPage
                  |__ SelectTutorialsPage
                  |__ SubmitAppeal

## Special Instructions and Handlings
### Setup Guide
1. Open Git Bash/ Command Prompt/ Terminal. Clone repository.

```
git clone https://github.com/aficat/module-registration-system.git
```
2. Navigate to project folder

```
cd module-registration-system
```

3. Install dependencies and run:

```
npm install
npm run webpack
```

### Guide to Run Mock JSON Server
1. Open Git Bash/ Command Prompt/ Terminal. Install global package of json-server.

```
npm install -g json-server
```
2. Create json file, e.g. appeals.json
3. Run json-server.

```
npx json-server -p 3001 ./docs/dev/json/appeals.json
npx json-server -p 3001 ./docs/dev/json/allModules.json
npx json-server -p 3001 ./docs/dev/json/modules.json
npx json-server -p 3001 ./docs/dev/json/users.json
npx json-server -p 3001 ./docs/dev/json/successLogin.json
npx json-server -p 3001 ./docs/dev/json/newUser.json
npx json-server -p 3001 ./docs/dev/json/schedule.json
```

