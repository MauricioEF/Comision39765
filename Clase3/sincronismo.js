function a () {
    console.log(1);// aquí
    b();
    console.log(2);// aquí
}
function b () {
    console.log(3); // aquí
    c();
    console.log(4);// aquí
}

function c() {
    console.log(5); // aquí
}

a();

//Sincronismo => OPERACIÓN BLOQUEANTE