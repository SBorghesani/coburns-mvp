import React, { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router";
import { getCombination, getMaterials, getColors, getDimensions, getHinges, updateCombination, getCurrentUser } from '../ApiManager'
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



export const CombinationEdit = () => {

    const [combo, updateCombo] = useState({})
    const [materials, setMaterials] = useState([])
    const [colors, setColors] = useState([])
    const [hinges, setHinges] = useState([])
    const [dimensions, setDimensions] = useState([])
    const { comboId } = useParams()
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

    const newCombo = (event) => {
        event.preventDefault()
        const updatedCombo = {
            materialId: combo?.materialId,
            colorId: combo?.colorId,
            hingeId: combo?.hingeId,
            dimensionsId: combo?.dimensionsId,
            price: combo.price,
            userId: parseInt(currentUser)
        }
        console.log("updatedCombo", updatedCombo)

        updateCombination(comboId, updatedCombo)
            .then(() => {
                history.push("/myCombinations")
            })
    }

    return (
        <>
            <h2>Edit Combination</h2>
            <p>{combo.id}</p>

            <form>
                <fieldset>
                    <div className="form-group">
                        <select
                            defaultValue={combo?.material}
                            name="material"
                            id="materialId"
                            className="form-control"
                            onChange={(event) => {
                                const copyState = { ...combo }
                                copyState.materialId = parseInt(event.target.value)
                                updateCombo(copyState)
                                console.log("material",combo.materialId)
                            }}
                        >
                            {materials.map(material => (
                                <option key={material.id} id={material.id} value={material.id}>
                                    {`${material.materialType} - ($${material.price})`}
                                </option>
                            ))}
                        </select>
                        {(parseInt(combo.material) || parseInt(combo.materialId)) === 1 ? <img className="optionPic" src={steelPlate} alt="steel plate" width="50" height="50" />
                            : (parseInt(combo.material) || parseInt(combo.materialId)) === 2 ? <img className="optionPic" src={alumPlate} alt="aluminum plate" width="50" height="50" />
                                : ''}
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <select
                            defaultValue={combo?.color?.id}
                            name="color"
                            id="colorId"
                            className="form-control"
                            onChange={(event) => {
                                const copyState = { ...combo }
                                copyState.colorId = parseInt(event.target.value)
                                updateCombo(copyState)
                            }}
                        >
                            {colors.map(color => (
                                <option key={color.id} id={color.id} value={color.id}>
                                    {`${color.color} - ($${color.price})`}
                                </option>
                            ))}
                        </select>
                        {(parseInt(combo.color) || combo.colorId) === 1 ? <img className="optionPic" src={blackSwatch} alt="black" width="50" height="50" />
                            : (parseInt(combo.color) || combo.colorId) === 2 ? <img className="optionPic" src={darkGreySwatch} alt="dark grey" width="50" height="50" />
                                : (parseInt(combo.color) || combo.colorId) === 3 ? <img className="optionPic" src={lightGreySwatch} alt="light grey" width="50" height="50" />
                                    : ''}
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <select
                            defaultValue={combo?.hinge?.id}
                            name="hinge"
                            id="hingeId"
                            className="form-control"
                            onChange={(event) => {
                                const copyState = { ...combo }
                                copyState.hingeId = parseInt(event.target.value)
                                updateCombo(copyState)
                            }}
                        >
                            {hinges.map(hinge => (
                                <option key={hinge.id} id={hinge.id} value={hinge.id}>
                                    {`${hinge.hingeType} - ($${hinge.price})`}
                                </option>
                            ))}
                        </select>
                        {
                            (parseInt(combo.hinge) || combo.hingeId) === 1 ? <img className="optionPic" src={squareHinge} alt="square hinge" width="50" height="50" />
                                : (parseInt(combo.hinge) || combo.hingeId) === 2 ? <img className="optionPic" src={roundHinge} alt="round hinge" width="50" height="50" />
                                    : (parseInt(combo.hinge) || combo.hingeId) === 3 ? <img className="optionPic" src={hiddenHinge} alt="hidden hinge" width="50" height="50" />
                                        : ''
                        }
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <select
                            defaultValue={combo?.dimensions?.id}
                            name="dimensions"
                            id="dimensionsId"
                            className="form-control"
                            onChange={(event) => {
                                const copyState = { ...combo }
                                copyState.dimensionsId = parseInt(event.target.value)
                                updateCombo(copyState)
                            }}
                        >
                            {dimensions.map(dimension => (
                                <option key={dimension.id} id={dimension.id} value={dimension.id}>
                                    {`${dimension.dimension} - ($${dimension.price})`}
                                </option>
                            ))}
                        </select>
                        {console.log(combo)}
                        {(parseInt(combo.dimensions) || combo.dimesnsionsId) === 1 ? <img className="optionPic" src={singleDoor} alt="single door" width="50" height="50" />
                            : (parseInt(combo.dimensions) || combo.dimensionsId) === 2 ? <img className="optionPic" src={doubleDoor} alt="double door" width="50" height="50" />
                                : ''}
                    </div>
                </fieldset>
                <button className="btn btn-primary" onClick={newCombo}>
                    Update
                </button>
            </form>
        </>
    )
}