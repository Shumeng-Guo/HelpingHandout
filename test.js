const user = {
    firstName: "Helping",
    lastName: "Handout"
};
const test = (app) => {

    app.get("/test", (req, res) => {
        res.json(user);
    });

};
export default test;