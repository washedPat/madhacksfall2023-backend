# API Documentation

## Authentication 

Register
```
POST /api/register
{
    "username": string,
    "password": string
}

On Success
Status 200
{
    "message": "OK",
    "data" : {
        "username": string
    }
}

On Error 
Status 400
{
    "message": "Error User already exists"
}
Status 500
{
    "message": "Error while registering user"
}
```

Login
```
POST /api/login
{
    "username": string,
    "password": string
}

On Success
{
    "message": "OK"
}

On Error 
Status 400
{
    "message": "User does not exist, or username or password is incorrect"
}

Status 500
{
    "message": "Error while logging in user"
}
```

## Listings

Create Listing
```
POST /api/createListing
{
    "parkingSize": "Tight",
    "price": 15,
    "title": "a very very tight spot",
    "description": "a very tight spot",
    "photoURL": "https://uploads-ssl.webflow.com/5fb87a8aff41decc058676e1/605d4cedcfa34d1f5f3dfea1_Extra-Wide%20Parking%20Stall.jpg",
    "startDate": "2023-11-11T23:32:57.718Z",
    "endDate": "2023-11-11T23:32:57.718Z",
    "address": {
        "street": "1001 University Ave.",
        "city": "Madison",
        "state": "WI",
        "country": "USA",
        "zip": 53715
    }
}

On Success
Status 200
{
    "message": "OK"
}

On Error
Status 500
{
    "message": "Error while creating listing"
}
```

Query Listing
```
POST /api/queryListing
{
    "maxPrice": 20,
    "city": string,
    "address": string,
    "distance": number,
    "startDate": string,
    "endDate": string,
    "spotType": "Tight" | "Normal" | "Wide"
}

On Success
Status 200
[
    {
        "id": "655012f083df1e20ec650a02",
        "parkingSize": "Normal",
        "price": 5,
        "description": "a nice parking spot",
        "photoURL": "https://api.time.com/wp-content/uploads/2019/10/gettyimages-911240358.jpg",
        "startDate": "2023-11-11T23:32:57.718Z",
        "endDate": "2023-11-11T23:32:57.718Z",
        "location": {
            "lat": 43.073929,
            "long": -89.385239
        },
        "address": {
            "street": "1001 University Ave.",
            "city": "Madison",
            "state": "WI",
            "country": "USA",
            "zip": 53715
        }
    },
    // many of these
    .
    .
    .
    .
    .

]

On Error
Status 500
{
    "message": string
}
```

Get User Listings
```
GET /api/getUserListings?username={username}

On Success
[
    {
        "id": "655012f083df1e20ec650a02",
        "parkingSize": "Normal",
        "price": 5,
        "description": "a nice parking spot",
        "photoURL": "https://api.time.com/wp-content/uploads/2019/10/gettyimages-911240358.jpg",
        "startDate": "2023-11-11T23:32:57.718Z",
        "endDate": "2023-11-11T23:32:57.718Z",
        "location": {
            "lat": 43.073929,
            "long": -89.385239
        },
        "address": {
            "street": "1001 University Ave.",
            "city": "Madison",
            "state": "WI",
            "country": "USA",
            "zip": 53715
        }
    },
    // many of these
    .
    .
    .
    .
]

On Error
Status 400
{
    "message": "Could not find listing because listing could not be found"
}

Status 500
{
    "message": "Error could book listing due to an error",
    "error": string
}
```

Remove Listing
```
POST /api/removeListing
{
    "listingID": string
}

On Success
Status 200
{
    "message": "OK"
}

On Error
Status 400
{
    "message": "Could not find listing to remove"
}

Status 500
{
    "message": "Error while removing listing",
    "error": e
}
```

# Bookings

Book Listing
```
POST /api/bookListing
{
    "listingID": string,
    "username": string
}

On Success 
Status 200
{
    "message": "OK"
}

On Error
Status 500
{
    "message": "Error while retrieving user bookings",
    "error": e
}
```

Get User Bookings
```
GET /api/getUserBookings?username={username}

On Success
Status 200
[
    {
        "id": "655012f083df1e20ec650a02",
        "parkingSize": "Normal",
        "price": 5,
        "description": "a nice parking spot",
        "photoURL": "https://api.time.com/wp-content/uploads/2019/10/gettyimages-911240358.jpg",
        "startDate": "2023-11-11T23:32:57.718Z",
        "endDate": "2023-11-11T23:32:57.718Z",
        "location": {
            "lat": 43.073929,
            "long": -89.385239
        },
        "address": {
            "street": "1001 University Ave.",
            "city": "Madison",
            "state": "WI",
            "country": "USA",
            "zip": 53715
        }
    },
]

On Error
Status 500
{
    "message": "Error while retrieving user bookings",
    "error": e
}
```

Remove Booking
```
POST /api/removeBooking
{
    "bookingID": string
}

On Success
Status 200
{
    "message": "OK"
}

On Error
Status 400
{
    "message": "Could not remove booking because booking could not be found"
}

Status 500
{
			"message": "Error while removing a users booking"
            "error": e
}
```
