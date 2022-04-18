const isoDateConvert = (val: string) => {
    const date = new Date(val).toLocaleDateString('en-GB')
    return date
}

export default isoDateConvert