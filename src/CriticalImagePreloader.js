import React from 'react';

const CriticalImagePreloader = ({ src }) => {
    return <link rel="preload" as="image" href={src} />;  //url
};

export default CriticalImagePreloader;