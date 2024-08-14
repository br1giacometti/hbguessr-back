import Warehouse from 'Stock/domain/models/Warehouse';
import BaseRepository from 'Base/repository/BaseRepository';

export default abstract class WarehouseRepository extends BaseRepository<Warehouse> {
  abstract findWarehouseByDescription: (
    description: string,
  ) => Promise<Warehouse | null>;
}
