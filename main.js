import { EMPLOYEES } from "./MOCK_DATA.js";

let allEmployees = EMPLOYEES;

const listEmployee = document.querySelector(".listEmployee");
const location = document.querySelector(".currentPage");
const nextPage = document.querySelector(".nextPage");
const previousPage = document.querySelector(".previousPage");
const sortEmployeeAz = document.querySelector(".sort_a-z");
const sortEmployeeZa = document.querySelector(".sort_z-a");
const filterEmployee = document.querySelector(".filter-employee");
const inputEmployee = document.querySelector(".input-add-employee");
const inputJob = document.querySelector(".input-add-job");
const addEmployee = document.querySelector(".btn-add-employee");

let currentPage = 1; //trang hiện tại, set giá trị ban đầu = 1
let perPage = 40; // số employees trên 1 page
let totalPage = Math.ceil(allEmployees.length / perPage); // tổng số page cần để hiển thị hết

// add element vào DOM
function renderEmployees(listElementShowed, currentPage) {
  console.log(currentPage);

  // set các giá trị vào mảng listElementShowed để biểu diễn ở trang hiện tại
  const listElementShowedPerPage = getListElementShowedPerPage(listElementShowed, currentPage)

  //Render số employyee ở trang hiện tại trên tổng số employyes 
  renderCurrentPage(listElementShowed.length, currentPage, perPage);

  // chuyển trang sau khi nhấn next
  nextPage.onclick = () => (moveNextPage(listElementShowed, currentPage))

  // chuyển trang sau khi nhấn previos
  previousPage.onclick = () => (movePreviousPage(listElementShowed, currentPage))

  // Sắp xếp các thành viên theo tên a-z
  sortEmployeeAz.onclick = function () {
    const allEmployeesSortedAz = listElementShowed.sort((a, b) => {
      let c = a.name.trim().split(" ");
      let d = b.name.trim().split(" ");
      let e = !Number(c[c.length - 1]) ? c[c.length - 1] : c[c.length - 2];
      let f = !Number(d[d.length - 1]) ? d[d.length - 1] : d[d.length - 2];
      return ("" + e).localeCompare(f);
    });
    renderEmployees(allEmployeesSortedAz);
  };

  // Sắp xếp các thành viên theo tên z-a
  sortEmployeeZa.onclick = function () {
    const allEmployeesSortZa = listElementShowed.sort((a, b) => {
      let c = a.name.trim().split(" ");
      let d = b.name.trim().split(" ");
      let e = !Number(c[c.length - 1]) ? c[c.length - 1] : c[c.length - 2];
      let f = !Number(d[d.length - 1]) ? d[d.length - 1] : d[d.length - 2];
      return ("" + f).localeCompare(e);
    });
    renderEmployees(allEmployeesSortZa);
  };

  const html = listElementShowedPerPage.map(
    (employee) =>
      `<div class="employeeInlist">
            <div class="avatar-employee">
              ${getAvatar(employee.name)}
            </div>
            <div class="infor">
                <div class="infor-employee">
                    <p>${employee.name}</p>
                    <p>${employee.job}</p>
                    <div class="email">
                      <i class="fa-solid fa-envelope"></i>
                      <p>${employee.email}</p>
                    </div>
                </div>
                <button>Follow</button>
            </div>
        </div>`
  );
  listEmployee.innerHTML = html.join("");
}

// truyền vào mảng data gốc vào hàm renderEmployee để hiện thị (mặc định)
renderEmployees(allEmployees, currentPage);


// set các giá trị vào mảng listElementShowed để biểu diễn
function getListElementShowedPerPage(listElementShowed, currentPage) {
  return listElementShowed.slice(
    (currentPage - 1) * perPage,
    (currentPage - 1) * perPage + perPage
  );
}

// Render số employyee ở trang hiện tại trên tổng số employyes 
function renderCurrentPage(quantity, currentPage, perPage) {
  totalPage = Math.ceil(quantity / perPage);
  const beginNumber = (currentPage - 1) * perPage + 1;
  let endNumber =
    currentPage === totalPage && quantity % perPage !== 0
      ? (currentPage - 1) * perPage + (quantity % perPage)
      : (currentPage - 1) * perPage + perPage;
  location.innerHTML = `<p>${beginNumber}-${endNumber}/${quantity}</p>`;
}

// chuyển trang sau khi nhấn next
function moveNextPage(listElementShowed, currentPage) {
  if (currentPage >= 1 && currentPage < totalPage) {
    currentPage = currentPage + 1;
    renderEmployees(listElementShowed, currentPage);
  }
};

function movePreviousPage(listElementShowed, currentPage){
  if (currentPage > 1 && currentPage <= totalPage) {
    currentPage = currentPage - 1;
    renderEmployees(listElementShowed, currentPage);
  }
}


