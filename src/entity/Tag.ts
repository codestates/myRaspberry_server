import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export default class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  category!: string;

  @Column()
  name!: string;
}
