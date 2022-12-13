import React from "react";
const requirements = {
  isRequired: (name, str) => {
    if (str.length === 0) {
      return `${name} is required`;
    }
    return;
  },
  isMinLenth: (name, str, minNum) => {
    if (str.length < minNum) {
      return `${name} should be at least ${minNum} characters`;
    }
    return;
  },
  noDigit: (name, str) => {
    const reg = /^[A-Za-z]+$/;
    const test = reg.test(str);

    if (!test) {
      return `no numbers or special characters are allow in ${name}`;
    }
  },
  isSex: (name, str) => {
    if (str !== "female" && str !== "male") {
      return `type in "female" or "male"`;
    }
    return;
  },
  isAge: (name, str) => {
    const test = /^[1-9][0-9]?$|^100$/.test(str);
    if (!test) {
      return `type in a number between 1 to 100`;
    }
  },
  validPassword: (name, str) => {
    const test = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(str);
    if (!test) {
      return `a valid ${name} must contain at least 8 characters with numbers, lower case and upper case letters`;
    }
  },
  isSame: (name, str1, str2) => {
    if (str1 !== str2) {
      return `make sure to type as same as the password`;
    }
  },
};
export { requirements };

const Validation = ({}) => {
  return <div></div>;
};
export { Validation };
