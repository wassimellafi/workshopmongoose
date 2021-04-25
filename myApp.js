const express = require("express");
const app = express();
const mongoose = require("mongoose");
const MONGO_URI =
    " mongodb+srv://useful_programmer:admin@usefulprogrammer.oxdgg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
mongoose.connection.on("connected", () => {
    console.log("mongoose is connected!!!");
});
var Schema = mongoose.Schema;

var personSchema = new Schema({
    name: { type: String, required: true },
    age: Number,
    favoriteFoods: [String],
});

//Model

var Person = mongoose.model("Person", personSchema);

// saving person to our mongo database
const data = {
    name: "wassim",
    age: 22,
    favoriteFoods: ["Pizza", "Sushi"],
};

const newPerson = new Person(data); /**  instance of the model */

newPerson.save((error) => {
    if (error) {
        console.log("something happened");
    } else {
        console.log("Data has been saved!!!");
    }
});
/** Create and Save a Person */

var createAndSavePerson = (done) => {
    let anotherUsefulProgrammer = new Person({
        name: "Another Useful Programmer",
        age: 33,
        favoriteFoods: ["Ban Mi", "Steak"],
    });

    anotherUsefulProgrammer.save((err, data) => {
        if (err) return console.error(err);
        done(null, data);
    });
};
/**  Create many People with `Model.create()` */

var createManyPeople = (arrayOfPeople, done) => {
    Person.create(arrayOfPeople, (err, peopleCreated) => {
        if (err) return console.log(err);
        done(null, peopleCreated);
    });
};
/**  Use `Model.find()` */

var findPeopleByName = function (personName, done) {
    Person.find({ name: personName }, (error, peopleFound) => {
        if (error) return console.log(error);
        done(null, peopleFound);
    });
};
/**  Use `Model.findOne()` */

var findOneByFood = (food, done) => {
    Person.findOne({ favoriteFoods: food }, (err, foodPerson) => {
        if (err) return console.log(err);
        done(null, foodPerson);
    });
};
/** Use `Model.findById()` */

var findPersonById = (personId, done) => {
    Person.findById(personId, (err, individual) => {
        if (err) return console.log(err);
        done(null, individual);
    });
};
/**  Classic Update : Find, Edit then Save */

var findEditThenSave = (personId, done) => {
    var foodToAdd = "hamburger";
    Person.findById(personId, (error, person) => {
        if (error) return console.log(error);
        person.favoriteFoods.push(foodToAdd);

        person.save((err, individual) => {
            if (err) return console.error(err);
            done(null, individual);
        });
    });
};
/** New Update : Use `findOneAndUpdate()` */

var findAndUpdate = (personName, done) => {
    let query = { name: personName };
    let update = { age: 20 };
    let option = { new: true };

    Person.findOneAndUpdate(query, update, option, (error, individual) => {
        if (error) return console.log(error);
        done(null, individual);
    });
};
/** Delete one Person */

var removeById = (personId, done) => {
    Person.findByIdAndRemove(personId, (error, removedPerson) => {
        if (error) return console.log(error);
        done(null, removedPerson);
    });
};
/**  Delete many People */

var removeManyPeople = (done) => {
    var nameToRemove = "Mary";

    Person.remove({ name: nameToRemove }, (error, removalInfo) => {
        if (error) return console.log(error);
        done(null, removalInfo);
    });
};
/**  Chain Query helpers */

var queryChain = (done) => {
    Person.find({ favoriteFoods: "burrito" })
        .sort({ name: "asc" })
        .limit(2)
        .select({ age: 0 })
        .exec((error, searchResults) => {
            done(error, searchResults);
        });
};

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
