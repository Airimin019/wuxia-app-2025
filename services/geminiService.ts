
import { GoogleGenAI } from "@google/genai";
import type { CharacterProfile, SceneData } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const STYLE_PROMPT = "Generate a high-definition, full-color image in a detailed manhua/donghua style with rich, evocative colors, sharp clean lines, and dramatic lighting. The quality should be equivalent to a professional webcomic or animation production still.";

const TERMINOLOGY_MAP: { [key: string]: string } = {
    'beber vinagre': 'The character should have a subtle expression of jealousy or resentment, perhaps a tightened jaw, narrowed eyes, or a pout, while trying to maintain composure.',
    'qi': 'Visualize as a flowing, vibrant energy, perhaps glowing blue, gold, or white, swirling around the character or their hands.',
    'dao': 'The character\'s pose and actions should reflect mastery and focus, as if they are one with their element or path (e.g., a fire user wreathed in controlled flames).',
    'cadáver feroz': 'Depict as a formidable, reanimated corpse with pale skin, glowing eyes (often red), and traditional Chinese burial clothes. It should look menacing and supernaturally powerful, not like a mindless zombie.',
    'escenas en el coche': 'Create a romantically charged and intimate atmosphere. The composition should focus on intense eye contact, close proximity, and suggestive but not explicit body language. The lighting should be soft and focused on the characters\' expressions.'
};

const interpretTerminology = (text: string): string => {
    let interpretedText = text;
    for (const term in TERMINOLOGY_MAP) {
        if (text.toLowerCase().includes(term)) {
            interpretedText += `\nVISUAL INTERPRETATION of '${term}': ${TERMINOLOGY_MAP[term]}`;
        }
    }
    return interpretedText;
};

export const generateCharacterReference = async (profile: Omit<CharacterProfile, 'id' | 'referenceImage'>): Promise<string> => {
  const prompt = `
    ${STYLE_PROMPT}
    
    TASK: Create a full-body character reference sheet on a clean, neutral white background.
    
    CHARACTER DETAILS:
    - Name: ${profile.name}
    - Danmei Role: ${profile.danmeiRole}
    - Appearance: ${profile.appearance}. Ensure all these details are accurately and clearly depicted.
    - Personality: ${profile.personality}. Their default expression and posture should reflect this.
    - Emotional Arc/Theme: ${profile.emotionalArc}. This should subtly influence their overall aura.
    - Cultivation Level & Dao: ${profile.cultivationLevel}. Hint at their power, perhaps with a faint aura or a symbolic accessory.
    
    The character should be in a standard, neutral pose to clearly display their design.
  `;

  try {
    const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: '3:4',
        },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      return response.generatedImages[0].image.imageBytes;
    }
    throw new Error("No image was generated.");
  } catch (error) {
    console.error("Error generating character reference:", error);
    throw error;
  }
};


export const generateSceneImage = async (sceneData: SceneData): Promise<string> => {
    const characterDescriptions = sceneData.characters.map(c => `
      - Character Name: ${c.name}
        - Role: ${c.danmeiRole}
        - Core Appearance: ${c.appearance}
        - Personality to Convey: ${c.personality}
        - Current Emotional State (from Arc: ${c.emotionalArc}): Reflect this in their expression and body language.
    `).join('');

    const actionWithInterpretation = interpretTerminology(sceneData.action);

    const prompt = `
      ${STYLE_PROMPT}

      TASK: Generate a single, vivid scene based on the following detailed specifications. Adhere strictly to the character descriptions to maintain consistency. This is for a sequence, so visual fidelity is paramount.

      SCENE SETTING (Background):
      - Location: ${sceneData.scenario}
      - Atmosphere: Create an immersive environment with elements of Xianxia/Wuxia (e.g., traditional Chinese architecture, mystical landscapes, supernatural elements). The background must be consistent and detailed but not distract from the characters.

      CHARACTERS IN SCENE:
      ${characterDescriptions}

      ACTION, COMPOSITION, AND EMOTION ("Show, Don't Tell"):
      - Camera Angle: ${sceneData.angle}.
      - Core Action & Pose: ${actionWithInterpretation}
      - The composition must visually narrate the described action and emotion. Use body language, facial expressions, and environmental interaction to tell the story. Do not just show static figures.
    `;
    
    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
              numberOfImages: 1,
              outputMimeType: 'image/jpeg',
              aspectRatio: '16:9',
            },
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
            return response.generatedImages[0].image.imageBytes;
        }
        throw new Error("No image was generated for the scene.");
    } catch (error) {
        console.error("Error generating scene image:", error);
        throw error;
    }
};
