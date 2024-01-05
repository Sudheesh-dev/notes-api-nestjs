import { Injectable, Logger } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';
import { ConfigService } from '@nestjs/config';
import { AddOrUpdateNotesToElasticDto } from 'src/modules/notes/dtos/notes.dto';

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
      this.logger.log(`Creating index ${indexName} in es`)
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


  async searchNotesByTermAndUserId(userId: string, searchTerm: string, from:number=0, size:number=10) {
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
      from,
      size,
    });
    return data.hits.hits.map((hit:any) => ({...hit._source,id:hit._id}));
  }

  async addNoteToIndex(id:string, note: AddOrUpdateNotesToElasticDto) {
    this.logger.log("adding note in elasticsearch")
    const body = await this.client.index({
      index: this.notesIndexName,
      body: note,
      id
    });

    return body;
  }

  async updateNoteById(noteId: string, updatedNote: AddOrUpdateNotesToElasticDto) {
    this.logger.log("updating note in elasticsearch")
    const body = await this.client.update({
      index: this.notesIndexName,
      id: noteId,
      body: {
        doc: updatedNote,
      },
    });

    return body;
  }

  async removeNoteById(noteId: string) {
    this.logger.log("removing note from elasticsearch")
    const body = await this.client.delete({
      index: this.notesIndexName,
      id: noteId,
    });

    return body;
  }

}