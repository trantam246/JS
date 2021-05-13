/**
 * Sử dụng kiến thức đã học, tạo ra một ứng dụng danh bạ điện thoại, có các chức năng:
 * - Nhập dữ liệu contact (name, phone number)
 * - Sửa dữ liệu contact
 * - Xoá contact
 * - Tìm kiếm contact: có thể nhập vào tên (không dấu hoặc có dấu, chữ hoa hoặc chữ thường vẫn cho ra kết quả) hoặc 1 phần số điện thoại
 */
var fs = require('fs');
var readlineSync = require('readline-sync')
var data = fs.readFileSync('./data.json','utf8')
var loadData = JSON.parse(data)
function showMenu(){
    console.log("\t\t\t<======== Menu danh ba =========>");
    console.log("1. Xem tat ca lien he");
    console.log("2. Sua lien he");
    console.log("3. Tim kiem lien he");
    console.log("4. Them lien he moi");
    console.log("5. Xoa lien he")
    console.log("6. Luu lai va thoat ra")
    var choose = readlineSync.question('Ban hay nhap mot lua chon: ')
    switch(choose){
        case '1':
            showAll(loadData)
            showMenu()
            break
        case '2':
            update()
            showMenu()
            break
        case '3':
            find()
            showMenu()
            break
        case '4':
            insert()
            showMenu()
            break
        case '5':
            deleteContact()
            showMenu()
        case '6':
            saveExit()
            break
        default:
            console.log('Ban da nhap sai, vui long nhap lai!!!')
    }
}
function showAll(loadData){
    console.log('STT' + '--------------'+' NAME ' + '----------' + 'PHONE NUMBER')
    loadData.forEach(function(value, index){
        console.log((index + 1), '--------------', value.name, '----------', value.phone)
    })
}
function update(){
    var STT = parseInt(readlineSync.question('Nhap STT ban muon sua: '))
    var newName = readlineSync.question('Name: ')
    var newPhone = readlineSync.question('Phone: ')
    for(var i = 0; i < loadData.length; i++){
        if((i + 1) === STT){
            loadData[i].name = newName
            loadData[i].phone = newPhone
        }
    }
}
function find(){
    var findName = readlineSync.question('Nhap ten ban muon tim: ')
    var findedList = loadData.filter(function(value){
        return value.name.toUpperCase() === findName.toUpperCase()
    })
    showAll(findedList)
}
function insert(){
    var newContact = {
        name: readlineSync.question('Name: '),
        phone: readlineSync.question('Phone: ')
    }
    loadData.push(newContact)
    return loadData
}
function deleteContact(){
    var posDelete = readlineSync.question('Nhap STT ban muon xoa: ')
    loadData.splice(posDelete - 1, 1)
}
function saveExit(){
    data = JSON.stringify(loadData)
    fs.writeFileSync('./data.json', data)
}
function main(){
    showMenu()
}
main()