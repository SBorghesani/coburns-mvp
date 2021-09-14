import React, { useEffect, useState } from "react"
import { useHistory } from 'react-router-dom'
import { getMaterials, getColors, getDimensions, getHinges } from "../ApiManager"

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

        return fetch("http://localhost:8088/savedCombinations", fetchOptions)
            .then(() => {
                history.push("/myCombinations")
            })
    }

    return (
        <>
            <form>
                <h2>Combinations</h2>
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
                    </div>
                </fieldset>
                <button className="btn btn-primary" onClick={saveCombination}>
                    Save combination
                </button>
            </form>
        </>
    )
}