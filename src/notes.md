Headers are the metadata of a request.
For authorization developers prefer to use the "req.header.authorization" @header to determine if a user can access the page or not.

<hr>
All database **queries** are always async. We are talking to a disk is asynchronous.
Talking to a **network** is asynchronous.
The **protocol** on which the disk operates are asynchronous.
<hr>

The handler should do only business logic & nothing else.
Write it KISS & DRY

From the handler we always send back data in one form {data: ...actual data that we get from the database}.
