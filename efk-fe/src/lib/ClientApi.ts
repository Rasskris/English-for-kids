import { API_URL, FETCH_ERROR, FETCH_HEADERS } from '../constants';
import { Data } from '../types';
import { METHOD } from '../enums';
import { getFormData } from '../utils';

class ClientAPI {
  private async request(endpoint: string, requestInfo: RequestInit) {
    try {
      const response = await fetch(`${API_URL}/${endpoint}`, requestInfo);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message ? data.message : FETCH_ERROR);
      }

      return data;
    } catch (error) {
      return Promise.reject(error.message ? error.message : null);
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
      body: formData,
    });

    return data;
  }

  public async patch(endpoint: string, patchData: Data) {
    const formData = getFormData(patchData);
    const data = await this.request(endpoint, {
      method: METHOD.PATCH,
      body: formData,
    });

    return data;
  }

  public async delete(endpoint: string) {
    const data = await this.request(endpoint, { method: METHOD.DELETE, headers: FETCH_HEADERS });

    return data;
  }

  public async auth(endpoint: string, userData?: Data) {
    const data = await this.request(endpoint, {
      method: METHOD.POST,
      credentials: 'include',
      body: JSON.stringify(userData),
      headers: FETCH_HEADERS,
    });

    return data;
  }

  public async checkAuth(endpoint: string) {
    const data = await this.request(endpoint, {
      method: METHOD.GET,
      credentials: 'include',
      headers: FETCH_HEADERS,
    });

    return data;
  }
}

const clientAPI = new ClientAPI();

export { clientAPI };
