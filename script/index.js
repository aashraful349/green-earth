const loadCategory = async () =>{
    const url=`https://openapi.programming-hero.com/api/categories`;
    const res= await fetch(url);
    const cdata= await res.json();
    displayCategory(cdata.categories);
}
const loadAllTrees=async()=>{
    const allTreesBtn=document.getElementById('all-trees-btn');
    removeActive();
    allTreesBtn.classList.add('active');

    const url=`https://openapi.programming-hero.com/api/plants`;
    const res=await fetch(url);
    const details=await res.json();
    displayDetails(details.plants);
    

}

const loadPlantsByCategories=async (id)=>{
    removeActive();
    const url=`https://openapi.programming-hero.com/api/category/${id}`;
    const res=await fetch(url);
    const details=await res.json();
    const clickedBtn=document.getElementById(`category-btn-${id}`);
    clickedBtn.classList.add('active');
    displayDetails(details.plants);
}

const removeActive=()=>{
    const categoryBtn=document.querySelectorAll('.category-btn');
    categoryBtn.forEach(btn=>{
        btn.classList.remove('active');
    });
}

const displayCategory = categories =>{
    const categoryContainer=document.getElementById('category-container');
    for(const category of categories){
        const div=document.createElement('div');
        div.innerHTML=`
        <p onClick="loadPlantsByCategories('${category.id}')" id="category-btn-${category.id}" class="category-btn cursor-pointer rounded px-1 py-1 hover:bg-[#15803d] hover:text-white ">${category.category_name}</p>`;
        categoryContainer.append(div);
    }
    loadAllTrees();
}


const displayDetails=plants=>{
    const cardContainer=document.getElementById('card-container');
    cardContainer.innerHTML='';
    for(const plant of plants){
        const div=document.createElement('div');
        div.innerHTML=`
        <div class="bg-white rounded-xl p-4 mx-auto mb-auto w-auto">
                <img class="rounded-xl my-1 w-full h-[186.8px]"
                    src="${plant.image}">
                <h2 class="font-semibold">${plant.name}</h2>
                <p class="text-[#71717A] text-justify">${plant.description}</p>
                <div class="type-price flex justify-between pt-1">
                    <p class="type bg-[#DCFCE7] text-[#15803D] rounded-2xl text-[14px] px-3">${plant.category}</p>
                    <p class="price font-semibold"><i class="fa-solid fa-bangladeshi-taka-sign"></i>${plant.price}</p>
                </div>
                <button class="btn bg-[#15803D] text-white rounded-2xl w-full mt-2">Add to Cart</button>
            </div>
        `;
        cardContainer.appendChild(div);
    }

}


loadCategory();