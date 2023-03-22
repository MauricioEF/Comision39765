const x = 1; //GLOBAL

const funcionScope = () =>{
    const x = 2;
    console.log(x);
}


const funcionScope2 = () =>{
    const x = 3;
    console.log(x);
}

const funcionScope3 = () =>{
    console.log(x);
}

funcionScope();
funcionScope2();
funcionScope3();
