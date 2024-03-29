
<h1><Project Name>API for a note taking app</h1>

<p>
  This project implements a RESTful API for managing notes, built with Node.js and NestJS. It utilizes PostgreSQL as the primary database, Elasticsearch for search and indexing, Redis for rate limiting, and Docker for containerization.
</p>

<h2>Technologies Used</h2>
<ul>
  <li><strong>NestJS</strong>: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.</li>
  <li><strong>PostgreSQL</strong>: A powerful, open-source relational database system.</li>
  <li><strong>Elasticsearch</strong>: A distributed, RESTful search and analytics engine for text-based search and indexing.</li>
  <li><strong>Redis</strong>: An in-memory data structure store (used for rate limiting in this project).</li>
  <li><strong>Docker</strong>: A containerization platform for packaging applications and their dependencies.</li>
</ul>

<h2>Prerequisites</h2>
<p>Please make sure that port 3001 is free on your computer</p>
<p>
  Make sure you have the following installed:
</p>
<ul>
  <li>Docker and Docker Compose</li>
</ul>

<h2>Getting Started</h2>
<ol>
  <li><strong>Running with Docker Compose</strong><br>
    <p>Run the following command from the root of the project.</p>
    <code>docker-compose up</code>
    <p>This command will spin up containers for Node, PostgreSQL, Elasticsearch, and Redis using the configurations defined in the <code>docker-compose.yml</code> file and start the server. This <strong>may take a while</strong> since it has to pull all the images and build all the containers. please stop the containers and run the command again in case if the application is not working on the first attempt.</p>
    <p>Once application runs successfully, the server will be available on PORT 3001</p>
  </li>
</ol>


<h2>Swagger Documentation</h2>
<p>
  The Swagger documentation for this API can be accessed by navigating to <code>http://localhost:3001/api/docs</code> from the broser when the server is running locally.
</p>

<h2>API Endpoints</h2>

  <summary>Authentication Endpoints</summary>
  <ul>
    <li><strong>POST /api/auth/signup</strong>: Create a new user account with name, email and password  and receive an access token.</li>
    <li><strong>POST /api/auth/login</strong>: Log in to an existing user account with <strong>email and password</strong> and receive an <strong>access token</strong>.</li>
  </ul>

  <summary>Note Endpoints (require authentication)</summary>
  <ul>
    <li><strong>GET /api/notes</strong>: Get a list of all notes for the authenticated user with <strong>pagination</strong>.</li>
    <li><strong>GET /api/notes/:id</strong>: Get a note by ID for the authenticated user.</li>
    <li><strong>POST /api/notes</strong>: Create a new note for the authenticated user.</li>
    <li><strong>PUT /api/notes/:id</strong>: Update an existing note by ID for the authenticated user.</li>
    <li><strong>DELETE /api/notes/:id</strong>: Delete a note by ID for the authenticated user.</li>
    <li><strong>POST /api/notes/:id/share/:userId</strong>: Share a note with another user for the authenticated user.</li>
    <li><strong>GET /api/notes/search?q=:query</strong>: Search for notes based on keywords for the authenticated user with pagination.</li>
    <li><strong>GET /api/notes/shared</strong>: Get all the notes shared with the current user by other users with pagination.</li>
  </ul>

<h3>Rate Limiting</h3>

- Each end point has a rate limit of <strong>3 requests per 5 seconds</strong>

<h2>Bearer Token for Authenticated Routes</h2>
<p>
  To access authenticated routes, a Bearer token must be included in the request header. After successfully logging in, you will receive an access token.
</p>
<p>
  Include the received access token in the Authorization header of your requests as follows:
</p>
<pre>
<code>
  Authorization: Bearer &lt;your_access_token_here&gt;
</code>
</pre>
<p>
  Replace <code>&lt;your_access_token_here&gt;</code> with the actual access token received upon login.
</p>


<h2>TO DO Items</h2>

- Write tests for the app

<h2>Contributors</h2>

- Author - Sudheesh Ajayakumar
- LinkedIn - [https://www.linkedin.com/in/sudheesh-ajayakumar/](https://www.linkedin.com/in/sudheesh-ajayakumar/)