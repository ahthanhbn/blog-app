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
  headerListLink1.href = "./index.html"
  headerListLink2.innerText = "Quản lý";
  headerListLink2.href = "./manager.html"

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

  const manager = document.createElement("div");
  const managerDropDown = document.createElement("div");
  const ulListDropDown = document.createElement("ul");
  const listDropDown1 = document.createElement("li");
  const listDropDown2 = document.createElement("li");
  const linkDropDown1 = document.createElement("a");
  const linkDropDown2 = document.createElement("a");
  const managerTask = document.createElement("div");
  const managerHeader = document.createElement("div");
  const managerHeading = document.createElement("h1");
  const addCourse = document.createElement("button");
  const addCourseLink = document.createElement("a");

  const managerTable = document.createElement("div");
  const tableRow = document.createElement("tr");
  const table = document.createElement("table");
  const tableHeader1 = document.createElement("th");
  const tableHeader2 = document.createElement("th");
  const tableHeader3 = document.createElement("th");
  const tableHeader4 = document.createElement("th");
  const tableHeader5 = document.createElement("th");
  const tableHeader6 = document.createElement("th");

  root.appendChild(manager);
  manager.setAttribute("class", "manager");
  manager.appendChild(managerDropDown);
  managerDropDown.setAttribute("class", "manager__dropdown");
  managerDropDown.appendChild(ulListDropDown);
  ulListDropDown.insertAdjacentElement("beforeend", listDropDown1);
  ulListDropDown.insertAdjacentElement("beforeend", listDropDown2);
  listDropDown1.appendChild(linkDropDown1);
  linkDropDown1.href = "./index.html";
  linkDropDown1.setAttribute("class", "drop__list");
  linkDropDown1.innerText = "Bài viết";
  listDropDown2.appendChild(linkDropDown2);
  linkDropDown2.href = "#";
  linkDropDown2.setAttribute("class", "drop__list");
  linkDropDown2.innerText = "Danh mục";

  manager.appendChild(managerTask);
  managerTask.setAttribute("class", "manager__task");
  managerTask.appendChild(managerHeader);
  managerHeader.setAttribute("class", "manager__header");
  managerHeader.appendChild(managerHeading);
  managerHeading.innerText = "Danh sách bài viết";
  managerHeader.appendChild(addCourse);
  addCourse.setAttribute("class", "add__course");
  addCourse.appendChild(addCourseLink)
  addCourseLink.href = "./add-post.html";
  addCourseLink.innerText = "Thêm bài viết";

  managerTask.appendChild(managerTable);
  managerTable.setAttribute("class", "manager__table");
  managerTable.appendChild(table);
  table.appendChild(tableRow);
  tableRow.insertAdjacentElement("beforeend", tableHeader1);
  tableRow.insertAdjacentElement("beforeend", tableHeader2);
  tableRow.insertAdjacentElement("beforeend", tableHeader3);
  tableRow.insertAdjacentElement("beforeend", tableHeader4);
  tableRow.insertAdjacentElement("beforeend", tableHeader5);
  tableRow.insertAdjacentElement("beforeend", tableHeader6);
  tableHeader1.setAttribute("class", "table--pad10");
  tableHeader1.innerText = "Tiêu đề";
  tableHeader2.innerText = "Hình ảnh";
  tableHeader3.innerText = "Mô tả";
  tableHeader4.innerText = "Danh mục";
  tableHeader5.innerText = "Trạng thái";
  tableHeader6.innerText = "Hành động";

  window.addEventListener("load", function () {
    const courseApi = "http://localhost:3000/posts";
    const categoryApi = "http://localhost:3000/categories";
    //page Update and Delete
    async function getCoursesManager() {
      try {
        const res = await fetch(courseApi);
        const data = await res.json();
        for (let item of data) {
          let template = `<tr>
                            <td class="table--title table--pad10"><p>${item.title}</p></td>
                            <td class="table--img"><img src="${item.image}" alt=""></td>
                            <td class="table--desc">${item.desc}</td>
                            <td class="table--category"></td>
                            <td class="table--status">
                                <input type="checkbox" name="" id="toggle">
                                <label for="toggle" class="toggle__lable"></label>
                            </td>
                            <td class="table--action">
                              <div class ="table--btn">
                                <button id="btnedit"><a href="./add-post.html?id=${item.id}">Sửa</a></button>
                                <button id="btndelete" onclick="deleteCourse('${item.id}')" class="course__delete">Xóa</button>
                              </div>
                            </td>
                        </tr>`;
          table.insertAdjacentHTML("beforeend", template);
        }
      } catch (err) {
        console.log("something was wrong");
      }
    }

    async function deleteCourse(id) {
      try {
        const responseDel = await fetch(`${courseApi}/${id}`, {
          method: "DELETE",
        });
        alert("Xóa thành công");
      } catch (error) {
        console.log(error);
      }
    }
    window.deleteCourse = deleteCourse;
    getCoursesManager();

    async function toggleButtonStatus() {
      const res = await fetch(categoryApi, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(),
      });
    }
  });
}
