API supports authentication and authorization features. Access token expiry time is 5 minutes. The refresh token can generate new access tokens indefinetely until is invalidated with the logout endpoint.

Users can perform CRUD operations with posts. User can access only posts is created by the user himself.

API contains endpoints with Tekken video game characters that are accesible without authorization. CRUD operations are available on Tekken characters, including filtering by name and min/max age.

To run the project you will need to connect to MongoDB (with MongoDB Compass for example). The default port is 27017.

You also need to set your environment variable in the .env file:
PORT - port for the server
JWT_ACCESS_TOKEN_SECRET - generate a safe secret key for the access token
JWT_REFRESH_TOKEN_SECRET - generate a safe secret key for the refresh token
JWT_ACCESS_TOKEN_EXPIRE_TIME - set expiration time for access token
MONGO_DB_URL - url with port for MongoDB

Files are served statically from the /images folder in the project root folder. This folder needs to be created manually, because it's in the .gitignore file and will not be posted to the remote repository.
