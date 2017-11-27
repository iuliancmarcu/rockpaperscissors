# Testing and running
## Testing
```
npm install
npm test -- --coverage
```

## Running
```
npm install
npm run start-prod
```
Now you can go to http://localhost:3000 to play

# Technology Stack
The project is built using React, Typescript and Webpack.

The pair of React and Typescript, together with unit and UI testing is perfect to create a high quality, maintainable solution:
* **React** is a component based Javascript library which makes creating reusable UI components an easy task and ensures that your application is broken into smaller, more maintainable pieces.
* **Typescipt** is a superset of Javascript that adds support for types. This feature makes Javascript less error-prone, more readable and easier to debug. From personal experience, using Typescript reduces to almost zero the bugs caused by unexpected `undefined`s or incorrect inputs.
* **Unit and UI tests** were written using `jest`, Facebook's own testing framework for React applications. Testing UI components, aswell as unit testing util functions is a great way to find and fix potential bugs even before pushing your code to a VCS, greatly reducing the number of bugs that go into production.

# Problem approach
The way I approached the game logic was to have the `PlayOption` enum, containing all the options that the player and computer can choose from. After that, the configurations found in `options.ts` were added to describe what options are losing when played versus each option and also th have some UI info to display (like name, symbol and a key that can be pressed to select the option).

Just so that the game is not purely random, I've added the countdown feature that shows the current computer selected option, wich changes slower as countdown reaches 0.  

# Further improvements
1. Adding **Redux**. When I started the project, the initial plan didn't involve components that would need to be dynamically updated based on other components actions. During the late stage, I decided to add the stats info in the app (`Info` component) that would display some values from `localStorage`. The values are updated when a game ends by `Play` component and there is no *easy* or *standard* way to notify another component about the change in pure React. The solution was to add `wolfy87-eventemitter` npm module and have a global event emitter with which components would register and emit events to let other components about updates.
2. While building the main game logic, I kept in mind that we might want to make the game more complex, for example create [RPS 25](http://www.umop.com/rps25.htm). That would be easy as the only changes needed would be adding the new play options to the `PlayOption` enum and adding the configuration for each one in `options.ts` file.
3. Given more time, I would also increase the test coverage to be at least 80% for all files, so that we can ensure an even more stable application.
