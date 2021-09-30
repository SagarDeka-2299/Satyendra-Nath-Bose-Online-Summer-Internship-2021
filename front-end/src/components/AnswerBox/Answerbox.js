import '../compCSS/Answerbox.css'
import {useState,useEffect} from 'react'
import {Button} from '../basicComp/Button'
import '../compCSS/Input.css'

class mathFun{
    constructor(wNames,jsName){
        this.wNames=wNames
        this.jsName=jsName
    }
}
class calculator{
    constructor(){
        this.expressions=[
            new mathFun(['sin','sine'],'this.mathfunctions.sin'),
            new mathFun(['cosine','cos'],'this.mathfunctions.cos'),
            new mathFun(['tan','tangent'],'this.mathfunctions.tan'),
            new mathFun(['cosec','cosecent'],'this.mathfunctions.cosec'),
            new mathFun(['cot','cotangent'],'this.mathfunctions.cot'),
            new mathFun(['sec','secent'],'this.mathfunctions.sec'),
            new mathFun(['\\^','\\*\\*'],'**'),
        ]
    }

    mathfunctions={
        sin:(n)=>(Math.sin(n*Math.PI/180)),
        cos:(n)=>(Math.cos(n*Math.PI/180)),
        tan:(n)=>(Math.tan(n*Math.PI/180)),
        sec:(n)=>(1/Math.cos(n*Math.PI/180)),
        cosec:(n)=>(1/Math.sin(n*Math.PI/180)),
        cot:(n)=>(1/Math.tan(n*Math.PI/180))
    }

    calculate(expression){
        
        if(expression===""){
            return ""
        }
        this.expressions.forEach((exp)=>{
            
            let reg=new RegExp(exp.wNames.join("|"),"gi")
            expression=expression.replace(reg,exp.jsName)
            expression=expression.replace(new RegExp("\\(|\\[|\\{","gi"),"(")
            expression=expression.replace(new RegExp("\\)|\\]|\\}","gi"),")")
        })
        console.log(expression)
        try{
            let op=eval(expression)
            return (isNaN(op)?"":op.toFixed(4));
            
        }catch(e){
            return ""
        }
    }
}


export const Answerbox=(prop)=>{
    const [expression,setExpression]=useState("");

    const calc=new calculator();
    useEffect(()=>{
        setExpression(prop.Expression)
    },[prop.Expression])

    return(
        <div className="AnsBox">
            <input type="text" className="expressionbox InputField" value={expression} onChange={(e)=>{
                setExpression(e.target.value)
            }}/>
            <div className="equal"><h1>=</h1></div>
            <input type="text" className="ansbox InputField" value={calc.calculate(expression)}></input>
            {/* <div className="ansbox InputField" >{calc.calculate(expression)}</div> */}
            <div className="xbox">
                <Button classN="backBtn" btnLC={prop.changeAnswerVisibility}>X</Button>
            </div>
        </div>
    )
}