//Lấy ra chữ đầu trong tên của employee làm avatar
function getAvatar(name) {
  const nameSplit = name.trim().split(" ");
  const avatar = Number(nameSplit[nameSplit.length - 1])
    ? nameSplit[nameSplit.length - 2][0].toLocaleUpperCase()
    : nameSplit[nameSplit.length - 1][0].toLocaleUpperCase();
  return avatar;
}


//Filter Employee
filterEmployee.oninput = function (e) {
  currentPage = 1;
  const filterValue = e.target.value;
  const filterList = allEmployees.filter(
    (employee) =>
      employee.name.toLowerCase().search(filterValue.toLowerCase()) !== -1
  );
  renderEmployees(filterList);
};

//Add employee
addEmployee.onclick = function () {
  if (inputEmployee.value !== "" && inputJob.value !== "") {
    // Tìm Id lớn nhất trong mảng
    let idList = [];
    allEmployees.forEach((element) => {
      idList.push(element.id);
    });
    const maxId = Math.max(...idList);

    let name = inputEmployee.value.trim(); //Đặng Thị Minh Hòa
    let tenDuocChon;
    let emailDuocChon;
    let mangName = name.toLocaleLowerCase().split(" "); // ['đặng', 'thị', 'minh', 'hòa']
    let mangEmail =
      mangName.length > 1
        ? [mangName[mangName.length - 1], mangName[0]]
        : mangName; //['hòa', 'đặng']
    let tenEmail = loc_xoa_dau(mangEmail.join(".")); //'hoa.dang'
    let mangMangChu = [];
    let mangEmailGiong = [];

    allEmployees.forEach((element) => {
      const mangChu = element.name.toLocaleLowerCase().split(" "); //tách chuỗi tên trong data thành mảng
      mangMangChu.push(mangChu); //[['đặng', 'thị', 'minh', 'hòa'], ['đặng', 'thị', 'mỹ', 'linh'], ['đặng', 'thị', 'ngọc'],...]
      // thêm các email giống email theo tên vừa nhập vào mảng
      if (element.email) {
        if (
          element.email.indexOf(tenEmail) === 0 &&
          (Number(element.email[tenEmail.length]) ||
            element.email.indexOf("@") === tenEmail.length)
        ) {
          mangEmailGiong.push(element.email); //['hoa.dang@ntq-solution.com.vn', 'hoa.dang2@ntq-solution.com.vn', 'hoa.dang5@ntq-solution.com.vn']
        }
      }
    });

    let mangTenGiong = [];
    mangMangChu.forEach((element) => {
      if (
        JSON.stringify(element) === JSON.stringify(mangName) ||
        (Number(element[element.length - 1]) && JSON.stringify(element.slice(0, -1)) === JSON.stringify(mangName))
      ) {
        mangTenGiong.push(element); //[['đặng', 'thị', 'minh', 'hòa'], ['đặng', 'thị', 'minh', 'hòa', '2'], ['đặng', 'thị', 'minh', 'hòa', '4']]
      }
    });

    let mangSo = [0];
    if (mangTenGiong.length === 0) {
      tenDuocChon = name;
    } else {
      mangTenGiong.forEach((element) => {
        element.forEach((e) => {
          if (Number(e)) {
            mangSo.push(e); //[2, 4]
          }
        });
      });
      mangSo.sort((a, b) => {
        return Number(a) - Number(b);
      });
      tenDuocChon = name + " " + (Number(mangSo[mangSo.length - 1]) + 1); // Đặng Thị Minh Hòa 5
    }

    let mangSoEmail = [0];
    if (mangEmailGiong.length === 0) {
      emailDuocChon = tenEmail + "@ntq-solution.com.vn";
    } else {
      mangEmailGiong.forEach((element) => {
        if (/[0-9]/.test(element)) {
          const soCuaEmail = parseInt(element.replace(/[^0-9]/g, ""));
          mangSoEmail.push(soCuaEmail); //[2, 5]
        }
      });
      mangSoEmail.sort((a, b) => a - b);
      emailDuocChon =
        tenEmail +
        (mangSoEmail[mangSoEmail.length - 1] + 1) +
        "@ntq-solution.com.vn"; //'hoa.dang6@ntq-solution.com.vn'
    }

    const jobNewEmployee = inputJob.value;

    allEmployees.unshift({
      id: maxId + 1,
      name: tenDuocChon,
      email: emailDuocChon,
      job: jobNewEmployee,
    });
    inputEmployee.value = "";
    inputJob.value = "";
  }

  renderEmployees(allEmployees);
};

function loc_xoa_dau(str) {
  // Gộp nhiều dấu space thành 1 space
  str = str.replace(/\s+/g, " ");
  // loại bỏ toàn bộ dấu space (nếu có) ở 2 đầu của chuỗi
  str = str.trim();
  // bắt đầu xóa dấu tiếng việt  trong chuỗi
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  return str;
}
