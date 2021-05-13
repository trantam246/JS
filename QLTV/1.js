var library = [
    {
       id:0,
       books:[0,1,2,3]
    },
    {
       id:1,
       books:[4,5,6]
    }
];

var books = [
   {
       id: 0,
       title: 'Coders-Tokyo',
       author: 'Thinh Pham',
       shelfId: 0
     },
     {
       id: 1,
       title: 'JavaScript',
       author: 'Thinh Pham',
       shelfId: 0
     },
     {
       id: 2,
       title: 'CSS-Thinh Pham',
       author: 'Thinh Pham',
       shelfId: 1
     },
     {
       id: 3,
       title: 'Conan',
       author: 'Aoyama Gosho',
       shelfId: 0
     },
     {
       id: 4,
       title: 'Naruto',
       author: 'Masashi Kishimoto',
       shelfId: 0
     },
     {
       id: 5,
       title: 'Harry Potter',
       author: 'J. K. Rowling',
       shelfId: 1
     },
     {
       id: 6,
       title: 'Harry Potter II',
       author: 'J. K. Rowling',
       shelfId: 1
     },
];

var users = [
   {
     id: 0,
     userName: 'Ha Tran',
     password: '0210',
     borrowedBooks: [1,5]
   },
   {
     id: 1,
     userName: 'Huy Duong',
     passWord: '1711',
     borrowedBooks: [2,3]
   },
   {
     id: 2,
     useName: 'Chin Ho',
     passWord: '0240',
     borrowedBooks: [3,4]
   },
   {
       id: 3,
       useName: 'Tran Tran',
       passWord: '1511',
       borrowedBooks: [2,4]
     }
 ];

 var borrowedBooks = [
   {
     id: 1,
     borrowFor: 3,
     dayLeft: -2,
     user: 0,
     borrowedAt: 'Sep 8 2018 07:20'
   },
   {
     id: 5,
     borrowFor: 2,
     dayLeft: 1,
     user: 0,
     borrowedAt: 'Sep 9 2018 07:21'
   },
   {
     id: 2,
     borrowFor: 5,
     dayLeft: -1,
     user: 1,
     borrowedAt: 'Sep 10 2018 09:20'
   },
   {
     id: 3,
     borrowFor: 3,
     dayLeft: -2,
     user: 1,
     borrowedAt: 'Sep 10 2018 09:20'
   }
 ];

 var history = [
   {
     id: 0,
     bookId: 1,
     user: 0,
     borrowedAt: 'Sep 8 2018 07:20',
     returnedAt: 'Sep 10 2018 9:20'
   }
 ];

 function getDaysOverDue(userName){
   var getUser = users.find(function(x){
       return x.userName === userName;
   });

   var books = borrowedBooks.filter(function(x){
       return getUser.id === x.user && x.dayLeft < 0;
   });

   var dayLeft = books.reduce((x, y) => {
       return x + Math.abs(y.dayLeft);
     }, 0);
     console.log(`Books borrowed by ${userName} has been overdue for ${dayLeft} day(s)`);
 }

getDaysOverDue('Ha Tran');
getDaysOverDue('Huy Duong');


function getHistory() {
   for (let data of history) {
     var book = data.bookId;
     dataBook = books.find(x => {
       return x.id === book;
     });
 
     var user = data.user;
     dataUser = users.find(x => {
       return x.id === user;
     });
 
     console.log(`${dataUser.userName} borrowed a book named '${dataBook.title}' at ${data.borrowedAt} and returned it at ${data.returnedAt}.`);
   }
   
 }
 
 getHistory();