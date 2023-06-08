# URL-SHORTER-API

This is a simple and fast API for creating and retrieving shortened URLs. It is built using Express.js and MongoDB.

## Installation

To install and run this API locally, you will need Node.js and MongoDB installed on your machine.

- Clone this repository: 
```bash
git clone https://github.com/sil-samriddha/url-shorter-api.git
```
- Navigate to the project directory: 
```bash
cd url-shorter-api
```
- Install the dependencies: 
```bash
npm install
```
- Start the server: 
```bash
npm start
```
- Set environment variables : 
```bash
port = "Port"
db_link = "Database Link"
```
- The API will be running on 
```bash
http://127.0.0.1:${process.env.port}/
```

## Usage

The API has four main endpoints:

| API TASK                                                                  | ENDPOINT               |
|---------------------------------------------------------------------------|------------------------|
| Get the Sample frontend                                                   | `GET /`                |
| Create a new short URL from a given long URL                              | `POST /`               |
| Redirect to the original URL associated with the short URL                | `GET /:shortUrl`       |
| Get the statistics for the short URL, such as clicks, creation date, etc. | `GET /:shortUrl/stats` |
| Delete the short URL and its associated data                              | `DELETE /:shortUrl`    |

### SAMPLE FRONTEND
```bash
GET http://127.0.0.1:${process.env.port}/
```


### CREATE NEW SHORTURL 

```bash
POST http://127.0.0.1:${process.env.port}/
```

This endpoint expects a JSON body with the following parameters:
| Parameter | Task                                 |          |
|-----------|--------------------------------------|----------|
| `longUrl` | The long URL to be shortened         | required |
| `alias`   | The custom alias for the short URL   | optional |

```json
{
    "longUrl": "https://github.com/",
    "alias" : "github"
}
```


Example response:

```json
{
    "success": true,
    "short_url": "http://localhost:6640/github",
    "alias": "github",
    "long_url": "https://github.com/"
}
```

If the `alias` parameter is not provided :

```json
{
    "longUrl": "https://youtube.com/"
}
```

```json
{
    "success": true,
    "short_url": "http://localhost:6640/scejm",
    "alias": "scejm",
    "long_url": "https://youtube.com"
}
```

For every different type of errors different error responses will be returned.

### Redirect to the original URL

```bash
GET http://127.0.0.1:${process.env.port}/:shorturl
```

This endpoint expects a path parameter with the short URL.

Example request:

```bash
GET http://127.0.0.1:${process.env.port}/github
GET http://127.0.0.1:${process.env.port}/scejm
```

Example response:

The server will redirect to the original URL associated with the short URL, in this case:

```bash
https://github.com/
https://youtube.com/
```

If the short URL does not exist, an error response will be returned.

### Get the statistics
```bash
GET http://127.0.0.1:${process.env.port}/:shorturl/stats
```

This endpoint expects a path parameter with the short URL.

Example request:

```bash
GET http://127.0.0.1:${process.env.port}/scejm/stats
```

Example response:
```bash
{
    "success": true,
    "long_url": "https://youtube.com",
    "short_url": "http://localhost:6640/scejm",
    "alias": "scejm",
    "clicks": 26,
    "created_at": "2023-06-07T18:12:27.361Z"
}
```

If the short URL does not exist, an error response will be returned.

### DELETE /api/:shortUrl

This endpoint expects a path parameter with the short URL.

Example request:

```bash
DELETE http://127.0.0.1:${process.env.port}/scejm
```

Example response:

```json
{
    "status": "deleted",
    "message": "Short URL deleted successfully"
}
```

If the short URL does not exist, an error response will be returned.
