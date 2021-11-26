window.onload = () =>  {

const url = 'http://localhost:3000/employees/getRoleDescription'//ENDPOINT PROVISORIO
// const container = document.querySelector('tbody');
// let results = '';
const modalNewUser = new bootstrap.Modal(document.getElementById('modalNewUser'));
const formUsers = document.querySelector('form');
// const id = document.getElementById('Userid');; //VER COMO TRAERLO UNA VEZ QUE SE AUTOGENERE (REGISTRO) + LOS QUE YA ESTAN EN LA DB 
const name = document.getElementById('name');
const lastname = document.getElementById('lastname');
const email = document.getElementById('email');
const role = document.getElementById('role');
const password = document.getElementById('password');
const repeatPassword = document.getElementById('passwordr');
const btnDel = document.getElementById('btnDel'); 
const id = document.getElementsByClassName('id');
// const btnEdit = document.getElementById('btnEdit');

// const checks = document.querySelectorAll('tr td input.check');
// const box = document.getElementById('check')
// const rows = document.getElementsByClassName('trTable')
let option = '';

//Mostrar boton y limpiar campos al cancelar (modal Registro de Usuario)
btnCreate.addEventListener('click',()=>{
    name.value = '';
    lastname.value = '';
    email.value = '';
    role.value = '';
    password.value = '';
    repeatPassword.value = '';
    modalNewUser.show();
    option = 'register';
});

const checkUser = [];

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
            <td class="id" style="text-align:center">${i}</td>
            <td>NombreUser ${i}</td>
            <td>${'Apellido Usuario'}</td>
            <td>${'email@email.com'}</td>
            <td>${users[i].id}</td>
            <td class="text-center">
            <a id="btnEdit${i}" class="btnEdit btn btn-primary">Editar</a>
            </td>`
        tbody.appendChild(newItem);//Agrega todos los tr = newItem (iterados) al cuerpo de la tabla (tbody)
        checkUser[i] = document.getElementById(`check${i}`);//Identifica en al array vacio (checkUser) los numeros de id de los checkbox
        checkUser[i].addEventListener('change', (e) =>{
        checkedStyle(e,i);
        })//Evento (pintar las filas) al cambiar estado (toggle) de los checkbox
    } //FIN DEL "FOR"



//Resaltar filas
function checkedStyle(e,i) {
    const idTable = document.getElementById(`trTable${i}`);//Rows (iteradas)
    idTable.classList.toggle('rowchecked');//Alternancia on/off de toogle para pintar, despintar
}

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
    console.log('array=>', array) //Aca va el Fetch de eliminación?? (ver cuando traiga fetch)
    alertify.success('Registro Eliminado')
},
function () {
    alertify.error('Eliminación Cancelada')
});
});


//edicion de registros
const btnEdit = document.getElementsByClassName('btnEdit')

for (let i = 0; i < btnEdit.length; i++) {
    btnEdit[i].addEventListener('click', (e) =>{
        
        for (let i = 0; i < btnEdit.length; i++) {
            
            console.log(e.path[i].id);//id del boton
        }
        
        
        // selectData(e,i);//invoca funcion de abajo
    })

    //ver funcionalidad - Actualizacion
    function selectData(e,i) {
 //elegir segun id tota la info de tbody
 

 
 const idTable = document.getElementById(`trTable${1}`);
 
 
 const name = idTable.children[2].innerHTML
 console.log(name);
 const latsname = idTable.children[3].innerHTML
 console.log(latsname);
 const email = idTable.children[4].innerHTML
 console.log(email);
 const role = idTable.children[5].innerHTML
 console.log(role);
 const password = idTable.children[6].innerHTML//agregar password a la tabla (ver como si es conveniente codificarla del lado del cliente)
 console.log(password);
 const confirmPassword = idTable.children[7].innerHTML//este no agreagarlo, pero hacer funcion para validar que se igual al anterior
 console.log(confirmPassword);
 //una vez terminado a lo de arriba, subirlo al modal para que muestre los datos
}
// selectData()
    
    
}



}//FIN SHOWDATA

//Datos de contenido de tabla (GET-SHOWDATA)
fetch(url)
    .then (response => response.json())
    .then(data => showData(data.response))
    .catch(error => error);



    
    // console.log('btnEdit');

    // btnEdit.addEventListener('click', () => {
    //     console.log('hola');
    // })









};//FIN ONLOAD