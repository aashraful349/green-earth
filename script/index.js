const loadCategory = async () => {
    const url = `https://openapi.programming-hero.com/api/categories`;
    const res = await fetch(url);
    const cdata = await res.json();
    displayCategory(cdata.categories);
}
const loadAllTrees = async () => {
    const allTreesBtn = document.getElementById('all-trees-btn');
    removeActive();
    allTreesBtn.classList.add('active');
    toggleSpinner(true);

    const url = `https://openapi.programming-hero.com/api/plants`;
    const res = await fetch(url);
    const details = await res.json();
    displayDetails(details.plants);


}

const loadPlantsByCategories = async (id) => {
    removeActive();
    toggleSpinner(true);
    const url = `https://openapi.programming-hero.com/api/category/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    const clickedBtn = document.getElementById(`category-btn-${id}`);
    clickedBtn.classList.add('active');
    displayDetails(details.plants);
}

const removeActive = () => {
    const categoryBtn = document.querySelectorAll('.category-btn');
    categoryBtn.forEach(btn => {
        btn.classList.remove('active');
    });
}

const displayCategory = categories => {
    const categoryContainer = document.getElementById('category-container');
    for (const category of categories) {
        const div = document.createElement('div');
        div.innerHTML = `
        <p onClick="loadPlantsByCategories('${category.id}')" id="category-btn-${category.id}" class="category-btn cursor-pointer rounded px-1 py-1 hover:bg-[#15803d] hover:text-white ">${category.category_name}</p>`;
        categoryContainer.append(div);
    }
    loadAllTrees();
}


const displayDetails = plants => {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    toggleSpinner(false);
    for (const plant of plants) {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="bg-white rounded-xl p-4 mx-auto mb-auto w-auto">
                <img class="rounded-xl my-1 w-full h-[186.8px]" src="" alt="">
                <button type="button" class="plant-name font-semibold text-left hover:underline"></button>
                <p class="plant-description text-[#71717A] text-justify"></p>
                <div class="type-price flex justify-between pt-1">
                    <p class="type bg-[#DCFCE7] text-[#15803D] rounded-2xl text-[14px] px-3"></p>
                    <p class="price font-semibold"><i class="fa-solid fa-bangladeshi-taka-sign"></i><span class="plant-price"></span></p>
                </div>
                <button class="add-to-cart btn bg-[#15803D] text-white rounded-2xl w-full mt-2">Add to Cart</button>
            </div>
        `;
        const card = div.querySelector('div');
        const imageEl = card.querySelector('img');
        const nameEl = card.querySelector('.plant-name');
        const descEl = card.querySelector('.plant-description');
        const categoryEl = card.querySelector('.type');
        const priceEl = card.querySelector('.plant-price');
        const addBtn = card.querySelector('.add-to-cart');

        imageEl.src = plant.image;
        imageEl.alt = plant.name;
        nameEl.textContent = plant.name;
        descEl.textContent = plant.description;
        categoryEl.textContent = plant.category;
        priceEl.textContent = plant.price;

        nameEl.addEventListener('click', () => openPlantModal(plant));
        addBtn.addEventListener('click', () => addToCart(plant.name, plant.price));
        cardContainer.appendChild(div);
    }

}

const openPlantModal = (plant) => {
    const modal = document.getElementById('plant-modal');
    if (!modal) {
        return;
    }
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalCategory = document.getElementById('modal-category');
    const modalPrice = document.getElementById('modal-price');

    modalImage.src = plant.image;
    modalImage.alt = plant.name;
    modalTitle.textContent = plant.name;
    modalDescription.textContent = plant.description;
    modalCategory.textContent = plant.category;
    modalPrice.textContent = plant.price;

    modal.showModal();
}

const toggleSpinner = (isLoading) => {
    const loader = document.getElementById('loader');
    if (isLoading) {
        loader.classList.remove('hidden');
    } else {
        loader.classList.add('hidden');
    }
}


const addToCart = (name, price) => {
    const cartDiv = document.getElementById('cart-items');
    const existingItems = cartDiv.querySelectorAll('#cart-item');
    let itemFound = false;

    for (let item of existingItems) {
        const itemName = item.querySelector('h2').textContent;
        if (itemName === name) {
            const quantitySpan = item.querySelector('.quantity');
            quantitySpan.textContent = parseInt(quantitySpan.textContent) + 1;
            updateTotal(price);
            itemFound = true;
            break;
        }
    }

    if (!itemFound) {
        const div = document.createElement('div');
        div.innerHTML = `
        <div id="cart-item" class="bg-[#F0FDF4] rounded-lg p-3 flex items-center justify-between" data-price="${price}">
                        <div class="">
                            <h2 class="font-semibold text-[14px]">${name}</h2>
                            <p class="text-[#8898af] text-[16px]"><i
                                    class="fa-solid fa-bangladeshi-taka-sign"></i><span class="price">${price}</span> x <span class="quantity">1</span></p>
                        </div>
                        <button onclick="removeFromCart(this)" class="text-[#8898af]"><i class="fa-solid fa-xmark"></i></button>
                    </div>
        `;
        cartDiv.appendChild(div);
        updateTotal(price);
    }
}


const removeFromCart = (btn) => {
    const cartItem = btn.parentNode;
    const price = parseFloat(cartItem.getAttribute('data-price'));
    const quantity = parseInt(cartItem.querySelector('.quantity').textContent);
    const totalRemoval = price * quantity;
    updateTotal(-totalRemoval);
    cartItem.remove();
}


const updateTotal = (amount) => {
    const totalElement = document.querySelector('.fprice');
    let currentTotal = parseFloat(totalElement.textContent);
    if (isNaN(currentTotal)) {
        currentTotal = 0;
    }
    const newTotal = currentTotal + amount;
    totalElement.textContent = newTotal.toFixed(2);
}
loadCategory();