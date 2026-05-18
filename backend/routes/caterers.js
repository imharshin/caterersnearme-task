const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const filePath = path.join(__dirname, "../data/caterers.json");

const getCaterers = () => {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
};

const saveCaterers = (data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};


// GET all caterers
router.get("/", (req, res) => {
  const caterers = getCaterers();
  res.json(caterers);
});


// GET caterer by id
router.get("/:id", (req, res) => {
  const caterers = getCaterers();

  const caterer = caterers.find(
    (c) => c.id === parseInt(req.params.id)
  );

  if (!caterer) {
    return res.status(404).json({
      message: "Caterer not found",
    });
  }

  res.json(caterer);
});


// POST create caterer
router.post("/", (req, res) => {
  const { name, location, pricePerPlate, cuisines, rating } = req.body;

  if (
    !name ||
    !location ||
    !pricePerPlate ||
    !cuisines ||
    !rating
  ) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  const caterers = getCaterers();

  const newCaterer = {
    id: caterers.length + 1,
    name,
    location,
    pricePerPlate,
    cuisines,
    rating,
  };

  caterers.push(newCaterer);

  saveCaterers(caterers);

  res.status(201).json(newCaterer);
});

module.exports = router;