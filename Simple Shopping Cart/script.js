document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelectorAll(".add-input");
  const addBtn = document.querySelector(".list-btn");

  addBtn.addEventListener("click", () => {
    const task = input[0].value.trim();
    const price = input[1].value.trim();

    // if either the task or price is empty, do not add anything to the list
    // the return statement is used to exit the function early if either of the conditions is true
    if (!task && !price) return;
    const taskList = document.querySelector(".products ol");
    const newTask = document.createElement("li");
    newTask.classList.add("list-item");
    newTask.textContent = `${task}     :     Rs. ${price}`;
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      newTask.remove();
    });
    newTask.append(deleteBtn);
    taskList.append(newTask);
  });
});
