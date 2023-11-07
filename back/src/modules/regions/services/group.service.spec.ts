import { GroupService } from "./group.service";
import { GroupEntity } from "../entities/group.entity";
import { GroupRepository } from "../repository/group.repository";
jest.mock("../repository/group.repository");

describe("GroupService", () => {
  let groupService: GroupService;
  const groupRepository = jest.fn() as unknown as GroupRepository;

  const groupsMock: GroupEntity[] = [
    { type: "Grupo 1", rangeMin: 0, id: "1", city: [], rangeMax: 20000 },
    { type: "Grupo 2", rangeMin: 20001, id: "2", city: [], rangeMax: 100000 },
    { type: "Grupo 3", rangeMin: 100001, id: "3", city: [], rangeMax: 1000000 },
    { type: "Grupo 4", rangeMin: 1000001, id: "4", city: [], rangeMax: -1 },
  ];

  beforeEach(async () => {
    groupService = new GroupService(groupRepository);
  });

  describe("Test returnGroupByPopulationSize", () => {
    it("should return a GroupEntity with type Grupo 1", () => {
      const group = groupService.returnGroupByPopulationSize(100, groupsMock);

      expect(group.type).toBe("Grupo 1");
    });

    it("should return a GroupEntity with type Grupo 2", () => {
      const group = groupService.returnGroupByPopulationSize(22000, groupsMock);

      expect(group.type).toBe("Grupo 2");
    });

    it("should return a GroupEntity with type Grupo 3", () => {
      const group = groupService.returnGroupByPopulationSize(
        110000,
        groupsMock,
      );

      expect(group.type).toBe("Grupo 3");
    });

    it("should return a GroupEntity with type Grupo 4", () => {
      const group = groupService.returnGroupByPopulationSize(
        2000000,
        groupsMock,
      );
      expect(group.type).toBe("Grupo 4");
    });
  });
});
