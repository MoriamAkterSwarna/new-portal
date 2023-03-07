const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.data.news_category))
        .catch(error => displayCategories(error))
}
const displayCategories = categories => {
    const categoriesContainer = document.getElementById('categories-container')

    categories.forEach(category => {
        const categoryList = document.createElement('li');
        categoryList.classList.add('category');
        categoryList.innerHTML = `
        <h5 onclick="loadNewsDetail('${category.category_id}')" class=" btn text-secondary fs-5">${category.category_name}</h5>
            `;
        categoriesContainer.appendChild(categoryList);

    });


}
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('spinner');
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    }
    else {
        loaderSection.classList.add('d-none');
    }
}

const loadNewsDetail = (category_id) => {

    toggleSpinner(true);

    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;




    fetch(url)
        .then(res => res.json())
        .then(data => displayNewsDetail(data.data))
        .catch(error => displayNewsDetail(error))


}
const displayNewsDetail = newses => {

    const newsCategoriesContainer = document.getElementById('news-categories-conatiner');
    newsCategoriesContainer.innerHTML = '';

    const noNews = document.getElementById('no-found-message');
    if (newses.length === 0) {
        noNews.classList.remove('d-none');

    }
    else {
        noNews.classList.add('d-none');
    }


    newses.forEach(news => {

        const newsDiv = document.createElement('div');
        newsDiv.classList.add('col');
        newsDiv.innerHTML = `
        <div class="card mb-3"">
            <div class="row">
                <div class="col-md-4 col-sm-12" style="max-width: 300px;">
                        <img src="${news.thumbnail_url}" class="img-fluid rounded p-4" alt="...">
                </div>
                <div class="col-md-8 col-sm-12">
                    <div class="card-body">
                        <h3 class="card-title">${news.title}</h3>
                        <p class="card-text">${news.details.slice(0, 400)}...</p>
                        
                        <div class="d-flex justify-content-around align-items-center">
                            <div class="d-flex justify-content-start align-items-center">
                                <div class="m-2">
                                    <img src="${news.author.img}" class="img-fluid rounded-circle" alt="..." style="max-width: 60px;">
                                </div>
                                <div>
                                    <p class="m-1 fw-bold">${news.author.name ? news.author.name : 'No name found'} </p>
                                    <p class="text-secondary">${news.author.published_date} </p>
                                </div>
                            </div>
                            <div>
                                <p><i class="fa-regular fa-eye"></i> ${news.total_view ? news.total_view : 'No Viewers'}</p></div>
                            </div>
                           
                       </div>
                        <div class="text-center mb-3">
                                <button onclick="loadNewsModal('${news._id}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newsDetailsModal">News Details</button>
                
                        </div>

                    </div>
                </div>
            </div>
        </div>

    `;
        newsCategoriesContainer.appendChild(newsDiv);

        const itemAmount = document.getElementById('item-amount');
        itemAmount.innerText = `${newses.length} item for this category`;


    });
    toggleSpinner(false);



}
const loadNewsModal = (news_id) => {
    // https://openapi.programming-hero.com/api/news/0282e0e58a5c404fbd15261f11c2ab6a
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayNewsModalDetails(data.data))
        .catch(error => displayNewsModalDetails(error))

}
const displayNewsModalDetails = newsModal => {
    console.log(newsModal[0].author.name);
    const modalTitle = document.getElementById('newsDetailsModalLabel');
    modalTitle.innerText = newsModal[0].title;
    const modalDetails = document.getElementById('modal-details');


    modalDetails.innerHTML = `
        <img src="${newsModal[0].author.img}" class="img-fluid rounded p-4 w-75" alt="...">
        <p class="fw-bold">Author Name: ${newsModal[0].author.name ? newsModal[0].author.name : 'No Author Name Found'}</p>
        <p>Publish Date: ${newsModal[0].author.published_date ? newsModal[0].author.published_date : 'No Publish date Information '}</p>
       
    `
}

loadCategories();
