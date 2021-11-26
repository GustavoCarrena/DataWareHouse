window.onload = () =>  {

const url = 'http://localhost:3000/employees/employeesData'//ENDPOINT PROVISORIO
// const container = document.querySelector('tbody');
// let results = '';
const modalNewUser = new bootstrap.Modal(document.getElementById('modalNewUser'));
const formUsers = document.querySelector('form');
// const id = document.getElementById('Userid');; 
let firstname = document.getElementById('firstname');
let lastname = document.getElementById('lastname');
let email = document.getElementById('email');
let role = document.getElementById('role');
let password = document.getElementById('password');
let repeatPassword = document.getElementById('passwordr');
const btnDel = document.getElementById('btnDel'); 
const id = document.getElementsByClassName('id');
// const btnEdit = document.getElementById('btnEdit');

// const checks = document.querySelectorAll('tr td input.check');
// const box = document.getElementById('check')
// const rows = document.getElementsByClassName('trTable')
let option = '';
const checkUser = [];
const editUser = [];
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

        })

    } //FIN DEL "FOR"



//Resaltar filas
function checkedStyle(e,i) {
    const idTable = document.getElementById(`trTable${i}`);//Rows (iteradas)
    idTable.classList.toggle('rowchecked');//Alternancia on/off de toogle para pintar, despintar
}


//Actualizacion datos usuario
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

//Mostrar boton y limpiar campos al cancelar (modal Registro de Usuario)
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


//ordenar tabla








};//FIN ONLOAD