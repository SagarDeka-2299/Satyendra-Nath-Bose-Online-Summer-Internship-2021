import {useState,useEffect} from 'react'
import "../compCSS/DragImage.css"
import {Camera} from '../Camera/Camera'
import {Button} from '../basicComp/Button'

export const DragImage=(prop)=>{

    let [dropzoneclass,setdropzoneclass]=useState("dropzone")
    let [image,setImage]=useState(undefined)
    let [camera,toggleCamera]=useState(false)

    const showCameraVideo=()=>{
        toggleCamera(true)
    }

    const image2base64=(file)=>{
        return new Promise((resolve,reject)=>{
            const filereader=new FileReader()
            filereader.readAsDataURL(file)
            filereader.onload=(()=>{
                resolve(filereader.result)
            })
            filereader.onerror=((error)=>{
                reject(error)
            })
        })
    }
    const loadimg=async (e)=>{
        const file=e.target.files[0];
        const base64=await image2base64(file)
        //setImage(base64);
        prop.getCanvasDataUrl(base64)
    }


    return(
        <>
            
                {camera?<Camera closeCamera={()=>toggleCamera(false)}></Camera>:null}
                
                <label className="btn fileBtn">
                    <input type="file" name="selectedImage" onChange={(e)=>{
                        loadimg(e)
                        prop.imgTakenFrom("f")
                        }} className="imageInput"></input>
                    File
                </label>
                <Button btnLC={showCameraVideo} classN="btn cameraBtn">Camera</Button>
            
        </>
    )
}