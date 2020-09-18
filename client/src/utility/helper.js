function getFirstName(fullName) {
  let firstName = '';
  if (fullName) {
    for (let letter of fullName) {
      firstName = firstName + letter;
      if (letter === ' ') {
        return firstName;
      }
    }
  }
}

export default getFirstName;
