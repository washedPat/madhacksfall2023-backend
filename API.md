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
{
    "message": "OK"
}

On Error 
{
    "message": "Error registering user"
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
{
    "message": "Error logging in user"
}
```
