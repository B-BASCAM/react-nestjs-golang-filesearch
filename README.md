<h1 align="center">
  <br>
  <img src="assets/img/searchicon.png" alt="" width="250"></a>
  <br>
  GOFIND
  <br>
</h1>


<h4 align="center"> A simple file search system. It searchs the given words, in the file names through the given directory and subdirectories. </h4>

<p align="center">
<a href=""> <img src="https://img.shields.io/badge/react-17.0.1-brightgreen"> </a>
<a href=""> <img src="https://img.shields.io/badge/redux--observable-2.0.0-yellowgreen"> </a>
<a href=""> <img src="https://img.shields.io/badge/rxjs-7.5.7-yellowgreen"> </a>
  <a href=""> <img src="https://img.shields.io/badge/nestjs-9.0.0-brightgreen"> </a>
  <a href=""><img src="https://img.shields.io/badge/redis-io-red"></a>
  <a href=""><img src="https://img.shields.io/badge/mongo-DB-green"></a>
  <a href=""><img src="https://img.shields.io/badge/golang-1.19-brightgreen"></a>
</p>


<p align="center">
  <a href="#work-flow">Work Flow</a> •
  <a href="#how-to-use">How To Use</a> • 
  <a href="#docker">Docker</a> 
</p>

<br>
  <img src="assets/img/workflow.png" alt="" width="1000"></a>
<br>



## Work Flow
**(**Predefine)**
Search directory and the count of goroutines that will work simultaneously must be decided ( [How To Use](#how-to-use) Step-5) before the GoApp start to work.

- User creates a task by making a POST request to NestJSApp.
- Command Handler adds requestedFileName to the MongoDB's filesearchtasks collection and gets inserted id.
- Event Handler adds requestedFileName and inserted id to Redis Queue.
- Inserted id is returned to user as server response.
- On start, GoApp firstly walks through the search directory and all subdirectories/files (except non permissioned ones) to decide
  percentage increment rate. **This operation may take time according to total count of files and directories.**
- GoApp listens Redis Queue and puts the data to a buffered go channel. Buffered channel's capacity is twice of total goroutines count.
- When percentage increment rate is determined, N goroutines start to listen buffered channel.
- Goroutines take the task from channel, walk through the paths/files and update/insert mongoDB collections calling NestJS service methods simultaneously. They never block each other.

<br>
  <img src="assets/img/dbschema.png" alt="" width="500"></a>
<br>

- Whenever a goroutine finishes its work, it again starts to listen the buffered channel, this continues as a loop through the main goroutines life time.
- Multiple search requests are processed simultaneously.
- User can track the flow by making GET requests to NestjsApp with a task id (id that was sent as the POST operation's response) and a page number. 
  For pagination and performance issues, max up to 50 results are shown per request. Also a custom cache manager is used for GET requests.
  
  
  
## How To Use

To clone and run this application, you'll need [Docker Desktop](https://www.docker.com/products/docker-desktop/), [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) and [Golang](https://go.dev/dl/) installed on your computer. From your command line:

```bash
# 1) Clone this repository
$ git clone https://github.com/CaganPamir/nestjs-golang-filesearch.git

# 2) Go into the repository
$ cd nestjs-golang-filesearch

# 3) Run Redis and MongoDB                       (PS ....nestjs-golang-filesearch>)
$ docker-compose -f docker-compose.yml up -d  

# 4) Install dependencies for GoApp              (PS ....nestjs-golang-filesearch>)
$ go mod download

# 5) Open config.json                            (PS ....nestjs-golang-filesearch\golang-app\bin>)     
# Set the search directory (SEARCH_ROOTPATH) and count of goroutines that will work simultaneously (GOROUTINE_COUNT)

# 6) Build the GoApp                             (PS ....nestjs-golang-filesearch>)
$ go build -o ./golang-app/bin/ ./golang-app/cmd/filesearch-worker/.

# 7) Run GoApp                                   (PS ....nestjs-golang-filesearch>)
# When goroutines start to work, "GOROUTINES ARE RUNNING" message will be on the log file.   (PS ....nestjs-golang-filesearch\golang-app\bin\fileworker.log>)
$ ./golang-app/bin/filesearch-worker 

# 8) Open New Terminal
# Go into the nest project                    (PS ....nestjs-golang-filesearch>)
$ cd nestjs-server 

# 9) Install dependencies                        (PS ....nestjs-golang-filesearch\nestjs-server>)
$ npm install -g  @nestjs/cli
$ npm install 

# 10) Run NestJSApp                                (PS ....nestjs-golang-filesearch\nestjs-server>)
$ npm run start:dev

# 11) Open New Terminal
# Go into the react project                    (PS ....nestjs-golang-filesearch>)
$ cd react-app

# 12) Install dependencies                        (PS ....nestjs-golang-filesearch\react-app>)
$ npm install --force

# 13) Run react-app                                (PS ....nestjs-golang-filesearch\react-app>)
$ npm start
```

> **Note**
- You can also create a task with [Swagger](http://localhost:3000/api)

## Docker

GOFIND is very easy to install and deploy in a Docker container:

```bash
# Run Redis and MongoDB                       (PS ....nestjs-golang-filesearch>)
# after this command mongo-network will be created
$ docker-compose -f docker-compose.yml up -d  

# Build GoApp  image                          (PS ....nestjs-golang-filesearch>)
$ docker build  -t go-dock:version_1 .  

# Run GoApp image as a container                 
$ docker run -d -p 5000:5000 --net mongo-network --name mygo go-dock:version_1 

# Build NestJSApp image                       (PS ....nestjs-golang-filesearch\nestjs-server>)
$ docker build -t myfirstnestjsapp:version_1 .

# Run NestJSApp image as a container                 
$ docker run -d -p 3000:3000 --net mongo-network --name mynest myfirstnestjsapp:version_1 

```
