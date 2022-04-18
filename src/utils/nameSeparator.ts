const nameSeparator = (val: string) => {
    let [first, last] = val.split(/<[/\w\s-]+>|\s/g);
    return [first, last];
};

export default nameSeparator