import { loginurl, registerurl } from "../../routers/apiroutes";

export const registeruser=async({username,password,id,toast})=>{
    try {
        const res=await fetch(registerurl,{
            method:"POST",
            headers:{
                "Content-Type":"Application/json"
            },
            body:JSON.stringify({
              "username":username,
              "password":password,
              "personnel_id":id
            })
        });
        if(res.status==201){
            const data=await res.json();
            console.log(data);
            toast.success("Register successfully")
        }else{
            console.log(res);
            const data=await res.json();
            console.log(data)
            toast.error(data.message)
        }
    } catch (error) {
        console.log(error)
    }
}

export const loginuser=async({username,password,toast})=>{
    try {
        const res=await fetch(loginurl,{
            method:"POST",
            headers:{
                "Content-Type":"Application/json"
            },
            body:JSON.stringify({
              "username":username,
              "password":password,
             
            })
        });
        if(res.status==200){
            const data=await res.json();
            console.log(data);
            localStorage.setItem("username")
            toast.success("Login successfull")
        }else{
            console.log(res);
            const data=await res.json();
            console.log(data)
            toast.error(data.error)
        }
    } catch (error) {
        console.log(error)
    }
}