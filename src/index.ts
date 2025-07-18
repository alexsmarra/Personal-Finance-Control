// 
interface User {
   birthYear: number
}

// nos parâmetros, está dizendo que user tem que seguir a regra da interface User
function calculateAgeOfUser(user: User) {
   return new Date().getFullYear() - user.birthYear
}

calculateAgeOfUser({
   birthYear: 1976
})


