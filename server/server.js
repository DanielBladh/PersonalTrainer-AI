import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";

const app = express();
const PORT = 3000;
const API_KEY = "SEeT8ojc/6ahVIBlOTIucA==KID317gDLjq6uScx"; // Kom ihåg att hålla API-nyckeln privat

// Lista över giltiga muskelgrupper
const validMuscles = [
  "abdominals",
  "abductors",
  "adductors",
  "biceps",
  "calves",
  "chest",
  "forearms",
  "glutes",
  "hamstrings",
  "lats",
  "lower_back",
  "middle_back",
  "neck",
  "quadriceps",
  "traps",
  "triceps",
];

// Middleware för att hantera inkommande JSON-data
app.use(bodyParser.json());

// Middleware för att servera statiska filer från "public"-mappen (så som index.html, app.js, etc.)
app.use(express.static("public"));

// Route för att hämta övningar baserat på muskelgrupp
app.get("/exercises/:muscle", async (req, res) => {
  const muscle = req.params.muscle;

  // Kontrollera om den mottagna muskelgruppen är giltig
  if (!validMuscles.includes(muscle)) {
    return res.status(400).json({ error: "Ogiltig muskelgrupp" });
  }

  try {
    // Gör ett anrop till API:et för att hämta övningar för den valda muskelgruppen
    const response = await fetch(
      `https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`,
      {
        headers: { "X-Api-Key": API_KEY }, // Skicka med API-nyckeln i headern
        "Cache-Control": "no-cache",
      }
    );

    const data = await response.json();

    // Om API:et inte returnerar några övningar
    if (data.length === 0) {
      return res
        .status(404)
        .json({ error: "Inga övningar hittades för denna muskelgrupp" });
    }

    // Returnera övningarna som JSON-svar
    res.json(data);
  } catch (error) {
    // Hantera eventuella fel som uppstår vid anropet
    res.status(500).send({ error: "Kunde inte hämta övningar" });
  }
});

// Starta servern och lyssna på porten
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
