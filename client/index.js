/* eslint-disable no-alert */
/* eslint-disable no-console */
import './style/style.css';
import './style/mystyle.css';

console.log('webpack esta en funcionamiento');
// Default parameters ES6/2015
const show = (m = 'hot Module replace working') => {
  alert(m);
};
show();
// Agregando una promesa
function resolverAfter2Seconds() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('resolve');
    }, 2000);
  });
}

async function asyncCall() {
  console.log('Llamando la funcion async');
  const result = await resolverAfter2Seconds();
  console.log(result);
}
asyncCall();
