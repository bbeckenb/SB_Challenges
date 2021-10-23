import React, {useState} from 'react';

const useFlip = (front=true) => {
    const [state, setState] = useState(front);
    const flipState = () => {
        setState(!state) 
    }
    return [state, flipState];
}

export default useFlip;