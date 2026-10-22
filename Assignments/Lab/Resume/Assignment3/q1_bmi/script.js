function calculateBMI() {
  var height = document.getElementById("height").value;
  var weight = document.getElementById("weight").value;
  var result = document.getElementById("result");

  if (height <= 0 || weight <= 0 || height == "" || weight == "") {
    result.innerText = "Please enter valid height and weight";
    return;
  }

  var heightInMeters = height / 100;
  var bmi = weight / (heightInMeters * heightInMeters);
  var category = "";

  if (bmi < 18.5) {
    category = "Underweight";
  } else if (bmi < 25) {
    category = "Normal";
  } else {
    category = "Overweight";
  }

  result.innerText = "BMI: " + bmi.toFixed(2) + " (" + category + ")";
}
