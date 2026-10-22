function addTask() {
  var input = document.getElementById("taskInput");
  var text = input.value;

  if (text == "") {
    alert("Please enter a task");
    return;
  }

  var li = document.createElement("li");

  var span = document.createElement("span");
  span.innerText = text;
  // click on task to mark as completed
  span.onclick = function () {
    li.classList.toggle("done");
  };

  var deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.onclick = function () {
    li.remove();
  };

  li.appendChild(span);
  li.appendChild(deleteBtn);
  document.getElementById("taskList").appendChild(li);

  input.value = "";
}
