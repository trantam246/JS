/**
 * Thiết kế database cho 1 hệ thống quản lý thư viện sách, cho biết thư viện này có hàng trăm giá sách khác nhau, sách được để ở bất kì giá nào không theo danh mục nào.
 * Mỗi cuốn sách có 1 mã khác nhau.
 * Hệ thống cho phép đăng ký người dùng mới, một người có thể mượn nhiều sách khác nhau trong một khoảng thời gian hữu hạn.
 * Hệ thống có thể lưu lịch sử ai đã mượn sách nào, bắt đầu mượn từ bao lâu, trả lúc nào.
 * Hệ thống có lưu lại số ngày quá hạn tổng cộng của 1 người dùng, ví dụ sách A quá 2 ngày, sách B quá 3 ngày -> tổng 5 ngày
 */
var dataBase = require('./createUser.js');
console.log(dataBase);
var readlineSync = require('readline-sync');
let fs = require('fs');
let loadData = ()=>{
 let read = fs.readFileSync('./data.txt',{encoding: 'utf8'});
 return JSON.parse(read);
}
let saveData = (data)=>{
  fs.writeFileSync('./data.txt',JSON.stringify(data),{encoding: 'utf8'});
}
var ID = 0;
let CreateUser = ()=>{
  let choose = '';
  do{
   var listUsers = loadData();
   let idUser = readlineSync.question('yourID: ');
  //  var i;
     var i = listUsers.findIndex(function(item){
      return item.ID == idUser;
    })
  //  console.log(listUsers.find(function(item){
  //    return item.id == idUser;
  //  }));
   if(i === -1)
   {
    let Name = readlineSync.question('yourName: ');
    let Age = readlineSync.question('yourAge: ');
    let user = {
      borrowBooks: [

      ],
      sumTimeBorrow : (borrowBooks)=>{
        let newArray = borrowBooks.reduce((a,b)=>{
          return a + b.timeBorrow;
        },0);
      }
    }
    user.name = Name;
    user.age = parseInt(Age);
    user.ID = idUser;
    idBook = readlineSync.question("choose the ID book you want to borrow: ");
   var bookIsRequired = dataBase.find(function(item){
     return item.id == idBook;
   })
   user.borrowBooks.push(bookIsRequired);
   listUsers.push(user);
   }
   else {
     idBook = readlineSync.question("choose the ID book you want to borrow: ");
   var bookIsRequired = dataBase.find(function(item){
     return item.id == idBook;
   })
   listUsers[i].borrowBooks.push(bookIsRequired);
   }
   choose = readlineSync.question('do you want to continue ? >> choose(1) to continue >>> choose(!1) to exits ');
   saveData(listUsers);
  } while(choose==='1');
 loadData();
}
CreateUser();
// khi người dùng mượn sách thì id sẽ vào borrowBooks

