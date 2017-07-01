console.log('Starting app');

setTimeout(() => { //callback func
    console.log('Inside of callback');
},2000); //milliseconds

setTimeout(() => {
    console.log('No delays hehe');
},0);

console.log('Finishing up');