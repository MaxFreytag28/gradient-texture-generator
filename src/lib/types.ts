// Define gradient types
export type GradientType = 'linear' | 'radial' | 'conic';

// Define ColorStop type
export type ColorStop = {
  id: string; // Unique identifier
  color: string;
  position: number;
  alpha: number;
};

// Define RadialGradientOptions type
export type RadialGradientOptions = {
  scale: number; // Scale factor for the radial gradient (0.1 to 2.0)
};
