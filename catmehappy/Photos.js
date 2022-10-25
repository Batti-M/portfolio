import React, {useContext} from "react"

import GetCatImage from "./GetCatImage"
import {Context} from "./Context"

function getClass(i) {
    if (i % 3=== 0) {
        return 'big';
    }
    else if (i % 2 === 0) {
        return 'wide'
    }
}

function Photos() {
    const {allPhotos} = useContext(Context)
    
    const imageElements = allPhotos.map((img, i) => (
        <GetCatImage key={img.id} img={img} className={getClass(i)} />
    ))
    
    return (
        <main className="photos">
            {imageElements}
        </main>
    )
}

export default Photos