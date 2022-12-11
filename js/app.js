// 1- Creating a function to check if element in viewPort
function isVisible(elem) {
  const rect = elem.getBoundingClientRect();

  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth) &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
  );
}

// 2- creating a navigation menu div and storing it in a variable.

let navigationMenu = document.createElement('div');

navigationMenu.style.cssText = "display:flex;justify-content:right;flex-direction:row;flex-wrap:wrap;width:100%; height:40px; background-color:white; position:fixed; top:0px;";
navigationMenu.classList.add('nContainer')

// 3- adding navigation items based on sections number on the page.

let sectionsCount = document.getElementsByTagName('section').length; // 4- getting the number of sections on the page.

for (let i = 0; i < sectionsCount; i++) {

  const newDiv = document.createElement('div');

  newDiv.textContent = "Section " + (i + 1);
  newDiv.classList.add('section' + (i + 1))

  newDiv.style.cssText = "display:grid;justify-content:center;width:100px;align-items:center; color:black;";

  // 5-adding event listeners for hovering on the navigation menu elements

  newDiv.addEventListener('mouseover', function() {

      newDiv.style.cssText = "transition:all 0.3s; display:grid;justify-content:center;width:120px;align-items:center; color:white;background-color:#25252A;cursor:pointer;"
  })

  newDiv.addEventListener('mouseout', function() {
      //
      if (!(isVisible(document.querySelector('#section' + (i + 1)))))
          newDiv.style.cssText = "transition:all 0.3s; display:grid;justify-content:center;width:100px;align-items:center; color:black;background-color:white"
  })

  navigationMenu.appendChild(newDiv);
}


// 6- adding listner to scroll down to the clicked element on the navigation menu

navigationMenu.addEventListener('click', function(evt) {
  if (evt.target.classList[0] === 'section' + evt.target.classList[0][7]) {

      evt.preventDefault();

      let scrollToSection = document.querySelector('#section' + evt.target.classList[0][7]);

      scrollToSection.scrollIntoView({
          behavior: "smooth",
          block: 'start'
      });
  }
})

document.body.insertAdjacentElement('beforeEnd', navigationMenu)


// 7- Add functionality to distinguish the section in view

document.addEventListener('scroll', function() {
  for (let i = 1; i <= sectionsCount; i++) {

      let Secc = document.querySelector('#section' + i);
      let navSection = document.querySelector('.section' + i);

      if (isVisible(Secc)) {
          //if section in viewPort then adding the active class to it and highlighting the navMenu section
          
          Secc.classList.add('your-active-class')
          navSection.style.cssText = "transition:all 0.3s; display:grid;justify-content:center;width:120px;align-items:center; color:white;background-color:#25252A;cursor:pointer;"

          for (let j = 1; j <= sectionsCount; j++) {
              let rSection = document.querySelector('#section' + j);
              let rNavSection = document.querySelector('.section' + j);

              //removing the active class from all classes except the one in viewPort
              
              if (rSection != Secc) {
                  rSection.classList.remove('your-active-class');
                  rNavSection.style.cssText = "transition:all 0.3s; display:grid;justify-content:center;width:100px;align-items:center; color:black;background-color:white;cursor:pointer;"
              }
          }
          break;
      }
  }
})