const elTovarsTemp = document.querySelector(".js-tovars-temp").content;
const elSearchForm = document.querySelector(".js-search-form");
const elTovarsList = document.querySelector(".js-tovars-list");
const elSearchInput = elSearchForm.querySelector(".js-search-input");

const handleTovarsRenderFn = arr => {
    elTovarsList.innerHTML = "";
    const docFragment = document.createDocumentFragment();
    arr.map(({title, img}) => {
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
    if (!searchValue) return alert("Invalid value");
    if(searchValue){
        const regex = new RegExp(searchValue, "gi");
        const searchValueArr = handleSearchTovarFn(regex);
        if (!searchValueArr) return alert("Not found");
        handleTovarsRenderFn(searchValueArr);
    }
})