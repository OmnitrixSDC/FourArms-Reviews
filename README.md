# FourArms-Reviews

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white)
![NGINX](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)

A RESFTUL API Microservice for the Reviews section of the Atelier Project
## Installation
```
$ git clone https://github.com/OmnitrixSDC/FourArms-Reviews.git
$ cd FourArms-Reviews
$ npm install
```

# Update Environment Variables
Edit a copy of the example.env file for your deployment. DB_HOST accepts URL or IP Address. Remembner DB_PORT is a separate variable and **DOES NOT** go at the end of the host address.
```
SERVER_PORT="42000"
DB_USERNAME="postgres"
DB_PASSWORD="postgres"
DB_PORT="5432"
DB_HOST="http://exampledbserver.address"
DB_NAME="reviews"
```

# Start
```
$ npm start
```

## API

### Endpoints
#### -GET /reviews/
Gets reviews for a given Product ID
##### Query Parameters:
| Parameter | Type | Description |
| :---         |     :---:      |          :---: |
| page   | integer     | Selects the page of results to return. Default 1    |
| count     | integer       | Specifies how many results per page.  Default 5      |
| sort     | text       | Changes the sort order of reviews to be based on "newest", "helpful", or "relevant"      |
|product_id |	integer |	Specifies the product for which to retrieve reviews. |

Response: Status 200 OK

#### GET /reviews/meta
Gets aggregated review data (e.g. ratings, recommendations, characteristics) for a given Product ID.
##### Query Parameters:
| Parameter | Type | Description |
| :---         |     :---:      |          :---: |
|product_id |	integer |	Specifies the product for which to retrieve reviews. |


Response: Status 200 OK

#### POST /reviews
Posts a Review

JSON Body Parameters:

| Parameter | Type | Description |
| :---         |     :---:      |          :---: |
|product_id |	integer |	Specifies the product|
|rating 	|int |	Integer |(1-5) |indicating the review rating
summary|	text |	Summary text of the review
body 	|text |	Continued or full text of the review
recommend |	bool | 	Value indicating if the reviewer recommends the product
name |	text |	Username for question asker
email |	text |	Email address for question asker
photos |	[text] |	Array of text urls that link to images to be shown
characteristics |	object |	Object of keys representing characteristic_id and values representing the review value for that characteristic. { "14": 5, "15": 5 //...}

Response: 201 CREATED


#### PUT /reviews/:review_id/helpful
Updates review to show it was found helpful by reader

Parameters:
| Parameter | Type | Description |
| :---         |     :---:      |          :---: |
review_id |  integer |	Required ID of the review to update|

Response Status: 204 NO CONTENT

#### PUT /reviews/:review_id/report
Flags review for moderator inspection

Parameters:
| Parameter | Type | Description |
| :---         |     :---:      |          :---: |
review_id |  integer |	Required ID of the review to update|

Response Status: 204 NO CONTENT

# Deploy with Docker: ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
```
$ docker pull blandschwad/fourarms-server:latest
```

Copy the docker run command, edit the -e options, then paste and execute to deploy. Use optional -d flag to run in background.

```
$ docker run --name fourarms -e SERVER_PORT="42000" -e DB_USERNAME="postgres" -e DB_PASSWORD="postgres" -e  DB_PORT="5432" -e DB_HOST="54.183.250.160" -e DB_NAME="postgres" -p 42000:42000 blandschwad/fourarms-server:latest
```


# Contributors
### Andrew Schwaderer [![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/BlandSchwad)
