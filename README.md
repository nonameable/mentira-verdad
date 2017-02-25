# Mentira-verdad
A web application that let people choose if what our lovely politicians say on twitter is true or false
# Stack
Frontend: Angular 1

Backend: NodeJS and Express for routing, Twitter API for getting information.

Database: MongoDB

# Execution
In order to run you must have nodejs installed. Clone the project and run a server using `node bot.js`


#Tweet structure:

```
{
	_id: ObjectId,
	publication_date: ISO8601,
  username: string,
  profile_pic: string (valid URL),
	upvotes: int,
  downvotes: int
}
```




# Next steps
