import { Specification } from "../model/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "./ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
  private specifications: Specification[];

  constructor() {
    this.specifications = [];
  }

  create({ name, description }: ICreateSpecificationDTO): void {
    const specifiction = new Specification();

    Object.assign(specifiction, {
      name,
      description,
      created_at: new Date(),
    });

    this.specifications.push(specifiction);
  }

  findByName(name: string): Specification {
    const specifiction = this.specifications.find(specification => specifiction.name === name );

    return specifiction;
  }
}