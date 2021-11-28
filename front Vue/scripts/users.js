window.onload = () =>  {

const url = 'http://localhost:3000/employees/employeesData'//ENDPOINT PROVISORIO

const usersTable = document.getElementById('usersTable'); //toda la tabla, con encabezados
const tableData = document.querySelector('tbody');//cuerpo de los datos de la tabla
const tableRows = document.getElementsByClassName('trTable');
const tableCells = document.getElementsByTagName('td');
const btnSortId = document.getElementById('btnSortId');
const btnSortFirstname= document.getElementById('btnSortFirstname')
const btnSortLastname= document.getElementById('btnSortLastname')
const btnSortEmail= document.getElementById('btnSortEmail')
const btnSortRole= document.getElementById('btnSortRole')

const modalNewUser = new bootstrap.Modal(document.getElementById('modalNewUser'));
const formUsers = document.querySelector('form');
let firstname = document.getElementById('firstname');
let lastname = document.getElementById('lastname');
let email = document.getElementById('email');
let role = document.getElementById('role');
let password = document.getElementById('password');
let repeatPassword = document.getElementById('passwordr');
const btnDel = document.getElementById('btnDel'); 
const id = document.getElementsByClassName('id');
let option = '';
const checkUser = [];
const editUser = [];
const orderUser = [];
//Mostrar resultados (body)
const showData = (users) => { //users porque trae los datos del fetch e ingresa como parametro para aplicarlo a la función
    // console.log(users);
    let n = 0; //Provisorio hasta que obtenga ids de los endoints (ahora no está en uso)
    let tbody = document.getElementById('tbody');//Lo trae del HTML
    for (let i = 0; i < users.length; i++) {
        let newItem = document.createElement('tr');//Crea row y al declarar newitem, todo va a depender de este row(tr)
        newItem.classList.add('trTable');//Agrega class (para identificarla, no para darle estilo css)
        newItem.setAttribute('id', `trTable${i}`);//Agrega atributo = id (para identificarlo) al Tag Padre (newItem = Tr)
        newItem.innerHTML=`
            <td class="tabled">
                <input type="checkbox" name="checkInput" class="check" id="check${i}">
            </td>
            <td class="id" style="text-align:center">${users[i].id}</td>
            <td>${users[i].firstname}</td>
            <td>${users[i].lastname}</td>
            <td>${users[i].email}</td>
            <td>${users[i].role_description}</td>
            <td class="text-center">
            <a id="btnEdit${i}" class="btnEdit btn btn-primary">Editar</a>
            </td>`
        tbody.appendChild(newItem);//Agrega todos los tr = newItem (iterados) al cuerpo de la tabla (tbody)
        
        checkUser[i] = document.getElementById(`check${i}`);//Identifica en al array vacio (checkUser) los numeros de id de los checkbox
        checkUser[i].addEventListener('change', (e) =>{
            checkedStyle(e,i);
        })//Evento (pintar las filas) al cambiar estado (toggle) de los checkbox
    
        editUser[i] = document.getElementById(`btnEdit${i}`);
        editUser[i].addEventListener('click', (e) => {
            selectEditData(e,i);
        })//Evento datos del usuario al modal 



    } //FIN DEL "FOR"

//ordenar tabla
let sortDirection = false;

btnSortId.addEventListener('click', () => {
    console.log('btnSortId');
})

btnSortLastname.addEventListener('click', () => {
    console.log('btnSortId');
})

btnSortEmail.addEventListener('click', () => {
    console.log('btnSortEmail');
})
btnSortRole.addEventListener('click', () => {
    console.log('btnSortRole');
})

let sortDefined;

btnSortFirstname.addEventListener("click", function (e) {
    order(e)
});

function order() {
    let arrayName=[];
    let arrayLastName=[];
    let arrayId=[];
    let arrayEmail=[];
    let arrayRole=[];


    for (let i = 0; i < tableRows.length; i++) {
        let id = parseInt(tableRows[i].children[1].innerHTML)
        let name = tableRows[i].children[2].innerHTML.toString()
        let lastname = tableRows[i].children[3].innerHTML.toString()
        let email = tableRows[i].children[4].innerHTML.toString()
        let role = tableRows[i].children[5].innerHTML.toString()

        // arrayCheck.push(check);
        arrayId.push(id);
        arrayName.push(name.toLowerCase());
        arrayLastName.push(lastname.toLowerCase());
        arrayEmail.push(email.toLowerCase());
        arrayRole.push(role);
        arrayOrder(arrayId)
        arrayOrder(arrayName)
        arrayOrder(arrayLastName)
        arrayOrder(arrayEmail)
        arrayOrder(arrayRole)
    }
    
    function arrayOrder(e) {
        
        if (sortDefined == undefined || sortDefined == true) {
            e.sort((a,b)=>{ if (a > b) {return 1} if (a < b) {return -1} return 0});
            sortDefined = false;
        } else {
            e.sort((a,b)=>{ if (a > b) {return -1} if (a < b) {return 1} return 0});
            sortDefined = true;
        }
        
    }


        console.log('arrayId=>',arrayId);
        // console.log('arrayName=>',arrayName);
        // console.log('arrayLastName=>',arrayLastName); 
        // console.log('arrayEmail=>',arrayEmail);
        // console.log('arrayLaarrayRolestName=>',arrayRole);
        
}

//Resaltar filas
function checkedStyle(e,i) {
    const idTable = document.getElementById(`trTable${i}`);//Rows (iteradas)
    idTable.classList.toggle('rowchecked');//Alternancia on/off de toogle para pintar, despintar
}


//Actualizacion datos usuario (modal)
function selectEditData(e,i) {
    const idTable = document.getElementById(`trTable${i}`);
    const firstnameForm = idTable.children[2].innerHTML;
    firstname.value = firstnameForm;
    const lastnameForm = idTable.children[3].innerHTML;
    lastname.value = lastnameForm;
    const emailForm = idTable.children[4].innerHTML;
    email.value = emailForm;
    const roleForm = idTable.children[5].innerHTML;
    role.value = roleForm;
    const passwordForm = users[i].user_pass;
    password.value = passwordForm;
    const modalHeader =  document.getElementById('exampleModalLabel');
    modalHeader.innerHTML = 'Edición de Usuario'
    modalNewUser.show();
    option = 'edit';
}

//Mostrar boton y limpiar campos al cancelar (modal)
btnCreate.addEventListener('click',()=>{
    firstname.value = '';
    lastname.value = '';
    email.value = '';
    role.value = '';
    password.value = '';
    repeatPassword.value = '';
    const modalHeader =  document.getElementById('exampleModalLabel');
    modalHeader.innerHTML = 'Registro de Usuario'
    modalNewUser.show();
    option = 'register';
});

formUsers.addEventListener('submit', (e) =>{
    e.preventDefault()
    if (option == 'edit') {
        selectEditData(e,i);

    }
})







//Comportamiento boton eliminar id seleccionados con los checkbox (VER COMO TRAER LOS ID REALES DE LA DB)
btnDel.addEventListener('click', () => {
alertify.confirm('CONFIRMAR ELIMINACION DEL REGISTRO', 'El registro se eliminará permanentemente',

function () {
    let array = [];
    for (let i = 0; i < users.length; i++) {
        checkedRows = document.getElementById(`check${i}`) //Id de checkbox
        if (checkedRows.checked == true) {
            const userId = parseInt(id[i].innerHTML); //Extrae el numero de id de la columna usuarios de la tabla
            array.push(userId); //Insera en array los Id extraidos
        } 
    };
    //OJO.. SI EL ARRAY ES VACÍO, PONER CONDICIONAL PARA QUE NO VIAJE AL BACK, PARA QUE NO DEVUELVA ERROR
    if (array.length > 0) {
        alertify.success('Registro Eliminado')
    } else{
        array = '';//aca indicar que no tome el fetch
        alertify.error('Sin selección de registros Operación Cancelada')
    }
    console.log('array=>', array) //Aca va el Fetch de eliminación?? (ver cuando traiga fetch)
},
function () {
    alertify.error('Eliminación Cancelada')
});
});








}//FIN SHOWDATA

//Datos de contenido de tabla (GET-SHOWDATA)
fetch(url)
    .then (response => response.json())
    .then(data => showData(data.response))
    .catch(error => error);









};//FIN ONLOAD