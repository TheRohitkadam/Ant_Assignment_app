
const valConvert = (value: any) => {
    const val =
        value.length !== 1 ? `${value[0]} +${value.length - 1}` : `${value[0]}`;
    return val;
};

export default valConvert