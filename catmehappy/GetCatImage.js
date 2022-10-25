import React, {useState, useContext} from "react"
import PropTypes from "prop-types"

import {Context} from "./Context"
import useHover from "./useHover"

function GetCatImage({className, img}) {
    const [hovered, ref] = useHover()
    const {toggleFavorite, addToCart, cartItems, removeFromCart} = useContext(Context)
    const [toggleSize,setToggleSize] = useState(false)

    function heartIcon() {
        if(img.isFavorite) {
            return <i className="ri-heart-fill favorite" onClick={() => toggleFavorite(img.id)}></i>
        } else if(hovered) {
            return <i className="ri-heart-line favorite" onClick={() => toggleFavorite(img.id)}></i>
        }
    }
    
    function cartIcon() {
        const alreadyInCart = cartItems.some(item => item.id === img.id)
        if(alreadyInCart) {
            return <i className="ri-shopping-cart-fill cart" onClick={() => removeFromCart(img.id)}></i>
        } else if(hovered) {
            return <i className="ri-add-circle-line cart" onClick={() => addToCart(img)}></i>
        }
    }

    function toggle(){
        setToggleSize(!toggleSize)
    }
    function showFullSize(){
        
        
        return ( <div className="fullsizeImage">
                    <p> this is a test</p>
                    <img onClick={toggle} className="fullsizeImage" src={img.url} alt="a cat" />
                 </div>)
    }

    return (
        <div>
              { toggleSize ? 
                  <div>
                      {showFullSize() }
                  </div> :
                 <div 
                      className={`${className} image-container`}
                      ref={ref}
                  >
                      <img src={img.url} onClick={toggle} alt="a cat" className="image-grid"/>
                      {heartIcon()}
                      {cartIcon()}
                      
                  </div>
              }

        </div>

    )
}

Image.propTypes = {
    className: PropTypes.string,
    img: PropTypes.shape({
        id: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
        isFavorite: PropTypes.bool
    })
}

export default GetCatImage
