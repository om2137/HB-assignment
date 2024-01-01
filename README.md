# Weather App - Development Environment Setup

## Overview

This guide provides step-by-step instructions to set up the development environment for the Weather App. The Weather App is designed to retrieve and display weather information based on user input.

## Getting Started

### Step 1: Fork and Clone the Repository

1.  Fork the Weather App repository from [https://github.com/om2137/HB-assignment](https://github.com/om2137/HB-assignment).
    
2.  Clone the forked repository to your local machine:
    
    `git clone https://github.com/your-username/HB-assignment.git` 
    

### Step 2: Install Dependencies

Navigate to the project directory and install the required dependencies using npm:

`cd HB-assignment`

`npm install` 

### Step 3: Create .env File

Create a `.env` file in the root of the project to store environment variables. Add the necessary variables to this file. At a minimum, you'll need API keys for services used in the app.

Example `.env` file:

envCopy code

`REACT_APP_API_KEY=your_openweathermap_api_key`

`REACT_APP_API_KEYG=your_google_maps_api_key` 

Replace `your_openweathermap_api_key` and `your_google_maps_api_key` with your actual API keys.

### Step 4: Run the Application

Once you've installed the dependencies and set up the `.env` file, you can start the development server:

`npm start` 

This command will launch the Weather App in development mode. Open your browser and visit http://localhost:3000 to see the app in action.
