import { useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://revampbackend.iema.ai/';
// const BASE_URL = 'http://192.168.1.220:5000/';
// const BASE_URL = 'http://192.168.90.12:5000/';

export function useHttp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const { logout } = useAuth();

  const request = useCallback(
    async (method, url, data = null, isMultipart = false, token = null) => {
      setLoading(true);
      setError(null);
      setResponse(null);

      console.log(`[HTTP ${method}] ${BASE_URL}${url}`);

      try {
        const headers = {};

        if (!isMultipart) {
          headers['Content-Type'] = 'application/json';
        }

        let authToken = token;
        if (!authToken) {
          authToken = await AsyncStorage.getItem('accessToken');
        }
        if (authToken) {
          headers['Authorization'] = `Bearer ${authToken}`;
        }

        const body = isMultipart ? data : data ? JSON.stringify(data) : null;

        const res = await fetch(`${BASE_URL}${url}`, {
          method,
          headers,
          body,
        });

        const contentType = res.headers.get('Content-Type') || '';
        const isJson = contentType.includes('application/json');
        const result = isJson ? await res.json() : await res.text();

        console.log(`[HTTP ${res.status}]`, result);

        // Handle error responses
        if (!res.ok) {
          const errorMsg = result?.message || `Request failed with status ${res.status}`;

          // Check for authentication errors
          const isAuthError =
            res.status === 401 ||
            res.status === 403 ||
            (result?.message &&
              (result.message.toLowerCase().includes('invalid token') ||
                result.message.toLowerCase().includes('token expired') ||
                result.message.toLowerCase().includes('unauthorized')));

          if (isAuthError) {
            console.log('[AUTH ERROR] Invalid token detected, logging out...');
            // Let AuthContext handle navigation to Landing
            await logout(false);
          }

          const err = new Error(errorMsg);
          err.status = res.status;
          err.response = result;
          throw err;
        }

        setResponse(result);
        return result;
      } catch (err) {
        console.error(`[HTTP ERROR] ${method} ${url}:`, err.message);
        const errorMessage = err.message || 'Something went wrong';
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [logout]
  );

  const get = useCallback(
    (url, token = null) => request('GET', url, null, false, token),
    [request]
  );

  const post = useCallback(
    (url, data, isMultipart = false, token = null) =>
      request('POST', url, data, isMultipart, token),
    [request]
  );

  const put = useCallback(
    (url, data, isMultipart = false, token = null) =>
      request('PUT', url, data, isMultipart, token),
    [request]
  );

  const deleteApi = useCallback(
    (url, token = null) => request('DELETE', url, null, false, token),
    [request]
  );

  return { loading, error, response, get, post, put, deleteApi: deleteApi };
}