export default function request(){
    const req = axios.create({
        baseURL: "http://localhost/MVC_final/back/public/",
        
        headers: { 'Authorization': window.localStorage.getItem("jwtToken")}
        
    }
    )
    return req;
}