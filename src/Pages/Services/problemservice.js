import { addproblemurl, getallproblemsurl, getallspecailisturl, getproblemdetailsurl, getproblemtype, getspecialistproblemurl, updatespecialisturl } from "../../routers/apiroutes"

export const getallproblemstype=async({setproblemtypes})=>{
    try {
        const res=await fetch(getproblemtype,{
            method:"GET",

        });
        if(res.status===200){
            const data=await res.json();
            console.log(data)
         setproblemtypes(data)
        }else{
            console.log(res)
        }
    } catch (error) {
        console.log(error)
    }
}
export const getallproblems=async({setproblem})=>{
    try {
        const res=await fetch(getallproblemsurl,{
            method:"GET",

        });
        if(res.status===200){
            const data=await res.json();
            console.log(data)
         setproblem(data)
        }else{
            console.log(res)
        }
    } catch (error) {
        console.log(error)
    }
}
export const getallspecialissts=async({setspecialist})=>{
    try {
        const res=await fetch(getallspecailisturl,{
            method:"GET",

        });
        if(res.status===200){
            const data=await res.json();
            console.log(data)
            setspecialist(data)
        }else{
            console.log(res)
        }
    } catch (error) {
        console.log(error)
    }
}
export const getspecialistproblem=async({setspecialist,id})=>{
    try {
        console.log(id)
        const res=await fetch(getspecialistproblemurl,{
            method:"POST",
            headers:{
                "Content-Type":"Application/json"
            },
body:JSON.stringify({
    "id":id
})
        });
        if(res.status===200){
            const data=await res.json();
            console.log(data)
            setspecialist(data)
        }else{
            console.log(res)
        }
    } catch (error) {
        console.log(error)
    }
}
export const addproblem=async({toast,equipment_type,software_name,description,notes,personnel_id,problem_id,caller_name,helpdeskoperatorname})=>{
    try {
        const res=await fetch(addproblemurl,{
            method:"POST",
            headers:{
                "Content-Type":"Application/json"
            },
            body:JSON.stringify({
           
              "equipment_type":equipment_type,
              "software_name":software_name,
              "description":description,
              "notes":notes,
              "personnel_id":personnel_id,
              "problem_id":problem_id,
              "caller_name":caller_name,
              "helpdeskoperatorname":caller_name
             
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

export const assignproblemtospecialist=async({toast,id,problem_id})=>{
    try {
        console.log()
        const res=await fetch(updatespecialisturl,{
            method:"POST",
            headers:{
                "Content-Type":"Application/json"
            },
            body:JSON.stringify({
           
             "id":id,
             "problem_id":problem_id
             
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

export const getproblemdetails=async({toast,id,setproblemdetails})=>{
    try {
        console.log()
        const res=await fetch(getproblemdetailsurl,{
            method:"POST",
            headers:{
                "Content-Type":"Application/json"
            },
            body:JSON.stringify({
           
             "problem_number":id,
             
             
            })
        });
        if(res.status==200){
            const data=await res.json();
            console.log(data);
            setproblemdetails(data)
           
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