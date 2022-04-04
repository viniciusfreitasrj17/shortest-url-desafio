import { getConnection } from 'typeorm';

export const cleanDB = (): void => {
  // Fetch all the entities
  const entities = getConnection().entityMetadatas;

  entities.forEach(async entity => {
    const repository = getConnection().getRepository(entity.name); // Get repository
    await repository.clear(); // Clear each entity table's content
  });
};
