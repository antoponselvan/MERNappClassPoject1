require("dotenv").config();
const express = require("express");
const session = require("express-session")
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Holiday = require("./models/Holiday");

const cors = require("cors");
const User = require("./models/User");

const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI);
const app = express();
const port = process.env.PORT ?? 3000;
const saltRounds = 10;

app.set("trust proxy", 1); // trust first proxy
app.use(cors());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true },
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/users/seed", async (req, res) => {
  await User.deleteMany({});

  const users = await User.insertMany([
    {
      username: "admin",
      password: bcrypt.hashSync("123", saltRounds),
    },
  ]);
  res.json(users);
});

/* RB Country */
const Country = require("./models/Country"); // Country model

app.get("/api/countries/seed", async (req, res) => {
  await Country.deleteMany({});

  const countries = await Country.insertMany([
    {
      name: "Country1",
      flag: "flag1",
    },
    {
      name: "Country2",
      flag: "flag2",
    },
    {
      name: "Country3",
      flag: "flag3",
    },
    
  ]);
  res.json(countries);
});

// const Holiday = require("./models/Holiday"); // Holiday model

app.get("/api/holidays/seed", async (req, res) => {
    await Holiday.deleteMany({});
    console.log("Creating Holidays");
    const holidays = await Holiday.insertMany([
      {
        name: "OktoberFest",
        celebrated: true,
        description: "Top Holiday!" ,
        likes: 0,
        country: "634e86a6a3366a631f75a066"
      },
      {
        name: "FlowerFest",
        celebrated: true,
        description: "Flower Fest!" ,
        likes: 0,
        country: "634e86a6a3366a631f75a066" 
      },
      {
        name: "ScienceFest",
        celebrated: true,
        description: "Science Fest!" ,
        likes: 0,
        country: "634e86a6a3366a631f75a067" 
      },
      {
        name: "ScienceFest",
        celebrated: true,
        description: "Science Fest!" ,
        likes: 0,
        country: "634e86a6a3366a631f75a067" 
      },
    ]); // end insertMany

    res.json(holidays);
  
  });

  app.get("/api/countries/seed", async (req, res) => {
    await Country.deleteMany({});
  
    const countries = await Country.insertMany([
      {
        name: "Singapore",
        flag: "SG",
      },
      {
        name: "Malaysia",
        flag: "MY",
      },
      {
        name: "Hong Kong",
        flag: "HK",
      },
    ]);
    res.json(countries);
  });

  app.get("/api/countries", async (req, res) => {
    try {
      const countries = await Country.find().exec();
      res.status(200).json(countries);
    } catch (error) {
      res.status(500).json({ error });
    }
  });
  
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (user === null) {
    res.status(401).json({ msg: "No user"})
    return;
  }

  const loginPass = bcrypt.compareSync(password, user.password);
  if (loginPass) {
    req.session.userid = user._id;
    res.status(200).json({ msg: "ok" });
  } else {
    res.status(401).json({ msg: "Not ok" });
  }
});

app.post("/api/holidays", async (req, res) => {

  if (!req.session.userid) {
    res.status(403).json({ msg: "No entry" });
    return;
  }

  if (req.body.name === "") {
    res.status(400).json({ msg: "No name" });
    return;
  } else if (req.body.likes < 0) {
    res.status(400).json({ msg: "Negative likes" });
    return;
  }

  try {
    const holiday = await Holiday.create(req.body);

    res.status(200).json(holiday);
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
});


app.post("/api/createholiday", async (req, res) => { // Start of post
  // console.log(req.body);
  console.log("name", req.body.name);
  console.log(req.body);
  const newHoliday = Holiday.create({name: req.body.name,
  description: req.body.description
  })
  res.status(201).json(newHoliday)

  // const countries = await Holiday.create({
  //     name: req.body.name,
  //     celebrated: req.body.celebrated,
  //     description: req.body.description,
  //     likes: req.body.likes,
  //     country: "634e86a6a3366a631f75a067"

  //   });
  })

// app.get("/api/listholidays", async (req, res)=> {
//   try{
//     // const holidays = await Holiday.find().exec()
//     Holiday.find({}, (err, foundHolidays) => {
//       if (err) {
//         res.status(400).json({ error: err.message });
//       }
//       res.status(200).json(foundHolidays);
//     });
      
//     res.status(200).json(holidays)
//   } catch (error) {
//     res.status(401).json(error)
//   }
// })

app.get("/api/listholidays", async (req, res) => { // Start of get
  // Read All Holiday Collection Data from DataBase(mongodb) - findAll
  Holiday.find({}, (err, foundHolidays) => {
    if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(foundHolidays);
  });
}); // end api/listholidays 


app.delete("/remove/:id", (req, res) => {
  Holiday.findByIdAndRemove(req.params.id, (err, deletedHoliday) => {
     if (err) {
      res.status(400).json({ error: err.message });
    }
    res.status(200).json(deletedHoliday);
  });
});

app.put("/holidays/:id", (req, res) => {
  console.log(req.body)
  Holiday.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updatedHoliday) => {
      if (err) {
        res.status(400).json({ error: err.message });
      }
      res.status(200).json(updatedHoliday);
    }
  );
});

mongoose.connection.once("open", () => {
  console.log("Connected to Mongodb");
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
