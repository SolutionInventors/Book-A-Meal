# Hungry? Make an order

--

This project is built to help caterers respond to orders made by customers online. 
It is built to solve the problems associated with making orders for a meal. 	
## Project Name
    Book-A-Meal
[![Build Status](https://travis-ci.org/SolutionInventors/Book-A-Meal.svg?branch=ft-use-real-data-157387890)](https://travis-ci.org/SolutionInventors/Book-A-Meal)

[![Maintainability](https://api.codeclimate.com/v1/badges/eb7f6eeae96b5b03c530/maintainability)](https://codeclimate.com/github/SolutionInventors/Book-A-Meal/maintainability)
   
[![Test Coverage](https://api.codeclimate.com/v1/badges/eb7f6eeae96b5b03c530/test_coverage)](https://codeclimate.com/github/SolutionInventors/Book-A-Meal/test_coverage)

[![Coverage Status](https://coveralls.io/repos/github/SolutionInventors/Book-A-Meal/badge.svg?branch=develop)](https://coveralls.io/github/SolutionInventors/Book-A-Meal?branch=develop)

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


## API END POINTS

### Meal routes
#### Retrieve meals with GET api/v1/meals

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

#### Retrieve meal by id with GET api/v1/meals/:id
> sample query
   GET api/v1/meals/c5fc2751-321f-4584-9cf8-c5fbe5cacf24

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


### Create new meals with POST api/v1/meals
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
 
 ### Delete meals with DELETE api/v1/meals/:id
 > sample request DELETE /meals/c5fc2751-321f-4584-9cf8-c5fbe5cacf24

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


### Update meals with PUT api/v1/meals/:id
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
### create menu of today via request  POST api/v1/menu
> sample request body 

    {
        "mealsIdArr": [ 
            f514a0f6-76ad-486e-9f8e-8b09e2faba9e, 
            07b54b12-f2fb-445d-a4f9-d9fa30dd5152
        ]
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
                "id": "f4e83016-4f16-4efa-a76d-7ce94fe08f73"
            }
        ],
        "date": "Fri May 04 2018",
        "id": "31a7690d-4bb0-489d-9ec6-475c84c6b1bd"
    }
}

NB: The function filters any id that does not exist in the request. 
    If no mealId specified in the request exists then this request would fail

NB: This request would also fail if the menu of the day has already been created


### get today menu via  GET api/v1/menu

{
    "success": true,
    "menu": {
        "menu": [
            {
                "name": "Rice0",
                "amount": 2000,
                "image": "img.jpg",
                "id": "f4e83016-4f16-4efa-a76d-7ce94fe08f73"
            }
        ],
        "date": "Fri May 04 2018",
        "id": "31a7690d-4bb0-489d-9ec6-475c84c6b1bd"
    }
}

### update today menu via  PUT api/v1/menu

> sample request body 

    {
        mealsIdArr:[
            fc0b226d-f7ac-4ec9-8385-f54ac3ad7ce2,
            f4e83016-4f16-4efa-a76d-7ce94fe08f7
            ]
    }
> sample response 

    {
        "success": true,
        "createdObj": {
            "meals": [
                {
                    "name": "Rice3",
                    "amount": 2003,
                    "image": "img.jpg",
                    "id": "fc0b226d-f7ac-4ec9-8385-f54ac3ad7ce2"
                }
            ],
            "date": "Fri May 04 2018"
        }
    }

## Order routes
### get all orders via GET api/v1/orders
> sample response 

        {
            "success": true,
            "orders": [
                {
                    "meals": [
                        {
                            "name": "Rice3",
                            "amount": 2003,
                            "image": "img.jpg",
                            "id": "b5d6e580-85b6-4695-bb13-01e9f83ead00"
                        }
                    ],
                    "date": "Fri May 04 2018",
                    "id": "614457c0-6fb8-4d9e-b5de-a7f9ab88cfe1"
                }
            ]
        }

### make an order via POST api/v1/orders/

> sample request body 

        {
            mealsIdArr:[
                54ab1c7d-02f4-43ca-8827-b1f263dc1de4,
                b5d6e580-85b6-4695-bb13-01e9f83ead00
            ]
            customerId:4e490aba-3a66-4f34-b07f-0f9e95c070cb
        }

> sample response

    {
        "success": true,
        "orderObj": {
            "meals": [
                {
                    "name": "Rice3",
                    "amount": 2003,
                    "image": "img.jpg",
                    "id": "b5d6e580-85b6-4695-bb13-01e9f83ead00"
                }
            ],
            "date": "Fri May 04 2018",
            "id": "614457c0-6fb8-4d9e-b5de-a7f9ab88cfe1"
        }
    }


### Update an order via PUT api/v1/orders
> sample request body

{
    "mealsIdArr" : [
        "b3b144e6-ccc6-44e2-bb90-47e4dab32f31", 
        "93c0ec40-8803-4f68-8ce4-8d49f3a9af3a",
    ],
    "orderId": "70286b5a-4f0b-4cfe-b312-057febc8b562"

}

>sample request response

{
    "succcess": true,
    "createdObj": {
        "meals": [
            {
                "name": "Rice11",
                "amount": 2011,
                "image": "img.jpg",
                "id": "b3b144e6-ccc6-44e2-bb90-47e4dab32f31"
            }
        ],
        "date": "Sun May 06 2018",
        "id": "70286b5a-4f0b-4cfe-b312-057febc8b562"
    }
}