// Object.assign to create a new object by copying the existed object
// to the new object without blending in

let old_movie = {title: 'Old Movie'}
let other_movie = Object.assign({}, old_movie)

console.log(JSON.stringify(old_movie));
console.log(JSON.stringify(other_movie));

other_movie.title = 'Other Movie'
console.log(JSON.stringify(old_movie));
console.log(JSON.stringify(other_movie));