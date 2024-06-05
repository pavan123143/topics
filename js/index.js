//all global variables 
let allUserInfo = [];
let regForm =document.querySelector(".reg-form")
let allInput =regForm.querySelectorAll("input")
let regBtn = regForm.querySelector("button")

let loginForm =document.querySelector(".login-form")
let allLoginInput =loginForm.querySelectorAll("input")
let loginBtn = loginForm.querySelector("button")


// geting data localstorage

let db = localStorage.getItem("allUserInfo");
if (db!=null) {
   allUserInfo = JSON.parse(db);
}else{
   allUserInfo = [];
}
console.log(allUserInfo);


// registaration coding

regForm.onsubmit= (e)=>{
// e.preventDefault()
// let obj = {
//     fullName: allInput[0].value,
//     hotelName: allInput[1].value,
//     hotelRoom: allInput[2].value,
//     mobile: allInput[3].value,
//     email: allInput[4].value,
//     password: allInput[5].value,
// }
// allUserInfo.push(obj)
// console.log(allUserInfo)
// localStorage.setItem("allUserInfo",JSON.stringify(allUserInfo))
// regForm.reset("")

// for (let i = 0; i < allInput.length; i++) {
//    let key = allInput[i].name;
   
//    data[key] = allInput[i].value;
// }
// console.log(data )
e.preventDefault()
let checkEmail = allUserInfo.find((data)=>{
   return data.email == allInput[4].value
})
// console.log(checkEmail)
if (checkEmail == undefined) {
   let data ={};
for(let el of allInput){
   let key = el.name;
   data[key] = el.value;
}
regBtn.innerHTML = "Proccessing..."
setTimeout(()=>{
   regBtn.innerHTML = "Register";
   allUserInfo.push(data)
   localStorage.setItem("allUserInfo",JSON.stringify(allUserInfo))
   swal("Good Job !","Registaration Success","success");
   regForm.reset("");
},2000)


}
else{
   swal("Failed !","Email allredy Register","warning");
}

}

loginForm.onsubmit =(e)=>{
e.preventDefault();
if (allLoginInput[0].value !="") {

   if (allLoginInput[1].value !="") {
      //check email in data base
      let checkemail = allUserInfo.find((data)=>{
       return data.email == allLoginInput[0].value;
      })
      if (checkemail !=undefined) {
         // match password
         // console.log(checkemail)
         if (checkemail.password == allLoginInput[1].value) {
            loginBtn.innerText = "please wait...";
            setTimeout(()=>{
               loginBtn.innerText = "Login";
               window.location ="profile/profile.html"
               checkemail.password = null
               sessionStorage.setItem("session_data",JSON.stringify(checkemail))
            },2000)
         }
         else{
            swal("Warning", "Please Enter Correct Password !", "warning")
         }

      } else {
         swal("Warning", "Please Enter Correct Email !", "warning")
      }
   }else{
      swal("Warning", "Password Is Empty", "warning") 
   }
}else{
   swal("Warning", "Email Is Empty", "warning")
}

}


