const express = require("express");
const client = require("../db/connectdb")

const router = express.Router();

//create a resource
router.post("/", async(req, res) => {
    try{
        //const { content } = req.body.content;
        //const { title } = req.body.title;
        //const { link } = req.body.link;
        let newResource = await client.query(
            "INSERT INTO posts (id, fk_user, title, content, link) VALUES ($1,$2,$3,$4,$5) RETURNING *", 
            [req.body.id,
             req.body.fk_user,
             req.body.title, 
             req.body.content,
             req.body.link]
        );

        res.send({
            msg: `Resource posted successfully!`,
            res: newResource.rows[0]
    });
    }

    catch(error){
        console.log(error);
    }
})

//get all resources
router.get("/", async(req, res) => {
    try{
        //const { fk_user } = req.body.fk_user;
        const getAllResources = await client.query(
            "SELECT * FROM posts WHERE fk_user={$1}", [req.body.fk_user]
        );
        res.send(getAllResources.rows);
    }

    catch(error){ 
        console.log(error);
    }
})

//get a resource
router.get("/:id", async(req, res) => {
    try{
        //const { id } = req.params.id;
        //const { fk_user } = req.params.fk_user;
        const getResource = await client.query(
            "SELECT * FROM posts WHERE id=$1 and fk_user=$2", 
            [req.body.id,
            req.body.fk_user]
        );
        res.send(getResource.rows[0]);
    }

    catch(error){
        console.log(error);
    }
})

//update a resource
router.put("/:id", async(req, res) => {
    try{
        // const { id } = req.body.id;
        // const { title } = req.body.title;
        // const { content } = req.body.content;

        const updateResource = await client.query(
            "UPDATE posts SET title=$1, content=$2, link=$3 WHERE id=$4 and fk_user=$5", 
            [req.body.title,
             req.body.content,
             req.body.link,
             req.body.id,
             req.body.fk_user]
        );
        res.send("Resource updated successfully!");
    }

    catch(error){
        console.log(error);
    }
})

//delete a resource
router.delete("/:id", async(req, res) => {
    try {
       // const { id } = req.params;
        const deleteResources = await client.query(
            "DELETE FROM posts WHERE id=$1 and fk_user=$2 and title=$3", 
            [req.body.id,
            req.body.fk_user,
            req.body.title]
        );
        res.send("Resource deleted successfully!");
    } 
    catch (error) {
        console.log(error);
    }
})
/**
 *  CRUD routes for resources posted by alumini's goes here
 *  Dont forget to write comments
 */

module.exports = router;
