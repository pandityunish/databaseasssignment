import { loginurl, problemtype, registerurl } from "../../routers/apiroutes";

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

export const loginuser=async({username,password,toast,navigate})=>{
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
            console.log(data)
            console.log(data.user.personnel_id);
            localStorage.setItem("username",username);
            localStorage.setItem("personnel_id",data.user.personnel_id)
            toast.success("Login successfull");
            navigate("/home")
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

export const addproblemtypes=async({name,toast})=>{
    try {
        const res=await fetch(problemtype,{
            method:"POST",
            headers:{
                "Content-Type":"Application/json"
            },
            body:JSON.stringify({
              "problem_type_name":name,
              
             
            })
        });
        if(res.status==200){
            const data=await res.json();
            console.log(data);
           
            toast.success("Added successfull");
           
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