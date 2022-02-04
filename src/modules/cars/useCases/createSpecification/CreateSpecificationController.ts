import { Request, Response } from "express";
import { CreateSpecificatioUseCase } from "./CreateSpecificatioUseCase";

class CreateSpecificationController {
  constructor(private createSpecificationUseCase: CreateSpecificatioUseCase) { }

  handle(request: Request, response: Response): Response {
    const { name, description } = request.body;

    this.createSpecificationUseCase.execute({ name, description });

    return response.status(201).send();
  }
}

export { CreateSpecificationController }