# Geo RENT
 project-react

Single page application - geodesy tools for rent

## Navigation bar
    - different kind of it is available for every component

### For all users
    - Home page
    - Dropdown menu with tools selected by category and all tools
    - Register
    - Login
    - About

### For loged in users:
    - Add tool
    - My tools
    - My rents
    - Logout
    - Loged in user's email


## Home page    
    - link to catalog page    


## Guest access:
    - register page - enter email, password, repeat password
    - login page - enter email and password
    - details page - with partial information


## Authenticated user access:
- add new tool for rent page
- has two profile pages:
    - his own tools page
    - tools that he rent page
- logout page


## Catalog page
    - array with all tools with partial data about each Tool


## Details page includes:

### Details page for gusts
Every single tool's object with properties:   
    - brand
    - category
    - image
    - description
    - price for monthly rent 
    (if category is "drones" price is for week)
    - back to catalog button

### Details page for loged in user
Every single tool's object with properties:   
    - brand
    - category
    - image
    - description
    - price for monthly rent 
    (if category is "drones" price is for week)
     - relation to owner's email
    - rent button
    - back to catalog button

### Details page for tool's owner
Every single tool's object with properties:
    - brand
    - category
    - image
    - description
    - price for monthly rent 
    (if category is "drones" price is for week)
    - relation to owner's email
    - edit tool button
    - delete tool button
    - back to catalog button
    

## About page
    - contract details
    - agency contacts