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
