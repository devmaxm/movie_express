## Installation

```bash
$ yarn install
```

## Configure .env file

```bash
PORT=server_port

DB_HOST=db_host
DB_PORT=db_port
DB_USER=db_user
DB_PASSWORD=db_pass
DB_NAME=db_name

COOKIE_SECRET=cookie_secret_key

JWT_ACCESS_SECRET=jwt_access_secret_key
JWT_ACCESS_EXPIRES=jwt_access_secret_key_expires
JWT_ACCESS_COOKIE_EXPIRES_IN=jwt_access_cookie_expires

JWT_REFRESH_SECRET=jwt_refresh_secret_key
JWT_REFRESH_EXPIRES=jwt_refresh_secret_key_expires
JWT_REFRESH_COOKIE_EXPIRES_IN=jwt_refresh_cookie_expires

BCRYPT_SALT=bcrypt_salt

# configure for google auth. https://console.cloud.google.com/apis/dashboard
OAUTH_GOOGLE_CLIENT_ID=oauth_google_client_id
OAUTH_GOOGLE_CLIENT_SECRET=oauth_google_client_secret

# used to redirect after google auth
CLIENT_URL=http://localhost:3000/api/auth/set-cookie
```

## RESPONSES DATA

`Auth response`

```
{
    "user": {
        "id": number,
        "fullName": string | null,
        "email": string,
        "googleId": string | null
    },
    "accessToken": string,
    "refreshToken": string
}
```


`Genre response`

```
{
    "status": "success",
    "result": {
        "id": number,
        "name": string,
        "updatedAt": timestamp,
        "createdAt": timestamp
    }
}
```


`Company response`

```
{
    "status": "success",
    "result": {
        "logoPath": string",
        "id": 1,
        "name": string
        "originCountry": string
        "updatedAt": timestamp,
        "createdAt": timestamp
    }
}
```

`Movie response`
```
{
    "id": number,
    "originalTitle": string,
    "title": string,
    "tagline": string,
    "overview": string,
    "posterPath": string,
    "releaseDate": date,
    "runtime": number,
    "status": string,
    "revenue": number,
    "budget": number,
    "votesAverage": float,
    "votesCount": number,
    "imdbId": string | null,
    "originalLanguage": string,
    "spokenLanguage": string,
    "country": string,
    "genres": [{"id": number, "name": string}],
    "productCompanies": ["id": number, "name": string, "logoPath": string, "originCountry": string]
}
```

## Auth
<sub>Auth by jwt. Token could be stored in cookies or auth bearer headers</sub>

## AUTH Endpoints


`REGISTER` POST [/api/auth/register](#/api/auth/register) </br>

`body`

```
{
    "username": string,
    "password": string,
    "passwordConfirm": string,
}
``` 
<sub>Return auth response</sub></br>

</br>`LOGIN` POST [/api/auth/login](#/api/auth/login) </br>

`body`

```
{
    "username": string,
    "password": string
}
```
<sub>Return auth response</sub></br>

</br>`CURRENT USER` GET [/api/auth/me](#/api/auth/me) </br>
<sub>* Auth required. Return current user auth response</sub></br>
`body`

``` 
{
    "username": string,
    "password": string
}
```
<sub>Return auth response</sub></br>

</br>`REFRESH TOKEN` PUT [/api/auth/refresh-token](#/api/auth/refresh-token) </br>
<sub>* In headers or cookies should be refresh token. Return auth response</sub></br>
`body`

```
{
    "username": string,
    "password": string
}
```
<sub>Return auth response</sub></br></br>


## GENRE Endpoints


</br>`CREATE GENRE` POST [/api/genre](#/api/genre) </br>

`body`

```
{
    "name": string
}
```
<sub>Return genre response</sub></br>

</br>`UPDATE GENRE` PUT [/api/genre/{genreId}](#/api/genre/{genreId}) </br>
<sub>Return genre response</sub></br>

</br>`GET GENRE` GET [/api/genre/{genreId}](#/api/genre/{genreId}) </br>
<sub>Return genre response</sub></br>

</br>`DELETE GENRE` DELETE [/api/genre/{genreId}](#/api/genre/{genreId}) </br>

## COMPANIES Endpoints


</br>`CREATE COMPANY` POST [/api/prod-companies](#/api/prod-companies) </br>

`body`

```
{
    "name": string,
    "originCountry": string,
}
```
<sub>Return company response</sub></br>

</br>`UPDATE COMPANY` PUT [/api/prod-companies/{companyId}](#/api/prod-companies/{companyId}) </br>
<sub>Return company response</sub></br>

</br>`GET COMPANY` GET [/api/prod-companies/{companyId}](#/api/prod-companies/{companyId}) </br>
<sub>Return company response</sub></br>

</br>`DELETE COMPANY` DELETE [/api/prod-companies/{companyId}](#/api/prod-companies/{companyId}) </br>


## MOVIES Endpoints


</br>`CREATE MOVIE` POST [/api/movies](#/api/prod-companies) </br>

`body`

```
}
    "id": number,
    "originalTitle": string,
    "title": string,
    "tagline": string,
    "overview": string,
    "posterPath": string,
    "releaseDate": date,
    "runtime": number,
    "status": string,
    "revenue": number,
    "budget": number,
    "votesAverage": float,
    "votesCount": number,
    "imdbId": string | null,
    "originalLanguage": string,
    "spokenLanguage": string,
    "country": string,
    "genreIds": [number],
    "companyIds": [numbers]
}
```
<sub>Return movie response</sub></br>

</br>`UPDATE MOVIE` PUT [/api/movies/{movieId}](#/api/movies/{movieId}) </br>
<sub>Return movie response</sub></br>

</br>`GET MOVIE` GET [/api/movies/{movieId}](#/api/movies/{movieId}) </br>
<sub>Return movie response</sub></br>

</br>`GET ALL MOVIES` GET [/api/movies](#/api/movies) </br>
<sub>Return movie response</sub></br>
`response`
```
{
    "status": "success",
    "result": {
        "count": 1,
        "rows": [
            {
                "id": number,
                "originalTitle": string,
                "title": string,
                "tagline": string,
                "overview": string,
                "posterPath": string,
                "releaseDate": date,
                "runtime": number,
                "status": string,
                "revenue": number,
                "budget": number,
                "votesAverage": float,
                "votesCount": number,
                "imdbId": string | null,
                "originalLanguage": string,
                "spokenLanguage": string,
                "country": string,
                "genres": [{"id": number, "name": string}],
                "productCompanies": ["id": number, "name": string, "logoPath": string, "originCountry": string]
            }
        ]
    }
}
```

</br>`DELETE MOVIE` DELETE [/api/movies/{movieId}](#/api/movies/{movieId}) </br>

