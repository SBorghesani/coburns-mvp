import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router";
import { getCombination, getCurrentUser, updateCombination } from '../ApiManager'
import "./Canvas.css"


export const Canvas = (props) => {

    const { comboId } = useParams()
    const [combo, updateCombo] = useState({})
    const history = useHistory()
    const currentUser = getCurrentUser()

    useEffect(() => {
        getCombination(comboId)
            .then((comboObject) => {
                updateCombo(comboObject)
            })
    },
        []
    )

    const refreshPage = () => {
        for (let i = 0; i < 1; i++) {
            window.location.reload()
        }
    }

    window.onload = () => {
        const canvas = document.getElementById('canvas');
        const saveButton = document.getElementById('save');
        const loadInput = document.getElementById('load');

        new Drawing(canvas, saveButton, loadInput);
    };

    class Drawing {
        constructor(canvas, saveButton, loadInput) {
            this.isDrawing = false;

            canvas.addEventListener('mousedown', () => this.startDrawing());
            canvas.addEventListener('mousemove', (event) => this.draw(event));
            canvas.addEventListener('mouseup', () => this.stopDrawing());

            saveButton.addEventListener('click', () => this.save());
            //   loadInput.addEventListener('change', (event) => this.load(event));

            const rect = canvas.getBoundingClientRect();

            this.offsetLeft = rect.left;
            this.offsetTop = rect.top;

            this.canvas = canvas;
            this.context = this.canvas.getContext('2d');
        }
        startDrawing() {
            this.isDrawing = true;
        }
        stopDrawing() {
            this.isDrawing = false;
        }
        draw(event) {
            if (this.isDrawing) {
                this.context.fillRect(event.pageX - this.offsetLeft, event.pageY - this.offsetTop, 2, 2);
            }
        }
        save() {
            const copyState = {...combo}
            console.log(copyState)
            const data = this.canvas.toDataURL('image/png');
            const a = document.createElement('a');
            a.href = data;
            a.download = 'image.png';
            console.log(a)
            a.click();
            const updatedCombo = {
                materialId: copyState.materialId,
                colorId: copyState.colorId,
                hingeId: copyState.hingeId,
                dimensionsId: copyState.dimensionsId,
                price: copyState.price,
                userId: parseInt(currentUser),
                customDrawing: a.href
            }
            
            updateCombination(comboId, updatedCombo)
                .then(() => {
                    history.push("/myCombinations")
                })
        }
        load(event) {
            const file = [...event.target.files].pop();
            this.readTheFile(file)
                .then((image) => this.loadTheImage(image))
        }
        loadTheImage(image) {
            const img = new Image();
            const canvas = this.canvas;
            img.onload = function () {
                const context = canvas.getContext('2d');
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(img, 0, 0);
            };
            img.src = image;
        }
        readTheFile(file) {
            const reader = new FileReader();
            return new Promise((resolve) => {
                reader.onload = (event) => {
                    resolve(event.target.result);
                };
                reader.readAsDataURL(file);
            })
        }
    }




    return (

        <>
            <div className="canvas__contianer">
                <div>
                    <canvas id="canvas" width="500" height="500"></canvas>
                </div>
                <div>
                    <button id="save">Save Drawing</button>
                    {/* <input
                        type="file"
                        id="load"
                        name="avatar"
                        accept="image/png"
                    ></input> */}
                    <button id="refreshPage" onClick={() => {
                        refreshPage()
                    }}>Start Drawing</button>
                </div>
            </div>
        </>
    )
}