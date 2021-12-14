import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type MovieMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Movie {
  readonly id: string;
  readonly description?: string;
  readonly thumbnail?: string;
  readonly releasedDate?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Movie, MovieMetaData>);
  static copyOf(source: Movie, mutator: (draft: MutableModel<Movie, MovieMetaData>) => MutableModel<Movie, MovieMetaData> | void): Movie;
}