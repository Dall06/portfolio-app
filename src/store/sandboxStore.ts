import { create } from 'zustand';

export interface ConsoleLine {
  id: string;
  timestamp: string;
  type: 'request' | 'response' | 'slog-info' | 'slog-error' | 'system';
  message: string;
  details?: any;
}

interface UserMock {
  email: string;
  name: string;
  passwordHash: string; // bcrypt mock
  createdAt: string;
}

interface SandboxState {
  history: ConsoleLine[];
  registeredUsers: Record<string, UserMock>;
  currentUser: UserMock | null;
  token: string | null;
  isSending: boolean;
  clearConsole: () => void;
  sendRequest: (method: string, endpoint: string, body?: any) => Promise<void>;
}

const mockJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMTIzNCIsImVtYWlsIjoiaW5mb0BkYWxsbDYubmV0Iiwicm9sZSI6InVzZXIiLCJleHAiOjE4MDc0NzAwMDB9.super-secret-signature";

export const useSandboxStore = create<SandboxState>((set, get) => ({
  history: [
    {
      id: 'init',
      timestamp: new Date().toLocaleTimeString(),
      type: 'system',
      message: 'Base API Terminal v1.0.0 iniciada. Listo para peticiones.'
    }
  ],
  registeredUsers: {
    "admin@dall06.net": {
      email: "admin@dall06.net",
      name: "Administrador Dall06",
      passwordHash: "$2a$10$abcdefghijklmnopqrstuvwxyz123456", // mocked bcrypt
      createdAt: new Date().toISOString()
    }
  },
  currentUser: null,
  token: null,
  isSending: false,

  clearConsole: () => set({
    history: [
      {
        id: Math.random().toString(),
        timestamp: new Date().toLocaleTimeString(),
        type: 'system',
        message: 'Consola limpiada.'
      }
    ]
  }),

  sendRequest: async (method: string, endpoint: string, body?: any) => {
    set({ isSending: true });
    
    const timestamp = new Date().toLocaleTimeString();
    const requestId = Math.random().toString(36).substring(7);

    // 1. Agregar línea de Petición HTTP
    const reqLine: ConsoleLine = {
      id: `req-${requestId}`,
      timestamp,
      type: 'request',
      message: `${method} ${endpoint}`,
      details: body ? { Headers: { "Content-Type": "application/json" }, Body: body } : undefined
    };

    set(state => ({ history: [...state.history, reqLine] }));

    // Simular latencia de red
    await new Promise(resolve => setTimeout(resolve, 800));

    const responseTimestamp = new Date().toLocaleTimeString();
    let responseStatus = 200;
    let responseBody: any = {};
    let slogs: ConsoleLine[] = [];

    // Lógica de ruteo simulada
    if (endpoint === '/api/v1/auth/signup') {
      const email = body?.email;
      const password = body?.password;
      const name = body?.name;

      slogs.push({
        id: `slog-1-${requestId}`,
        timestamp: responseTimestamp,
        type: 'slog-info',
        message: `slog: method=${method} path=${endpoint} - payload parsed successfully`
      });

      if (!email || !password || !name) {
        responseStatus = 400;
        responseBody = { error: "cuerpo de petición inválido (campos faltantes)" };
        slogs.push({
          id: `slog-err-${requestId}`,
          timestamp: responseTimestamp,
          type: 'slog-error',
          message: `slog: method=${method} path=${endpoint} status=400 error="value error: campos faltantes"`
        });
      } else if (get().registeredUsers[email]) {
        responseStatus = 409;
        responseBody = { error: `el usuario con email '${email}' ya existe` };
        slogs.push({
          id: `slog-err-${requestId}`,
          timestamp: responseTimestamp,
          type: 'slog-error',
          message: `slog: method=${method} path=${endpoint} status=409 error="conflict: el usuario ya existe"`
        });
      } else {
        // Enmascarar contraseña en logs (regla estricta de slog.SanitizingHandler)
        slogs.push({
          id: `slog-mask-${requestId}`,
          timestamp: responseTimestamp,
          type: 'slog-info',
          message: `slog: saving user to database, email=${email} password=**** name=${name}`
        });

        const newUser: UserMock = {
          email,
          name,
          passwordHash: "$2a$10$hashedpasswordMock12345",
          createdAt: new Date().toISOString()
        };

        // Registrar usuario
        set(state => ({
          registeredUsers: { ...state.registeredUsers, [email]: newUser },
          currentUser: newUser,
          token: mockJWT
        }));

        responseStatus = 201;
        responseBody = {
          user: { id: "usr-" + Math.floor(Math.random()*10000), email, name, created_at: newUser.createdAt },
          token: mockJWT
        };

        slogs.push({
          id: `slog-ok-${requestId}`,
          timestamp: responseTimestamp,
          type: 'slog-info',
          message: `slog: user created, assigned_id=usr-mock jwt_issued=true`
        });
      }
    } 
    else if (endpoint === '/api/v1/auth/login') {
      const email = body?.email;
      const password = body?.password;

      slogs.push({
        id: `slog-1-${requestId}`,
        timestamp: responseTimestamp,
        type: 'slog-info',
        message: `slog: method=${method} path=${endpoint} - validating credentials`
      });

      const user = get().registeredUsers[email || ''];

      if (!email || !password) {
        responseStatus = 400;
        responseBody = { error: "cuerpo de petición inválido" };
        slogs.push({
          id: `slog-err-${requestId}`,
          timestamp: responseTimestamp,
          type: 'slog-error',
          message: `slog: method=${method} path=${endpoint} status=400 error="value error"`
        });
      } else if (!user) {
        responseStatus = 401;
        responseBody = { error: "credenciales inválidas" };
        slogs.push({
          id: `slog-err-${requestId}`,
          timestamp: responseTimestamp,
          type: 'slog-error',
          message: `slog: method=${method} path=${endpoint} status=401 error="unauthorized: usuario no registrado"`
        });
      } else {
        // Simular login exitoso
        set({ currentUser: user, token: mockJWT });
        responseStatus = 200;
        responseBody = {
          user: { id: "usr-mock", email: user.email, name: user.name, created_at: user.createdAt },
          token: mockJWT
        };
        slogs.push({
          id: `slog-ok-${requestId}`,
          timestamp: responseTimestamp,
          type: 'slog-info',
          message: `slog: login successful for user=${email}, token issued`
        });
      }
    } 
    else if (endpoint === '/api/v1/users/me') {
      const hasToken = get().token;

      if (!hasToken) {
        responseStatus = 401;
        responseBody = { error: "token faltante" };
        slogs.push({
          id: `slog-err-${requestId}`,
          timestamp: responseTimestamp,
          type: 'slog-error',
          message: `slog: method=${method} path=${endpoint} status=401 error="unauthorized: token faltante"`
        });
      } else {
        const user = get().currentUser;
        if (!user) {
          responseStatus = 404;
          responseBody = { error: "usuario no encontrado" };
        } else {
          responseStatus = 200;
          responseBody = { id: "usr-mock", email: user.email, name: user.name, created_at: user.createdAt };
          slogs.push({
            id: `slog-ok-${requestId}`,
            timestamp: responseTimestamp,
            type: 'slog-info',
            message: `slog: method=${method} path=${endpoint} status=200 - user profile fetched successfully`
          });
        }
      }
    } 
    else {
      // Endpoint desconocido
      responseStatus = 404;
      responseBody = { error: "not found" };
      slogs.push({
        id: `slog-err-${requestId}`,
        timestamp: responseTimestamp,
        type: 'slog-error',
        message: `slog: method=${method} path=${endpoint} status=404 error="not found"`
      });
    }

    // 2. Agregar líneas de logs (slog) y luego la Respuesta HTTP
    const respLine: ConsoleLine = {
      id: `resp-${requestId}`,
      timestamp: responseTimestamp,
      type: 'response',
      message: `HTTP Status: ${responseStatus}`,
      details: { Status: responseStatus, Body: responseBody }
    };

    set(state => ({
      history: [...state.history, ...slogs, respLine],
      isSending: false
    }));
  }
}));
