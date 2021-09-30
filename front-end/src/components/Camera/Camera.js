import {useEffect,useState,useRef} from 'react'
import '../compCSS/Camera.css'
import '../compCSS/Button.css'
import {Button} from '../basicComp/Button'
export const Camera=(prop)=>{
    const vdoRef=useRef(null)
    const [vdoDevices,setVdoDevices]=useState([])
    const [selectedCam,setSelectedCam]=useState(undefined)
    const [streamStarted,toggleStreamStarted]=useState(false)

    const constraints= {
        video: {
          width: {
            min: 720,
            ideal: 1080,
            max: 1440,
          },
          height: {
            min: 720,
            ideal: 720,
            max: 1440,
          },
        }
      }; 

    useEffect(async()=>{
        console.log("camera started")
        const devices = await navigator.mediaDevices.enumerateDevices();
        const vdodevices=devices.filter(device => device.kind === 'videoinput');
        setVdoDevices(vdodevices)
        setSelectedCam(vdodevices[0])
        //navigator.mediaDevices.getUserMedia({video: true})


    },[])

    useEffect(()=>{
        if(streamStarted){
            vdoRef.current.play()
            return
        }
        if(navigator.mediaDevices.getUserMedia){
            const newConstraints={
                ...constraints,
                deviceId: {
                    exact: selectedCam
                }
            }
    
            startStream(newConstraints)
        }

    },[selectedCam])

    const startStream=async (constraints) => {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        handleStream(stream);
    };

    const handleStream=(stream)=>{
        vdoRef.current.srcObject =stream
        toggleStreamStarted(true)
    }
    return(
        <>
            <div className="vdo"><video  ref={vdoRef} width="80%" height="80%" autoPlay></video></div>
            {(vdoDevices.length>0)?
                <select className="btn btn_select btn_camera_select" onChange={(e)=>
                    setSelectedCam(e.target.value)
                }>
                        <option>select camera</option>
                        {vdoDevices.map((videoDevice)=>{
                            return <option value={videoDevice.deviceId}>{videoDevice.groupId}</option>
                        })  } 
                        
                </select>
            :null}
            <Button classN="backBtn camerabackbtn" btnLC={()=>{
                prop.closeCamera()
                
            }}>X</Button>






        
        </>
    )
}