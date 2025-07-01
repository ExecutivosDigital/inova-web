/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import axios from "axios";
import { Cookies, useCookies } from "next-client-cookies";
import { createContext, useContext } from "react";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

interface ApiContextProps {
  PostAPI: (
    url: string,
    data: unknown,
    auth: boolean,
  ) => Promise<{ status: number; body: any }>;
  GetAPI: (
    url: string,
    auth: boolean,
  ) => Promise<{ status: number; body: any }>;
  PutAPI: (
    url: string,
    data: unknown,
    auth: boolean,
  ) => Promise<{ status: number; body: any }>;
  DeleteAPI: (
    url: string,
    auth: boolean,
  ) => Promise<{ status: number; body: any }>;
  IBGEAPI: (url: string) => Promise<{ status: number; body: any }>;
  token: string | undefined;
  cookies: Cookies;
}

const ApiContext = createContext<ApiContextProps | undefined>(undefined);

interface ProviderProps {
  children: React.ReactNode;
}

export const ApiContextProvider = ({ children }: ProviderProps) => {
  const cookies = useCookies();

  const token = cookies.get(process.env.NEXT_PUBLIC_USER_TOKEN as string);

  const api = axios.create({
    baseURL,
  });

  const IBGE = axios.create({
    baseURL: "https://servicodados.ibge.gov.br/api/v1/localidades/",
  });

  function config(auth: boolean) {
    return {
      headers: {
        Authorization: auth ? `Bearer ${token}` : "",
        "ngrok-skip-browser-warning": "any",
      },
    };
  }

  const IBGEAPI = async (url: string) => {
    const connect = await IBGE.get(url)
      .then(({ data }) => {
        return {
          status: 200,
          body: data,
        };
      })
      .catch((err) => {
        const message = err.response.data;
        const status = err.response.status;
        return { status, body: message };
      });

    return connect.status === 500
      ? {
          status: connect.status,
          body: "Ops! algo deu errado, tente novamente",
        }
      : connect.status === 413
        ? {
            status: connect.status,
            body: "Ops! algo deu errado, tente novamente ou escolha outra imagem",
          }
        : connect;
  };

  async function PostAPI(url: string, data: unknown, auth: boolean) {
    const connect = await api
      .post(url, data, config(auth))
      .then(({ data }) => {
        return {
          status: 200,
          body: data,
        };
      })
      .catch((err) => {
        const message = err.response.data;
        const status = err.response.status;
        return { status, body: message };
      });

    return connect.status === 500
      ? {
          status: connect.status,
          body: "Ops! algo deu errado, tente novamente",
        }
      : connect;
  }

  async function GetAPI(url: string, auth: boolean) {
    const connect = await api
      .get(url, config(auth))
      .then(({ data }) => {
        return {
          status: 200,
          body: data,
        };
      })
      .catch((err) => {
        const message = err.response.data;
        const status = err.response.status;
        return { status, body: message };
      });

    return connect.status === 500
      ? {
          status: connect.status,
          body: "Ops! algo deu errado, tente novamente",
        }
      : connect;
  }

  async function PutAPI(url: string, data: unknown, auth: boolean) {
    const connect = await api
      .put(url, data, config(auth))
      .then(({ data }) => {
        return {
          status: 200,
          body: data,
        };
      })
      .catch((err) => {
        const message = err.response.data;
        const status = err.response.status;
        return { status, body: message };
      });

    return connect.status === 500
      ? {
          status: connect.status,
          body: "Ops! algo deu errado, tente novamente",
        }
      : connect;
  }

  async function DeleteAPI(url: string, auth: boolean) {
    const connect = await api
      .delete(url, config(auth))
      .then(({ data }) => {
        return {
          status: 200,
          body: data,
        };
      })
      .catch((err) => {
        const message = err.response.data;
        const status = err.response.status;
        return { status, body: message };
      });

    return connect.status === 500
      ? {
          status: connect.status,
          body: "Ops! algo deu errado, tente novamente",
        }
      : connect;
  }

  return (
    <ApiContext.Provider
      value={{
        PostAPI,
        GetAPI,
        PutAPI,
        token,
        DeleteAPI,
        IBGEAPI,
        cookies,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export function useApiContext() {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error(
      "useApiContext deve ser usado dentro de um ApiContextProvider",
    );
  }
  return context;
}
