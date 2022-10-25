import React, { Fragment } from "react"
import {Routes, Route} from "react-router-dom"
import {ContextProvider} from "./Context"
import CartHeader from "./CartHeader"
import Cart from "./Cart"
import Photos from "./Photos"

function CatApp() {    
    return (
        <div className="catApp">
            <ContextProvider>
                <Fragment>
                    <CartHeader />
                    <Routes>
                        <Route exact path="/" element={ <Photos />}>
                           
                        </Route>
                        
                        <Route path="/cart" element={<Cart />}>
                            
                        </Route>
                    </Routes>

                </Fragment>

            </ContextProvider>
        </div>
    )
}

export  {CatApp}