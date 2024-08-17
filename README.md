# Math_AI

another of the works of <a href="https://github.com/abs-js/abs-js/">@abs-js</a>, this is an AI to ask some mathematical questions, being able to edit answers by the local json file and sending it to me and improve the performance of this AI by the example given in math_questions.json. Next we have the <span style="color: red">user manual</span>:

## how to use:
### step 1/3: install packages
we have a specific command in package.json to install the dependencies:
```bash
npm run install
```
This way, the necessary packages will be quickly installed (make sure there are no errors. Use the <code>npm audit fix</code> command if necessary (if necessary, use --force)).

### step 2/3: use
To start using Math_AI, use npm test/start and start asking.<br>
NOTES:<br>
    1. If the result of the question is "undefined", it is because the type of question asked has not yet been implemented by AI (it could be a figure of speech, a typo, etc.)<br>
    2. respect the order of answers: wait for the AI ​​to respond before typing<br>
    3. alert me in the comments if you hear a bug, and I'll put it in /issues so you can be notified<br>
### step 3/3: share
As mentioned before, create more answers/questions for the JSON file and share it for a better user experience

#### Changes and Improvements possible by the user:
1. Spelling and Grammar Corrections.
2. Clarity of answers.
3. correct translations.
