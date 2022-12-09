# userList

a web app project with react, redux(RTK), expressjs and MongoDB

prerequisites:
as a full stack web app, we have server side set up with express, supported with MongoBD(mongoose) database
it contains two folders:
server(express) and userlist(react)
to setup server side:
main: install nodemon(npm i --save-dev nodemon), express, mongoose
other: body-parse(to parse Json body of a post request, otherwhiles req.body will be undefined https://community.postman.com/t/trying-to-send-form-data-but-im-getting-req-body-as-undefined/6002/4)
to setup frontend react app:
install react(npx create-react-app userlist), redux, redux-toolkits, react-redux

server side steps:

- server.js:

1. setup mongoose and connect to mongoDB:
   "mongodb+srv://lvyhnzhng:gU2Wv9Ecy02Xaf1X@cluster0.ay6vh7g.mongodb.net/{type name of database}?retryWrites=true&w=majority"
   https://www.section.io/engineering-education/nodejs-mongoosejs-mongodb/
2. setup the very basic app = express(), and port listerner
3. import routers from routes.js
   set up the app.use("/", routes) and other app.use()

- schema.js:

3. write the schema for mongoDB collection: https://mongoosejs.com/docs/schematypes.html
   eg: if: mongoose.model("list_user", userSchema)-->"list_users" will be the collection name

- routes.js

4. setup routers useing RESTful API: https://expressjs.com/en/5x/api.html#router
   API we need:

- get all users
- post a new user --> test it in thunder client(require"body-parse")
- get one user by id
- put a exsiting user by id(router.put(...))
- delete user by id

* in thunder client:

5. test all routers

client/UI side steps:

- prerequisite: document structure: app; features; UI(components, index.js), App.js

1. setup basic UI:in components and index.js
2. setup Redux and RTK:

- setup and export store in store.js: configureStore(reducer:{ })
- connect store with the whole project in App.js: eg <Provider store = {store}>
- create Reducers and actions in features - userlistSlice.js: createSlice() and export reducer and actions
- create async thunk and extra reducers: finish the fundamental fetching all user data async thunk and corresponding extra reducer
- use 3 hooks useDispatch, useSeletor, useEffect to dispatch the fetching all user thunk whenever the users data was changed(it should be the condition of useEffect)

3. set up UI basic list to represent all user data
4. set up all routers(if possible) in the main index.js

5. complete interactive functionalities:

# the EditedUser function:

- in each UserRow component, add the edit button and link to jump to the edit user page(editUser.js)
- use similar methods as "register form" app, map the attributes to each input row, to avoid repeatation.
- set up the "value onChange" loop with useState hook, so user can update info through input
- onSumbit function: when click submit button, a redux async thunk(updateEditedUser()) will upload the new userInfo with a put request body to update user info to data base through the server we setup before

# the deleteUser function:

- use createAsyncThunk() to emit a delete request with the user id passed from UI when a user hit relative delete button in a userRow component

# the searching function:

- add searching input bar component in searchingBar.js: set up a value-onChange loop based on local useState() hook to restore the searching input value
- in userlistSlice.js, achieve the searching function as a searchData actions and relative reducer. Pass value through payload from UI. Based on the payload, usestate.usersToShow will update after filtered by searching input data.
- dispatch the searchData reducer in a useEffect() hook, triggered while typing
- to avoid errors, initializing current page to 1 as searching is happening

# add new user:

- setup basic register form like page
- use createAsyncThunk() and extraReducers

# pagination:(use react hook not redux)

- add a Pagination component in pagination.js and import in userPage.js
- in usePage.js, set up local state with useState():
  current page(which page is showing); itemsPerPage(how many items/rows in a Page); current users(collect all users infos showing in the current page), and functions to update those states
- handleCurPageRows: slice(firstItemIdx, lastItemIdx) and update current users to show
- in pagination.js: set up page navigation bar

# use material ui:

- table system, icon, pagination https://mui.com/material-ui/react-table/

# Troubleshooting and relative articles:

- where should data validation occur?
  https://stackoverflow.com/questions/4819678/where-should-data-validation-occur
- how to do PUT request to upload data with axios? https://masteringjs.io/tutorials/axios/put
- what's the syntax to export objects?
  https://stackoverflow.com/questions/38296667/getting-unexpected-token-export
- Mongoose concepts: what's the differences between a document and a query?
  query is a Promise like(but not a Promise) chainable object with documents as its value. a document is a pure instance of a model class.
  document:https://mongoosejs.com/docs/documents.html
  query:https://mongoosejs.com/docs/queries.html
- how to use redux in class component?(not use)
  https://blog.logrocket.com/react-redux-connect-when-how-use/
- how to update state "immutable"? state.push(...) or state = ...?
  https://stackoverflow.com/questions/62966863/a-case-reducer-on-a-non-draftable-value-must-not-return-undefined
- useEffect() trigger twice when the condition argument is []?
  https://stackoverflow.com/questions/61254372/my-react-component-is-rendering-twice-because-of-strict-mode/72676006#72676006
- more details about useEffect():https://daveceddia.com/useeffect-hook-examples/
  useEffect rerendering: https://maxrozen.com/learn-useeffect-dependency-array-react-hooks
- why need a capitalize the name of a component?
  https://stackoverflow.com/questions/55846641/react-hook-usestate-is-called-in-function-app-which-is-neither-a-react-funct/55862839#55862839?newreg=55c52ea4c0ee4a7595076f1e986b2c08
- to run and test server side url, use"http://.." rather than "https://..."
  https://stackoverflow.com/questions/62658941/error-write-eproto-34557064error100000f7ssl-routinesopenssl-internalwrong
- how to make a validation of a form? https://learnetto.com/blog/react-form-validation
- use navigate() in useEffect https://stackoverflow.com/questions/62336340/cannot-update-a-component-while-rendering-a-different-component-warning
- use /:id params as mongoose model ObjectId:
  https://stackoverflow.com/questions/70190522/bsontypeerror-argument-passed-in-must-be-a-string-of-12-bytes-or-a-string-of-24
