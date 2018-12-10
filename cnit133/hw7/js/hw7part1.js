  var container = document.querySelector('body');
  // Background
  let updateBackground = document.querySelector('#background-color');
  updateBackground.addEventListener('click', changeBackground);
  function changeBackground(event) {
    let radioButton = event.target.defaultValue;
    if (radioButton == "pink") {
      container.className = "background-color_pink";
    } else if (radioButton == "gray") {
      container.className = "background-color_gray";
    } else if (radioButton == "almond") {
      container.className = "background-color_almond";
    }
  }
  // Font Size
  let fontSize = document.querySelector('#font-size');
  fontSize.addEventListener('click', changeFontSize);
  function changeFontSize(event) {
    let fontButton = event.target.innerHTML;
    if (fontButton == "small") {
      container.className = "font-size_small";
    } else if (fontButton == "medium") {
      container.className = "font-size_medium";
    } else if (fontButton == "big") {
      container.className = "font-size_big";
    }
  }
  // Font Family
  let fontFamily = document.querySelector('#font-family');
  fontFamily.addEventListener('change', changeFontFamily);
  function changeFontFamily(event) {
    let selectOption = event.target.value;
    if (selectOption == "arial") {
      if(!container.classList.contains("font-family_arial")) {
        container.classList.remove("font-family_courier");
        container.classList.toggle("font-family_arial");
      }
    } else if (selectOption == "courier") {
      if(!container.classList.contains('font-family_courier')) {
        container.classList.remove("font-family_arial");
        container.classList.toggle("font-family_courier");
      }
    } else {
      container.className = "font-family_normal";
    }
  }
  // Font Style
  let fontStyle = document.querySelector('#font-style');
  fontStyle.addEventListener('click', changeFontStyle);
  function changeFontStyle(event) {
    let fontButton = event.target.innerHTML;
    if (fontButton == "italic") {
      container.className = "font-style_italic";
    } else if (fontButton == "normal") {
      container.className = "font-style_normal";
    }
  }
  // Font Weight
  let fontWeight = document.querySelector('#font-weight');
  fontWeight.addEventListener('click', changeFontWeight);
  function changeFontWeight(event) {
    let fontWeight = event.target.innerHTML;
    if (fontWeight == "bold") {
      container.className = "font-weight";
    } else if (fontWeight == "onehundred") {
      container.className = "font-weight_light";
    }
  }