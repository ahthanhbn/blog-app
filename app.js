const root = document.querySelector("#root");
if (root) {
  const header = document.createElement("header");
  const logo = document.createElement("a");
  const headerUList = document.createElement("ul");
  const headerList = document.createElement("li");
  const headerListLink1 = document.createElement("a");
  const headerListLink2 = document.createElement("a");
  const search = document.createElement("div");
  const searchField = document.createElement("div");
  const searchIcon = document.createElement("div");
  const searchInput = document.createElement("input");
  const btnSearch = document.createElement("button");

  header.setAttribute("class", "header");
  root.appendChild(header);

  header.appendChild(logo);
  logo.setAttribute("class", "logo");
  logo.href = "#";
  logo.innerText = "AHTHANHBN";

  header.appendChild(headerUList);
  headerUList.setAttribute("class", "menu");
  headerUList.appendChild(headerList);
  headerList.setAttribute("class", "menu-item");
  headerList.appendChild(headerListLink1);
  headerList.appendChild(headerListLink2);
  headerListLink1.setAttribute("class", "menu-link");
  headerListLink2.setAttribute("class", "menu-link");
  headerListLink1.innerText = "Bài viết";
  headerListLink1.href = "#";
  headerListLink2.innerText = "Quản lý";
  headerListLink2.href = "./manager.html";

  header.appendChild(search);
  search.setAttribute("class", "search");
  search.appendChild(searchField);
  searchField.setAttribute("class", "search-field");
  searchField.appendChild(searchIcon);
  searchIcon.setAttribute("class", "search-icon");
  searchField.appendChild(searchInput);
  searchInput.type = "text";
  searchInput.setAttribute("class", "search-input");
  searchInput.placeholder = "Nhập từ khóa ...";
  search.appendChild(btnSearch);
  btnSearch.setAttribute("class", "search-button");
  btnSearch.innerText = "Tìm kiếm";

  const content = document.createElement("div");
  const course = document.createElement("div");
  content.setAttribute("class", "content__pc");
  root.appendChild(content);
  content.appendChild(course);
  course.setAttribute("id", "course");
  course.setAttribute("class", "course");
}

window.addEventListener("load", function () {
  const courseApi = "http://localhost:3000/posts";
  const courseCategory = "http://localhost:3000/categories";
  const listCoursesBlock = document.querySelector("#course");

  //getData
  async function getCourses() {
    try {
      const res = await fetch(courseApi);
      const data = await res.json();
      const resCate = await fetch(courseCategory);
      const dataCate = await resCate.json();
      Array.from(data).forEach((item) => {
        const template = `<div class="course__box">
          <div class="course__img">
            <img src="${item.image}" alt="">
            <div style =${dataCate[0].color} class="course__lable">${item.category}</div>
          </div>
          <div class="course__information">
            <h1>${item.title}</h1>
            <span>${item.desc}</span>
          </div>
          <button class="course__read">
            Xem bài viết
          </button>
        </div>`;
        listCoursesBlock.insertAdjacentHTML("beforeend", template);
      });
    } catch (err) {
      console.log("something was wrong");
    }
  }
  getCourses();

});
