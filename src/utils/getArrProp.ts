import * as randomUserData from "../data/randomUsers.json"

const data: any = randomUserData;

const getArrProp = (arr: [], name: string) => {
    const countries = data.results.filter((item: any) => item.location.country === name)
    // const countries = [...new Set(countriesArr)]
    return countries.length
}
export default getArrProp