# AutoConnect

AutoConnect App is a React application that allows users to view a list of cars and users. After logged in a user can create and edit users, add cars to their favorites, create and edit cars, set cars to his/her favorite and delete cars.

## Directory Structure

The AutoConnect App follows a logical directory structure that promotes organization and separation of concerns. Below is an overview of the main directories and their purposes:

* **src**: This directory contains the source code of the Podcaster app.
  * **components**: Contains reusable UI components used throughout the app.
    * **common**: Contains layout components that can be reused throughout the app.
    * **utils**: Contains components with functionality that can be reused throughout the app.
  * **pages**: Contains the main views or pages of the app.
  * **contexts**: Holds the Context API related files, including context providers and consumers.
  * **styles**: Contains global stylesheets for styling the app.
  * **utils**: Holds utility functions, helper files or constants used throughout the app.
  * **data**: Holds data in JSON format to serve the app.
  * **data**: Contains a script that allow to mutate the data.


## Architecture

The Podcaster app follows a component-based architecture using the following technologies:

* React: A JavaScript library for building user interfaces.
* Context API: A built-in feature in React for managing global state and data sharing between components.
* useReducer: A React hook for managing complex state logic

The app's architecture promotes modularity, reusability, and maintainability of the codebase. Components are structured to handle specific functionality, and the global state management provided by the Context API and useReducer and useState ensures efficient management of the app's state.

## Installation

Use the package manager to install the packages.

```bash
cd cars_app
npm install
```

## Usage

To build the package in development mode, use the following command:

```
npm run dev
```

## Script

To use the script to add data to the json, use the following commands:

```
cd /frontend/src/script
```

* Add new user
```
python3 script.py --add 
```

* Delete user with id [id]
```
python3 script.py --delete [id] 
```

* Add car with id [car_id] to user with id [user_id]
```
python3 script.py --add_car [car_id] [user_id]
```

* Remove car with id [car_id] from user with id [user_id]
```
python3 script.py --delete_car [car_id] [user_id]
```

