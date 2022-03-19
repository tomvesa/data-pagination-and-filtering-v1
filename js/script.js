

/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/
// Get number of pages required per Data Array (based on max items per page)
function countNumberOFPages(array, maxPerPage){
    let pagesPerArray = Math.floor(array.length / maxPerPage);
    let pageRemainder = (array.length % maxPerPage) ;
    
      if (pageRemainder > 0){ pagesPerArray += 1};

    return {count:pagesPerArray, remainder: pageRemainder, items: array.length};
}


/**
 * each element has the dataSet of page number to display by. Function returns the number of
 * page this elements belongs to
 * @param {*} elementIndex index of the element
 * @param {*} elementsPerPage how many elements can be displayed on the page
 * @returns page number this emements belongs to 
 */
function getPageNumberOfElement(elementIndex, elementsPerPage){
         const indexToPageLimit = Math.floor(elementIndex / elementsPerPage);
         const pageNumber = indexToPageLimit + 1;
   return pageNumber;
}

// 

// find all elements with dataset of page = 1 and display them. All other elements will get hidden
function displayPage1Cards(){
   const page1Items = document.querySelectorAll('.student-item[data-page="1"]'); 
         for (item of page1Items){ item.classList.remove('card-hidden')};
   const notPage1 = document.querySelectorAll('.student-item:not([data-page="1"])');
         for (item of notPage1){item.classList.add('card-hidden')};      
}
        
// render required number of buttons into a target element
function renderPaginationButtons(numberOfButtons, target){
   let i = 1;
      do {
            const li = document.createElement('LI');
                  li.innerHTML = `<button data-value="${i}" type="button">${i}</button>`;
                     if(i === 1){
                     li.firstElementChild.className = "active";
                     li.dataset.value = i;
                  
                  }        
            target.appendChild(li);   
            i++;
         }    
         while( i <= numberOfButtons ) ;
      }



// search for the name in all cards, return an array of matching cards
function searchByName(searchName) {
    const cards = [...document.querySelectorAll('.student-name')];
    const searchResult = cards.reduce((acc, entry) => {
            let cardName = entry.textContent.toLowerCase();
            if (cardName.includes(searchName)) {
               acc = [...acc, entry.parentElement.parentElement];
            }
         return acc;
         }, []);

   return searchResult;
}

/**
 * execution of the app
 * 1) crete cards for all items in data Array
 *       - get its page number
 *       - add class of card-hidden to all elems as a default
 */

const studentList = document.getElementsByClassName('student-list')[0];
// 
data.forEach((item, index) => {
   const   personName = `${item.name.first} ${item.name.last}` ;
   let     pageNumber = getPageNumberOfElement(index , 9 );
   const   li = document.createElement("LI");

   //console.log(`${personName } : Pagge ${pageNumber}`);
   li.className = "student-item cf card-hidden";
   li.innerHTML = `<div class="student-details ">
                     <img class="avatar" src="${item.picture.thumbnail}" alt="Profile Picture">
                     <h3 class="student-name">${personName}</h3>
                     <span class="email">${item.email}</span>
                  </div>
                  <div class="joined-details">
                     <span class="date">Joined ${item.registered.date}</span>
                  </div>`
   
   li.dataset.page = pageNumber;
   li.dataset.index = index;
   studentList.append(li);
   });

// display only Page-1 cards when page loads
window.addEventListener('load', displayPage1Cards);

// reder pagination buttons
const buttonsBox = document.getElementsByClassName('link-list')[0];
const getPagesNum = countNumberOFPages(data, 9 ).count;
renderPaginationButtons(getPagesNum, buttonsBox);
//----------------------------------------------------------------

// Listen to click events of the buttons
buttonsBox.addEventListener(`click`, e => {
   const isButton = e.target.tagName == `BUTTON`;
   
   if(isButton){
      // make a clicked button active
      const buttons = document.querySelectorAll('.link-list button');
            for (button of buttons){button.classList.remove('active')}
            e.target.classList.add('active');      

      // first select not hidden cards and hide them
      const allCards = document.querySelectorAll(`.student-item:not(.card-hidden)`);
            console.log(allCards)
            for (card of allCards){
               card.classList.add(`card-hidden`) ;

      // find cards with page num which is equal to button number and display them
      const buttonValue = e.target.dataset.value;         
      const selectedCardsByButton = document.querySelectorAll(`.student-item[data-page="${buttonValue}"`);
            console.log(selectedCardsByButton);
            for (card of selectedCardsByButton) {card.classList.remove('card-hidden')};
   };
}});


/************************************************
 * Create a search bar
 */
const searchBar = document.createElement('div');   
      searchBar.innerHTML = ` <label for="search" class="student-search">
                                 <span>Search by name</span>
                                 <input id="search" placeholder="Search by name...">
                                 
                              </label>`
const headerEl = document.getElementsByClassName('header')[0];
      headerEl.appendChild(searchBar);   

const searchInput = document.getElementById('search');

// listen to key press 
searchInput.addEventListener('keyup', e => {
   let searchFor = searchInput.value.toLowerCase();

   // first hide all visible cards and reset page num and card index      
   const hideVisibleCards = document.querySelectorAll('.student-item');
           for (card of hideVisibleCards){
               card.classList.add('card-hidden')
               card.dataset.index = "";
               card.dataset.page = "";
            };

   // get Array of matching cards abd get its card index and page num        
   const searchData = searchByName(searchFor);
          console.log(searchData);
            for (const [i, card] of searchData.entries()){
              // card.classList.remove('card-hidden')
               card.dataset.index = i;
               card.dataset.page = getPageNumberOfElement(i , 9);
            };
         
   const getNumberOfPages = countNumberOFPages(searchData,  9).count;
            console.log(getNumberOfPages);
   
   // display only required page buttons         
   const buttons = document.querySelectorAll('.link-list button');
         for(button of buttons){
            if(button.dataset.value > getNumberOfPages){
               console.log(button);
               console.log( button.dataset.value > getNumberOfPages);
               button.parentElement.classList.add('button-hidden');
            }else{
               button.parentElement.classList.remove('button-hidden')
            }
         }         
     
 
        displayPage1Cards();
        // remove active from buttons and make 1st one active
        for(button of buttons){
           if(button.classList.contains('active')){
               button.classList.remove('active')};
           };
           buttons[0].classList.add('active');    

    });
/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/



/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/



// Call functions

