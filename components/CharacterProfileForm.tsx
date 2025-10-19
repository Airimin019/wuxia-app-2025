import React, { useState } from 'react';
import { CharacterProfile, DanmeiRole } from '../types';
import { generateCharacterReference } from '../services/geminiService';
import Spinner from './Spinner';
import Tooltip from './Tooltip';

interface CharacterProfileFormProps {
  onAddCharacter: (character: CharacterProfile) => void;
  onUpdateCharacterImage: (characterId: string, image: string) => void;
}

const initialFormState = {
  name: '',
  danmeiRole: DanmeiRole.Gong,
  appearance: '',
  personality: '',
  emotionalArc: '',
  cultivationLevel: '',
};

const CharacterProfileForm: React.FC<CharacterProfileFormProps> = ({ onAddCharacter, onUpdateCharacterImage }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdCharacterId, setCreatedCharacterId] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
        const newCharacter: CharacterProfile = {
            ...formData,
            id: `char_${Date.now()}`,
        };
        onAddCharacter(newCharacter);
        setCreatedCharacterId(newCharacter.id);

        const imageBytes = await generateCharacterReference(formData);
        onUpdateCharacterImage(newCharacter.id, imageBytes);

        setFormData(initialFormState); // Clear form after success
    } catch (err) {
      setError('Error al generar la referencia del personaje. Por favor, revisa tu clave de API e inténtalo de nuevo.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-rose-200">Crear Perfil de Personaje</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Nombre del Personaje</label>
          <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="w-full bg-gray-900 border border-gray-600 rounded-md px-3 py-2 focus:ring-rose-500 focus:border-rose-500"/>
        </div>

        <div>
           <label htmlFor="danmeiRole" className="block text-sm font-medium text-gray-300 mb-1">
                Rol Danmei
                <Tooltip text="Gong (攻) es el rol 'activo' o dominante. Shou (受) es el rol 'receptivo' o pasivo." />
            </label>
          <select name="danmeiRole" id="danmeiRole" value={formData.danmeiRole} onChange={handleChange} className="w-full bg-gray-900 border border-gray-600 rounded-md px-3 py-2 focus:ring-rose-500 focus:border-rose-500">
            {Object.values(DanmeiRole).map(role => <option key={role} value={role}>{role}</option>)}
          </select>
        </div>
        
        <div>
            <label htmlFor="appearance" className="block text-sm font-medium text-gray-300 mb-1">Apariencia</label>
            <textarea name="appearance" id="appearance" value={formData.appearance} onChange={handleChange} rows={4} required className="w-full bg-gray-900 border border-gray-600 rounded-md px-3 py-2 focus:ring-rose-500 focus:border-rose-500" placeholder="Ej: cabello largo plateado, ojos carmesí, vistiendo las túnicas de la secta GusuLan..."></textarea>
        </div>
        
        <div>
            <label htmlFor="personality" className="block text-sm font-medium text-gray-300 mb-1">
                Personalidad
                <Tooltip text="Ej: 'Barriga Negra' (腹黑) para un personaje manipulador pero encantador, o 'Loto Blanco' (白莲花) para alguien que parece puro e inocente." />
            </label>
            <textarea name="personality" id="personality" value={formData.personality} onChange={handleChange} rows={2} required className="w-full bg-gray-900 border border-gray-600 rounded-md px-3 py-2 focus:ring-rose-500 focus:border-rose-500" placeholder="Ej: Estoico y justo, pero secretamente travieso..."></textarea>
        </div>

        <div>
            <label htmlFor="emotionalArc" className="block text-sm font-medium text-gray-300 mb-1">Arco Emocional / Tema</label>
            <input type="text" name="emotionalArc" id="emotionalArc" value={formData.emotionalArc} onChange={handleChange} required className="w-full bg-gray-900 border border-gray-600 rounded-md px-3 py-2 focus:ring-rose-500 focus:border-rose-500" placeholder="Ej: Redención, Venganza, Ascenso y Caída..."/>
        </div>

        <div>
            <label htmlFor="cultivationLevel" className="block text-sm font-medium text-gray-300 mb-1">Nivel de Cultivo & Dao</label>
            <input type="text" name="cultivationLevel" id="cultivationLevel" value={formData.cultivationLevel} onChange={handleChange} required className="w-full bg-gray-900 border border-gray-600 rounded-md px-3 py-2 focus:ring-rose-500 focus:border-rose-500" placeholder="Ej: Etapa del Núcleo Dorado, Cultivador Demoníaco, Dao de la Espada..."/>
        </div>

        <button type="submit" disabled={isLoading} className="w-full bg-rose-700 hover:bg-rose-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 disabled:bg-rose-900 disabled:cursor-not-allowed flex items-center justify-center">
          {isLoading ? <><Spinner /> Generando...</> : 'Crear y Generar Referencia'}
        </button>
        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default CharacterProfileForm;