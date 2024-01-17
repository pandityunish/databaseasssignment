const express = require('express');
const router = express.Router();
const db = require('./../app'); 
const os = require('os');

const deviceInfo = {
  platform: os.platform(),
  
  type: os.type(),
  release: os.release(),
};

router.post("/addproblem",async(req,res)=>{
    try {
        const {equipment_type,software_name,description,notes,personnel_id,problem_id,caller_name,helpdeskoperatorname}=req.body;
        const [equipmentid] = await db.execute('INSERT INTO equipment (equipment_type, operating_system_name,serialnumber) VALUES (?, ?,?)', [equipment_type, deviceInfo.type,deviceInfo.release]);
        const [softwareid] = await db.execute('INSERT INTO software (software_name) VALUES (?)', [software_name]);
        const [problem] = await db.execute('INSERT INTO problems (description,notes,personnel_id,problem_id) VALUES (?, ?,?,?)', [description,notes,personnel_id,problem_id]);
        const [call] = await db.execute('INSERT INTO calls (caller_name,helpdeskoperatorname,equipment_id,software_id,problem_number,personnel_id) VALUES (?, ?,?,?,?,?)', [caller_name,helpdeskoperatorname,equipmentid.insertId,softwareid.insertId,problem.insertId,personnel_id]);
        console.log(call)
        res.status(200).json({mes:"Added Successfully"})
    } catch (e) {
        res.status(500).json({mes:e})
    }
});
router.post("/addproblemtype",async(req,res)=>{
    try {
        const {problem_type_name}=req.body;
        const [equipmentid] = await db.execute('INSERT INTO problem_type (problem_type_name) VALUES (?)', [problem_type_name]);
       
        console.log(equipmentid)
        res.status(200).json({mes:"Added Successfully"})
    } catch (e) {
        res.status(500).json({mes:e})
    }
});
router.post("/addspecialist",async(req,res)=>{
    try {
        const {specialist_name}=req.body;
        const [specialistid] = await db.execute('INSERT INTO specialists (specialist_name) VALUES (?)', [specialist_name]);
       
        console.log(specialistid)
        res.status(200).json({mes:"Added Successfully"})
    } catch (e) {
        res.status(500).json({mes:e})
    }
});
router.get("/getproblemtype",async(req,res)=>{
    try {
      
        const [problemtypes] = await db.execute('SELECT * FROM problem_type');
       
        
        res.status(200).json(problemtypes)
    } catch (e) {
        res.status(500).json({mes:e})
    }
});
router.get("/getallproblems",async(req,res)=>{
    try {
      
        const [problems] = await db.execute('SELECT * FROM problems');
       
        
        res.status(200).json(problems)
    } catch (e) {
        res.status(500).json({mes:e})
    }
});
router.get("/getallspecialist",async(req,res)=>{
    try {
      
        const [specialists] = await db.execute('SELECT * FROM specialists');
       
        
        res.status(200).json(specialists)
    } catch (e) {
        res.status(500).json({mes:e})
    }
});
router.post("/getspecialistproblem",async(req,res)=>{
    try {
      const {id}=req.body;
        const [specialists] = await db.execute('SELECT * FROM problems where specialist_id=?',[id]);
       
        
        res.status(200).json(specialists)
    } catch (e) {
        res.status(500).json({mes:e})
    }
});
router.post("/getproblemdetails",async(req,res)=>{
    try {
      const {problem_number}=req.body;
        const [specialists] = await db.execute('SELECT p.description, p.notes, p.status,p.resolution_details,p.time_taken,p.created_at,p.resolved_date, s.specialist_name FROM problems AS p   JOIN specialists AS s ON p.specialist_id = s.specialist_id where problem_number=?',[problem_number]);
       
        
        res.status(200).json(specialists)
    } catch (e) {
        res.status(500).json({mes:e})
    }
});
router.post("/updatespecialsit",async(req,res)=>{
    try {
      const {problem_id,id}=req.body;
      const updatevalue={
        specialist_id:id,
        status:"working"

      }
      const condition={
        problem_number:problem_id
      }
      const specialistvalue={
        currentlyworkingon:"working"
      }
      const specialistcondition={
        specialist_id:id
      }
        const [problem] = await db.query('UPDATE  problems SET ? where ?',[updatevalue,condition]);
        const [specialit] = await db.query('UPDATE  specialists SET ? where ?',[specialistvalue,specialistcondition]);
        
        res.status(200).json(problem)
    } catch (e) {
        res.status(500).json({mes:e})
    }
});


module.exports=router;