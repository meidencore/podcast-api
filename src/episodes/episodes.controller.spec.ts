import { Test, TestingModule } from "@nestjs/testing";
import { EpisodesController } from "./episodes.controller";
import { EpisodesService } from "./episodes.service";

describe("EpisodesController", () => {
  let controller: EpisodesController;

  const mockFindOne = jest.fn();
  const mockEpisodeService = {
    findAll: async () => [
      {
        id: "id",
      },
    ],
    findFeaturedEpisode: async () => [
      {
        id: "id",
      },
    ],

    findOne: mockFindOne,

    create: async () => ({
      id: "id",
    }),
  };

  beforeEach(async () => {
    jest.resetAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EpisodesController],
      providers: [{ provide: EpisodesService, useValue: mockEpisodeService }],
    }).compile();

    controller = module.get<EpisodesController>(EpisodesController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("findOne", () => {
    describe("When a Episode is found", () => {
      const episodeId = "id";
      const mockResult = { id: episodeId, name: "my episode" };

      beforeEach(() => {
        mockFindOne.mockResolvedValue(mockResult);
      });

      it("should call the service with the correct params", async () => {
        await controller.findOne(episodeId);
        expect(mockFindOne).toHaveBeenCalledWith(episodeId);
      });

      it("should return correct response", async () => {
        const result = await controller.findOne(episodeId);

        expect(result).toEqual(mockResult);
      });
    });

    describe("When a Episode is not found", () => {
      const episodeId = "id2";

      beforeEach(() => {
        mockFindOne.mockResolvedValue(null);
      });

      it("Should throw an error", async () => {
        await expect(controller.findOne(episodeId)).rejects.toThrow(
          "Episode Not Found",
        );
      });
    });
  });
});
