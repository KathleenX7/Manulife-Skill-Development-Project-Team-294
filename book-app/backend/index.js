const app = require('express')();

const PORT = 4000;

app.listen(
    PORT,
    () => console.log(`its running on http://localhost:${PORT}`)
);

app.get('/start' , (req,res) => {
    res.send("task done")
});

