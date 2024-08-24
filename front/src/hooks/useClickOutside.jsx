import { useEffect, useRef, useCallback } from 'react';

/**
    * @param {Function} callback 
    * @param {HTMLElement[]} excludeDeps 
    * */
function useClickOutside(callback) {
    const ref = useRef(null);

    const handleClickOutside = useCallback(
        (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        },
        [callback]
    );

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside]);

    return ref;
}

export default useClickOutside;
