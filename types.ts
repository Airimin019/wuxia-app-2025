export enum DanmeiRole {
  Gong = 'Gong (攻) - Activo',
  Shou = 'Shou (受) - Pasivo',
}

export interface CharacterProfile {
  id: string;
  name: string;
  danmeiRole: DanmeiRole;
  appearance: string;
  personality: string;
  emotionalArc: string;
  cultivationLevel: string;
  referenceImage?: string;
}

export enum CameraAngle {
    Default = "Por Defecto",
    Wide = "Plano General",
    Full = "Plano Entero",
    Medium = "Plano Medio",
    CloseUp = "Primer Plano",
    ExtremeCloseUp = "Plano Detalle",
}

export interface SceneData {
  characters: CharacterProfile[];
  scenario: string;
  action: string;
  angle: CameraAngle;
}