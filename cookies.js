const textinput = document.querySelector("#input_text");
const textdecr = document.querySelector("#input_decr");
const addbtn = document.querySelector("#add_btn");
const displayoutput = document.querySelector("#output");

let idCounter = 0; // Counter to create unique IDs

addbtn.addEventListener("click", () => {
  const key = textinput.value.trim();
  const value = textdecr.value.trim();

  if (key === "" || value === "") {
    alert("Both key and value are required!");
    return;
  }

  try {
    const uniqueId = `removebtn-${idCounter++}`; // Create a unique ID for each button

    let newdiv = document.createElement("div");
    newdiv.innerHTML = `
      <div id="o_display" class="${uniqueId}">
        <h2 id="o_h2">${key}</h2>
        <p id="o_p">${value}</p>
        <button id="removebtn" class="${uniqueId}" data-item="${key}">Remove</button>
      </div>
    `;

    localStorage.setItem(key, value); // Save to localStorage
    displayoutput.append(newdiv);

    const removebutton = document.querySelector(`.${uniqueId}`);
    removebutton.addEventListener("click", () => {
      const keyToRemove = removebutton.getAttribute("data-item");
      localStorage.removeItem(keyToRemove); // Remove from localStorage
      newdiv.remove(); // Remove the div
    });

    textinput.value = ""; // Clear input fields
    textdecr.value = "";
  } catch (err) {
    console.log(err.message);
  }
});

window.onload = function () {
  for (let i = 0; i < localStorage.length; i++) {
    const okey = localStorage.key(i);
    const ovalue = localStorage.getItem(okey);

    const uniqueId = `removebtn-${idCounter++}`; // Create a unique ID for each button

    let newdiv = document.createElement("div");
    newdiv.innerHTML = `
      <div id="o_display" class="${uniqueId}">
        <h2 id="o_h2">${okey}</h2>
        <p id="o_p">${ovalue}</p>
        <button id="removebtn" class="${uniqueId}" data-item="${okey}">Remove</button>
      </div>
    `;

    displayoutput.append(newdiv);

    const removebutton = document.querySelector(`.${uniqueId}`);
    removebutton.addEventListener("click", () => {
      localStorage.removeItem(okey); // Remove from localStorage
      newdiv.remove(); // Remove the div
    });
  }
};
