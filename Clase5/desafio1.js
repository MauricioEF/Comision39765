const obj = {};

for(let i=0;i<10000;i++){
    const randomNumber = Math.floor(Math.random()*20+1);
    if(!obj[randomNumber]) obj[randomNumber] = 1;
    else obj[randomNumber]++;
}

console.log(obj);