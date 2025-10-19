import React from 'react';
import type { CharacterProfile } from '../types';
import Spinner from './Spinner';

interface CharacterCardProps {
  character: CharacterProfile;
  isActive: boolean;
  onSelect: (character: CharacterProfile) => void;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character, isActive, onSelect }) => {
  const imageUrl = character.referenceImage ? `data:image/jpeg;base64,${character.referenceImage}` : '';

  return (
    <div 
      onClick={() => onSelect(character)}
      className={`bg-gray-800 rounded-lg overflow-hidden border-2 transition-all duration-300 cursor-pointer ${isActive ? 'border-rose-500 shadow-rose-500/30 shadow-lg' : 'border-gray-700 hover:border-rose-600'}`}
    >
      <div className="aspect-[3/4] bg-gray-900 flex items-center justify-center">
        {character.referenceImage ? (
          <img src={imageUrl} alt={`Referencia de ${character.name}`} className="w-full h-full object-cover" />
        ) : (
          <div className="text-center text-gray-400 p-4">
            <Spinner />
            <p className="mt-2 text-sm">Generando referencia...</p>
          </div>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-semibold text-rose-200 truncate">{character.name}</h3>
        <p className="text-sm text-gray-400 truncate">{character.cultivationLevel}</p>
      </div>
    </div>
  );
};


interface CharacterListProps {
    characters: CharacterProfile[];
    activeCharacterId?: string;
    onSelectCharacter: (character: CharacterProfile) => void;
}

const CharacterList: React.FC<CharacterListProps> = ({ characters, activeCharacterId, onSelectCharacter }) => {
    if (characters.length === 0) {
        return (
            <div className="bg-gray-800/50 p-6 rounded-lg border border-dashed border-gray-700 text-center text-gray-500">
                <p>Aún no hay personajes creados.</p>
                <p className="text-sm">Crea un perfil para comenzar tu historia.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
             <h2 className="text-2xl font-semibold text-rose-200">Elenco de Personajes</h2>
            <div className="grid grid-cols-2 gap-4">
                {characters.map(char => (
                    <CharacterCard 
                        key={char.id} 
                        character={char} 
                        isActive={char.id === activeCharacterId} 
                        onSelect={onSelectCharacter}
                    />
                ))}
            </div>
        </div>
    );
};

export default CharacterList;