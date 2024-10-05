const elTovarsTemp = document.querySelector(".js-tovars-temp").content;
const elSearchForm = document.querySelector(".js-search-form");
const elTovarsList = document.querySelector(".js-tovars-list");
const elSearchInput = elSearchForm.querySelector(".js-search-input");
const elHeader = document.querySelector('#siteHeaderTops') ;
const elErrorText = document.querySelector(".js-error-text");
const elLike = document.querySelector('.like') ;


const elPopularsList=document.querySelector(".js-populars-list");
const elPopularsTemp=document.querySelector(".js-populars-temp").content;

const handleTovarsRenderFn = arr => {
    elTovarsList.innerHTML = "";
    const docFragment = document.createDocumentFragment();
    arr.forEach(({title, img}) => {
        const clone = elTovarsTemp.cloneNode(true);
        clone.querySelector(".js-tovars-title").textContent = title;
        clone.querySelector(".js-tovars-img").src = img;
        docFragment.append(clone)
    })
    elTovarsList.append(docFragment);
}
handleTovarsRenderFn(tovars);
const handleSearchTovarFn = regex => {
    const searchTovar = tovars.filter(({title}) => title.match(regex));
    return searchTovar;
    
}
elSearchForm.addEventListener("submit", evt => {
    evt.preventDefault();
    const searchValue = elSearchInput.value.trim();
    if (!searchValue) {elErrorText.style.display = "none"; return handleTovarsRenderFn(tovars);};
    if(searchValue){
        const regex = new RegExp(searchValue, "gi");
        const searchValueArr = handleSearchTovarFn(regex);
        if (!searchValueArr || !(searchValueArr?.length)) {handleTovarsRenderFn(searchValueArr); return elErrorText.style.display = "block"};
        handleTovarsRenderFn(searchValueArr);
    }
})
function handleRenderPopulars(arr) {
    let docFragment=document.createDocumentFragment();
    arr.forEach(({id,product_title,price,src})=>{
        let clone=elPopularsTemp.cloneNode(true)
        if (price=="нет в наличии") {
            clone.querySelector(".js-basket").style.display="none"
            clone.querySelector(".js-btn").textContent="Сообщить о поступлении"
            
        }else{
        
            clone.querySelector(".js-btn").style.display="none"
             
        }
        clone.querySelector(".js-img").src=src
        clone.querySelector(".js-price").textContent=price  

        clone.querySelector(".js-title").textContent=product_title
        docFragment.append(clone)
    })
    elPopularsList.append(docFragment)
}

handleRenderPopulars(populars) ;

elLike.addEventListener('click', (evt) => {
    console.log('helo, like');
    

}) ;

window.addEventListener('scroll', () => {
    
    const scrollPosition = window.scrollY;
    let scrollTop = Math.round(scrollPosition) ;

    if(Number(scrollTop) >= 260 ){
        elHeader.classList.remove('siteHeaderTop') ;
        elHeader.classList.add('siteNewHeader')
    }else{
        elHeader.classList.remove('siteNewHeader') ;
        elHeader.classList.add('siteHeaderTop')
    }
    
});
