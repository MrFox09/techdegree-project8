
// Global variables to store the ListItems and set the total number which will be shown on the page

const listItem = document.querySelectorAll('tbody tr');
const maxItems = 10; 
let resultsArray = []; // stores the search results


// create the Search field 

const newBookButtonDiv = document.getElementsByClassName('newBookButton')[0];

const searchBarDiv = document.createElement('div');
searchBarDiv.className = 'searchBar';

const input = document.createElement('input');
input.setAttribute('placeholder', 'Book search...');

const button = document.createElement('button');
button.textContent = 'Find!';

searchBarDiv.appendChild(input);
searchBarDiv.appendChild(button);
newBookButtonDiv.appendChild(searchBarDiv);

/* search function, looks if the input is in the list Item, removes inital list
 and add a results list
 */
const search = (input, listName) => {
    const parentDiv = document.querySelector('.wrapper');
    const paginationDiv = document.querySelector('.pagination');
    const table = document.getElementsByTagName('table')[0];

    // create a message when there is no result
    const noResultsDiv = document.createElement('div');
    noResultsDiv.className= 'noResults'; 

   
    const message = document.createElement('h2');
    message.innerText ='No results are found! press "Home" to get back';

     noResultsDiv.appendChild(message);

    
    let resultsArray = [] ;
  
  // loop through the List which we want to search through and set everything invisible except the first row  
    for (let i = 0; i < listName.length; i++) {
        if (i===0) {
            listName[i].style.display = '';
            
        } else {
            listName[i].style.display = 'none';
            
        }
    
  // takes the input and search for matches, if there is a match set the style to visible 
      if (input.value.length != 0 && listName[i].textContent.toLowerCase().includes(input.value.toLowerCase())) {
        listName[i].style.display = '';
        resultsArray.push(listName[i]);

        

      }
    }

    // test condition if the search was failed and show no results message and a home button on screen
    if (resultsArray.length === 0) {

        table.appendChild(noResultsDiv);
      
   
    } else {
    
    }
  
    // remove the inital div what was made by the first call of appendPageLinks function
    parentDiv.removeChild(paginationDiv);
    
    // call the functions to show search results an append links
    showPage(resultsArray, 1);
    appendPageLinks(resultsArray);
  
  };

  //showPage creates list to hide every list item, except 10, depending on the Page link

  const showPage = (list, page) => {

    let startIndex = (page * maxItems) - maxItems;
    let endIndex = page * maxItems;
  
    for (let i = 0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {
        list[i].style.display = '';
  
      } else {
        list[i].style.display = 'none';
  
      }
    }
  };
  
  // append dynamic links to the page, depends on how much book are in the DB

  const appendPageLinks = (list) =>{

  const parentDiv = document.getElementsByClassName('wrapper')[0];

      // list_length/shown_Students to calculate the amount of linkButtons, always rounded up to show the rest of the list in the last linkButton
  let buttonNumber = Math.ceil(list.length / maxItems);

  // create the div and the ul to store the list elements
  const div = document.createElement('div');
  div.className = 'pagination';
  const ul = document.createElement('ul');

  //create the li and the link element, depending on the list length and add it to the ul
  for (let i = 0; i < buttonNumber; i++) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.setAttribute("href", "#");

    //set the link name, the first is 1 instead of 0 (+1)
    a.textContent = i + 1;
    if (i === 0) {
      a.className = 'active';
    }
  
    li.appendChild(a);
    ul.appendChild(li);
  }
  div.appendChild(ul);

  //add the new div to parent div
  parentDiv.appendChild(div);

  // add an eventListener to every a element
  let a = document.getElementsByTagName('a');
  for (let i = 0; i < a.length; i++) {

    a[i].addEventListener('click', (event) => {
      let pageNumber = event.target.textContent;
      for (let i = 0; i < a.length; i++) {
        a[i].classList.remove('active');
      }
      event.target.className = 'active';

      //call showPage function to show the items/page we have selected
      showPage(list, pageNumber);
    });
  }
};

// event listener on find button to call the search function

button.addEventListener('click', (event) => {
    event.preventDefault();
    search(input, listItem);
  });

  // event listener for hit the enter button in searchfield

input.addEventListener('keypress',(e)=>{
    if (e.key === 'Enter') {
        search(input, listItem);
        
    }
});


 
  
// initial launch of the pagination

appendPageLinks(listItem);
showPage(listItem, 1);


