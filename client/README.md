# Fast Track React app template with TypeScript & Redux 
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Installation
You should use either `npm` or `yarn` but not both. It's recommeded to use `yarn`

This template already comes with all needed packages. In case you want to install manually, check the dependencies in `package.json` file. To install, run:
```
yarn install
```

## Features
* Redux
* Redux-thunk
* Redux-saga
* React-router
* Prettier
* ESLint
* Husky & lint-staged

The template comes with ready-made code for a very simple working demo (products list). To play around with it, run:
```
yarn start
```

## Modify or add new features
Follow the file/folder structure as explained below to make necessary changes. For Redux, most of the time, you can copy existing files, modify something in there to make a new feature.

## Folder structure
* `src/components`: React components. For each component, it's better to put it in a separate folder. For example:
  ```
  src/components/Button/index.tsx
  src/components/Button/Button.scss
  src/components/Button/Button.stories.tsx
  src/components/Button/Button.test.tsx
  ```

* `src/hooks`: Custom hooks. For example:
  ```
  src/hooks/useCountries.ts
  src/hooks/useUser.ts
  ```

* `src/redux`: Everything (such as actions, reducers, sagas etc) related to Redux
  * `src/redux/actions`: For Redux actions
  * `src/redux/reducers`: For Redux reducers
  * `src/redux/sagas`: For Redux sagas
  * `src/redux/store.ts`: The Redux store

  If there are multiple un-related features, split action/reducer/saga into different files. For example:
  ```
  src/redux/actions/product.ts
  src/redux/actions/order.ts
  src/redux/actions/ui.ts
  ```
  ```
  src/redux/reducers/product.ts
  src/redux/reducers/order.ts
  src/redux/actions/ui.ts
  ```
  ```
  src/redux/sagas/product.ts
  src/redux/sagas/order.ts
  src/redux/sagas/ui.ts
  ```

* `src/pages`: Pages (or views) when using [React router](https://reacttraining.com/react-router/web/guides/quick-start). For example:
  ```
  src/pages/Home.tsx
  src/pages/Product.tsx
  ```
  If there are more files than just page's `*.tsx`, a folder structure can be used. For example:
  ```
  src/pages/Home/index.tsx
  src/pages/Home/Home.scss
  ```

* `src/types.ts`: TypeScript's type definitions. For small apps, you can put definitions of all types, interfaces etc and even Redux's actions, action creators, states here.

* `src/Routes.tsx`: Defines all the React router routes to different pages.

This template is suitable for rather small apps. For bigger apps, a better & more organized way is to split the folder structure into features, something like:
  ```
  sr/feature1
  --components
  --redux
  ----action.ts
  ----reducer.ts
  ----saga.ts

  src/feature2
  --components
  --redux
  ----action.ts
  ----reducer.ts
  ----saga.ts

  src/redux
  --action.ts
  --reducer.ts
  --saga.ts
  --store.ts
  ```
