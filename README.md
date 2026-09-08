# Pixabay API Practice Lab

## Overview

This project demonstrates how to work with a real REST API using JavaScript and the Pixabay API.

The application allows users to search Pixabay and display image results returned from the API.

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Pixabay REST API
- Fetch API

## Features

- Pixabay image search
- Search using keywords
- Four practice challenges
- Displays API request information
- Displays returned Pixabay results
- Loading state
- Error handling
- Responsive design
- Links to original Pixabay pages

## Practice Challenges

The application includes the following required searches:

1. Rocket Launch
2. Basketball
3. Forest
4. Road Forest

## API Request

The application sends requests to:

https://pixabay.com/api/

The main parameters used include:

- `key`
- `q`
- `image_type`
- `orientation`
- `safesearch`
- `per_page`

## API Key Setup

The real Pixabay API key is stored in:

`config.js`

Example:

```javascript
const PIXABAY_API_KEY = "YOUR_PIXABAY_API_KEY";