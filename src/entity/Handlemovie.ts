import {
  Entity, PrimaryGeneratedColumn, Column, BaseEntity
} from "typeorm";
import { SingleMovie } from "../definitions";

@Entity()
export default class Handlemovie extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ nullable: true, unique: true })
  docid: string;

  @Column({ type: "tinytext", nullable: true })
  title!: string;

  @Column({ type: "tinytext", nullable: true })
  titleEng!: string;

  @Column({ type: "tinytext", nullable: true })
  director!: string;

  @Column({ type: "text", nullable: true })
  actor!: string;

  @Column({ type: "text", nullable: true })
  plotKr!: string;

  @Column({ type: "text", nullable: true })
  plotEng!: string;

  @Column({ nullable: true })
  runtime!: number;

  @Column({ type: "tinytext", nullable: true })
  genre!: string;

  @Column({ type: "text", nullable: true })
  image!: string;

  @Column({ type: "text", nullable: true })
  tag!: string;

  @Column({ type: "tinytext", nullable: true })
  date!: string;

  static async MovieRegister(movie: SingleMovie): Promise<Handlemovie | undefined> {
    const { id } = (
      await this.createQueryBuilder().insert().into(Handlemovie).values(Handlemovie)
        .execute()
    ).identifiers[0];
    return id;
  }
}
