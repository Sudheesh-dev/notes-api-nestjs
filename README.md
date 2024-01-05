
<!-- Title -->
<h1><Project Name>API for a note taking app</h1>

<!-- Description -->
<p>
  This project implements a RESTful API for managing notes, built with Node.js and NestJS. It utilizes PostgreSQL as the primary database, Elasticsearch for search and indexing, Redis for rate limiting, and Docker for containerization.
</p>

<!-- Technology Stack -->
<h2>Technologies Used</h2>
<ul>
  <li><strong>NestJS</strong>: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.</li>
  <li><strong>PostgreSQL</strong>: A powerful, open-source relational database system.</li>
  <li><strong>Elasticsearch</strong>: A distributed, RESTful search and analytics engine for text-based search and indexing.</li>
  <li><strong>Redis</strong>: An in-memory data structure store used for rate limiting.</li>
  <li><strong>Docker</strong>: A containerization platform for packaging applications and their dependencies.</li>
</ul>

<!-- Prerequisites -->
<h2>Prerequisites</h2>
<p>
  Make sure you have the following installed:
</p>
<ul>
  <li>Docker and Docker Compose</li>
</ul>

<!-- Getting Started -->
<h2>Getting Started</h2>
<ol>
  <li><strong>Running with Docker Compose</strong><br>
    <code>docker-compose up</code>
    <p>This command will spin up containers for Node, PostgreSQL, Elasticsearch, and Redis using the configurations defined in the <code>docker-compose.yml</code> file.</p>
  </li>
  <li><strong>Running Tests</strong><br>
    <p>Not Implemnted, in to do List</p>
  </li>
</ol>

<h2>API Endpoints</h2>

<details>
  <summary>Authentication Endpoints</summary>
  <ul>
    <li><strong>POST /api/auth/signup</strong>: Create a new user account.</li>
    <li><strong>POST /api/auth/login</strong>: Log in to an existing user account and receive an access token.</li>
  </ul>
</details>

<details>
  <summary>Note Endpoints</summary>
  <ul>
    <li><strong>GET /api/notes</strong>: Get a list of all notes for the authenticated user.</li>
    <li><strong>GET /api/notes/:id</strong>: Get a note by ID for the authenticated user.</li>
    <li><strong>POST /api/notes</strong>: Create a new note for the authenticated user.</li>
    <li><strong>PUT /api/notes/:id</strong>: Update an existing note by ID for the authenticated user.</li>
    <li><strong>DELETE /api/notes/:id</strong>: Delete a note by ID for the authenticated user.</li>
    <li><strong>POST /api/notes/:id/share/:noteId</strong>: Share a note with another user for the authenticated user.</li>
    <li><strong>GET /api/notes/search?q=:query</strong>: Search for notes based on keywords for the authenticated user.</li>
    <li><strong>GET /api/notes/shared</strong>: Get all the notes shared with the current user by other users.</li>
  </ul>
</details>

<h2>Contributors</h2>

- Author - [Sudheesh](https://kamilmysliwiec.com)
- LinkedIn - [https://www.linkedin.com/in/sudheesh-ajayakumar/](https://www.linkedin.com/in/sudheesh-ajayakumar/)

<!-- List project contributors here -->
