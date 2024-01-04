import { Injectable, Logger } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ElasticsearchService {
  private readonly client: Client;
  private readonly logger = new Logger(ElasticsearchService.name)
  private readonly notesIndexName:string = process.env.ELATICSEARCH_NOTES_INDEX

  constructor(private readonly configService:ConfigService) {
    this.logger.log("CREATING ElasticsearchService")
    this.client = new Client({
        node: `${process.env.ELATICSEARCH_HOST}:${process.env.ELATICSEARCH_PORT}`,
        auth:{
            username: process.env.ELATICSEARCH_USERNAME,
            password: process.env.ELATICSEARCH_PASSWORD,
        }, 
    }); 
    this.createIndex(
        this.notesIndexName,
        parseInt(process.env.ELATICSEARCH_NO_OF_SHARDS),
        parseInt(process.env.ELATICSEARCH_NO_OF_REPLICAS)
    )
  }

  async createIndex(indexName: string, numberOfShards: number, numberOfReplicas: number) {
    const indexExists = await this.client.indices.exists({ index: indexName });
    this.logger.log(`indexExists : ${indexExists}`)
    if (!indexExists) {
      await this.client.indices.create({
        index: indexName,
        body: {
          settings: {
            number_of_shards: numberOfShards,
            number_of_replicas: numberOfReplicas,
          },
          mappings: {
            properties: {
                title: { type: 'text' },
                content: { type: 'text' },
                userId: { type: 'keyword' }, // Assuming userId is used for linking to users
            },
          },
        },
      });
    }
  }


  async searchNotesByTermAndUserId(userId: string, searchTerm: string) {
    const searchQuery = {
      query: {
        bool: {
          must: [
            { term: { userId } }, // Filter by userId
            {
              multi_match: {
                query: searchTerm,
                fields: ['title', 'content'],
              },
            },
          ],
        },
      },
    };

    const data = await this.client.search({
      index: process.env.ELATICSEARCH_NOTES_INDEX,
      body: searchQuery,
    });

    return data.hits.hits.map((hit) => hit._source);
  }

  async addNoteToIndex(note: any) {
    const body = await this.client.index({
      index: this.notesIndexName,
      body: note,
    });

    return body;
  }

}