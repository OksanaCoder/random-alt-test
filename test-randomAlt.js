function setupImageAltEditing() {
  async function generateAlt() {
    try {
      const response = await fetch(
        "https://random-word-api.herokuapp.com/word?number=1"
      );
      const data = await response.json();
      return data[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async function addAltToImg() {
    let imgs = document.querySelectorAll("img");

    for (const element of imgs) {
      element.addEventListener("click", () => {
        createInputField(element);
      });

      const randomWord = await generateAlt();
      if (randomWord !== null) {
        element.alt = randomWord;
      }
    }
  }

  function changeAltText() {}

  function createInputField(element) {
    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.value = element.alt;
    inputField.style.border = "3px solid red";

    inputField.addEventListener("blur", () => {
      element.alt = inputField.value;
    });

    element.insertAdjacentElement("afterend", inputField);

    inputField.focus();
  }

  function addNewImage() {
    const newImage = document.createElement("img");
    newImage.src = "path/to/image.jpg";
    document.body.appendChild(newImage);
    createInputField(newImage);
  }

  window.onload = addAltToImg;

  return {
    addAltToImg,
    changeAltText,
    createInputField,
    addNewImage,
  };
}

const imageAltEditor = setupImageAltEditing();
