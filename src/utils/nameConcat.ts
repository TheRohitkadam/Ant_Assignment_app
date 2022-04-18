import capitalize from "./capitalize";

const nameConcat = (val: any) => {
    const name = capitalize(val.firstname) + " " + capitalize(val.lastname);
    delete val.firstname;
    delete val.lastname;
    return [name, val];
};

export default nameConcat