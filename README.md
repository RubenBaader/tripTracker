# TripTracker
A minimal web app to track trips from point A to point B for tax purposes.

## Setup
Clone the repo to your machine, then follow the instructions:

### Server setup
The server functions depend on a local sql database which needs to be created manually. The following steps assume a Windows machine using SSMS and Visual Studio
1. Once you have cloned the repo, open the solution and locate the default connection string in appsettings.Development.json at the root of the TripTracker.Server folder.
2. Open SSMS and create a new database. Ensure the DB name matches the one found in the connection string (default TripTracker).
3. The default server is localhost - if your setup differs, remember to adjust for your needs at this point.
4. In Visual Studio, test the DB connection by opening the package manager console and running 'Update-Database'.
5. Run the build.

### Client setup
The client is built with Vite, Node, and NPM and relies on the Google Routes api to function - be sure to have Node and NPM installed before completing these steps.
1. Navigate to tripTracker/triptracker.client in your terminal.
2. Copy the contents of /.env.example into a new .env file.
3. In the .env file, locate and follow the hyperlink to Google Cloud Console to find or generate a new Maps Platform API Key.
4. Paste the key into the VITE_MAPS_API_KEY variable.
5. In the terminal, 'run npm install'.
6. In the terminal, 'run npm run dev'. If the client does not automatically open in your browser, the terminal should show a localhost clickable link.