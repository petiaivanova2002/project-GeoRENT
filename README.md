# Geo RENT
 project-react

Single page application - geodesy tools for rent

## Navigation bar

# For all users
1.Home page
2.Dropdown menu with tools selected by category and all tools
3.Register
4.Login
# For loged in users:
5.Add tool
6.My tools
7.My rents
8.Logout
9.Loged in user's email


## Authentication
1.Register - enter email, password, repeat password
2.Login - enter email and password
3.Logout

Authenticated user:
- can add new tool for rent 
- has profile with:
    - his own tools 
    - tools that he rent

## Tool
Every single tool is object with properties:
    - brand
    - category
    - image
    - description
    - price for monthly rent 
    (if category is "drones" price is for week)