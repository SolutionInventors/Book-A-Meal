# Hungry? Make an order

--

This project is built to help caterers respond to orders made by customers online. 
It is built to solve the problems associated with making orders for a meal. 	
## Project Name
    Book-A-Meal

## Admin actions
    - Set Meal of the day
    - Invite new admin via mail
    - View all the orders made for a particular day
    - View history of orders made
    - View total amount made for a particular day

## Customer actions
    - Make an order from today's menu
    - Modify previously made order
    - Reset password
    - Sign up to the system
    - View history of previously made orders

## Badges

    [![Maintainability](https://api.codeclimate.com/v1/badges/eb7f6eeae96b5b03c530/maintainability)](https://codeclimate.com/github/SolutionInventors/Book-A-Meal/maintainability)
   
   [![Test Coverage](https://api.codeclimate.com/v1/badges/eb7f6eeae96b5b03c530/test_coverage)](https://codeclimate.com/github/SolutionInventors/Book-A-Meal/test_coverage)

    [![Coverage Status](https://coveralls.io/repos/github/SolutionInventors/Book-A-Meal/badge.svg?branch=develop)](https://coveralls.io/github/SolutionInventors/Book-A-Meal?branch=develop)


## API END POINTS

### /meals/
#### Retrieve meals with GET /meals

> sample response
    {
    "succes": true,
    "meals": [
        {
            "name": "Rice0",
            "amount": 2000,
            "image": "img.jpg",
            "id": "1b807c77-d1fe-4e5e-abd0-3017f53de78d"
        },
        {
            "name": "Rice1",
            "amount": 2001,
            "image": "img.jpg",
            "id": "c5fc2751-321f-4584-9cf8-c5fbe5cacf24"
        }
    }

#### Retrieve meal by id with GET /meals/:id
> sample query
   GET /meals/c5fc2751-321f-4584-9cf8-c5fbe5cacf24

> sample response
    {
        "success":true, 
        "meal":{
            "name": "Rice1",
            "amount": 2001,
            "image": "img.jpg",
            "id": "c5fc2751-321f-4584-9cf8-c5fbe5cacf24"
        } 
    }

> NB: If the meal id does not exists, the API returns error number: 404 
    
    {
        "success": false,
        "message": "The inputed id does not exist"
    }


### Create new meals with POST /meals
> sample request body 
    {
        "name": "Beans", 
        "amount":  2220, 
        "image": "rice.jpg"
    }

> sample response
    {
        "success": true,
        "message": "Meal was created successfully",
        "createdObj": {
            "name": "Beans", 
            "amount":  2220, 
            "image": "rice.jpg", 
            "id": c5fc2751-323-45841112-9c3f8-c5fbe5cacf2,
        }
    }

> NB: Any data is missing in the request body the API returns a 400
    sample response
        {
            "success": false,
            "message": "Some required data is missing in the body"
        }
 
 ### Delete meals with DELETE /meals/:id
 > sample request
   DELETE /meals/c5fc2751-321f-4584-9cf8-c5fbe5cacf24

> sample response
    {
        "success": true,
        "deletedObj": {
            "name": "Rice0",
            "amount": 2000,
            "image": "img.jpg",
            "id": "ba4c5f6d-ee7d-4562-a868-23990794c4f3"
        }
    }

   NB: meal can only be deleted if the specified ID is found in the system


### Update meals with PUT /meals/:id
sample request: /meals/a5dfccce-09ae-4e51-b990-74ee00c63946

> sample response:
        {
            "success": true,
            "createdObj": {
                "name": "Rice",
                "amount": "2000",
                "image": "chicken.jpg",
                "id": "a5dfccce-09ae-4e51-b990-74ee00c63946"
            }
        }


## /menu
### create menu of today via request  POST /menu
> sample request body 
    {
        "mealsIdArr": [ 
            f514a0f6-76ad-486e-9f8e-8b09e2faba9e, 
            07b54b12-f2fb-445d-a4f9-d9fa30dd5152
        }
    }

> sample response 

{
    "success": true,
    "createdObj": {
        "menu": [
            {
                "name": "Rice0",
                "amount": 2000,
                "image": "img.jpg",
                "id": "f514a0f6-76ad-486e-9f8e-8b09e2faba9e"
            }
        ],
        "date": "2018-05-04T09:19:08.114Z",
        "id": "f3677596-3a3e-48ed-b022-9f054f57b0d1"
    }
}

NB: The function filters any id that does not exist in the request. 
    If no mealId specified in the request exists then this request would fail

NB: This request would also fail if the menu of the day has already been created

