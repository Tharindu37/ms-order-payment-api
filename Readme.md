```
docker pull mongo:latest
docker run -d -p 27017:27017 -v ~/order-payment-api:/data/db --name mongoDB mongo:latest
docker ps
mongo
```
```
show dbs
use table-name
exit
```
```
mongo localhost:2717
```