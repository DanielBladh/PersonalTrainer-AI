document.addEventListener("DOMContentLoaded", function () {
  // När användaren klickar på knappen, gör ett anrop för vald muskelgrupp
  document
    .getElementById("fetch-exercises")
    .addEventListener("click", function () {
      const selectedOption =
        document.getElementById("muscle-select").selectedOptions[0];
      const selectedMuscle = selectedOption.value;

      // Gör ett anrop till API för vald muskelgrupp
      fetch(`/exercises/${selectedMuscle}`)
        .then((response) => response.json())
        .then((data) => {
          displayExercises(data);
        })
        .catch((error) => {
          console.error("Error fetching exercises:", error);
        });
    });
});

// Funktion för att visa övningarna i UI
function displayExercises(exercises) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = ""; // Töm resultatet innan nya resultat visas

  exercises.forEach((exercise) => {
    const exerciseElement = document.createElement("div");
    exerciseElement.classList.add("exercise"); // Lägg till en klass för styling

    // Skapa HTML-element för att visa övningen
    exerciseElement.innerHTML = `
        <h3 class="exercise-name">${exercise.name}</h3>
        <p><strong>Muscle:</strong> ${exercise.muscle}</p>
        <p><strong>Equipment:</strong> ${exercise.equipment}</p>
        <p><strong>Difficulty:</strong> ${exercise.difficulty}</p>
        <p><strong>Instructions:</strong></p>
        <p>${exercise.instructions}</p>
      `;

    resultsDiv.appendChild(exerciseElement);
  });
}
