import React from 'react';

interface ImageGalleryProps {
  images: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  if (images.length === 0) {
    return (
      <div className="mt-6 text-center text-gray-500 border-2 border-dashed border-gray-700 rounded-lg p-10">
        <p>Las escenas generadas aparecerán aquí.</p>
        <p className="text-sm">¡Creemos el primer panel de tu historia!</p>
      </div>
    );
  }

  return (
    <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4 text-rose-200">Paneles Generados</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {images.map((imgBytes, index) => (
                <div key={index} className="rounded-lg overflow-hidden border border-gray-700 shadow-md">
                <img 
                    src={`data:image/jpeg;base64,${imgBytes}`} 
                    alt={`Escena generada ${index + 1}`} 
                    className="w-full h-full object-cover"
                />
                </div>
            ))}
        </div>
    </div>
  );
};

export default ImageGallery;