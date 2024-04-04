import React, { useState, useEffect } from 'react';

function Gallery() {
    const [images, setImages] = useState([]);
    const [loadTime, setLoadTime] = useState(null);
    const [imageLoadTimes, setImageLoadTimes] = useState({});

    useEffect(() => {
        const startTime = performance.now();   //уакытты санайды

        fetch('https://api.unsplash.com/photos/random/?client_id=7rVwLIIxEQOo_L9uRHmr4-PoXVRzRx1NEPjEm1MmX90&count=25' +
            '')
            .then(response => response.json())    //данныйлар успешно орындалгансон осы функция шакырылады
            .then(data => {
                setImages(data);
                const endTime = performance.now();   //фото загрузка быткендегы уакытты корсетеды
                const timeElapsed = endTime - startTime;   //фото загрузка жасалганга дейынгы уакытты жумыс жасайд
                setLoadTime(timeElapsed);   //жанагыларды шакыру ушын осы функция корсетеды
                measureImageLoadTimes(data, startTime);
            })
            .catch(error => console.error('Error loading images:', error));   //ошибка болса осы функция шыгады
    }, []);

    const measureImageLoadTimes = (images, startTime) => {
        const imageLoadTimes = {};   //каждый фотонын уакытын айдимен сохранить етеды.
        images.forEach(image => {   //images массивта фотоларды переборка жасайды
            const img = new Image();
            img.src = image.urls.small;
            img.onload = () => {
                const endTime = performance.now();   //казыргы уакыт после загрузки изображения.
                const loadTime = endTime - startTime;
                imageLoadTimes[image.id] = loadTime;
                setImageLoadTimes({ ...imageLoadTimes });
            };
        });
    };

    return (

        <div className="gallery">
            {images.map(image => (
                <div key={image.id} className="image-item">
                    <img src={image.urls.small} alt={image.alt_description} />
                    {imageLoadTimes[image.id] && (
                        <div>Image loading time: {imageLoadTimes[image.id].toFixed(2)} milliseconds</div>
                    )}
                </div>
            ))}
        </div>

    );
}

export default Gallery;
