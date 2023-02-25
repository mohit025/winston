const express=require('express');
const { createLogger } = require('winston');
const app=express();

const {customerLogger}=require('./logger');


// logger.customerLogger

const movies = [
    {id: 101, name: "Fight Club", year: 1999, rating: 8.1},
    {id: 102, name: "Inception", year: 2010, rating: 8.7},
    {id: 103, name: "The Dark Knight", year: 2008, rating: 9},
    {id: 104, name: "12 Angry Men", year: 1957, rating: 8.9}
 ];

 app.get('/', function(req, res){
    res.json(movies);
 })


app.get('/movies/:id([0-9]{3,})', function(req, res){
    var currMovie = movies.filter((movie)=>{
       if(movie.id == req.params.id){
          return true;
       }
    });
    if(currMovie.length == 1){
        res.json(currMovie[0])
        customerLogger.info("Movie found");
    } else {

        customerLogger.error("Movie not found");
    //    res.status(404);
    //    res.json({message: "Not Found"});
    }
 });
 app.listen(3000, () => {
    console.log("Server Started 3000");
})