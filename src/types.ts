export type Movie = {
  name: string;
  posterUrl: string;
  previewUrl: string;
  bigPosterUrl: string;
  backgroundColor: string;
  description: string;
  rating: number;
  votes: number;
  director: string;
  starring: string[];
  runTime: string;
  genre: string;
  releaseYear: number;
  id: number | string;
  isFavorite: boolean;
  videoUrl: string;
  trailerUrl: string;
};
