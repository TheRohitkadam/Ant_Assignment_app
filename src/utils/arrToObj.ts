
const arrToObj = (arr: any[]) => {
    return arr.map((string, index) => ({ name: string, id: index }))
}

export default arrToObj