// PropertyProvider.js

import { createContext, useState } from 'react';

//create a context, with createContext api
export const propertyContext = createContext();

const PropertyProvider = (props) => {
        // this state will be shared with all components 
    const [property, setProperty] = useState();

    return (
                // this is the provider providing state
        <propertyContext.Provider value={[property, setProperty]}>
            {props.children}
        </propertyContext.Provider>
    );
};

export default PropertyProvider;