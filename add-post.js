window.addEventListener("load", async function () {
  const root = this.document.querySelector("#root");
  const courseApi = "http://localhost:3000/posts";
  const url = new URLSearchParams(window.location.search).get("id");
  const form = document.querySelector(".form");
  //obj
  async function renderCourse(url) {
    if (!url) return;
    try {
      const header = document.querySelector(".course__header");
      header.innerText = "Sửa bài viết"
      const response = await fetch(`${courseApi}/${url}`);
      const data = await response.json();
      form.elements["title"].value = data.title;
      form.elements["image"].value = data.image;
      form.elements["desc"].value = data.desc;
      tinymce.get("content").setContent(data.content)
      form.elements["status"].value = data.status;
      form.elements["category"].value = data.category;
    } catch (err) {
      console.log(err);
    }
  }

  await renderCourse(url);
  // console.log(url);
  const saveCourse = document.querySelector("#submit");
  saveCourse.addEventListener("click", async function (e) {
    e.preventDefault();
    let postData = {
      title: document.getElementById("title").value,
      url: slugify(document.getElementById("title").value),
      image: document.getElementById("image").value,
      desc: document.getElementById("desc").value,
      content:tinymce.get("content").getContent(),
      status: document.getElementById("status").value,
      category: document.getElementById("category").value,
      createdAt: new Date().toISOString(),
    };

    return courseApi?await addNewCourse(postData):await updateCourse(postData);
  });

  //add
  async function addNewCourse(postData) {
    try {
        await fetch(courseApi, {
        method: "POST",
        body: JSON.stringify(postData),
        headers: {
          "Content-Type": "application/json",
        },


      });
      
    } catch (error) {
      console.log(error);
    }
  }

  async function updateCourse(postData) {
    try {
      await fetch(`${courseApi}/${url}`, {
        method: "PUT",
        body: JSON.stringify(postData),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  //  renderCourse(url);
  function slugify(text) {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/[^\w\-]+/g, "") // Remove all non-word chars
      .replace(/\-\-+/g, "-") // Replace multiple - with single -
      .replace(/^-+/, "") // Trim - from start of text
      .replace(/-+$/, ""); // Trim - from end of text
  }
});
