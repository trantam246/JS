var fs = require('fs');
var readlineSync = require('readline-sync');
const {table} = require('table');
var data = fs.readFileSync('./data.json', 'utf8');
loadData = JSON.parse(data)
console.log('loadData', loadData)
function showMenu() {
    var menu =  [['1. Show all students','2. Create a new student','3. Sort age', '4. Sort Name', '5. Delete a student', '6. Update a student', '7. Find student', '8. Save and Exit']]
    console.log(table(menu))
    var option = readlineSync.question('what option do you want to choose?')
    switch(option) {
        case '1':
            showAllStudents(loadData)
            showMenu()
            break;
        case '2':
            createStudent();
            showMenu();
            break;
        case '3':
            sortAge();
            showMenu();
            break;
        case '4':
            sortName();
            showMenu();
            break;
        case '5':
            deleteStudent();
            showMenu();
            break;
        case '6':
            updateStudent();
            showMenu();
            break;
        case '7':
            findStudent();
            showMenu();
            break;
        case '8':
            saveAndExit();
            break;
        default:
            console.log('<----------ERROR--------->')
    }
}

function showAllStudents(loadData) {
    var title = [['STT','MSV', 'NAME', 'AGE', 'CLASS']]
    console.log(table(title))
    var myArr = [];
    var load = loadData.forEach(function(value, index) {
         show = [index + 1, value.msv, value.name, value.age, value.class]
        myArr.push(show)
    })
    if(myArr.length !== 0) 
        console.log(table(myArr))
}
function createStudent(){
        var newMSV = readlineSync.question('MSV: ');
        var newName = readlineSync.question('Name: ');
        var newAge = readlineSync.question('Age: ');
        var newClass = readlineSync.question('Class: ');
        var newStudent = {
            msv: newMSV,
            name: newName,
            age: newAge,
            class: newClass
        }
    loadData.push(newStudent)
}
function sortAge(){
    return loadData.sort((a,b) => a.age - b.age)
}
function sortName(){
    loadData.sort(function(a,b){
        var nameA = a.name.toLowerCase()
        var nameB = b.name.toLowerCase()
        if(nameA < nameB)
            return -1
        else if(nameA > nameB)
            return 1
        return 0
    })
}
function deleteStudent(){
    var position = readlineSync.question('Enter the location you want to delete: ')
    loadData.splice(position - 1, 1 )
    return loadData
}

function updateStudent(){
    var position = readlineSync.question('Enter the location you want to update: ')
    if((position) <= loadData.length){
        var newMSV = readlineSync.question('MSV: ');
        var newName = readlineSync.question('Name: ');
        var newAge = readlineSync.question('Age: ');
        var newClass = readlineSync.question('Class: ');
        var newStudent = {
            msv: newMSV,
            name: newName,
            age: newAge,
            class: newClass
        }
        return loadData.splice(position - 1, 1, newStudent)
    }
    else
        console.log('ERROR--->!!!! The location you entered is not in the list!!!!')
}
function findStudent(){
    var findSomething = readlineSync.question('what do you find(msv, name, age, class):')
    if(findSomething.toLowerCase() === 'msv'){
        var findMSV = readlineSync.question('Enter msv you want to find: ')
        var findedMSV = loadData.filter(function(value){
            return value.msv === findMSV
        })
        showAllStudents(findedMSV)
    }
    if(findSomething.toLowerCase() === 'name'){
        var findName = readlineSync.question('Enter name you want to find: ')
        var findedName = loadData.filter(function(value){
            return value.name.toLowerCase() === findName.toLowerCase();
        })
        showAllStudents(findedName)
    }
    if(findSomething.toLowerCase() === 'age'){
        var findAge = parseInt(readlineSync.question('Enter age you want to find: '))
        var findedAge = loadData.filter(function(value){
            return value.age === findAge
        })
        showAllStudents(findedAge)
    }
    if(findSomething.toLowerCase() === 'class'){
        var findClass = readlineSync.question('Enter class you want to find:')
        var findedClass = loadData.filter(function(value){
            return value.class === findClass
        })
        showAllStudents(findedClass)
    }
}
function saveAndExit(){
    data = JSON.stringify(loadData)
    fs.writeFileSync('./data.json',data)
}
function main(){
   showMenu()
}
main()
