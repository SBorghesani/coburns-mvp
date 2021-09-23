import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router";
import { getCanvasCombo, getCurrentUser, updateCombination } from '../ApiManager'
import "./Canvas.css"


export const Canvas = (props) => {
    const { comboId } = useParams()
    const [combo, updateCombo] = useState({})
    const history = useHistory()
    const currentUser = getCurrentUser()

    useEffect(() => {
        getCanvasCombo(comboId)
            .then((comboObject) => {
                updateCombo(comboObject)
            })
    },
        []
    )

    // const refreshPage = () => {
    //     for (let i = 0; i < 1; i++) {
    //         window.onload()
    //     }
    // }

    window.onload= () => {
    
        const canvas = document.getElementById('canvas');
        const saveButton = document.getElementById('save');
        const loadInput = document.getElementById('load');
    
        new Drawing(canvas, saveButton, loadInput);
    };
    
    class Drawing {
        constructor(canvas) {
            this.isDrawing = false;

            canvas.addEventListener('mousedown', () => this.startDrawing());
            canvas.addEventListener('mousemove', (event) => this.draw(event));
            canvas.addEventListener('mouseup', () => this.stopDrawing());

            this.canvas = canvas;
            this.canvas.height = window.innerHeight;
            this.canvas.width = window.innerWidth;
            this.context = this.canvas.getContext('2d');
        }
        startDrawing(event) {
            this.isDrawing = true;
        }
        stopDrawing() {
            this.isDrawing = false;
            this.context.beginPath();
        }
        draw(event) {
            if (this.isDrawing) {
                // this.context.fillRect(event.pageX - this.offsetLeft, event.pageY - this.offsetTop, 0, 0);
                this.context.lineWidth = 20;
                this.context.lineCap = "round";
                this.context.lineTo(event?.clientX, event?.clientY);
                this.context.stroke();
                this.context.beginPath();
                this.context.moveTo(event?.clientX, event?.clientY)
            }
        }      
    }
    const newCombo = (event) => {
        const canvas = document.getElementById('canvas');
        event.preventDefault()
        const data = canvas.toDataURL('image/png');
        const a = document.createElement('a');
        a.href = data;
        a.download = 'image.png';
        // a.click();
        console.log(combo)
        const updatedCombo = {
            materialId: combo?.materialId,
            colorId: combo?.colorId,
            hingeId: combo?.hingeId,
            dimensionsId: combo?.dimensionsId,
            price: combo?.price,
            userId: parseInt(currentUser),
            customDrawing: a.href
        }    
        updateCombination(comboId, updatedCombo)
        .then(() => {
            history.push("/myCombinations")
        })
    }

    return (

        <>
            <div className="canvas__contianer">
                <div>
                    <button id="save" onClick={newCombo}>Save Drawing</button>
                    <button id="refreshPage" onClick={() => {
                        window.onload()
                    }}>Start Drawing</button>
                    <div>
                         <canvas id="canvas"></canvas>
                    </div>
                </div>
            </div>
        </>
    )
}