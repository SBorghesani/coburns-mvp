import React, { useEffect, useState } from "react"
import { useHistory } from 'react-router-dom'
import { getMaterials, getColors, getDimensions, getHinges } from "../ApiManager"
import "./Combinations.css"
import squareHinge from "../../images/hinge-square.jpeg"
import roundHinge from "../../images/hinge-rounded.jpeg"
import hiddenHinge from "../../images/hinge-hidden.jpeg"
import steelPlate from "../../images/steel-plate.jpeg"
import alumPlate from "../../images/alum-plate.jpeg"
import blackSwatch from "../../images/black-swatch.jpeg"
import darkGreySwatch from "../../images/dark-grey-swatch.jpeg"
import lightGreySwatch from "../../images/light-grey-swatch.jpeg"
import singleDoor from "../../images/single-door.jpeg"
import doubleDoor from "../../images/double-door.jpeg"


export const Combinations = () => {
    const [materials, setMaterials] = useState([])
    const [colors, setColors] = useState([])
    const [hinges, setHinges] = useState([])
    const [dimensions, setDimensions] = useState([])
    const history = useHistory()
    const [combination, updateCombination] = useState({
        material: "",
        color: "",
        hinge: "",
        dimensions: "",
        price: 0
    });

    useEffect(() => {
        getMaterials()
            .then((materialArray) => {
                setMaterials(materialArray)
            })
    },
        []
    )
    useEffect(() => {
        getColors()
            .then((colorArray) => {
                setColors(colorArray)
            })
    },
        []
    )
    useEffect(() => {
        getHinges()
            .then((hingeArray) => {
                setHinges(hingeArray)
            })
    },
        []
    )
    useEffect(() => {
        getDimensions()
            .then((dimensionArray) => {
                setDimensions(dimensionArray)
            })
    },
        []
    )

    const saveCombination = (event) => {
        event.preventDefault()
        const newCombination = {
            materialId: parseInt(combination.material),
            colorId: parseInt(combination.color),
            hingeId: parseInt(combination.hinge),
            dimensionsId: parseInt(combination.dimensions),
            price: combination.price,
            userId: parseInt(localStorage.getItem("coburn_customer"))
        }

        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newCombination)
        }

        return fetch("https://coburns-exclusive-bchgr.ondigitalocean.app/savedCombinations", fetchOptions)
            .then(() => {
                history.push("/myCombinations")
            })
    }

    return (
        <>
            <form className="combo__form">
                <h2>⚙️ Select Combinations ⚙️</h2>
                <fieldset>
                    <div className="form-group">
                        <select
                            defaultValue=""
                            name="material"
                            id="materialId"
                            className="form-control"
                            onChange={(event) => {
                                const copyState = { ...combination }
                                copyState.material = event.target.value
                                updateCombination(copyState)
                            }}
                        >
                            <option value="">Select a material</option>
                            {materials.map(material => (
                                <option key={material.id} id={material.id} value={material.id}>
                                    {`${material.materialType} - ($${material.price})`}
                                </option>
                            ))}
                        </select>
                        {combination.material === '1' ? <img className="optionPic" src={steelPlate} alt="steel plate" width="50" height="50" />
                            : combination.material === '2' ? <img className="optionPic" src={alumPlate} alt="aluminum plate" width="50" height="50" />
                                :''}
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <select
                            defaultValue=""
                            name="color"
                            id="colorId"
                            className="form-control"
                            onChange={(event) => {
                                const copyState = { ...combination }
                                copyState.color = event.target.value
                                updateCombination(copyState)
                            }}
                        >
                            <option value="">Select a color</option>
                            {colors.map(color => (
                                <option key={color.id} id={color.id} value={color.id}>
                                    {`${color.color} - ($${color.price})`}
                                </option>
                            ))}
                        </select>
                        {combination.color === '1' ? <img className="optionPic" src={blackSwatch} alt="black" width="50" height="50" />
                                : combination.color === '2' ? <img className="optionPic" src={darkGreySwatch} alt="dark grey" width="50" height="50" />
                                    : combination.color === '3' ? <img className="optionPic" src={lightGreySwatch} alt="light grey" width="50" height="50" />
                                        : ''}
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <select
                            defaultValue=""
                            name="hinge"
                            id="hingeId"
                            className="form-control"
                            onChange={(event) => {
                                const copyState = { ...combination }
                                copyState.hinge = event.target.value
                                updateCombination(copyState)
                            }}
                        >
                            <option value="">Select a hinge</option>
                            {hinges.map(hinge => (
                                <option key={hinge.id} id={hinge.id} value={hinge.id}>
                                    {`${hinge.hingeType} - ($${hinge.price})`}
                                </option>
                            ))}
                        </select>
                        {
                            combination.hinge === '1' ? <img className="optionPic" src={squareHinge} alt="square hinge" width="50" height="50" />
                                : combination.hinge === '2' ? <img className="optionPic" src={roundHinge} alt="round hinge" width="50" height="50" />
                                    : combination.hinge === '3' ? <img className="optionPic" src={hiddenHinge} alt="hidden hinge" width="50" height="50" />
                                        : ''
                        }
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <select
                            defaultValue=""
                            name="dimensions"
                            id="dimensionsId"
                            className="form-control"
                            onChange={(event) => {
                                const copyState = { ...combination }
                                copyState.dimensions = event.target.value
                                updateCombination(copyState)
                            }}
                        >
                            <option value="">Select dimensions</option>
                            {dimensions.map(dimension => (
                                <option key={dimension.id} id={dimension.id} value={dimension.id}>
                                    {`${dimension.dimension} - ($${dimension.price})`}
                                </option>
                            ))}
                        </select>
                        {combination.dimensions === '1' ? <img className="optionPic" src={singleDoor} alt="single door" width="50" height="50" />
                                : combination.dimensions === '2' ? <img className="optionPic" src={doubleDoor} alt="double door" width="50" height="50" />
                                    : ''}
                    </div>
                </fieldset>
                <button className="btn save__button" onClick={saveCombination}>
                    Save 
                </button>
            </form>
        </>
    )
}