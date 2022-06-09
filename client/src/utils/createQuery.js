const createQuery = (obj) => {
  let output = []
  for (let key in obj) {
    if (obj[key]) {
      if (key === "requiredSkills") {

        for (let i = 0; i < obj[key].length; i++) {
          output.push(`skills=${obj[key][i].id}`);
        }
      }else if(key === "educationLabel"){
        continue;
      }
      else {
        output.push(`${key}=${obj[key]}`);
      }
    }
  }

  let strOutput = '';
  output.forEach((element, index) => {
    if (index === 0) {
      strOutput += "?";
    } else {
      strOutput += "&";
    }
    strOutput += element;
  });

  return strOutput;
}

export default createQuery;