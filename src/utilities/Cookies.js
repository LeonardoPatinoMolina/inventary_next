export const addCookie =(value, days=3) => {
  
  const maxAge =  1000 * 60 * 60 * 24 * days;
  const cookieNew = `session=${value}; Max-Age=${maxAge}; Path=/`;
  document.cookie = cookieNew;
}
export const removeCookie = ()=>{
  document.cookie = `session=null; Max-Age=0; Path=/`;
}