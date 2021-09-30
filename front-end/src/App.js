import {useState,useEffect} from 'react'
import './App.css';
import {DrawingBoard} from './components/DrawingBoard/DrawingBoard'
import {DragImage} from './components/DragImage/DragImage'
import { Button } from './components/basicComp/Button'
import {Answerbox} from './components/AnswerBox/Answerbox'


import './components/compCSS/DragImage.css'


function App() {
    let [expression,setExpression]=useState("")
    let [image2upload,setImage2upload]=useState(null);
    let [pullCanvasData,togglePullCanvasData]=useState(false);
    let [showAnswer,toggleShowAnswer]=useState(false)
    let [imgTakenFrom,setImgTakenFrom]=useState(undefined)

    useEffect(()=>{
            console.log(image2upload)

        
            fetch('/api', {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  img: image2upload
                })
              }).then(response=>response.json())
              .then(message=>{
                  //console.log(message)
                  setExpression(message.expression)
                  toggleShowAnswer(true)
            })
    },[image2upload]) //runs when image2upload changes

    return (    
        <div className="App" >
            
                
                <DrawingBoard 
                    image2draw={image2upload}
                    getCanvasData={pullCanvasData} 
                    imgTakenFrom={(v)=>setImgTakenFrom(v)}               
                    shouldPullImgData={                    
                        ()=>{
                            if(pullCanvasData){
                                togglePullCanvasData(false);
                                return true;
                            }else return false;       
                        }
                    } 
                    getCanvasDataUrl={(data)=>{
                        setImage2upload(data)
                        //console.log("canvas data:",data)
                    }
                }/>
                
                <DragImage 
                    getCanvasDataUrl={(data)=>{
                        setImage2upload(data)
                    }}

                    imgTakenFrom={(v)=>setImgTakenFrom(v)} 
                />


        
            <Button btnLC={()=>{
                    togglePullCanvasData(imgTakenFrom==="c");
                }} classN="btn ansbtn">
                Ans
            </Button>

            <Button btnLC={()=>{
                    toggleShowAnswer(true);
                }} classN="btn calcbtn">
                Calc
            </Button>

            {
                (showAnswer)?<Answerbox Expression={expression} changeAnswerVisibility={()=>{
                    toggleShowAnswer(false)
                }}></Answerbox>:null
            }
            

        </div>
  );
}

export default App;
