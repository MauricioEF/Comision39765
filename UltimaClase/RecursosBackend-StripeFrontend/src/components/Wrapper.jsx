import React from 'react';

const Wrapper = ({hidden, children}) =>{
    if(hidden) return null;
    return children;
}

export default Wrapper;