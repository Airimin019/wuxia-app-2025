
import React, { useState } from 'react';
import { CharacterProfile } from './types';
import Header from './components/Header';
import CharacterProfileForm from './components/CharacterProfileForm';
import SceneGenerator from './components/SceneGenerator';
import CharacterList from './components/CharacterList';

const App: React.FC = () => {
  const [characters, setCharacters] = useState<CharacterProfile[]>([]);
  const [activeCharacter, setActiveCharacter] = useState<CharacterProfile | null>(null);

  const addCharacter = (newCharacter: CharacterProfile) => {
    setCharacters(prev => [...prev, newCharacter]);
    setActiveCharacter(newCharacter);
  };
  
  const updateCharacterImage = (characterId: string, image: string) => {
      setCharacters(prev => prev.map(c => c.id === characterId ? {...c, referenceImage: image} : c));
      if (activeCharacter?.id === characterId) {
          setActiveCharacter(prev => prev ? {...prev, referenceImage: image} : null);
      }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans">
      <Header />
      <main className="container mx-auto p-4 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-4 space-y-6">
            <CharacterProfileForm onAddCharacter={addCharacter} onUpdateCharacterImage={updateCharacterImage} />
            <CharacterList 
              characters={characters} 
              activeCharacterId={activeCharacter?.id}
              onSelectCharacter={setActiveCharacter} 
            />
          </div>

          <div className="lg:col-span-8">
            <SceneGenerator characters={characters} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
