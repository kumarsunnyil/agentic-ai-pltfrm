import { BadRequestException, Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { SemanticSearchService } from './services/semantic-search.service';

interface SemanticSearchRequestBody {
  query?: unknown;
  limit?: unknown;
}

@Controller('knowledge')
@UseGuards(AuthGuard('jwt'))
export class SemanticSearchController {
  constructor(private readonly semanticSearchService: SemanticSearchService) {}

  @Post('search')
  async search(@Body() body: SemanticSearchRequestBody) {
    if (!body || typeof body.query !== 'string') {
      throw new BadRequestException('The request body must contain a string query.');
    }

    let limit = 5;

    if (body.limit !== undefined) {
      if (typeof body.limit !== 'number' && typeof body.limit !== 'string') {
        throw new BadRequestException('Search limit must be a number.');
      }

      const parsedLimit = Number(body.limit);

      if (!Number.isInteger(parsedLimit)) {
        throw new BadRequestException('Search limit must be an integer.');
      }

      limit = parsedLimit;
    }

    return this.semanticSearchService.search(body.query, limit);
  }
}
