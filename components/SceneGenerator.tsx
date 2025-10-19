import React, { useState } from 'react';
import type { CharacterProfile, SceneData } from '../types';
import { CameraAngle } from '../types';
import { generateSceneImage } from '../services/geminiService';
import Spinner from './Spinner';
import ImageGallery from './ImageGallery';
import Tooltip from './Tooltip';

interface SceneGeneratorProps {
  characters: CharacterProfile[];
}

const SceneGenerator: React.FC<SceneGeneratorProps> = ({ characters }) => {
  const [selectedCharIds, setSelectedCharIds] = useState<Set<string>>(new Set());
  const [scenario, setScenario] = useState('');
  const [action, setAction] = useState('');
  const [angle, setAngle] = useState<CameraAngle>(CameraAngle.Default);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCharSelection = (charId: string) => {
    setSelectedCharIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(charId)) {
        newSet.delete(charId);
      } else {
        newSet.add(charId);
      }
      return newSet;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCharIds.size === 0) {
      setError('Por favor, selecciona al menos un personaje para la escena.');
      return;
    }
    setError(null);
    setIsLoading(true);

    const selectedCharacters = characters.filter(c => selectedCharIds.has(c.id));

    const sceneData: SceneData = {
      characters: selectedCharacters,
      scenario,
      action,
      angle,
    };

    try {
      const imageBytes = await generateSceneImage(sceneData);
      setGeneratedImages(prev => [imageBytes, ...prev]);
    } catch (err) {
      setError('Error al generar la imagen de la escena. Por favor, inténtalo de nuevo.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 shadow-lg space-y-6">
      <h2 className="text-2xl font-semibold text-rose-200">Tejedor de Escenas</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Seleccionar Personajes</label>
          <div className="flex flex-wrap gap-2">
            {characters.length > 0 ? characters.map(char => (
              <button 
                type="button" 
                key={char.id} 
                onClick={() => handleCharSelection(char.id)}
                className={`px-3 py-1 rounded-full text-sm transition-colors duration-200 ${selectedCharIds.has(char.id) ? 'bg-rose-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-300'}`}
              >
                {char.name}
              </button>
            )) : <p className="text-gray-500 text-sm">Crea un personaje para añadirlo a una escena.</p>}
          </div>
        </div>

        <div>
          <label htmlFor="scenario" className="block text-sm font-medium text-gray-300 mb-1">Escenario / Ambiente</label>
          <textarea id="scenario" value={scenario} onChange={e => setScenario(e.target.value)} required rows={3} className="w-full bg-gray-900 border border-gray-600 rounded-md px-3 py-2 focus:ring-rose-500 focus:border-rose-500" placeholder="Ej: Los Túmulos Funerarios bajo una luna de sangre, el Pabellón de la Biblioteca de GusuLan al amanecer..."></textarea>
        </div>

        <div>
          <label htmlFor="action" className="block text-sm font-medium text-gray-300 mb-1">
            Acción / Emoción / Diálogo
            <Tooltip text="Describe qué sucede. Usa palabras clave como 'Beber Vinagre' (celos) o 'Qi' (energía) para activar interpretaciones visuales."/>
          </label>
          <textarea id="action" value={action} onChange={e => setAction(e.target.value)} required rows={4} className="w-full bg-gray-900 border border-gray-600 rounded-md px-3 py-2 focus:ring-rose-500 focus:border-rose-500" placeholder="Ej: Wei Wuxian sonríe con picardía, tocando una melodía inquietante en su flauta. Lan Zhan lo observa, con los puños apretados. Una oleada de Qi resentido emana del suelo..."></textarea>
        </div>

        <div>
          <label htmlFor="angle" className="block text-sm font-medium text-gray-300 mb-1">Ángulo de Cámara</label>
          <select id="angle" value={angle} onChange={e => setAngle(e.target.value as CameraAngle)} className="w-full bg-gray-900 border border-gray-600 rounded-md px-3 py-2 focus:ring-rose-500 focus:border-rose-500">
            {Object.values(CameraAngle).map(a => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>

        <button type="submit" disabled={isLoading || characters.length === 0} className="w-full bg-rose-700 hover:bg-rose-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 disabled:bg-rose-900 disabled:cursor-not-allowed flex items-center justify-center">
          {isLoading ? <><Spinner /> Tejiendo Escena...</> : 'Generar Escena'}
        </button>
        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
      </form>

      <ImageGallery images={generatedImages} />
    </div>
  );
};

export default SceneGenerator;