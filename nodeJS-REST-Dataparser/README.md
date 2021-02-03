#Project description

This NodeJS application  exposes restful endpoints that will parse data (passed in the request body) and return the value back to the client. 
The API has two versions and depending on the version endpoint, the parsing of the data will return a different value back to the client. 
 The length of data must be 25 chars (firstName = 8 chars, lastName = 10 chars, clientID = 7 chars). For example

```
 {
    data: "JOHN0000MICHAEL0009994567"
 }
```



##To build

```
npm install
npm run build
```


##To run in development mode

```
npm run dev
```

##To run in production mode

```
npm start
```


## To test REST API

 - Get All post requests
    http://localhost:5000/api

    ```
      GET http://localhost:5000/api
    ```
    Response:
    ```
    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 112
    ETag: W/"70-ZtlroK7VSyzpoNzSQ6EeaCANGMI"
    Date: Wed, 03 Feb 2021 03:30:58 GMT
    Connection: close

    [
    {
        "data": "JOHN0000MICHAEL0009994567"
    },
    {
        "data": "JOHN0000MICHAEL0009994567"
    },
    {
        "data": "JOHN0000MICHAEL0009994567"
    }
    ]

    ```
 - Example to Post a request to V1 
    ```
    POST http://localhost:5000/api/v1/parse HTTP/1.1 
    Content-Type: application/json
    
        {
            "data": "JOHN0000MICHAEL0009994567"
        }
    ```
    Response:

    ```
    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 95
    ETag: W/"5f-YBItXNjhc76w3cvyOe+4GP+Ic+8"
    Date: Wed, 03 Feb 2021 03:28:13 GMT
    Connection: close

    {
    "statusCode": 200,
    "data": {
        "firstName": "JOHN0000",
        "lastName": "MICHAEL000",
        "clientId": "9994567"
    }
    }
    ```

 - Example to Post a request to V2    
    ```
    POST http://localhost:5000/api/v2/parse HTTP/1.1 
    Content-Type: application/json
    
        {
            "data": "JOHN0000MICHAEL0009994567"
        }
    ```
    Response:
    ```
    HTTP/1.1 200 OK
    X-Powered-By: Express
    Content-Type: application/json; charset=utf-8
    Content-Length: 89
    ETag: W/"59-9z3mw4gpnQpyQDULmc79+/wYaAA"
    Date: Wed, 03 Feb 2021 03:26:11 GMT
    Connection: close

    {
    "statusCode": 200,
    "data": {
        "firstName": "JOHN",
        "lastName": "MICHAEL",
        "clientId": "999-4567"
    }
    }
    ```


 - Example when we Post an invalid data to V2    
    ```
    POST http://localhost:5000/api/v2/parse HTTP/1.1 
    Content-Type: application/json
    
        {
            "data": "abc"
        }
    ```
    Response:
    ```

    {
    "statusCode": 400,
    "data": "Invalid input format. The length of data must be 25 chars (firstName = 8 chars, lastName = 10 chars, clientID = 7 chars)."
    }

    ```
 