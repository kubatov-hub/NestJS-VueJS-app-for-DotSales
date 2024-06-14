import {Injectable} from '@nestjs/common';
import {HttpService} from '@nestjs/axios';
import {AxiosResponse} from "axios";

@Injectable()
export class AmocrmService {
  private readonly amoCrmToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImE2ZTc5NWI5N2E4MmYyNTg0NWY5MWFmODQ1MGJiZDdhYWIzN2E4NmNlZTBlZDliMDU1YTQ3ZGI0YzE0Y2E5NmQ5YmY0YTQ3NGU2OTU5YmJmIn0.eyJhdWQiOiIwYmVjN2Q2Mi1iNGRlLTQwZDMtOGVkMi03NGE3M2UxYTk1YmEiLCJqdGkiOiJhNmU3OTViOTdhODJmMjU4NDVmOTFhZjg0NTBiYmQ3YWFiMzdhODZjZWUwZWQ5YjA1NWE0N2RiNGMxNGNhOTZkOWJmNGE0NzRlNjk1OWJiZiIsImlhdCI6MTcxODMwMTg1NywibmJmIjoxNzE4MzAxODU3LCJleHAiOjE3MTk1MzI4MDAsInN1YiI6IjExMTU2MjA2IiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMxNzk5MTU0LCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iLCJmaWxlcyIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiLCJwdXNoX25vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiZTA1ODBiZDUtYTk1OC00MWNhLTgyMTMtZTM3MDVlODUwNDJiIn0.K-3W9F6-_2JOjBv08TdBYnYqlPGV8ocJdHQoob26afvw85K4AotnbklPxhy_xZACnx0yPg0sIlu5rP3qzxT0nsu8bXwk3JWZ9b9vI8mOlY78mKy03adaK4ukghIkk-u7yB30zsL8UFSHYpJFM1N60xdVoX2c-HQ5l4sxfte5dfrOapoje9eROlfls47KktCF-ivJa5mEalCPXPoxA4JpnlGRj4UW3-OTkuqXTiE_SZKc7W68_WcYTaqBT-YBC8dqSk0AwWx-8pXNdPPZeptnH4PN2XWKPUKXKfIOQJsDeZK6oFxw3x1UTfE7j-RmaCZ9xsDTs9gTWcUmIY-B9ky_BQ';

  constructor(private readonly httpService: HttpService) {
  }

  async findAll(): Promise<any> {
    try {
      const first_response: AxiosResponse = await this.httpService.get(
        'https://simik101297.amocrm.ru/api/v4/leads',
        {
          headers: {
            Authorization: `Bearer ${this.amoCrmToken}`,
          },
        },
      ).toPromise();

      const first_fetch = []

      if (first_response.data._embedded && first_response.data._embedded.leads) {
        first_response.data._embedded.leads.forEach((lead: any) => {
          first_fetch.push({'name': lead.name})
          first_fetch.push({'price': lead.price})
          first_fetch.push({'status_id': lead.status_id})
          first_fetch.push({'responsible_user_id': lead.responsible_user_id})
          first_fetch.push({'created_at': `${new Date(lead.created_at * 1000).toLocaleString()}`})
        });
      } else {
        console.log('Данные в неправильном формате');
      }

      first_fetch.forEach((field, index) => {

        if (field.status_id) {
          console.log(`${field.status_id}`)
        }
      })

      return first_response.data;
    } catch (error) {
      throw error;
    }
  }

  async findAllWithFilter(query: string): Promise<any> {
    try {
      const response: AxiosResponse = await this.httpService.get(
        `https://simik101297.amocrm.ru/api/v4/leads?q=${encodeURIComponent(query)}`,
        {
          headers: {
            Authorization: `Bearer ${this.amoCrmToken}`,
          },
        },
      ).toPromise();

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
