from flask import Flask,render_template,request,json


import io
import cv2
import base64 
import numpy as np
from PIL import Image

# Take in base64 string and return PIL image
def stringToImage(base64_string):
    imgdata = base64.b64decode(base64_string)
    return Image.open(io.BytesIO(imgdata))

# convert PIL Image to an RGB image( technically a numpy array ) that's compatible with opencv
def toRGB(image):
    return cv2.cvtColor(np.array(image), cv2.COLOR_BGR2RGB)
 

app=Flask(__name__)
 

@app.route('/api',methods = ['POST'])
def index():
    data_uri=json.loads(request.data)['img']
    if(data_uri!=None):
        image_data=toRGB(stringToImage(bytes(data_uri.split(",",1)[1],'utf-8'))) #this is the image data we can use in opencv

        #____put image detection logic here___

        cv2.imwrite('static/file12.jpg',image_data)
        cv2.imshow("win",image_data) #just showing that the data is compatible with opencv
        cv2.waitKey(0)
        
        
        #____put image detection logic here___
        

        return {
            'expression':'2+3' #give the result of the ML operation as response
        }


if __name__=="__main__":
    app.run(debug=True)