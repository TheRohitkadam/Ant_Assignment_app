export default function userNameConcat (data: {title: string, first: string, last: string}){
  const name = data.title + " " + data.first + " " + data.last
  return name.toString()
}