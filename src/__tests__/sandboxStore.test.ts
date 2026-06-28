import { describe, it, expect, beforeEach } from 'vitest';
import { useSandboxStore } from '../store/sandboxStore';

describe('useSandboxStore', () => {
  beforeEach(() => {
    useSandboxStore.getState().clearConsole();
  });

  it('should initialize with system start line', () => {
    const history = useSandboxStore.getState().history;
    expect(history.length).toBe(1);
    expect(history[0].type).toBe('system');
  });

  it('should clear the console history log', () => {
    useSandboxStore.getState().clearConsole();
    const history = useSandboxStore.getState().history;
    expect(history.length).toBe(1);
    expect(history[0].message).toContain('Consola limpiada');
  });

  it('should handle POST signup request and register the user', async () => {
    const store = useSandboxStore.getState();
    
    // Trigger signup
    await store.sendRequest('POST', '/api/v1/auth/signup', {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    });

    const updatedStore = useSandboxStore.getState();
    
    // Verify user registered in store state
    expect(updatedStore.registeredUsers['test@example.com']).toBeDefined();
    expect(updatedStore.registeredUsers['test@example.com'].name).toBe('Test User');
    
    // Verify HTTP response line exists and is 201 Created
    const responseLine = updatedStore.history.find(line => line.type === 'response');
    expect(responseLine).toBeDefined();
    expect(responseLine?.message).toContain('HTTP Status: 201');
  });

  it('should prevent signup of duplicate emails with 409 Conflict', async () => {
    const store = useSandboxStore.getState();

    // First signup
    await store.sendRequest('POST', '/api/v1/auth/signup', {
      name: 'Original',
      email: 'original@example.com',
      password: 'password123'
    });

    // Duplicate signup
    await store.sendRequest('POST', '/api/v1/auth/signup', {
      name: 'Duplicate',
      email: 'original@example.com',
      password: 'password123'
    });

    const updatedStore = useSandboxStore.getState();
    const responseLines = updatedStore.history.filter(line => line.type === 'response');
    
    // Second response should be 409 Conflict
    const lastResponse = responseLines[responseLines.length - 1];
    expect(lastResponse.message).toContain('HTTP Status: 409');
  });
});
