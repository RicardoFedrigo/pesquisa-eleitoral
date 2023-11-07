import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { StateEntity } from "../entities/state.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CitiesCountDTO } from "../dtos/cities-count.dto";

@Injectable()
export class StateRepository {
  constructor(
    @InjectRepository(StateEntity)
    private readonly repository: Repository<StateEntity>,
  ) {}

  async getcountCitiesByState(): Promise<CitiesCountDTO[]> {
    return await this.repository.query(
      `select count(c.id) "numberOfCity",s.uf, s."year"   
        from state s left join city c 
        ON c."stateId"  = s.id 
        group by s.uf, s."year" `,
    );
  }

  async upSert(state: StateEntity): Promise<StateEntity> {
    const stateExist = await this.repository.findOne({
      where: { uf: state.uf, year: state.year },
    });

    if (!stateExist) {
      return await this.repository.save(state);
    }

    await this.repository.update(
      {
        id: stateExist.id,
        uf: stateExist.uf,
        year: state.year,
      },
      { populationSize: state.populationSize },
    );
    return stateExist;
  }
}
