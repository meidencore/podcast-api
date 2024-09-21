import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from "@nestjs/common";
import { EpisodesService } from "./episodes.service";
import { CreateEpisodeDto } from "./dto/create-episode.dto";
import { IsPositivePipe } from "src/pipes/is-positive/is-positive.pipe";
import { ApiKeyGuard } from "src/gards/api-key/api-key.guard";
//import { ConfigService } from "src/config/config.service";

@Controller("episodes")
export class EpisodesController {
  constructor(
    private episodesService: EpisodesService,
    //private configService: ConfigService,
  ) {}

  @Get()
  findAll(
    @Query("sort") sort: "asc" | "desc" = "desc",
    @Query("limit", new DefaultValuePipe(100), ParseIntPipe, IsPositivePipe)
    limit: number,
  ) {
    console.log(limit);
    return this.episodesService.findAll(sort);
  }

  @Get("featured")
  findFeatured() {
    return this.episodesService.findFeatured();
  }

  @Get(":id")
  async findOne(@Param() id: string) {
    const episode = await this.episodesService.findOne(id);

    if (!episode) {
      throw new NotFoundException("Episode Not Found");
    }

    return episode;
  }

  @UseGuards(ApiKeyGuard)
  @Post()
  create(@Body(ValidationPipe) input: CreateEpisodeDto) {
    return this.episodesService.create(input);
  }
}
