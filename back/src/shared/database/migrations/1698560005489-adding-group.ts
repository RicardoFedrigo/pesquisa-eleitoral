import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingGroup1698560005489 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "group" (type, "rangeMin" , "rangeMax")
      VALUES 
          ('Grupo 1', 0, 20000),
          ('Grupo 2', 20001, 100000),
          ('Grupo 3', 100001, 1000000),
          ('Grupo 4', 1000001, -1);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM group WHERE ('Grupo 1'
        'Grupo 2'
        'Grupo 3'
        'Grupo 4')`,
    );
  }
}
