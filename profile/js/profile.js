// all global varriable
let userInfo;
let user;
let allBData=[];
let navBrand = document.querySelector(".navbar-brand")
let logoutBtn = document.querySelector(".logout-btn")

// start booking coding
let bookingForm = document.querySelector(".booking-form")
let allBInput = bookingForm.querySelectorAll("input")
let bTextarea = bookingForm.querySelector("textarea")
// console.log(bTextarea)

let bListTbody = document.querySelector(".booking-list")

//modal close btn
let modalCloseBtn=document.querySelector(".modal-close-btn")

//check user is login session
let sessionData = sessionStorage.getItem("session_data");
if (sessionData ==null) {
    window.location = "../index.html";
}
userInfo = JSON.parse(sessionData)
navBrand.innerHTML = userInfo.hotelname;
user=userInfo.email.split("@")[0];
// console.log(user)

//logout coding

logoutBtn.onclick = ()=>{
   logoutBtn.innerHTML = "Please Wait...";
   setTimeout(()=>{
    logoutBtn.innerHTML = "Logout";
    sessionStorage.removeItem("session_data")
    window.location = "../index.html"
    
   },3000)
}
//getin data from storage
const fatchData  = (key)=>{
    if (localStorage.getItem(key)!=null) {
        let data =JSON.parse(localStorage.getItem(key))
        return data;
    }
    else{
        return [];
    }
}

 allBData = fatchData(user+"_allBData")
 console.log(allBData)
 
 // formated Date
 const formateDate =(data ,isTime)=>{
    const date= new Date(data)
    // console.log(isTime)
    let yy = date.getFullYear();
    let mm = date.getMonth()+1;
    let dd = date.getDate();
    let time = date.toLocaleTimeString();

    dd = dd < 10 ? "0"+dd : dd;
    mm = mm < 10 ? "0"+mm : mm;
    time = time < 10 ? "0"+time : time;

    return `${dd}-${mm}-${yy} ${isTime ? time : ""}`
 }

bookingForm.onsubmit=(e)=>{
    e.preventDefault()



let data = {
    notice:bTextarea.value,
    createdAt : new Date()
};

for (const el of allBInput) {
    let key = el.name;
    let value= el.value;
    data[key]= value;
}




allBData.push(data)
console.log(allBData)
localStorage.setItem(user+"_allBData",JSON.stringify(allBData))
swal("Good Job !","Booking success", "success")
bookingForm.reset("")
modalCloseBtn.click()
showBookingList()

}
console.log(allBData)

// booking delete coding
const deleteBDatafunc = ()=>{
    let  allBdelBtn = bListTbody.querySelectorAll(".del-btn");
// console.log(allBdelBtn)
allBdelBtn.forEach((btn,index)=>{
 btn.onclick = ()=>{
   allBData.splice(index,1);
   localStorage.setItem(user+"_allBData",JSON.stringify(allBData))
   showBookingList()
 }
})
}

// show bookoin data

const showBookingList = ()=>{
    bListTbody.innerHTML="";
    allBData.forEach((item,index)=>{
        bListTbody.innerHTML += `<tr>
        <td class="text-nowrap">${index+1}</td>
        <td class="text-nowrap">${item.location}</td>
        <td class="text-nowrap">${item.roomNo}</td>
        <td class="text-nowrap">${item.fullname}</td>
        <td class="text-nowrap">${formateDate(item.checkInDate)}</td>
        <td class="text-nowrap">${formateDate(item.checkOutDate)}</td>
        <td class="text-nowrap">${item.totalPeople}</td>
        <td class="text-nowrap">${item.mobile}</td>
        <td class="text-nowrap">${item.price}</td>
        <td class="text-nowrap">${item.notice}</td>
        <td class="text-nowrap">${formateDate(item.createdAt,true)}</td>
        <td class="text-nowrap">
            <button class="btn btn-primary edit-btn  p-1 px-1"><i class="fa fa-check" aria-hidden="true"></i></button>
            <button class="btn btn-info check-btn p-1 px-1"><i class="fa fa-edit" aria-hidden="true"></i></button>
            <button class="btn btn-danger del-btn p-1 px-1"><i class="fa fa-trash" aria-hidden="true"></i></button>
        </td>
    </tr>`
    })
    deleteBDatafunc()
}
showBookingList()




