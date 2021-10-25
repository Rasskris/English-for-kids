import { URL, FETCH_ERROR, METHOD, FETCH_HEADERS } from '../constants';
import { getFormData } from '../utils';

type RequestOptions = {
  method: string;
  body?: BodyInit;
  headers?: HeadersInit;
};

type Data = {
  [key: string]: string | Blob;
};

class ClientAPI {
  private async request(endpoint: string, { method, body, headers }: RequestOptions) {
    const config: RequestInit = {
      method,
      headers,
      body,
    };

    try {
      const response = await fetch(`${URL}/${endpoint}`, config);
      const data = await response.json();

      return data;
    } catch (err) {
      return Promise.reject(new Error(FETCH_ERROR));
    }
  }

  public async get(endpoint: string) {
    const data = await this.request(endpoint, { method: METHOD.GET, headers: FETCH_HEADERS });

    return data;
  }

  public async post(endpoint: string, postData: Data) {
    const formData = getFormData(postData);
    const data = await this.request(endpoint, {
      method: METHOD.POST,
      body: JSON.stringify(formData),
    });

    return data;
  }

  public async patch(endpoint: string, patchData: Data) {
    const formData = getFormData(patchData);
    const data = await this.request(endpoint, {
      method: METHOD.PATCH,
      body: JSON.stringify(formData),
    });

    return data;
  }

  public async delete(endpoint: string) {
    const data = await this.request(endpoint, { method: METHOD.DELETE, headers: FETCH_HEADERS });

    return data;
  }
}

const clientAPI = new ClientAPI();

export { clientAPI };
